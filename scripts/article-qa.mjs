import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { validateArticlePublicationContract } from "./lib/article-publication-contract.mjs";
import { readPublicImageInfo } from "./lib/image-metadata.mjs";
import { loadReviewedRepairContext, dataWithReviewedRepairRisk } from "./lib/reviewed-repair-context.mjs";

const repoRoot = process.cwd();
const contentRoot = path.join(repoRoot, "src", "content");
const authorsPath = path.join(repoRoot, "src", "data", "article-authors.json");
const allowedAuthors = JSON.parse(fs.readFileSync(authorsPath, "utf8")).authors;

const args = process.argv.slice(2);
const fileArgs = [];
let previewBase = "";
let failOnWarnings = false;
let newArticle = false;

for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];
  if (argument === "--preview-base") {
    previewBase = args[index + 1] || "";
    index += 1;
  } else if (argument === "--fail-on-warnings") {
    failOnWarnings = true;
  } else if (argument === "--new-article") {
    newArticle = true;
  } else {
    fileArgs.push(argument);
  }
}

if (!fileArgs.length) {
  console.error(
    "Usage: npm run qa:article -- <article.md...> [--new-article] [--preview-base <url>] [--fail-on-warnings]",
  );
  process.exit(1);
}

const contentDirectories = ["guides", "case-studies", "insights"];
const allRoutes = new Set(
  contentDirectories.flatMap((directory) => {
    const fullDirectory = path.join(contentRoot, directory);
    if (!fs.existsSync(fullDirectory)) return [];
    return fs.readdirSync(fullDirectory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => `/resources/${directory}/${file.replace(/\.md$/, "")}`);
  }),
);

function articleRoute(filePath) {
  const relative = path.relative(repoRoot, filePath).replaceAll("\\", "/");
  const slug = path.basename(filePath, ".md");
  return relative.startsWith("src/content/case-studies/")
    ? `/resources/case-studies/${slug}`
    : `/resources/guides/${slug}`;
}

function validateAuthor(data, { forbidDeprecated = false } = {}) {
  const errors = [];
  const warnings = [];
  const authorName = String(data.author || data.author_name || data.authorName || "");
  const expected = allowedAuthors[authorName];
  if (!expected) return { errors: ['author must be exactly "Ben" or "Daniel"'], warnings };

  const deprecatedFields = ["author_name", "authorName", "author_title", "authorTitle", "author_url", "authorUrl", "author_bio", "authorBio", "author_links", "authorLinks"];
  const presentDeprecated = deprecatedFields.filter((field) => data[field] !== undefined);
  if (forbidDeprecated && presentDeprecated.length) {
    errors.push(`new articles must use canonical author profiles; remove ${presentDeprecated.join(", ")}`);
  } else if (presentDeprecated.length) {
    warnings.push(`legacy author overrides remain compatible but should be removed: ${presentDeprecated.join(", ")}`);
  }
  if (!(data.reviewed_date || data.reviewedDate || data.reviewedAt)) {
    errors.push("reviewed_date is required");
  }
  return { errors, warnings };
}

function plainText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

const reviewedRepairRisks = newArticle ? new Map() : loadReviewedRepairContext(repoRoot);

let errorCount = 0;
let warningCount = 0;

for (const fileArgument of fileArgs) {
  const filePath = path.resolve(repoRoot, fileArgument);
  const relative = path.relative(repoRoot, filePath).replaceAll("\\", "/");
  console.log(`\n=== ${relative} ===`);

  if (!fs.existsSync(filePath)) {
    console.error(`ERROR file not found: ${relative}`);
    errorCount += 1;
    continue;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const route = articleRoute(filePath);
  const contractErrors = validateArticlePublicationContract({
    data: dataWithReviewedRepairRisk(parsed.data, relative, reviewedRepairRisks),
    body: parsed.content,
    imageInfo: (featuredImage) => readPublicImageInfo(repoRoot, featuredImage),
  });
  for (const error of contractErrors.errors) console.error(`ERROR ${error}`);
  for (const warning of contractErrors.warnings) console.warn(`WARN ${warning}`);
  console.log(`METRICS ${JSON.stringify(contractErrors.metrics)}`);
  errorCount += contractErrors.errors.length;
  warningCount += contractErrors.warnings.length;

  const contentLinks = [...raw.matchAll(/\]\((\/resources\/(?:guides|case-studies|insights)\/[^)#\s]+)(?:#[^)\s]*)?\)/g)].map((match) => match[1]);
  const missingContent = [...new Set(contentLinks.filter((route) => !allRoutes.has(route)))];
  for (const route of missingContent) console.error(`ERROR missing content target: ${route}`);
  errorCount += missingContent.length;
  if (!missingContent.length) console.log(`OK ${contentLinks.length} internal content links resolve`);

  const authorResult = validateAuthor(parsed.data, { forbidDeprecated: newArticle });
  for (const error of authorResult.errors) console.error(`ERROR ${error}`);
  for (const warning of authorResult.warnings) console.warn(`WARN ${warning}`);
  errorCount += authorResult.errors.length;
  warningCount += authorResult.warnings.length;
  if (!authorResult.errors.length) console.log("OK canonical author and review fields are complete");

  if (previewBase) {
    const previewUrl = `${previewBase.replace(/\/$/, "")}${route}`;
    try {
      const response = await fetch(previewUrl, { redirect: "follow" });
      const html = await response.text();
      const text = plainText(html);
      if (!response.ok) {
        console.error(`ERROR preview returned ${response.status}: ${previewUrl}`);
        errorCount += 1;
      } else if (!text.includes(String(parsed.data.title)) || /Article Not Found/i.test(text)) {
        console.error(`ERROR preview does not render the expected article heading: ${previewUrl}`);
        errorCount += 1;
      } else {
        console.log(`OK preview renders the expected article (${response.status})`);
      }
    } catch (error) {
      console.error(`ERROR preview check failed: ${error instanceof Error ? error.message : String(error)}`);
      errorCount += 1;
    }
  }
}

if (errorCount || (failOnWarnings && warningCount)) {
  console.error(`\nFAIL ${errorCount} error(s), ${warningCount} warning(s)`);
  process.exit(1);
}

console.log(`\nPASS 0 errors, ${warningCount} warning(s)`);
