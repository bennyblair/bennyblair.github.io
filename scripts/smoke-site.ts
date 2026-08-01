import path from "node:path";
import { spawn, type ChildProcess } from "node:child_process";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";
import { buildContentIndex } from "./lib/content-index.mjs";

const repoRoot = process.cwd();
const port = Number(process.env.SMOKE_PORT || 43174);
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
  process.stdout?.on("data", (chunk) => {
    output += chunk.toString();
  });
  process.stderr?.on("data", (chunk) => {
    output += chunk.toString();
  });

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

const content = buildContentIndex(repoRoot);
const representativeGuide = content.guides?.[0]?.route;
if (!representativeGuide) throw new Error("No guide route is available for smoke testing.");

const routes = [
  "/",
  "/services/commercial-property-finance",
  "/services/bridging-finance",
  representativeGuide,
  "/resources/tools/bridging-loan-calculator",
  "/contact",
];
const preview = launchPreview();
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ reducedMotion: "reduce" });
const errors: string[] = [];

try {
  await waitForServer(preview);
  for (const route of routes) {
    console.log(`Testing ${route}`);
    const page = await context.newPage();
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

    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("main h1", { timeout: 15_000 });
    await page.waitForLoadState("networkidle", { timeout: 15_000 });
    if (response?.status() !== 200) errors.push(`${route}: HTTP ${response?.status() ?? "no response"}`);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    for (const violation of results.violations) {
      const targets = violation.nodes
        .slice(0, 3)
        .flatMap((node) => node.target)
        .join(", ");
      errors.push(`${route}: axe ${violation.id} (${violation.impact ?? "unknown"}) at ${targets}`);
    }
    for (const pageError of pageErrors) errors.push(`${route}: browser error ${pageError}`);

    if (route === "/") {
      await page.keyboard.press("Tab");
      const focusedText = await page.evaluate(() => document.activeElement?.textContent?.trim());
      if (focusedText !== "Skip to main content") {
        errors.push("/: first keyboard focus is not the skip link");
      } else {
        await page.keyboard.press("Enter");
        const focusedId = await page.evaluate(() => document.activeElement?.id);
        if (focusedId !== "main-content") errors.push("/: skip link did not focus main content");
      }
    }
    await page.close();
  }

  const formPage = await context.newPage();
  await formPage.goto(`${baseUrl}/contact`, { waitUntil: "domcontentloaded" });
  await formPage.waitForSelector('form[name="contact"] button[type="submit"]');
  await formPage.waitForLoadState("networkidle");
  await formPage.evaluate(() => {
    const target = window as typeof window & { __testEvents?: unknown[][] };
    target.__testEvents = [];
    window.gtag = (...args: unknown[]) => target.__testEvents?.push(args);
  });
  const contactForm = formPage
    .locator('form[name="contact"]')
    .filter({ has: formPage.locator('button[type="submit"]') });
  await contactForm.locator('input[name="name"]').fill("Accessibility Test");
  await contactForm.locator('input[name="email"]').fill("test@example.com");
  await contactForm.locator('button[type="submit"]').click();
  await formPage.waitForTimeout(250);
  const leadCount = await formPage.evaluate(() => {
    const target = window as typeof window & { __testEvents?: unknown[][] };
    return (target.__testEvents ?? []).filter(
      (event) => event[0] === "event" && event[1] === "generate_lead",
    ).length;
  });
  if (leadCount !== 1) errors.push(`/contact: expected one generate_lead event, received ${leadCount}`);
  await formPage.close();
} finally {
  await context.close();
  await browser.close();
  preview.kill();
}

if (errors.length) {
  errors.forEach((error) => console.error(`ERROR ${error}`));
  console.error(`Smoke test failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`Smoke and accessibility tests passed for ${routes.length} representative routes.`);
