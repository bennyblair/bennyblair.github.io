import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
};

const repoRoot = process.cwd();
const indexingPath = arg("--indexing", "");
const performancePath = arg("--performance", "");
const registryPath = arg("--registry", path.join(repoRoot, "data", "seo-page-registry.json"));
const sitemapPath = arg("--sitemap", path.join(repoRoot, "dist", "sitemap.xml"));
const outputDir = arg("--output-dir", path.join(repoRoot, "audits", "seo-control-plane"));
const asOf = arg("--as-of", "2026-09-20");

if (!indexingPath || !performancePath) {
  throw new Error("Pass --indexing and --performance evidence files.");
}

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const cleanPath = (value) => {
  const cleaned = String(value || "").split(/[\r\n]/, 1)[0].trim();
  if (!cleaned) return "";
  try {
    const url = new URL(cleaned, "https://emetcapital.com.au");
    return (url.pathname.replace(/\/+$/, "") || "/");
  } catch {
    return cleaned.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
  }
};
const number = (value) => Number(String(value || "0").replace(/,/g, "")) || 0;
const csv = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
const addDays = (date, days) => {
  const result = new Date(`${date}T00:00:00Z`);
  result.setUTCDate(result.getUTCDate() + days);
  return result.toISOString().slice(0, 10);
};

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["node_modules", "dist", ".git"].includes(entry.name)) continue;
    const resolved = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(resolved));
    else if (/\.(?:tsx?|jsx?|md|mdx|html)$/i.test(entry.name)) files.push(resolved);
  }
  return files;
}

const registry = readJson(registryPath);
const pageByPath = new Map((registry.pages || []).map((page) => [page.path, page]));
const indexing = readJson(indexingPath);
const performance = readJson(performancePath);
const sitemap = fs.readFileSync(sitemapPath, "utf8");
const sitemapPaths = new Set([...sitemap.matchAll(/<loc>https:\/\/emetcapital\.com\.au([^<]*)<\/loc>/g)].map((match) => cleanPath(match[1])));
const sourceFiles = walk(path.join(repoRoot, "src"));
const sourceText = sourceFiles.map((file) => ({ file: path.relative(repoRoot, file).replace(/\\/g, "/"), text: fs.readFileSync(file, "utf8") }));

