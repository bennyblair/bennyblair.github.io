import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { DOMAIN, isRedirectSource } from "../src/config/site-route-manifest";
import { buildContentIndex } from "./lib/content-index.mjs";
import { resolveDesignatedService, seoTopicPolicy } from "./lib/seo-policy.mjs";

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, "dist");
const inventoryPath = path.join(distDir, "site-route-manifest.json");

interface RouteInventoryEntry {
  path: string;
  canonical: string;
  pageType: string;
}

function normalizeWhitespace(value: string) {
  return value.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

function routeFile(routePath: string) {
  return routePath === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, routePath.replace(/^\//, ""), "index.html");
}

function hrefs(html: string) {
  return [...html.matchAll(/<a\b[^>]*\bhref=["']([^"'#]+)(?:#[^"']*)?["'][^>]*>/gi)].map((match) => match[1]);
}

function mainFragment(html: string) {
  return html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] ?? "";
}

function resolveInternalHref(href: string, fromPath: string) {
  if (/^(?:mailto:|tel:|javascript:|data:)/i.test(href)) return null;
  const resolved = new URL(href, `${DOMAIN}${fromPath}`);
  if (resolved.origin !== DOMAIN) return null;
  return resolved.pathname.replace(/\/+$/, "") || "/";
}

if (!fs.existsSync(inventoryPath)) {
  throw new Error("Missing dist/site-route-manifest.json. Run generate-site-files first.");
}

const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8")) as RouteInventoryEntry[];
const canonicalPaths = new Set(inventory.map((route) => route.path));
const routeByPath = new Map(inventory.map((route) => [route.path, route]));
const canonicalOwners = new Map<string, string>();
const inbound = new Map(inventory.map((route) => [route.path, 0]));
const inboundSources = new Map(inventory.map((route) => [route.path, new Set<string>()]));
const outgoing = new Map(inventory.map((route) => [route.path, new Set<string>()]));
const errors: string[] = [];

for (const route of inventory) {
  const file = routeFile(route.path);
  if (!fs.existsSync(file)) {
    errors.push(`${route.path}: missing prerendered index.html`);
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const text = normalizeWhitespace(html);
  const titles = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)];
  const descriptions = [...html.matchAll(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/gi)];
  const canonicals = [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/gi)];
  const h1s = [...html.matchAll(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi)];
  const mains = [...html.matchAll(/<main\b/gi)];

  if (titles.length !== 1) errors.push(`${route.path}: expected one title, found ${titles.length}`);
  if (descriptions.length !== 1) errors.push(`${route.path}: expected one meta description, found ${descriptions.length}`);
  if (canonicals.length !== 1) errors.push(`${route.path}: expected one canonical, found ${canonicals.length}`);
  if (h1s.length !== 1) errors.push(`${route.path}: expected one H1, found ${h1s.length}`);
  if (mains.length !== 1) errors.push(`${route.path}: expected one main landmark, found ${mains.length}`);
  if (canonicals[0]?.[1] !== route.canonical) {
    errors.push(`${route.path}: canonical is "${canonicals[0]?.[1] ?? ""}", expected "${route.canonical}"`);
  }
  if (text.includes("setFormData(") || text.includes("console.log(") || text.includes("className=")) {
    errors.push(`${route.path}: source-code text leaked into rendered HTML`);
  }
  if (/(^|\s)(?:00K|00M|\.2m)(?:\s|$)/i.test(text)) {
    errors.push(`${route.path}: possible damaged currency text`);
  }

  const owner = canonicalOwners.get(route.canonical);
  if (owner) errors.push(`${route.path}: duplicate canonical also owned by ${owner}`);
  canonicalOwners.set(route.canonical, route.path);

  for (const schemaMatch of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const schema = JSON.parse(schemaMatch[1]);
      const schemas = Array.isArray(schema) ? schema : [schema];
      for (const item of schemas) {
        if (item?.["@type"] !== "FAQPage") continue;
        for (const question of item.mainEntity ?? []) {
          const name = normalizeWhitespace(String(question?.name ?? ""));
          if (name && !text.includes(name)) errors.push(`${route.path}: FAQ schema question is not visible: "${name}"`);
        }
      }
    } catch {
      errors.push(`${route.path}: invalid JSON-LD`);
    }
  }

  for (const href of hrefs(html)) {
    const target = resolveInternalHref(href, route.path);
    if (!target) continue;
    if (isRedirectSource(target)) {
      errors.push(`${route.path}: internal link points to redirect source ${target}`);
      continue;
    }
    if (canonicalPaths.has(target)) {
      inbound.set(target, (inbound.get(target) ?? 0) + 1);
      continue;
    }
    const assetPath = path.join(distDir, target.replace(/^\//, ""));
    if (!fs.existsSync(assetPath)) errors.push(`${route.path}: broken internal link ${target}`);
  }


  for (const href of hrefs(mainFragment(html))) {
    const target = resolveInternalHref(href, route.path);
    if (!target || !canonicalPaths.has(target)) continue;
    inboundSources.get(target)?.add(route.path);
    outgoing.get(route.path)?.add(target);
  }
}

const contentIndex = buildContentIndex(repoRoot);
const guideArticles = contentIndex.guides ?? [];
for (const article of guideArticles) {
  const service = resolveDesignatedService(article);
  if (!service) {
    errors.push(`${article.route}: no designated commercial service page could be resolved`);
    continue;
  }
  if (!outgoing.get(article.route)?.has(service.path)) {
    errors.push(`${article.route}: raw HTML does not link to designated service ${service.path}`);
  }
}

function newlyAddedGuideRoutes() {
  try {
    const output = execFileSync(
      "git",
      ["diff", "--name-only", "--diff-filter=A", "origin/main...HEAD", "--", "src/content/guides"],
      { cwd: repoRoot, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    );
    return new Set(
      output
        .split(/\r?\n/)
        .filter((file) => file.endsWith(".md"))
        .map((file) => `/resources/guides/${path.basename(file, ".md")}`),
    );
  } catch {
    return new Set<string>();
  }
}

for (const route of newlyAddedGuideRoutes()) {
  const sources = [...(inboundSources.get(route) ?? [])].filter((source) => {
    const pageType = routeByPath.get(source)?.pageType;
    return source !== route && (pageType === "guide" || pageType === "service");
  });
  if (sources.length < 2) {
    errors.push(`${route}: expected raw-HTML inbound links from two guide/service pages; found ${sources.length}`);
  }
}

const serviceLinkReport = seoTopicPolicy.serviceClusters.map((service) => {
  const sources = [...(inboundSources.get(service.path) ?? [])];
  const articleSources = sources.filter((source) => {
    const pageType = routeByPath.get(source)?.pageType;
    return pageType === "guide" || pageType === "case-study";
  });
  return {
    service: service.path,
    cluster: service.id,
    inboundSourcePages: sources.length,
    inboundArticlePages: articleSources.length,
    underlinked: articleSources.length < 3,
    sampleArticleSources: articleSources.slice(0, 10),
  };
});
fs.writeFileSync(
  path.join(distDir, "seo-internal-link-report.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), services: serviceLinkReport }, null, 2)}\n`,
);

for (const route of inventory) {
  if (route.path !== "/" && (inbound.get(route.path) ?? 0) === 0) {
    errors.push(`${route.path}: orphaned indexable page`);
  }
}

const sitemap = fs.readFileSync(path.join(distDir, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== inventory.length) {
  errors.push(`sitemap has ${sitemapUrls.length} URLs; route inventory has ${inventory.length}`);
}
for (const route of inventory) {
  if (!sitemapUrls.includes(route.canonical)) errors.push(`${route.path}: missing from sitemap`);
}

const redirects = fs.readFileSync(path.join(distDir, "_redirects"), "utf8");
if (!redirects.trim().endsWith("/* /404.html 404")) errors.push("_redirects: real 404 fallback must be last");

if (errors.length) {
  errors.slice(0, 200).forEach((error) => console.error(`ERROR ${error}`));
  if (errors.length > 200) console.error(`...and ${errors.length - 200} additional errors`);
  throw new Error(`Built-site verification failed with ${errors.length} error(s).`);
}

console.log(`Built-site verification passed for ${inventory.length} canonical routes.`);
