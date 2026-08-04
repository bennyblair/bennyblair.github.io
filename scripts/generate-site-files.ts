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

function gitLastModified(sourcePath: string) {
  try {
    const value = execFileSync("git", ["log", "-1", "--format=%cs", "--", sourcePath], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (value) return value;
  } catch {
    // Fall back to a deterministic repository timestamp below.
  }

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
    ["/services/commercial-property-finance", "Commercial property finance"],
    ["/services/commercial-property-development", "Property development finance"],
    ["/services/bridging-finance", "Bridging finance"],
    ["/services/first-second-mortgages", "First and second mortgages"],
    ["/services/private-lending", "Private lending"],
    ["/services/refinancing-solutions", "Commercial refinancing"],
    ["/services/smsf-lending", "SMSF commercial property lending"],
    ["/resources/case-studies", "Property finance case studies"],
    ["/resources/tools/commercial-property-loan-calculator", "Commercial property loan calculator"],
    ["/editorial-standards", "Editorial standards"],
    ["/about", "About Emet Capital"],
  ];

  return `# Emet Capital
> Emet Capital is an Australian commercial finance brokerage helping business owners, property investors and developers compare property-backed and commercial funding options. Emet Capital is a broker, not a bank or direct lender. Content is general information only and is not personal financial, credit, legal or tax advice.

## Primary audience
- Australian commercial property borrowers
- Property developers and investors
- SME owners and directors using commercial property as security

## Core property-finance journeys
${primaryPages.map(([route, label]) => `- [${label}](${canonicalUrl(route)})`).join("\n")}

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
