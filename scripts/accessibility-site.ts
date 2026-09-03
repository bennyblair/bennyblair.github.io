import path from "node:path";
import { readFileSync } from "node:fs";
import { spawn, type ChildProcess } from "node:child_process";
import AxeBuilder from "@axe-core/playwright";
import { chromium, type BrowserContext } from "playwright";

interface RouteRecord {
  path: string;
}

const repoRoot = process.cwd();
const port = Number(process.env.A11Y_PORT || 43175);
const concurrency = Math.max(1, Number(process.env.A11Y_CONCURRENCY || 4));
const routeLimit = Math.max(0, Number(process.env.A11Y_ROUTE_LIMIT || 0));
const baseUrl = `http://127.0.0.1:${port}`;

function launchPreview() {
  const viteBin = path.join(repoRoot, "node_modules", "vite", "bin", "vite.js");
  return spawn(process.execPath, [viteBin, "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
    cwd: repoRoot,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function waitForServer(process: ChildProcess) {
  let output = "";
  process.stdout?.on("data", (chunk) => { output += chunk.toString(); });
  process.stderr?.on("data", (chunk) => { output += chunk.toString(); });

  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (process.exitCode !== null) throw new Error(`Preview exited early.\n${output}`);
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // Preview is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview did not become ready.\n${output}`);
}

async function scanRoute(context: BrowserContext, route: string) {
  const page = await context.newPage();
  const errors: string[] = [];
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.route("**/*", async (requestRoute) => {
    const request = requestRoute.request();
    const requestUrl = new URL(request.url());
    if (requestUrl.origin !== baseUrl || request.resourceType() === "media") {
      await requestRoute.abort();
    } else {
      await requestRoute.continue();
    }
  });

  try {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    // The production shell is prerendered. Wait for React to replace the shell
    // with the requested route before auditing, otherwise every deep URL can be
    // incorrectly scanned as the prerendered homepage. The homepage itself is
    // intentionally hydrated on first interaction, so a pointer-over event
    // activates it without consuming the first keyboard focus target.
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => window.dispatchEvent(new Event("pointerover")));
    await page.waitForFunction(
      () => document.documentElement.dataset.prerenderReady === "true",
      undefined,
      { timeout: 15_000 },
    );
    await page.waitForSelector("main h1", { timeout: 15_000 });
    if (response?.status() !== 200) errors.push(`HTTP ${response?.status() ?? "no response"}`);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    for (const violation of results.violations) {
      const targets = violation.nodes
        .slice(0, 3)
        .flatMap((node) => node.target)
        .join(", ");
      errors.push(`axe ${violation.id} (${violation.impact ?? "unknown"}) at ${targets}`);
    }
    for (const pageError of pageErrors) errors.push(`browser error ${pageError}`);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  } finally {
    await page.close();
  }
  return errors.map((error) => `${route}: ${error}`);
}

const manifest = JSON.parse(
  readFileSync(path.join(repoRoot, "dist", "site-route-manifest.json"), "utf8"),
) as RouteRecord[];
const allRoutes = manifest.map((record) => record.path);
const routes = routeLimit > 0 ? allRoutes.slice(0, routeLimit) : allRoutes;
const preview = launchPreview();
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ reducedMotion: "reduce" });
const errors: string[] = [];
let nextIndex = 0;
let completed = 0;

try {
  await waitForServer(preview);
  const workers = Array.from({ length: Math.min(concurrency, routes.length) }, async () => {
    while (nextIndex < routes.length) {
      const index = nextIndex;
      nextIndex += 1;
      const route = routes[index];
      errors.push(...await scanRoute(context, route));
      completed += 1;
      if (completed % 25 === 0 || completed === routes.length) {
        console.log(`Accessibility checked ${completed}/${routes.length} routes`);
      }
    }
  });
  await Promise.all(workers);
} finally {
  await context.close();
  await browser.close();
  preview.kill();
}

if (errors.length) {
  errors.forEach((error) => console.error(`ERROR ${error}`));
  console.error(`Accessibility audit failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`Accessibility audit passed for all ${routes.length} canonical routes.`);
