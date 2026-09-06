import fs from "node:fs";
import { authoredMetadataChecks } from "./lib/live-metadata";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";
import { contentAssertionsPass, deploymentProofPassed, releaseFailureExitCode } from "./lib/content-release-proof.mjs";
import { SITE_REVISION_PATH, revisionIsDeployed } from "./lib/site-revision.mjs";
import { containsInternalEditorialLanguage } from "./lib/article-publication-contract.mjs";

const repoRoot = process.cwd();
const safeRepoRoot = repoRoot.replaceAll("\\", "/");
const base = (process.env.SEO_AUDIT_BASE || "https://emetcapital.com.au").replace(/\/$/, "");
const baseRef = process.env.CONTENT_RELEASE_BASE || "HEAD^";
const attempts = Number(process.env.CONTENT_RELEASE_AUDIT_ATTEMPTS || 8);
const delayMs = Number(process.env.CONTENT_RELEASE_AUDIT_DELAY_MS || 45_000);
const headers = { "user-agent": "Emet-SEO-Content-Release-Audit/1.0", "cache-control": "no-cache" };

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

function metaContent(html: string, selector: { name?: string; property?: string }) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const attribute = selector.name ? "name" : "property";
    const value = selector.name || selector.property;
    if (new RegExp(`\\b${attribute}=["']${value}["']`, "i").test(tag)) return tag.match(/\bcontent=["']([^"']+)/i)?.[1] || "";
  }
  return "";
}

function plainText(html: string) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

function faqAnswersVisible(html: string) {
  const main = plainText(html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] || "");
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const value = JSON.parse(match[1]);
      const schemas = Array.isArray(value) ? value : [value];
      for (const schema of schemas) {
        if (schema?.["@type"] !== "FAQPage") continue;
        for (const question of schema.mainEntity || []) {
          const answer = plainText(String(question?.acceptedAnswer?.text || ""));
          if (answer && !main.includes(answer)) return false;
        }
      }
    } catch {
      return false;
    }
  }
  return true;
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

const expectedRevision = git(["rev-parse", "HEAD"]);
const files = git(["diff", "--diff-filter=AM", "--name-only", baseRef, "HEAD"])
  .split(/\r?\n/)
  .filter((file) => /^src\/content\/(?:guides|case-studies|insights)\/[^/]+\.md$/.test(file));

if (!files.length) {
  console.log(JSON.stringify({ classification: "not_applicable", reason: "no added or repaired content files in release" }, null, 2));
  process.exit(0);
}
const addedFiles = new Set(git(["diff", "--diff-filter=A", "--name-only", baseRef, "HEAD"]).split(/\r?\n/).filter(Boolean));
const manifestFiles = [...addedFiles].filter((file) => /^data\/seo-repairs\/repair_[a-z0-9-]+\.json$/.test(file));
if (manifestFiles.length > 1) {
  console.log(JSON.stringify({ classification: "indeterminate_release_input", reason: "invalid content release bounds", files }, null, 2));
  process.exit(20);
}
const repairManifest = manifestFiles.length ? JSON.parse(fs.readFileSync(path.join(repoRoot, manifestFiles[0]), "utf8")) : null;
if (repairManifest && (repairManifest.pages.length !== files.length || files.some((file) => !repairManifest.pages.some((page: { sourcePath: string }) => page.sourcePath === file)))) {
  console.error("Repair manifest does not cover the released content.");
  process.exit(20);
}

