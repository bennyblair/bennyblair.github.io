import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";

const repoRoot = process.cwd();
const safeRepoRoot = repoRoot.replaceAll("\\", "/");
const base = (process.env.SEO_AUDIT_BASE || "https://emetcapital.com.au").replace(/\/$/, "");
const baseRef = process.env.CONTENT_RELEASE_BASE || "HEAD^";
const attempts = Number(process.env.CONTENT_RELEASE_AUDIT_ATTEMPTS || 8);
const delayMs = Number(process.env.CONTENT_RELEASE_AUDIT_DELAY_MS || 45_000);
const headers = { "user-agent": "Emet-SEO-Content-Release-Audit/1.0" };

function git(args: string[]) {
  return execFileSync("git", ["-c", `safe.directory=${safeRepoRoot}`, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
  }).trim();
}

function canonicalFrom(html: string) {
  for (const tag of html.match(/<link\b[^>]*>/gi) || []) {
    if (/\brel=["'][^"']*canonical/i.test(tag)) return tag.match(/\bhref=["']([^"']+)/i)?.[1] || null;
  }
  return null;
}

function robotsFrom(html: string) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    if (/\bname=["']robots["']/i.test(tag)) return tag.match(/\bcontent=["']([^"']+)/i)?.[1] || "";
  }
  return "";
}

function routeFor(file: string) {
  const match = file.match(/^src\/content\/(guides|case-studies|insights)\/([^/]+)\.md$/);
  if (!match) throw new Error(`Unsupported content path: ${file}`);
  return `/resources/${match[1]}/${match[2]}`;
}

async function fetchText(url: string) {
  try {
    const response = await fetch(url, { headers, redirect: "follow", signal: AbortSignal.timeout(20_000) });
    return { status: response.status, text: await response.text(), error: null };
  } catch (error) {
    return { status: 0, text: "", error: error instanceof Error ? error.message : String(error) };
  }
}

const files = git(["diff", "--diff-filter=A", "--name-only", baseRef, "HEAD"])
  .split(/\r?\n/)
  .filter((file) => /^src\/content\/(?:guides|case-studies|insights)\/[^/]+\.md$/.test(file));

if (!files.length) {
  console.log(JSON.stringify({ classification: "not_applicable", reason: "no new content files in release" }, null, 2));
  process.exit(0);
}
if (files.length !== 2) {
  console.log(JSON.stringify({ classification: "deterministic_content_defect", reason: `expected two new articles, found ${files.length}`, files }, null, 2));
  process.exit(10);
}

const expected = files.map((file) => {
  const source = fs.readFileSync(path.join(repoRoot, file), "utf8");
  const parsed = matter(source);
  return {
    file,
    route: routeFor(file),
    title: String(parsed.data.title || "").trim(),
    internalLinks: new Set([...source.matchAll(/\]\((\/[^)\s#?]+)/g)].map((match) => match[1])).size,
  };
});

let healthyInfrastructureChecks = 0;
let finalReport: Record<string, unknown> = {};
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  const homepage = await fetchText(`${base}/`);
  const sitemap = await fetchText(`${base}/sitemap.xml`);
  const infrastructureHealthy = homepage.status === 200 && sitemap.status === 200 && sitemap.text.includes("<urlset");
  if (infrastructureHealthy) healthyInfrastructureChecks += 1;
  const pages = await Promise.all(expected.map(async (item) => {
    const response = await fetchText(`${base}${item.route}`);
    const canonical = canonicalFrom(response.text);
    const robots = robotsFrom(response.text).toLowerCase();
    const checks = {
      status200: response.status === 200,
      renderedTitle: Boolean(item.title) && response.text.includes(item.title),
      selfCanonical: canonical ? new URL(canonical, base).pathname.replace(/\/$/, "") === item.route : false,
      indexAllowed: !robots.includes("noindex"),
      inSitemap: sitemap.text.includes(`<loc>${base}${item.route}</loc>`),
      structuredData: /<script[^>]+application\/ld\+json/i.test(response.text),
      internalLinkMinimum: item.internalLinks >= 10,
    };
    return { ...item, status: response.status, canonical, robots, checks, passed: Object.values(checks).every(Boolean), error: response.error };
  }));
  finalReport = {
    auditedAt: new Date().toISOString(),
    attempt,
    attempts,
    base,
    infrastructure: { homepageStatus: homepage.status, sitemapStatus: sitemap.status, healthy: infrastructureHealthy },
    pages,
  };
  console.log(JSON.stringify(finalReport, null, 2));
  if (infrastructureHealthy && pages.every((page) => page.passed)) process.exit(0);
  if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, delayMs));
}

if (healthyInfrastructureChecks >= 3) {
  console.error("Deterministic content defect: production infrastructure was healthy but the released pages failed the content contract.");
  process.exit(10);
}
console.error("Infrastructure/deployment state was not healthy enough to authorize an automatic revert.");
process.exit(20);
