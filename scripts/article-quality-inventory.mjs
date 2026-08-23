import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { containsInternalEditorialLanguage, validateArticlePublicationContract } from "./lib/article-publication-contract.mjs";
import { readPublicImageInfo } from "./lib/image-metadata.mjs";

const repoRoot = process.cwd();
const guidesDir = path.join(repoRoot, "src", "content", "guides");
const reportDir = path.join(repoRoot, "reports", "article-quality");
const reportDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Australia/Sydney",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

function words(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((word) => word.length > 2);
}

function queryTokens(data) {
  return new Set(words(data.primaryQuery || data.primary_query || data.keywords?.[0] || data.title));
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const value of a) if (b.has(value)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

function latestGscRows() {
  const candidates = [
    path.join(repoRoot, "..", "reports", "seo-control-plane"),
    path.join(repoRoot, "reports", "seo-control-plane"),
  ].flatMap((directory) =>
    fs.existsSync(directory)
      ? fs.readdirSync(directory)
          .filter((file) => /^gsc-segmented-.*\.json$/.test(file))
          .map((file) => path.join(directory, file))
      : [],
  );
  const selected = candidates
    .map((file) => ({ file, mtime: fs.statSync(file).mtimeMs }))
    .sort((left, right) => right.mtime - left.mtime)[0]?.file;
  if (!selected) return { source: null, rows: new Map() };
  const data = JSON.parse(fs.readFileSync(selected, "utf8"));
  return {
    source: selected,
    rows: new Map((data.topPages || []).map((row) => [row.path, row])),
    window: data.performanceWindow,
  };
}

const gsc = latestGscRows();
const articles = fs.readdirSync(guidesDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const sourcePath = `src/content/guides/${file}`;
    const raw = fs.readFileSync(path.join(guidesDir, file), "utf8");
    const parsed = matter(raw);
    const slug = file.replace(/\.md$/, "");
    const route = `/resources/guides/${slug}`;
    const contract = validateArticlePublicationContract({
      data: parsed.data,
      body: parsed.content,
      imageInfo: (featuredImage) => readPublicImageInfo(repoRoot, featuredImage),
    });
    const headings = [...parsed.content.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((match) => ({ level: match[1].length, text: match[2].trim() }));
    const faqHeading = parsed.content.search(/^##\s+(?:Frequently Asked Questions|FAQs?)\s*$/im);
    const faqQuestions = faqHeading >= 0
      ? (parsed.content.slice(faqHeading).split(/\n##\s+/)[0].match(/^###\s+.+\?\s*$/gm) || []).length
      : 0;
    const publicLabels = containsInternalEditorialLanguage(`${parsed.data.title || ""}\n${parsed.data.description || ""}\n${parsed.content}`);
    const gscRow = gsc.rows.get(route) || {};
    const issues = {
      publicLabels,
      missingMetaTitle: !(parsed.data.metaTitle || parsed.data.meta_title),
      missingMetaDescription: !(parsed.data.metaDescription || parsed.data.meta_description),
      missingFeaturedImage: !(parsed.data.featuredImage || parsed.data.featured_image),
      missingImageAlt: !(parsed.data.featuredImageAlt || parsed.data.featured_image_alt),
      bodyH1: headings.some((heading) => heading.level === 1),
      legacyAuthorOverrides: ["author_name", "authorName", "author_title", "authorTitle", "author_url", "authorUrl", "author_bio", "authorBio", "author_links", "authorLinks"].some((field) => parsed.data[field] !== undefined),
      missingSources: !Array.isArray(parsed.data.sources) || parsed.data.sources.length === 0,
      multipleRelatedSections: (parsed.content.match(/^##\s+(?:Related Guides|Related Resources|Related Content|Further Reading)\s*$/gim) || []).length !== 1,
      contractErrors: contract.errors.length,
      contractWarnings: contract.warnings.length,
    };
    const issueCount = Object.entries(issues).filter(([key, value]) => key !== "contractErrors" && key !== "contractWarnings" && value === true).length;
    const impressions = Number(gscRow.impressions || 0);
    const position = Number(gscRow.position || 0);
    const demandScore = impressions * (position > 0 && position <= 20 ? 1.5 : 1) + (publicLabels ? 100 : 0);
    return {
      sourcePath,
      slug,
      route,
      title: parsed.data.title || slug,
      primaryQuery: parsed.data.primaryQuery || parsed.data.primary_query || parsed.data.keywords?.[0] || parsed.data.title || slug,
      queryTokens: queryTokens(parsed.data),
      wordCount: contract.metrics.wordCount,
      faqQuestions,
      qualityContractVersion: Number(parsed.data.qualityContractVersion || parsed.data.quality_contract_version || 0),
      issues,
      issueCount,
      contractErrors: contract.errors,
      contractWarnings: contract.warnings,
      gsc: {
        clicks: Number(gscRow.clicks || 0),
        impressions,
        ctr: Number(gscRow.ctr || 0),
        position,
        previousImpressions: Number(gscRow.prevImpressions || 0),
      },
      demandScore: Number(demandScore.toFixed(2)),
    };
  });

for (const article of articles) {
  let strongest = { route: "", score: 0 };
  for (const candidate of articles) {
    if (candidate.route === article.route) continue;
    const score = jaccard(article.queryTokens, candidate.queryTokens);
    if (score > strongest.score) strongest = { route: candidate.route, score };
  }
  article.intentOverlap = { route: strongest.route, score: Number(strongest.score.toFixed(3)) };
}
for (const article of articles) delete article.queryTokens;

const remediationQueue = articles
  .filter((article) => article.issueCount > 0)
  .sort((left, right) => right.demandScore - left.demandScore)
  .map((article, index) => ({
    priority: index + 1,
    wave: Math.floor(index / 10) + 1,
    route: article.route,
    sourcePath: article.sourcePath,
    demandScore: article.demandScore,
    impressions: article.gsc.impressions,
    position: article.gsc.position,
    publicLabels: article.issues.publicLabels,
    issueCount: article.issueCount,
    action: article.issues.publicLabels ? "remove public production language and complete reader review" : "complete quality-contract backfill on next substantive review",
  }));

const counts = {
  guides: articles.length,
  publicLabelLeaks: articles.filter((article) => article.issues.publicLabels).length,
  missingMetaTitle: articles.filter((article) => article.issues.missingMetaTitle).length,
  missingMetaDescription: articles.filter((article) => article.issues.missingMetaDescription).length,
  missingFeaturedImage: articles.filter((article) => article.issues.missingFeaturedImage).length,
  missingImageAlt: articles.filter((article) => article.issues.missingImageAlt).length,
  bodyH1: articles.filter((article) => article.issues.bodyH1).length,
  missingSources: articles.filter((article) => article.issues.missingSources).length,
  qualityContractV1: articles.filter((article) => article.qualityContractVersion === 1).length,
};

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  gscSource: gsc.source ? path.relative(repoRoot, gsc.source).replaceAll("\\", "/") : null,
  gscWindow: gsc.window || null,
  counts,
  remediationQueue,
  articles,
};

fs.mkdirSync(reportDir, { recursive: true });
const jsonPath = path.join(reportDir, `inventory-${reportDate}.json`);
const markdownPath = path.join(reportDir, `inventory-${reportDate}.md`);
fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
const top = remediationQueue.slice(0, 20);
const markdown = [
  `# Article Quality Inventory — ${reportDate}`,
  "",
  `Source cohort: ${counts.guides} guides. GSC source: ${report.gscSource || "unavailable"}.`,
  "",
  "## Portfolio counts",
  "",
  ...Object.entries(counts).map(([key, value]) => `- ${key}: ${value}`),
  "",
  "## Top demand-weighted remediation queue",
  "",
  "| Priority | Wave | Route | Impressions | Position | Public-label leak | Issues |",
  "|---:|---:|---|---:|---:|:---:|---:|",
  ...top.map((row) => `| ${row.priority} | ${row.wave} | ${row.route} | ${row.impressions} | ${row.position || "—"} | ${row.publicLabels ? "yes" : "no"} | ${row.issueCount} |`),
  "",
  "Age or a quality warning alone does not authorize redirect, consolidation, or noindex. Those actions require intent-overlap and complete GSC/indexing evidence.",
  "",
].join("\n");
fs.writeFileSync(markdownPath, markdown);
console.log(JSON.stringify({ jsonPath: path.relative(repoRoot, jsonPath), markdownPath: path.relative(repoRoot, markdownPath), counts }, null, 2));
