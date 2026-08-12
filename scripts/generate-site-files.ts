import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import {
  DOMAIN,
  canonicalUrl,
  getIndexableStaticRoutes,
  isRedirectSource,
  redirectRules,
} from "../src/config/site-route-manifest";
import { buildContentIndex } from "./lib/content-index.mjs";

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, "dist");

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

let lastModifiedBySource: Map<string, string> | null = null;

function loadLastModifiedBySource() {
  const dates = new Map<string, string>();

  try {
    const output = execFileSync(
      "git",
      ["log", "--format=@@DATE@@%cs", "--name-only", "--no-renames", "--", "src"],
      {
        cwd: repoRoot,
        encoding: "utf8",
        maxBuffer: 20 * 1024 * 1024,
        stdio: ["ignore", "pipe", "ignore"],
      },
    );
    let currentDate = "";

    for (const rawLine of output.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (line.startsWith("@@DATE@@")) {
        currentDate = line.slice("@@DATE@@".length);
        continue;
      }
      if (!line || !currentDate) continue;

      const sourcePath = line.replaceAll("\\", "/");
      if (!dates.has(sourcePath)) dates.set(sourcePath, currentDate);
    }
  } catch {
    // Individual filesystem timestamps remain available as a fallback.
  }

  return dates;
}

function gitLastModified(sourcePath: string) {
  lastModifiedBySource ??= loadLastModifiedBySource();
  const normalizedSource = sourcePath.replaceAll("\\", "/");
  const committedDate = lastModifiedBySource.get(normalizedSource);
  if (committedDate) return committedDate;

  try {
    const modified = fs.statSync(path.join(repoRoot, sourcePath)).mtime;
    return modified.toISOString().slice(0, 10);
  } catch {
    return "2025-01-01";
  }
}

function buildRouteInventory() {
  const contentIndex = buildContentIndex(repoRoot);
  const fixed = getIndexableStaticRoutes().map((route) => ({
    path: route.path,
    canonical: canonicalUrl(route.path),
    pageType: route.pageType,
    sourcePath: route.source,
    lastmod: gitLastModified(route.source),
    changefreq: route.changefreq ?? "monthly",
    priority: route.priority ?? 0.6,
  }));
  const guides = (contentIndex.guides ?? [])
    .filter((article) => !article.noindex && !isRedirectSource(article.route))
    .map((article) => ({
      path: article.route,
      canonical: canonicalUrl(article.route),
      pageType: "guide",
      sourcePath: article.sourcePath,
      lastmod: gitLastModified(article.sourcePath),
      changefreq: "monthly",
      priority: 0.6,
    }));
  const caseStudies = (contentIndex["case-studies"] ?? [])
    .filter((article) => !article.noindex && !isRedirectSource(article.route))
    .map((article) => ({
      path: article.route,
      canonical: canonicalUrl(article.route),
      pageType: "case-study",
      sourcePath: article.sourcePath,
      lastmod: gitLastModified(article.sourcePath),
      changefreq: "monthly",
      priority: 0.6,
    }));

  return [...fixed, ...guides, ...caseStudies].sort((a, b) => a.path.localeCompare(b.path));
}

