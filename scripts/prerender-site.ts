import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium, type Browser, type Page } from "playwright";
import { buildContentIndex } from "./lib/content-index.mjs";
import { getIndexableStaticRoutes, isRedirectSource } from "../src/config/site-route-manifest";

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, "dist");
const port = Number(process.env.PRERENDER_PORT || 4173);
const baseUrl = `http://127.0.0.1:${port}`;
const concurrency = Math.max(1, Number(process.env.PRERENDER_CONCURRENCY || 6));

type RenderRoute = { path: string; pageType: string };
type RenderFailure = { path: string; message: string };

function getRoutes(): RenderRoute[] {
  const content = buildContentIndex(repoRoot);
  const routes = [
    ...getIndexableStaticRoutes().map((route) => ({ path: route.path, pageType: route.pageType })),
    ...(content.guides ?? [])
      .filter((article) => !isRedirectSource(article.route))
      .map((article) => ({ path: article.route, pageType: "guide" })),
    ...(content["case-studies"] ?? [])
      .filter((article) => !isRedirectSource(article.route))
      .map((article) => ({ path: article.route, pageType: "case-study" })),
  ].sort((a, b) => {
    if (a.path === "/") return 1;
    if (b.path === "/") return -1;
    return a.path.localeCompare(b.path);
  });
  const limit = Number(process.env.PRERENDER_LIMIT || 0);
  return limit > 0 ? routes.slice(0, limit) : routes;
}

async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(baseUrl, { redirect: "manual" });
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Vite preview did not start at ${baseUrl}`);
}

function outputPath(routePath: string) {
  if (routePath === "/") return path.join(distDir, "index.html");
  return path.join(distDir, routePath.replace(/^\//, ""), "index.html");
}

function deferHydrationUntilAfterCriticalPaint(html: string) {
  return html.replace(
    /<script\s+type="module"[^>]*\ssrc="([^"]*\/assets\/index-[^"]+\.js)"[^>]*><\/script>/,
    (_script, source: string) =>
      `<script>(()=>{const start=()=>import(${JSON.stringify(source)}).catch(console.error);` +
      `const idle=()=>("requestIdleCallback"in window?requestIdleCallback(start,{timeout:1200}):setTimeout(start,0));` +
      `if(document.readyState==="complete")idle();else addEventListener("load",idle,{once:true});})();</script>`,
  );
}

function finalizePrerenderedHtml(html: string) {
  const productionHtml = deferHydrationUntilAfterCriticalPaint(html)
    .replaceAll(`${baseUrl}/assets/`, "/assets/");
  if (productionHtml.includes(baseUrl)) {
    throw new Error(`prerendered HTML contains preview origin ${baseUrl}`);
  }
  return productionHtml;
}

async function validateRenderedPage(page: Page, route: RenderRoute) {
  return page.evaluate(({ expectedPath, pageType }) => {
    const title = document.title.replace(/\s+/g, " ").trim();
    const description = document.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ?? "";
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href")?.trim() ?? "";
    const h1s = [...document.querySelectorAll("main h1")];
    const mainText = (document.querySelector("main")?.textContent ?? "").replace(/\s+/g, " ").trim();
    const codeLeakTokens = ["setFormData(", "console.log(", "className=", "useEffect(", "=> {"];
    const codeLeaks = codeLeakTokens.filter((token) => mainText.includes(token));
    const schemaScripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
    const schemaErrors: string[] = [];

    for (const schema of schemaScripts) {
      try {
        JSON.parse(schema.textContent || "{}");
      } catch {
        schemaErrors.push("invalid JSON-LD");
      }
    }

    const errors: string[] = [];
    if (!title || title.length < 15) errors.push("missing or weak title");
    if (!description || description.length < 70) errors.push("missing or weak meta description");
    if (!canonical.startsWith("https://emetcapital.com.au/")) errors.push(`invalid canonical "${canonical}"`);
    if (h1s.length !== 1) errors.push(`expected one H1, found ${h1s.length}`);
    if (mainText.length < (pageType === "tool" ? 120 : 220)) errors.push(`main content too short (${mainText.length})`);
    if (codeLeaks.length) errors.push(`source-code leakage: ${codeLeaks.join(", ")}`);
    if (/(^|\s)(?:00K|00M|\.2m)(?:\s|$)/i.test(mainText)) errors.push("possible damaged currency");
    if (schemaErrors.length) errors.push(...schemaErrors);
    if (location.pathname !== expectedPath) errors.push(`rendered unexpected path "${location.pathname}"`);
    return {
      errors,
      title,
      h1: (h1s[0]?.textContent ?? "").replace(/\s+/g, " ").trim(),
      mainTextLength: mainText.length,
    };
  }, { expectedPath: route.path, pageType: route.pageType });
}

async function configurePage(page: Page) {
  await page.route("**/*", async (requestRoute) => {
    const request = requestRoute.request();
    const url = new URL(request.url());
    if (url.origin !== baseUrl || request.resourceType() === "media") {
      await requestRoute.abort();
      return;
    }
    await requestRoute.continue();
  });
}

async function renderRoute(page: Page, route: RenderRoute) {
  try {
    const response = await page.goto(`${baseUrl}${route.path}`, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    if (!response?.ok()) throw new Error(`preview returned ${response?.status() ?? "no response"}`);

    await page.waitForSelector('html[data-prerender-ready="true"]', { timeout: 30_000 });
    await page.waitForTimeout(120);
    const result = await validateRenderedPage(page, route);
    if (result.errors.length) {
      throw new Error(`${result.errors.join("; ")} [title="${result.title}", h1="${result.h1}"]`);
    }

    const html = finalizePrerenderedHtml(await page.evaluate(() => {
      document.documentElement.dataset.prerenderReady = "false";
      document.documentElement.dataset.prerendered = "true";
      return `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
    }));
    const filePath = outputPath(route.path);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, html);
  } catch (error) {
    // Stop a failed navigation/loading operation before the worker reuses this page.
    await page.evaluate(() => window.stop()).catch(() => undefined);
    throw error;
  }
}