const performanceByPath = new Map();
for (const row of performance?.tables?.pages || []) {
  const parts = String(row.text || "").split(/\t+/).map((part) => part.trim()).filter(Boolean);
  if (!/^https?:\/\//i.test(parts[0] || "") || parts.length < 3) continue;
  const route = cleanPath(parts[0]);
  const current = performanceByPath.get(route) || { clicks: 0, impressions: 0 };
  current.clicks += number(parts.at(-2));
  current.impressions += number(parts.at(-1));
  performanceByPath.set(route, current);
}

const rows = [];
for (const [gscStatus, group] of Object.entries(indexing)) {
  for (const evidenceRow of group.rows || []) {
    if (!Array.isArray(evidenceRow) || !evidenceRow[0]) continue;
    const route = cleanPath(evidenceRow[0]);
    const patternDestination = route.startsWith("/tools/") ? `/resources${route}` : "";
    const patternDestinationPage = patternDestination ? pageByPath.get(patternDestination) : null;
    const page = pageByPath.get(route) || (patternDestinationPage
      ? {
          ...patternDestinationPage,
          path: route,
          pageType: "redirect",
          indexability: "redirected",
          redirectToPath: patternDestination,
        }
      : null);
    const metric = performanceByPath.get(route) || null;
    const internalLinkSources = sourceText
      .filter(({ file, text }) => file !== page?.sourcePath && text.includes(route))
      .map(({ file }) => file);
    const lastChange = page?.lifecycle?.lastMaterialChangeAt?.slice(0, 10) || "unavailable";
    const registryReview = page?.lifecycle?.reviewAt?.slice(0, 10) || "";
    const destination = page?.redirectToPath || "";
    let action = "retain";
    let rationale = "Indexable URL remains within its evidence-collection window; exclusion alone does not justify removal.";
    let nextReview = registryReview || addDays(asOf, 28);

    if (!page) {
      action = "improve";
      rationale = "URL is absent from the current route registry; verify whether it is a stale URL and add a direct mapping if needed.";
      nextReview = addDays(asOf, 7);
    } else if (page.indexability === "redirected") {
      action = "merge";
      rationale = `Existing approved consolidation is retained as a direct permanent redirect to ${destination}.`;
      nextReview = addDays(asOf, 90);
    } else if (page.indexability === "noindex") {
      action = "retain with noindex";
      rationale = "The page remains useful to visitors but has no separate search mission under the current registry decision.";
      nextReview = registryReview || addDays(asOf, 90);
    } else if ((metric?.clicks || 0) > 0 || (metric?.impressions || 0) >= 100) {
      action = "improve";
      rationale = "Historical demand is meaningful; preserve the URL and improve query alignment, opening answer and internal links.";
      nextReview = addDays(asOf, 28);
    } else if (internalLinkSources.length === 0) {
      action = "improve";
      rationale = "No literal contextual internal-link source was found; add a relevant link rather than creating another overlapping page.";
      nextReview = addDays(asOf, 28);
    } else if (page.pageType === "location") {
      rationale = "Distinct city/service route is retained for observation; city pages are not deindexed solely because GSC excludes them.";
      nextReview = registryReview || addDays(asOf, 56);
    } else if (gscStatus.startsWith("Discovered")) {
      rationale = "Discovered URL remains in the sitemap and linked portfolio; allow a full observation period before a material decision.";
      nextReview = registryReview || addDays(asOf, 28);
    }

    rows.push({
      gscStatus,
      url: `https://emetcapital.com.au${route}`,
      path: route,
      lastGscDate: evidenceRow[1] || "unavailable",
      pageType: page?.pageType || "unregistered",
      currentIndexability: page?.indexability || "unregistered",
      inCurrentSitemap: sitemapPaths.has(route),
      lastMaterialChange: lastChange,
      registryReviewAt: registryReview || "unavailable",
      internalLinkSourceCount: internalLinkSources.length,
      sampleInternalLinkSources: internalLinkSources.slice(0, 3).join("; ") || "none found",
      sixMonthClicks: metric ? metric.clicks : "unavailable",
      sixMonthImpressions: metric ? metric.impressions : "unavailable",
      action,
      destination,
      rationale,
      nextReview,
    });
  }
}

rows.sort((left, right) => left.gscStatus.localeCompare(right.gscStatus) || left.path.localeCompare(right.path));
const duplicatePaths = rows.filter((row, index) => rows.findIndex((candidate) => candidate.path === row.path) !== index);
if (rows.length !== 155 || duplicatePaths.length) {
  throw new Error(`Expected 155 unique excluded URLs; found ${rows.length} rows and ${duplicatePaths.length} duplicates.`);
}

const columns = Object.keys(rows[0]);
const csvText = [columns.map(csv).join(","), ...rows.map((row) => columns.map((column) => csv(row[column])).join(","))].join("\n") + "\n";
const counts = rows.reduce((result, row) => {
  result[row.action] = (result[row.action] || 0) + 1;
  return result;
}, {});
const statusCounts = rows.reduce((result, row) => {
  result[row.gscStatus] = (result[row.gscStatus] || 0) + 1;
  return result;
}, {});
const markdown = [
  `# GSC excluded-URL action register — ${asOf}`,
  "",
  `Evidence captured ${indexingPath.endsWith(".json") ? path.basename(indexingPath) : indexingPath}; performance context from ${path.basename(performancePath)}; registry checksum \`${registry.checksum}\`.`,
  "",
  "## Coverage",
  "",
  `- ${rows.length} unique URLs reviewed: ${statusCounts["Crawled - currently not indexed"] || 0} crawled-not-indexed and ${statusCounts["Discovered - currently not indexed"] || 0} discovered-not-indexed.`,
  `- Actions: ${Object.entries(counts).map(([name, count]) => `${name} ${count}`).join(", ")}.`,
  "- Every row records the current sitemap state, registry decision, page type, observation dates, internal-link evidence, available six-month GSC page evidence, rationale and next review date.",
  "",
  "## Decision boundary",
  "",
  "- An excluded status alone does not authorise deletion, consolidation or noindex.",
  "- `merge` appears only where the current registry already records an approved consolidation and a named one-hop destination.",
  "- `retain with noindex` appears only where the registry already records noindex; this audit creates no new noindex decisions.",
  "- City pages remain indexable and are retained or improved; none are blanket-deindexed.",
  "- Missing GSC page rows are recorded as unavailable, never as zero.",
  "",
  "## File",
  "",
  `The complete URL-level register is in \`indexation-action-register-${asOf}.csv\`.`,
  "",
  `New consolidation releases must also carry a dated \`consolidation-map-${asOf}.csv\` with one-hop destinations and a rollback baseline.`,
  "",
].join("\n");

fs.mkdirSync(outputDir, { recursive: true });
const csvPath = path.join(outputDir, `indexation-action-register-${asOf}.csv`);
const markdownPath = path.join(outputDir, `indexation-action-register-${asOf}.md`);
fs.writeFileSync(csvPath, csvText);
fs.writeFileSync(markdownPath, markdown);
console.log(JSON.stringify({ rows: rows.length, counts, csvPath, markdownPath }, null, 2));
