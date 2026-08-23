import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { validateArticlePublicationContract } from "./lib/article-publication-contract.mjs";

const repoRoot = process.cwd();
const guidesDir = path.join(repoRoot, "src", "content", "guides");
const allowedAuthors = {
  Ben: { title: "Commercial Finance Broker, Emet Capital", url: "/about/ben" },
  Daniel: { title: "Director, Emet Capital", url: "/about/daniel" },
};

const args = process.argv.slice(2);
const fileArgs = [];
let previewBase = "";
let failOnWarnings = false;

for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];
  if (argument === "--preview-base") {
    previewBase = args[index + 1] || "";
    index += 1;
  } else if (argument === "--fail-on-warnings") {
    failOnWarnings = true;
  } else {
    fileArgs.push(argument);
  }
}

if (!fileArgs.length) {
  console.error(
    "Usage: npm run qa:article -- <article.md...> [--preview-base <url>] [--fail-on-warnings]",
  );
  process.exit(1);
}

const allGuideSlugs = new Set(
  fs
    .readdirSync(guidesDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, "")),
);

function articleRoute(filePath) {
  const relative = path.relative(repoRoot, filePath).replaceAll("\\", "/");
  const slug = path.basename(filePath, ".md");
  return relative.startsWith("src/content/case-studies/")
    ? `/resources/case-studies/${slug}`
    : `/resources/guides/${slug}`;
}

function section(content, heading) {
  const lines = content.split("\n");
  const start = lines.findIndex((line) => line.trim() === `## ${heading}` || line.trim() === `### ${heading}`);
  if (start < 0) return "";

  const collected = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^#{2,3}\s+/.test(lines[index])) break;
    collected.push(lines[index]);
  }
  return collected.join("\n").trim();
}

function sectionGuideSlugs(content) {
  return [...content.matchAll(/\]\(\/resources\/guides\/([^)#\s]+)(?:#[^)\s]*)?\)/g)].map(
    (match) => match[1],
  );
}

function validateAuthor(data) {
  const errors = [];
  const authorName = String(data.author_name || data.authorName || "");
  const expected = allowedAuthors[authorName];
  if (!expected) return ['author_name must be exactly "Ben" or "Daniel"'];

  if (data.author !== authorName) errors.push("author must match author_name");
  if ((data.author_title || data.authorTitle) !== expected.title) {
    errors.push(`author_title must be "${expected.title}"`);
  }
  if ((data.author_url || data.authorUrl) !== expected.url) {
    errors.push(`author_url must be "${expected.url}"`);
  }
  if (!String(data.author_bio || data.authorBio || "").includes("10 years' experience")) {
    errors.push("author_bio must include the confirmed 10-year experience signal");
  }
  const authorLinks = data.author_links || data.authorLinks;
  if (!Array.isArray(authorLinks) || !authorLinks.some((link) => link?.url === expected.url)) {
    errors.push(`author_links must include ${expected.url}`);
  }
  if (!(data.reviewed_date || data.reviewedDate || data.reviewedAt)) {
    errors.push("reviewed_date is required");
  }
  return errors;
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
  const isGuide = relative.startsWith("src/content/guides/");

  const contractErrors = validateArticlePublicationContract({
    data: parsed.data,
    body: parsed.content,
    imageExists: (featuredImage) =>
      fs.existsSync(path.join(repoRoot, "public", featuredImage.replace(/^\/+/, ""))),
  });
  for (const error of contractErrors) console.error(`ERROR ${error}`);
  errorCount += contractErrors.length;

  const guideLinks = [...raw.matchAll(/\]\(\/resources\/guides\/([^)#\s]+)(?:#[^)\s]*)?\)/g)].map(
    (match) => match[1],
  );
  const missingGuides = [...new Set(guideLinks.filter((slug) => !allGuideSlugs.has(slug)))];
  for (const slug of missingGuides) console.error(`ERROR missing guide target: ${slug}`);
  errorCount += missingGuides.length;
  if (!missingGuides.length) console.log(`OK ${guideLinks.length} internal guide links resolve`);

  if (isGuide) {
    const topSlugs = sectionGuideSlugs(section(parsed.content, "Related In-Depth Guides"));
    const bottomSlugs = sectionGuideSlugs(section(parsed.content, "Related Guides"));
    if (
      topSlugs.length &&
      bottomSlugs.length &&
      topSlugs.length === bottomSlugs.length &&
      topSlugs.every((slug, index) => slug === bottomSlugs[index])
    ) {
      console.warn("WARN top and bottom related-guide lists are identical");
      warningCount += 1;
    }
  }

  const authorErrors = validateAuthor(parsed.data);
  for (const error of authorErrors) console.error(`ERROR ${error}`);
  errorCount += authorErrors.length;
  if (!authorErrors.length) console.log("OK author and review fields are complete");

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
