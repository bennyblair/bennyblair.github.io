import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { buildContentIndex } from "./lib/content-index.mjs";
import {
  DOMAIN,
  canonicalUrl,
  getIndexableStaticRoutes,
  isRedirectSource,
} from "../src/config/site-route-manifest";

type CsvRow = Record<string, string>;
type Metrics = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  sessions: number;
  engagedSessions: number;
  conversions: number;
};
type DocumentInfo = {
  path: string;
  intent: string;
  text: string;
  shingles: Set<string>;
};

const repoRoot = process.cwd();
const rawDir = path.join(repoRoot, "data", "analytics", "raw");
const outputDir = path.join(repoRoot, "data", "analytics", "derived");
const requiredFiles = {
  pages: path.join(rawDir, "search-console-pages.csv"),
  queries: path.join(rawDir, "search-console-queries.csv"),
  landingPages: path.join(rawDir, "ga4-landing-pages.csv"),
};

function parseCsv(source: string): CsvRow[] {
  const records: string[][] = [];
  let record: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === '"' && source[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        value += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      record.push(value);
      value = "";
    } else if (char === "\n") {
      record.push(value.replace(/\r$/, ""));
      records.push(record);
      record = [];
      value = "";
    } else {
      value += char;
    }
  }
  if (value || record.length) {
    record.push(value.replace(/\r$/, ""));
    records.push(record);
  }

  const headers = (records.shift() ?? []).map((header) =>
    header.replace(/^\uFEFF/, "").trim(),
  );
  return records
    .filter((row) => row.some((cell) => cell.trim()))
    .map((row) =>
      Object.fromEntries(headers.map((header, index) => [header, row[index]?.trim() ?? ""])),
    );
}

function readCsv(filePath: string, required = true) {
  if (!fs.existsSync(filePath)) {
    if (required) throw new Error(`Missing analytics export: ${path.relative(repoRoot, filePath)}`);
    return [];
  }
  return parseCsv(fs.readFileSync(filePath, "utf8"));
}

function field(row: CsvRow, names: string[]) {
  const key = Object.keys(row).find((candidate) =>
    names.some((name) => candidate.toLowerCase() === name.toLowerCase()),
  );
  return key ? row[key] : "";
}

function numeric(value: string) {
  const result = Number(value.replace(/[,%\s]/g, ""));
  return Number.isFinite(result) ? result : 0;
}

function ratio(value: string) {
  const result = numeric(value);
  return value.includes("%") || result > 1 ? result / 100 : result;
}

function urlPath(value: string) {
  if (!value || value === "(not set)") return "";
  try {
    const pathname = new URL(value, DOMAIN).pathname.replace(/\/+$/, "") || "/";
    return pathname;
  } catch {
    return "";
  }
}

function words(value: string) {
  return value
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function shingles(value: string, size = 3) {
  const tokens = words(value);
  const result = new Set<string>();
  for (let index = 0; index <= tokens.length - size; index += 1) {
    result.add(tokens.slice(index, index + size).join(" "));
  }
  return result;
}

function similarity(left: Set<string>, right: Set<string>) {
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const item of left) if (right.has(item)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

function csvCell(value: unknown) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filePath: string, rows: Record<string, unknown>[]) {
  const headers = Object.keys(rows[0] ?? {});
  const output = [
    headers.map(csvCell).join(","),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(",")),
  ].join("\n");
  fs.writeFileSync(filePath, `${output}\n`, "utf8");
}

function intentForPageType(pageType: string) {
  if (pageType === "tool") return "transactional";
  if (pageType === "service" || pageType === "location" || pageType === "home") {
    return "commercial investigation";
  }
  if (pageType === "company" || pageType === "legal") return "navigational";
  return "informational";
}

function getInventory() {
  const content = buildContentIndex(repoRoot);
  const staticRoutes = getIndexableStaticRoutes().map((route) => ({
    path: route.path,
    pageType: route.pageType,
  }));
  const articles = [...(content.guides ?? []), ...(content["case-studies"] ?? [])]
    .filter((article) => !isRedirectSource(article.route))
    .map((article) => ({ path: article.route, pageType: article.contentType }));
  return [...staticRoutes, ...articles].sort((left, right) => left.path.localeCompare(right.path));
}