function renderSitemap(routes: ReturnType<typeof buildRouteInventory>) {
  const items = routes
    .map(
      (route) => `  <url>
    <loc>${xmlEscape(route.canonical)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`;
}

function renderRedirects() {
  const seen = new Set<string>();
  const lines: string[] = [];

  for (const rule of redirectRules) {
    const signature = `${rule.from}|${rule.to}|${rule.status}`;
    if (seen.has(signature)) continue;
    seen.add(signature);
    if (rule.from === rule.to) {
      throw new Error(`Self-referencing redirect is not allowed: ${rule.from}`);
    }
    lines.push(`${rule.from} ${rule.to} ${rule.status}${rule.force ? "!" : ""}`);
  }

  return `${lines.join("\n")}\n`;
}

function renderLlmsTxt() {
  const primaryPages = [
    ["/services/business-finance", "Business finance"],
    ["/services/commercial-property-finance", "Commercial property finance"],
    ["/services/commercial-property-development", "Property development finance"],
    ["/services/caveat-loans", "Caveat loans"],
    ["/services/bridging-finance", "Bridging finance"],
    ["/services/equipment-finance", "Equipment finance"],
    ["/services/first-second-mortgages", "First and second mortgages"],
    ["/services/private-lending", "Private lending"],
    ["/services/refinancing-solutions", "Commercial refinancing"],
    ["/services/smsf-lending", "SMSF commercial property lending"],
    ["/resources/case-studies", "Property finance case studies"],
    ["/resources/tools/commercial-property-loan-calculator", "Commercial property loan calculator"],
    ["/resources/tools/loan-comparison-tool", "Business loan comparison tool"],
    ["/editorial-standards", "Editorial standards"],
    ["/about", "About Emet Capital"],
  ];
  const decisionGuides = [
    [
      "/resources/guides/commercial-property-loans-australia-complete-guide",
      "Commercial property loans Australia guide",
    ],
    ["/resources/guides/what-is-a-second-mortgage", "Second mortgage explainer"],
    [
      "/resources/guides/what-is-private-lending-australia",
      "Private lending Australia explainer",
    ],
    [
      "/resources/guides/business-lenders-australia-comparison-broker-commentary",
      "Business lenders Australia comparison",
    ],
    ["/resources/guides/caveat-loans-australia-complete-guide", "Caveat loans Australia guide"],
    ["/resources/guides/urgent-caveat-loans", "Urgent caveat loan readiness guide"],
    [
      "/resources/guides/caveat-lenders-australia-directory-comparison",
      "Caveat lender types and comparison",
    ],
    [
      "/resources/guides/bridging-finance-australia-complete-property-guide",
      "Commercial bridging finance Australia guide",
    ],
    [
      "/resources/guides/best-bridging-loan-lenders-companies-2025",
      "Commercial bridging lender comparison guide",
    ],
    [
      "/resources/guides/short-term-property-loans-when-you-need-fast-finance",
      "Short-term property loan decision guide",
    ],
    [
      "/resources/guides/equipment-finance-and-leasing-australia",
      "Equipment finance and leasing Australia guide",
    ],
  ];

  return `# Emet Capital
> Emet Capital is an Australian commercial finance brokerage helping business owners, property investors and developers compare property-backed and commercial funding options. Emet Capital is a broker, not a bank or direct lender. Content is general information only and is not personal financial, credit, legal or tax advice.

## Primary audience
- Australian commercial property borrowers
- Property developers and investors
- SME owners and directors using commercial property as security

## Core property-finance journeys
${primaryPages.map(([route, label]) => `- [${label}](${canonicalUrl(route)})`).join("\n")}

## Priority decision guides
${decisionGuides.map(([route, label]) => `- [${label}](${canonicalUrl(route)})`).join("\n")}

## Entity and trust
- Legal name: Emet Capital Pty Ltd
- Market: Australia
- Website: ${DOMAIN}/
- Editorial policy: ${DOMAIN}/editorial-standards
- Complaints process: ${DOMAIN}/complaints-process

## Crawling
- Canonical sitemap: ${DOMAIN}/sitemap.xml
- Robots policy: ${DOMAIN}/robots.txt
`;
}

if (!fs.existsSync(distDir)) {
  throw new Error("dist/ is missing. Run the Vite build before generating site files.");
}

const inventory = buildRouteInventory();
fs.writeFileSync(path.join(distDir, "sitemap.xml"), renderSitemap(inventory));
fs.writeFileSync(path.join(distDir, "_redirects"), renderRedirects());
fs.writeFileSync(path.join(distDir, "llms.txt"), renderLlmsTxt());
fs.writeFileSync(path.join(distDir, "site-route-manifest.json"), `${JSON.stringify(inventory, null, 2)}\n`);

console.log(`Generated sitemap, redirects, llms.txt and route inventory for ${inventory.length} canonical URLs.`);
