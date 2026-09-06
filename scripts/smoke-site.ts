import path from "node:path";
import assert from "node:assert/strict";
import { readFileSync, mkdirSync } from "node:fs";
import { spawn, type ChildProcess } from "node:child_process";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";
import { buildContentIndex } from "./lib/content-index.mjs";

const repoRoot = process.cwd();
const port = Number(process.env.SMOKE_PORT || 43174);
const baseUrl = `http://127.0.0.1:${port}`;

const screenshotDir = path.join(repoRoot, "output", "playwright");
mkdirSync(screenshotDir, { recursive: true });
const builtDocument = (route: string) => readFileSync(path.join(repoRoot, "dist", route === "/" ? "index.html" : route.slice(1) + "/index.html"));

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
      } else if (request.resourceType() === "document" && requestUrl.pathname === route) {
        await requestRoute.fulfill({ status: 200, contentType: "text/html", body: builtDocument(route) });
      } else {
        await requestRoute.continue();
      }
    });

    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 15_000 });
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
    await page.waitForFunction(
      () => document.documentElement.dataset.prerenderReady === "true",
      undefined,
      { timeout: 15_000 },
    );
    await page.waitForSelector("main h1", { timeout: 15_000 });
    if (response?.status() !== 200) errors.push(`${route}: HTTP ${response?.status() ?? "no response"}`);

    if (route === "/") {
      // content-visibility:auto keeps offscreen computed styles from the
      // serialized disabled state. Render each section as a visitor scrolls
      // before comparing text colors; do not audit stale skipped-tree styles.
      for (let scroll = 0; scroll < 100; scroll += 1) {
        await page.mouse.wheel(0, 700);
        await page.waitForTimeout(80);
        const atEnd = await page.evaluate(() => scrollY + innerHeight >= document.documentElement.scrollHeight - 2);
        if (atEnd) break;
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
    }

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

    await page.close();
  }

  // Test actual prerendered pages with the route chunk held back. Neither
  // synthetic change events nor a warm client render may hide the first input.
  for (const route of ["/", "/contact"]) {
    for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 1000 }]) {
      const coldContext = await browser.newContext({ viewport, reducedMotion: "reduce" });
      const coldPage = await coldContext.newPage();
      const coldErrors: string[] = [];
      coldPage.on("pageerror", (error) => coldErrors.push(error.message));
      let releaseChunk!: () => void;
      let chunkRequested!: () => void;
      const chunkGate = new Promise<void>((resolve) => { releaseChunk = resolve; });
      const requestObserved = new Promise<void>((resolve) => { chunkRequested = resolve; });
      let unsafeRequests = 0;
      let documentRequests = 0;
      const chunkName = route === "/" ? "Homepage" : "Contact";
      await coldContext.route("**/*", async (requestRoute) => {
        const request = requestRoute.request();
        const url = new URL(request.url());
        if (request.resourceType() === "document") documentRequests += 1;
        if (!["GET", "HEAD"].includes(request.method())) {
          unsafeRequests += 1;
          await requestRoute.abort();
        } else if (url.origin !== baseUrl || request.resourceType() === "media") {
          await requestRoute.abort();
        } else if (request.resourceType() === "document" && url.pathname === route) {
          await requestRoute.fulfill({ status: 200, contentType: "text/html", body: builtDocument(route) });
        } else {
          if (url.pathname.startsWith("/assets/" + chunkName + "-") && url.pathname.endsWith(".js")) {
            chunkRequested();
            await chunkGate;
          }
          await requestRoute.continue();
        }
      });
      try {
        const response = await coldPage.goto(baseUrl + route, { waitUntil: "domcontentloaded" });
        assert.equal(response?.status(), 200);
        assert.equal(await coldPage.getAttribute("html", "data-prerendered"), "true", "must test serialized production HTML");
        const name = route === "/" ? "homepage-contact" : "contact";
        const form = coldPage.locator('form[name="' + name + '"]').filter({ has: coldPage.locator('button[type="submit"]') });
        const purpose = coldPage.locator("#" + name + "-purpose");
        for (let scroll = 0; scroll < 100; scroll += 1) {
          if (await purpose.isVisible()) { await purpose.scrollIntoViewIfNeeded(); break; }
          await coldPage.mouse.wheel(0, 700);
          await coldPage.waitForTimeout(100);
        }
        await Promise.race([
          requestObserved,
          coldPage.waitForTimeout(10000).then(() => { throw new Error(route + ": route did not preload as form approached viewport"); }),
        ]);
        assert.equal(await purpose.isDisabled(), true, route + ": prerendered select must be disabled before mount");
        assert.equal(await form.getAttribute("aria-busy"), "true");
        assert.match(await form.locator('[aria-live="polite"]').innerText(), /Preparing the enquiry form/);
        await coldPage.waitForTimeout(3000); // A slow page chunk must not expose editable, unbound controls.
        assert.equal(await purpose.inputValue(), "");
        assert.equal(await purpose.isDisabled(), true);
        const imageName = "recovery-" + (route === "/" ? "home" : "contact") + "-" + viewport.width;
        await coldPage.screenshot({ path: path.join(screenshotDir, imageName + "-loading.png") });
        const scrollBeforeMount = await coldPage.evaluate(() => scrollY);
        releaseChunk();
        await coldPage.waitForFunction(() => document.documentElement.dataset.prerenderReady === "true");
        const scrollAfterMount = await coldPage.evaluate(() => scrollY);
        assert.ok(Math.abs(scrollAfterMount - scrollBeforeMount) <= 2,
          route + ": initial mount must preserve scroll before any automatic locator scrolling");
        // One native selector click and keyboard choice, then one Continue.
        await purpose.click();
        await coldPage.keyboard.press("Home");
        await coldPage.keyboard.press("ArrowDown");
        await coldPage.keyboard.press("ArrowDown");
        await coldPage.keyboard.press("Enter");
        assert.equal(await purpose.inputValue(), "refinance");
        await form.getByRole("button", { name: "Continue to contact details" }).click();
        await form.locator('input[name="name"]').waitFor({ state: "visible" });
        await coldPage.waitForFunction((id) => document.activeElement?.id === id, name + "-name");
        const fieldBox = await form.locator('input[name="name"]').boundingBox();
        const labelBox = await form.locator('label[for="' + name + '-name"]').boundingBox();
        const headerBox = await coldPage.getByRole("navigation", { name: "Primary navigation" }).boundingBox();
        assert.ok(fieldBox && labelBox && headerBox, "focused field, label and site header must render");
        assert.ok(labelBox.y >= headerBox.y + headerBox.height, "first field label must clear the sticky header");
        assert.ok(fieldBox.y >= headerBox.y + headerBox.height && fieldBox.y + fieldBox.height <= viewport.height,
          "first focused contact field must be fully visible in the viewport");
        assert.equal(await purpose.inputValue(), "refinance", "first chosen purpose must survive mounting");
        assert.equal(await form.getAttribute("data-enquiry-ready"), "true");
        assert.equal(await form.locator('button[type="submit"]').isVisible(), true);
        assert.equal(unsafeRequests, 0);
        assert.deepEqual(coldErrors, []);
        await coldPage.screenshot({ path: path.join(screenshotDir, imageName + "-details.png") });
        await form.getByRole("button", { name: "Back", exact: true }).click();
        await coldPage.waitForFunction((id) => document.activeElement?.id === id, name + "-purpose");
        assert.equal(await purpose.inputValue(), "refinance", "Back must preserve the chosen purpose");
        const purposeBox = await purpose.boundingBox();
        assert.ok(purposeBox && purposeBox.y >= headerBox.y + headerBox.height && purposeBox.y + purposeBox.height <= viewport.height,
          "Back must return focus to a fully visible purpose selector");
        await coldPage.locator('footer a[href="/about"]').click();
        await coldPage.waitForURL(baseUrl + "/about");
        await coldPage.waitForFunction(() => document.querySelector('link[rel="canonical"]')?.getAttribute("href") === "https://emetcapital.com.au/about");
        await coldPage.waitForFunction(() => document.documentElement.dataset.prerenderReady === "true");
        assert.equal(documentRequests, 1, "footer navigation must exercise the mounted client router");
        assert.ok(await coldPage.evaluate(() => scrollY <= 2), "later client navigation must reset scroll to top");
        console.log("First enquiry interaction passed with delayed " + chunkName + " chunk at " + viewport.width + "px");
      } finally {
        releaseChunk();
        await coldContext.close();
      }
    }
  }

  const formPage = await context.newPage();
  let attemptedFormPosts = 0;
  await formPage.route("**/*", async (requestRoute) => {
    const request = requestRoute.request();
    if (request.method() === "POST") {
      attemptedFormPosts += 1;
      await requestRoute.abort();
    } else if (new URL(request.url()).origin !== baseUrl || request.resourceType() === "media") {
      await requestRoute.abort();
    } else if (request.resourceType() === "document" && new URL(request.url()).pathname === "/contact") {
      await requestRoute.fulfill({ status: 200, contentType: "text/html", body: builtDocument("/contact") });
    } else {
      await requestRoute.continue();
    }
  });
  await formPage.goto(`${baseUrl}/contact`, { waitUntil: "domcontentloaded" });
  await formPage.waitForSelector('#contact-purpose');
  await formPage.locator('#contact-purpose').click();
  await formPage.keyboard.press("Home");
  await formPage.keyboard.press("ArrowDown");
  await formPage.keyboard.press("Enter");
  await formPage.getByRole("button", { name: "Continue to contact details" }).click();
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
  const detailA11y = await new AxeBuilder({ page: formPage })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  for (const violation of detailA11y.violations) {
    errors.push('/contact step 2: axe ' + violation.id + ' (' + (violation.impact ?? "unknown") + ')');
  }
  await contactForm.locator('input[name="name"]').fill("Accessibility Test");
  await contactForm.locator('input[name="email"]').fill("test@example.com");
  await contactForm.locator('button[type="submit"]').click();
  await formPage.getByRole("status").filter({ hasText: "Preview only" }).waitFor();
  const leadCount = await formPage.evaluate(() => {
    const target = window as typeof window & { __testEvents?: unknown[][] };
    return (target.__testEvents ?? []).filter(
      (event) => event[0] === "event" && event[1] === "generate_lead",
    ).length;
  });
  if (leadCount !== 0) errors.push('/contact: local preview must not generate a lead, received ' + leadCount);
  if (attemptedFormPosts !== 0) errors.push('/contact: local preview attempted a form POST');
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