function getDocuments() {
  const content = buildContentIndex(repoRoot);
  const articles = [...(content.guides ?? []), ...(content["case-studies"] ?? [])];
  return articles.map((article): DocumentInfo => {
    const parsed = matter(fs.readFileSync(path.join(repoRoot, article.sourcePath), "utf8"));
    const intent = article.searchIntent || (article.contentType === "case-studies" ? "case study" : "informational");
    const text = `${article.title}\n${article.description}\n${parsed.content}`;
    return { path: article.route, intent, text, shingles: shingles(text) };
  });
}

for (const filePath of Object.values(requiredFiles)) {
  if (!fs.existsSync(filePath)) {
    console.error(`Missing ${path.relative(repoRoot, filePath)}.`);
    console.error("See data/analytics/README.md for export instructions.");
    process.exit(1);
  }
}

const searchPages = readCsv(requiredFiles.pages);
const searchQueries = readCsv(requiredFiles.queries);
const landingPages = readCsv(requiredFiles.landingPages);
const inventory = getInventory();
const documents = getDocuments();
const documentByPath = new Map(documents.map((document) => [document.path, document]));
const metrics = new Map<string, Metrics>();

function pageMetrics(pagePath: string) {
  const existing = metrics.get(pagePath);
  if (existing) return existing;
  const created: Metrics = {
    clicks: 0,
    impressions: 0,
    ctr: 0,
    position: 0,
    sessions: 0,
    engagedSessions: 0,
    conversions: 0,
  };
  metrics.set(pagePath, created);
  return created;
}

for (const row of searchPages) {
  const pagePath = urlPath(field(row, ["page", "url"]));
  if (!pagePath) continue;
  const item = pageMetrics(pagePath);
  item.clicks += numeric(field(row, ["clicks"]));
  item.impressions += numeric(field(row, ["impressions"]));
  item.ctr = ratio(field(row, ["ctr"]));
  item.position = numeric(field(row, ["position", "average position"]));
}

for (const row of landingPages) {
  const pagePath = urlPath(
    field(row, ["landingPage", "landing page", "Landing page + query string"]),
  );
  if (!pagePath) continue;
  const item = pageMetrics(pagePath);
  item.sessions += numeric(field(row, ["sessions"]));
  item.engagedSessions += numeric(field(row, ["engagedSessions", "engaged sessions"]));
  item.conversions += numeric(field(row, ["conversions", "key events", "keyEvents"]));
}

const classifications = inventory.map((route) => {
  const item = pageMetrics(route.path);
  const document = documentByPath.get(route.path);
  let candidatePath = "";
  let candidateSimilarity = 0;

  if (document && item.clicks === 0 && item.impressions < 50 && item.conversions === 0) {
    for (const candidate of documents) {
      if (candidate.path === route.path || candidate.intent !== document.intent) continue;
      const candidateMetrics = pageMetrics(candidate.path);
      const stronger =
        candidateMetrics.conversions > item.conversions ||
        candidateMetrics.clicks > item.clicks ||
        candidateMetrics.impressions > item.impressions;
      if (!stronger) continue;
      const score = similarity(document.shingles, candidate.shingles);
      if (score > candidateSimilarity) {
        candidateSimilarity = score;
        candidatePath = candidate.path;
      }
    }
  }

  let classification = "Retain for testing";
  let reason = "Unique or insufficient evidence; preserve the URL while collecting data.";
  if (
    item.conversions > 0 ||
    item.clicks >= 5 ||
    (item.impressions >= 100 && item.position > 0 && item.position <= 20)
  ) {
    classification = "Protect";
    reason = "Conversion, meaningful click volume, or established ranking evidence.";
  } else if (
    item.clicks === 0 &&
    item.impressions < 50 &&
    item.conversions === 0 &&
    candidateSimilarity >= 0.75
  ) {
    classification = "Consolidate candidate";
    reason = "Low evidence plus at least 75% similarity to a stronger same-intent URL; human confirmation required.";
  } else if (item.impressions >= 50) {
    classification = "Improve";
    reason =
      item.ctr < 0.02
        ? "Receives impressions but has weak click-through."
        : "Receives impressions but lacks protect-level ranking or conversion evidence.";
  }

  return {
    path: route.path,
    canonical: canonicalUrl(route.path),
    pageType: route.pageType,
    classification,
    reason,
    clicks: item.clicks,
    impressions: item.impressions,
    ctr: Number(item.ctr.toFixed(4)),
    position: Number(item.position.toFixed(2)),
    sessions: item.sessions,
    engagedSessions: item.engagedSessions,
    conversions: item.conversions,
    suggestedDestination: candidateSimilarity >= 0.75 ? candidatePath : "",
    similarity: candidateSimilarity ? Number(candidateSimilarity.toFixed(4)) : "",
  };
});

