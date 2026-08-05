import { buildContentIndex } from "./lib/content-index.mjs";
import { discoveryGuidesByService, discoveryGuideUrls } from "../src/config/discovery-guides";
import { redirectRules } from "../src/config/site-route-manifest";

const base = (process.env.SEO_AUDIT_BASE || "https://emetcapital.com.au").replace(/\/$/, "");
const origin = new URL(base).origin;
const headers = { "user-agent": "Emet-SEO-Post-Deploy-Audit/2.0" };
const requestCache = new Map<string, Promise<Response>>();

const exactRedirects = new Map(
  redirectRules
    .filter((rule) =>
      rule.status === 301
      && rule.from.startsWith("/")
      && rule.to.startsWith("/")
      && !/[*:]/.test(rule.from),
    )
    .map((rule) => [rule.from, rule.to]),
);

const content = Object.values(buildContentIndex(process.cwd())).flat();
const noindexPaths = content.filter((article) => article.noindex).map((article) => article.route);

function tagAttribute(tag: string, name: string) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, "i"))?.[1] || null;
}

function canonicalFrom(html: string) {
  for (const tag of html.match(/<link\b[^>]*>/gi) || []) {
    if ((tagAttribute(tag, "rel") || "").toLowerCase().split(/\s+/).includes("canonical")) {
      return tagAttribute(tag, "href");
    }
  }
  return null;
}

function robotsMetaFrom(html: string) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    if ((tagAttribute(tag, "name") || "").toLowerCase() === "robots") {
      return tagAttribute(tag, "content") || "";
    }
  }
  return "";
}

function routePath(value: string) {
  return new URL(value, base).pathname.replace(/\/$/, "") || "/";
}

function internalPathsFromText(text: string) {
  const paths = new Set<string>();
  const candidates = [
    ...(text.match(/https?:\/\/[^\s)\]>]+/g) || []),
    ...[...text.matchAll(/\]\((\/[^)\s]+)\)/g)].map((match) => match[1]),
  ];
  for (const candidate of candidates) {
    try {
      const linked = new URL(candidate, base);
      if (linked.origin === origin) paths.add(routePath(linked.href));
    } catch {
      // Ignore malformed URLs in discovery text files.
    }
  }
  return paths;
}

async function fetchWithRetry(pathname: string, redirect: RequestRedirect) {
  for (let attempt = 0; ; attempt += 1) {
    const response = await fetch(`${base}${pathname}`, {
      headers,
      redirect,
      signal: AbortSignal.timeout(20_000),
    });
    const retryable = [403, 429, 502, 503, 504].includes(response.status);
    if (!retryable || attempt >= 2) return response;
    await response.arrayBuffer();
    await new Promise((resolve) => setTimeout(resolve, 1_000 * (attempt + 1)));
  }
}

async function get(pathname: string, redirect: RequestRedirect = "manual") {
  const key = `${redirect}:${pathname}`;
  if (!requestCache.has(key)) requestCache.set(key, fetchWithRetry(pathname, redirect));
  try {
    return (await requestCache.get(key)!).clone();
  } catch (error) {
    requestCache.delete(key);
    throw error;
  }
}