async function renderNotFound(page: Page) {
  await page.goto(`${baseUrl}/__emet-not-found__`, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForSelector("main h1", { timeout: 30_000 });
  const html = finalizePrerenderedHtml(await page.evaluate(() => {
    document.documentElement.dataset.prerenderReady = "false";
    document.documentElement.dataset.prerendered = "true";
    document.title = "Page Not Found | Emet Capital";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
    document.querySelector('link[rel="canonical"]')?.remove();
    return `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
  }));
  fs.writeFileSync(path.join(distDir, "404.html"), html);
}

async function main() {
  if (!fs.existsSync(path.join(distDir, "index.html"))) {
    throw new Error("dist/index.html is missing. Run vite build before prerendering.");
  }

  const viteBin = path.join(repoRoot, "node_modules", "vite", "bin", "vite.js");
  const preview = spawn(process.execPath, [viteBin, "preview", "--host", "127.0.0.1", "--port", String(port)], {
    cwd: repoRoot,
    env: { ...process.env },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let previewErrors = "";
  preview.stderr.on("data", (chunk) => {
    previewErrors += String(chunk);
  });

  let browser: Browser | undefined;
  try {
    await waitForServer();
    browser = await chromium.launch({ headless: true });
    const routes = getRoutes();
    const failures: RenderFailure[] = [];
    let completed = 0;
    let nextIndex = 0;

    async function worker() {
      const page = await browser!.newPage({
        viewport: { width: 1365, height: 900 },
        reducedMotion: "reduce",
        locale: "en-AU",
      });
      await configurePage(page);
      try {
        while (nextIndex < routes.length) {
          const index = nextIndex;
          nextIndex += 1;
          const route = routes[index];
          try {
            await renderRoute(page, route);
          } catch (error) {
            failures.push({ path: route.path, message: error instanceof Error ? error.message : String(error) });
          }
          completed += 1;
          if (completed % 25 === 0 || completed === routes.length) {
            console.log(`Prerendered ${completed}/${routes.length} routes`);
          }
        }
      } finally {
        await page.close();
      }
    }

    await Promise.all(Array.from({ length: concurrency }, () => worker()));
    if (failures.length) {
      const retryPaths = [...new Set(failures.map((failure) => failure.path))];
      failures.length = 0;
      console.log(`Retrying ${retryPaths.length} transient render failure(s) sequentially`);
      for (const routePath of retryPaths) {
        const route = routes.find((candidate) => candidate.path === routePath);
        if (!route) continue;
        const retryPage = await browser.newPage({
          viewport: { width: 1365, height: 900 },
          reducedMotion: "reduce",
          locale: "en-AU",
        });
        try {
          await configurePage(retryPage);
          await renderRoute(retryPage, route);
        } catch (error) {
          failures.push({
            path: route.path,
            message: error instanceof Error ? error.message : String(error),
          });
        } finally {
          await retryPage.close();
        }
      }
    }

    const notFoundPage = await browser.newPage({
      viewport: { width: 1365, height: 900 },
      reducedMotion: "reduce",
      locale: "en-AU",
    });
    try {
      await configurePage(notFoundPage);
      await renderNotFound(notFoundPage);
    } finally {
      await notFoundPage.close();
    }

    if (failures.length) {
      const details = failures.map((failure) => `- ${failure.path}: ${failure.message}`).join("\n");
      throw new Error(`Prerender failed for ${failures.length} routes:\n${details}`);
    }
    console.log(`Prerendered ${routes.length} canonical routes with rendered React content.`);
  } finally {
    if (browser) await browser.close();
    preview.kill();
    if (previewErrors.trim()) console.error(previewErrors.trim());
  }
}

await main();