const brandPattern = /\bemet(?:\s+capital)?\b/i;
const propertyPattern =
  /\b(?:commercial property|property finance|development finance|bridging finance|first mortgage|second mortgage|refinanc|release equity)\b/i;
const queryRows = searchQueries.map((row) => ({
  query: field(row, ["query", "top queries"]),
  clicks: numeric(field(row, ["clicks"])),
  impressions: numeric(field(row, ["impressions"])),
}));
const totalClicks = queryRows.reduce((sum, row) => sum + row.clicks, 0);
const nonBrandClicks = queryRows
  .filter((row) => !brandPattern.test(row.query))
  .reduce((sum, row) => sum + row.clicks, 0);
const propertyQueries = queryRows.filter((row) => propertyPattern.test(row.query));
const indexingRows = readCsv(path.join(rawDir, "search-console-indexing.csv"), false);
const cwvRows = readCsv(path.join(rawDir, "core-web-vitals.csv"), false);
const indexedCount = indexingRows.filter((row) => /\bindexed\b/i.test(field(row, ["status"]))).length;

const baseline = {
  generatedAt: new Date().toISOString(),
  periods: {
    searchConsole: "16 complete months supplied by operator",
    ga4: "12 complete months supplied by operator",
  },
  routeManifestIndexableUrls: inventory.length,
  searchConsoleObservedPages: new Set(
    searchPages.map((row) => urlPath(field(row, ["page", "url"]))).filter(Boolean),
  ).size,
  indexedPages: indexingRows.length ? indexedCount : null,
  organicClicks: totalClicks,
  nonBrandClicks,
  propertyFinanceQueryCoverage: {
    queriesWithImpressions: propertyQueries.filter((row) => row.impressions > 0).length,
    impressions: propertyQueries.reduce((sum, row) => sum + row.impressions, 0),
    clicks: propertyQueries.reduce((sum, row) => sum + row.clicks, 0),
  },
  coreWebVitals: cwvRows.length
    ? {
        urlsMeasured: new Set(cwvRows.map((row) => urlPath(field(row, ["url"]))).filter(Boolean)).size,
        mobilePoorUrls: cwvRows.filter(
          (row) =>
            field(row, ["device"]).toLowerCase() === "mobile" &&
            field(row, ["status"]).toLowerCase() === "poor",
        ).length,
      }
    : null,
  unavailableEvidence: [
    ...(indexingRows.length ? [] : ["search-console-indexing.csv"]),
    ...(cwvRows.length ? [] : ["core-web-vitals.csv"]),
  ],
  classificationCounts: Object.fromEntries(
    [...new Set(classifications.map((row) => row.classification))].map((classification) => [
      classification,
      classifications.filter((row) => row.classification === classification).length,
    ]),
  ),
};

fs.mkdirSync(outputDir, { recursive: true });
writeCsv(path.join(outputDir, "url-classification.csv"), classifications);
fs.writeFileSync(
  path.join(outputDir, "baseline.json"),
  `${JSON.stringify(baseline, null, 2)}\n`,
  "utf8",
);
console.log(`Classified ${classifications.length} indexable URLs.`);
console.log(`Wrote ${path.relative(repoRoot, outputDir)}.`);