async function mapLimit<T, R>(items: T[], limit: number, mapper: (item: T) => Promise<R>) {
  const results = new Array<R | { error: string }>(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      try {
        results[index] = await mapper(items[index]);
      } catch (error) {
        results[index] = { error: error instanceof Error ? error.message : String(error) };
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const sitemapResponse = await get("/sitemap.xml", "follow");
const sitemap = await sitemapResponse.text();
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => routePath(match[1]));
const sitemapSet = new Set(sitemapPaths);

const redirectResults = await mapLimit([...exactRedirects], 6, async ([source, target]) => {
  const response = await get(source);
  const location = response.headers.get("location");
  const targetResponse = await get(target);
  return {
    source,
    target,
    status: response.status,
    location: location ? routePath(location) : null,
    targetStatus: targetResponse.status,
    passed: response.status === 301 && Boolean(location) && routePath(location as string) === target && targetResponse.status === 200,
  };
});

const noindexResults = await mapLimit(noindexPaths, 6, async (pathname) => {
  const response = await get(pathname, "follow");
  const html = await response.text();
  const robots = robotsMetaFrom(html).toLowerCase().replace(/\s+/g, "");
  return {
    path: pathname,
    status: response.status,
    robots,
    inSitemap: sitemapSet.has(pathname),
    passed: response.status === 200 && robots.includes("noindex") && robots.includes("follow") && !sitemapSet.has(pathname),
  };
});

const discoveryResults = await mapLimit(discoveryGuideUrls, 6, async (pathname) => {
  const response = await get(pathname, "follow");
  const html = await response.text();
  const canonical = canonicalFrom(html);
  return {
    path: pathname,
    status: response.status,
    canonicalPath: canonical ? routePath(canonical) : null,
    inSitemap: sitemapSet.has(pathname),
    passed: response.status === 200 && canonical && routePath(canonical) === pathname && sitemapSet.has(pathname),
  };
});

const hubResults = await mapLimit(Object.entries(discoveryGuidesByService), 6, async ([service, guides]) => {
  const pathname = `/services/${service}`;
  const response = await get(pathname, "follow");
  const html = await response.text();
  const missingGuides = guides.filter((guide) => !html.includes(`href="${guide.href}"`)).map((guide) => guide.href);
  return {
    path: pathname,
    status: response.status,
    missingGuides,
    passed: response.status === 200 && missingGuides.length === 0,
  };
});

const crawlResults = await mapLimit(sitemapPaths, 6, async (pathname) => {
  const response = await get(pathname, "follow");
  const html = await response.text();
  const canonical = canonicalFrom(html);
  const robots = robotsMetaFrom(html).toLowerCase();
  const redirectLinks = new Set<string>();
  for (const match of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    try {
      const linked = new URL(match[1], base);
      const linkedPath = routePath(linked.href);
      if (linked.origin === origin && exactRedirects.has(linkedPath)) redirectLinks.add(linkedPath);
    } catch {
      // Ignore malformed and non-URL href values.
    }
  }
  return {
    path: pathname,
    status: response.status,
    canonicalPath: canonical ? routePath(canonical) : null,
    unexpectedNoindex: robots.includes("noindex"),
    redirectLinks: [...redirectLinks],
  };
});

const robotsResponse = await get("/robots.txt", "follow");
const robotsText = await robotsResponse.text();
const llmsResponse = await get("/llms.txt", "follow");
const llmsText = await llmsResponse.text();
const llmsPaths = internalPathsFromText(llmsText);

const redirectFailures = redirectResults.filter((item) => "error" in item || !item.passed);
const noindexFailures = noindexResults.filter((item) => "error" in item || !item.passed);
const discoveryFailures = discoveryResults.filter((item) => "error" in item || !item.passed);
const hubFailures = hubResults.filter((item) => "error" in item || !item.passed);
const httpFailures = crawlResults.filter((item) => "error" in item || item.status !== 200);
const canonicalFailures = crawlResults
  .filter((item) => !("error" in item) && item.canonicalPath !== item.path)
  .map((item) => ({ path: item.path, canonicalPath: item.canonicalPath }));
const unexpectedNoindex = crawlResults.filter((item) => !("error" in item) && item.unexpectedNoindex).map((item) => item.path);
const internalLinksToRedirects = crawlResults
  .filter((item) => !("error" in item) && item.redirectLinks.length)
  .map((item) => ({ path: item.path, redirectLinks: item.redirectLinks }));

const report = {
  auditedAt: new Date().toISOString(),
  base,
  sitemap: {
    status: sitemapResponse.status,
    urls: sitemapPaths.length,
    duplicateUrls: sitemapPaths.length - sitemapSet.size,
    redirectSourcesPresent: [...exactRedirects.keys()].filter((pathname) => sitemapSet.has(pathname)),
    noindexUrlsPresent: noindexPaths.filter((pathname) => sitemapSet.has(pathname)),
  },
  redirects: { checked: redirectResults.length, passed: redirectResults.length - redirectFailures.length, failures: redirectFailures },
  noindex: { checked: noindexResults.length, passed: noindexResults.length - noindexFailures.length, failures: noindexFailures },
  discovery: { checked: discoveryResults.length, passed: discoveryResults.length - discoveryFailures.length, failures: discoveryFailures },
  serviceHubs: { checked: hubResults.length, passed: hubResults.length - hubFailures.length, failures: hubFailures },
  crawl: {
    checked: crawlResults.length,
    httpFailures,
    canonicalFailures,
    unexpectedNoindex,
    internalLinksToRedirects,
  },
  discoveryFiles: {
    robotsStatus: robotsResponse.status,
    robotsDeclaresSitemap: /sitemap:\s*https:\/\/emetcapital\.com\.au\/sitemap\.xml/i.test(robotsText),
    llmsStatus: llmsResponse.status,
    redirectSourcesInLlms: [...exactRedirects.keys()].filter((pathname) => llmsPaths.has(pathname)),
    noindexUrlsInLlms: noindexPaths.filter((pathname) => llmsPaths.has(pathname)),
  },
};

const failed =
  report.sitemap.status !== 200
  || report.sitemap.duplicateUrls !== 0
  || report.sitemap.redirectSourcesPresent.length > 0
  || report.sitemap.noindexUrlsPresent.length > 0
  || redirectFailures.length > 0
  || noindexFailures.length > 0
  || discoveryFailures.length > 0
  || hubFailures.length > 0
  || httpFailures.length > 0
  || canonicalFailures.length > 0
  || unexpectedNoindex.length > 0
  || internalLinksToRedirects.length > 0
  || report.discoveryFiles.robotsStatus !== 200
  || !report.discoveryFiles.robotsDeclaresSitemap
  || report.discoveryFiles.llmsStatus !== 200
  || report.discoveryFiles.redirectSourcesInLlms.length > 0
  || report.discoveryFiles.noindexUrlsInLlms.length > 0;

console.log(JSON.stringify(report, null, 2));
process.exitCode = failed ? 1 : 0;