const expected = files.map((file) => {
  const source = fs.readFileSync(path.join(repoRoot, file), "utf8");
  const parsed = matter(source);
  return {
    file,
    isNew: addedFiles.has(file),
    verification: (repairManifest?.pages.find((page: { sourcePath: string }) => page.sourcePath === file)?.verification || []) as Array<{ kind: string; value: string }>,
    route: routeFor(file),
    title: String(parsed.data.title || "").trim(),
    metaTitle: String(parsed.data.metaTitle || parsed.data.meta_title || "").trim(),
    metaDescription: String(parsed.data.metaDescription || parsed.data.meta_description || "").trim(),
    featuredImage: String(parsed.data.featuredImage || parsed.data.featured_image || "").trim(),
    designatedServicePage: String(parsed.data.designatedServicePage || parsed.data.designated_service_page || "").trim(),
    guideLinks: new Set([...source.matchAll(/\]\((\/resources\/guides\/[^)\s#?]+)/g)].map((match) => match[1])).size,
  };
});

let healthyInfrastructureChecks = 0;
let confirmedReleaseChecks = 0;
let finalReport: Record<string, unknown> = {};
let revisionConfirmed = false;
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  const markerResponse = await fetchText(`${base}${SITE_REVISION_PATH}?release=${expectedRevision}&attempt=${attempt}`);
  revisionConfirmed = revisionIsDeployed({ expectedRevision, status: markerResponse.status, body: markerResponse.text });
  const homepage = await fetchText(`${base}/`);
  const sitemap = await fetchText(`${base}/sitemap.xml`);
  const infrastructureHealthy = homepage.status === 200 && sitemap.status === 200 && sitemap.text.includes("<urlset");
  healthyInfrastructureChecks = infrastructureHealthy ? healthyInfrastructureChecks + 1 : 0;
  const pages = await Promise.all(expected.map(async (item) => {
    const response = await fetchText(`${base}${item.route}?release=${expectedRevision}&attempt=${attempt}`);
    const imageUrl = item.featuredImage.startsWith("http") ? item.featuredImage : `${base}${item.featuredImage}`;
    const image = await fetchText(imageUrl);
    const canonical = canonicalFrom(response.text);
    const robots = robotsFrom(response.text).toLowerCase();
    const renderedTitle = response.text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
    const renderedDescription = metaContent(response.text, { name: "description" });
    const h1Count = (response.text.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || []).length;
    const deploymentProof = deploymentProofPassed(item.verification, response.text);
    const checks = {
      status200: response.status === 200,
      renderedTitle: Boolean(item.title) && response.text.includes(item.title),
      ...authoredMetadataChecks(item, renderedTitle, renderedDescription),
      selfCanonical: canonical ? new URL(canonical, base).pathname.replace(/\/$/, "") === item.route : false,
      indexAllowed: !robots.includes("noindex"),
      inSitemap: sitemap.text.includes(`<loc>${base}${item.route}</loc>`),
      structuredData: /<script[^>]+application\/ld\+json/i.test(response.text),
      oneH1: h1Count === 1,
      articleImage: !item.isNew || image.status === 200 && metaContent(response.text, { property: "og:image" }) === imageUrl,
      publisherLogo: !item.isNew || response.text.includes("https://emetcapital.com.au/images/emet-capital-logo.png"),
      faqAnswersVisible: faqAnswersVisible(response.text),
      noInternalProductionLabels: !item.isNew || !containsInternalEditorialLanguage(plainText(response.text)),
      designatedServiceLink: !item.isNew || response.text.includes(`href="${item.designatedServicePage}`) || response.text.includes(`href='${item.designatedServicePage}`),
      supportingGuides: !item.isNew || item.guideLinks >= 2,
      contentAssertions: contentAssertionsPass(item.verification, response.text),
      deployedRevision: revisionConfirmed,
    };
    return { ...item, deploymentProof, deterministicResponse: [200, 404, 410].includes(response.status) && (!item.isNew || [200, 404, 410].includes(image.status)), status: response.status, canonical, robots, checks, passed: Object.values(checks).every(Boolean), error: response.error };
  }));
  confirmedReleaseChecks = infrastructureHealthy && revisionConfirmed && pages.every((page) => page.deterministicResponse) ? confirmedReleaseChecks + 1 : 0;
  finalReport = {
    auditedAt: new Date().toISOString(),
    releaseSha: expectedRevision,
    deploymentMarker: { status: markerResponse.status, revisionConfirmed, expectedRevision },
    repairId: repairManifest?.repairId || null,
    attempt,
    attempts,
    base,
    infrastructure: { homepageStatus: homepage.status, sitemapStatus: sitemap.status, healthy: infrastructureHealthy },
    pages,
  };
  console.log(JSON.stringify(finalReport, null, 2));
  if (infrastructureHealthy && revisionConfirmed && pages.every((page) => page.passed)) process.exit(0);
  if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, delayMs));
}

if (releaseFailureExitCode({ healthyInfrastructureChecks, confirmedReleaseChecks, revisionConfirmed }) === 10) {
  console.error("Deterministic content defect: the exact production revision and infrastructure were confirmed but its pages failed the content contract.");
  process.exit(10);
}
console.error("Infrastructure or exact deployed revision was not confirmed; automatic revert is not authorized.");
process.exit(20);
