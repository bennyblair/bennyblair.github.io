import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_TYPES = {
  guides: "guides",
  "case-studies": "case-studies",
  insights: "insights",
};

function asString(value, fallback = "") {
  if (value === null || value === undefined) return fallback;
  return String(value);
}

function asStringArray(value) {
  if (Array.isArray(value)) return value.map((item) => String(item));
  if (!value) return [];
  return [String(value)];
}

function asSourceArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((source) => {
      if (typeof source === "string") return { label: source, url: source };
      if (!source || typeof source !== "object") return null;
      return {
        label: asString(source.label || source.title || source.url),
        url: asString(source.url),
      };
    })
    .filter(Boolean);
}

export function normalizeArticleData(contentType, slug, data, body = "") {
  const dateValue = data.date instanceof Date ? data.date.toISOString() : asString(data.date);
  const reviewedValue = data.reviewedAt || data.reviewed_at || data.reviewedDate || data.reviewed_date;
  const lastVerifiedValue = data.lastVerified || data.last_verified;

  return {
    slug,
    contentType,
    route:
      contentType === "case-studies"
        ? `/resources/case-studies/${slug}`
        : contentType === "insights"
          ? `/resources/insights/${slug}`
          : `/resources/guides/${slug}`,
    title: asString(data.title, slug),
    date: dateValue || "1970-01-01",
    description: asString(data.description),
    category: asString(data.category, contentType === "case-studies" ? "Case Studies" : "Guides"),
    tags: asStringArray(data.tags),
    author: asString(data.author, "Emet Capital"),
    authorName: asString(data.author_name || data.authorName),
    authorTitle: asString(data.author_title || data.authorTitle),
    authorBio: asString(data.author_bio || data.authorBio),
    authorUrl: asString(data.author_url || data.authorUrl),
    authorLinks: Array.isArray(data.author_links || data.authorLinks)
      ? data.author_links || data.authorLinks
      : [],
    reviewedBy: asString(data.reviewedBy || data.reviewed_by),
    reviewedAt:
      reviewedValue instanceof Date ? reviewedValue.toISOString() : asString(reviewedValue),
    reviewedDate:
      reviewedValue instanceof Date ? reviewedValue.toISOString() : asString(reviewedValue),
    lastVerified:
      lastVerifiedValue instanceof Date ? lastVerifiedValue.toISOString() : asString(lastVerifiedValue),
    readingTime: Number(data.readingTime || data.reading_time || Math.max(1, Math.ceil(body.split(/\s+/).length / 220))),
    featuredImage: asString(data.featuredImage || data.featured_image),
    featured: Boolean(data.featured),
    loanAmount: asString(data.loanAmount || data.loan_amount),
    loanType: asString(data.loanType || data.loan_type),
    industry: asString(data.industry),
    duration: asString(data.duration),
    outcome: asString(data.outcome),
    challenge: asString(data.challenge),
    keywords: asStringArray(data.keywords || data.keyword),
    location: asString(data.location),
    propertyType: asString(data.propertyType || data.property_type),
    lvr: asString(data.lvr),
    quote: asString(data.quote),
    primaryQuery: asString(data.primaryQuery || data.primary_query),
    searchIntent: asString(data.searchIntent || data.search_intent),
    intentCluster: asString(data.intentCluster || data.intent_cluster),
    designatedServicePage: asString(data.designatedServicePage || data.designated_service_page),
    contentRisk: data.contentRisk === "high" || data.content_risk === "high" ? "high" : "low",
    sources: asSourceArray(data.sources),
    canonical: asString(data.canonical),
    noindex: Boolean(data.noindex),
    indexingReason: asString(data.indexingReason || data.indexing_reason),
    claimIds: asStringArray(data.claimIds || data.claim_ids),
    expiresAt: asString(data.expiresAt || data.expires_at),
  };
}

function readContentDirectory(repoRoot, contentType, directoryName) {
  const directory = path.join(repoRoot, "src", "content", directoryName);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => {
      const absolutePath = path.join(directory, entry.name);
      const raw = fs.readFileSync(absolutePath, "utf8");
      const { data, content } = matter(raw);
      const slug = entry.name.replace(/\.md$/, "");
      return {
        ...normalizeArticleData(contentType, slug, data, content),
        sourcePath: path.relative(repoRoot, absolutePath).replaceAll("\\", "/"),
      };
    })
    .filter((article) => article.title)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function buildContentIndex(repoRoot = process.cwd()) {
  return Object.fromEntries(
    Object.entries(CONTENT_TYPES).map(([contentType, directoryName]) => [
      contentType,
      readContentDirectory(repoRoot, contentType, directoryName),
    ]),
  );
}

export function parseArticleModule(id) {
  const cleanPath = id.split("?")[0];
  const normalized = cleanPath.replaceAll("\\", "/");
  const contentType = normalized.includes("/case-studies/")
    ? "case-studies"
    : normalized.includes("/insights/")
      ? "insights"
      : "guides";
  const slug = path.basename(cleanPath, ".md");
  const raw = fs.readFileSync(cleanPath, "utf8");
  const { data, content } = matter(raw);

  return {
    ...normalizeArticleData(contentType, slug, data, content),
    content,
  };
}
