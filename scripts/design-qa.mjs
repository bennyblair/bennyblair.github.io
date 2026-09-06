/**
 * Targeted Emet design acceptance checks.
 * Run against a built, locally served review copy:
 *   npm run qa:design -- http://127.0.0.1:4173 --screenshots
 * Optional: --site <checkout> --output <report.json> --skip-axe --dev
 * Default target is a PREVIEW build: noindex, simulated forms, no analytics.
 * --dev explicitly skips prerender-only no-JS/delayed-JS cases and records the gap.
 * --screenshots saves representative viewport captures. All non-GET/HEAD requests
 * and external requests are intercepted.
 */
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const args = process.argv.slice(2);
function option(name, fallback) {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
}
const base = new URL(args.find(value => /^https?:\/\//.test(value)) || "http://127.0.0.1:4173");
assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(base.hostname), "Only a loopback preview URL is allowed.");
assert.equal(base.pathname, "/", "Use the preview origin without a route path.");
const site = path.resolve(option("--site", process.cwd()));
const output = path.resolve(option("--output", path.join(site, "reports/design-qa-results.json")));
const requireFromSite = createRequire(path.join(site, "package.json"));
const { chromium } = requireFromSite("playwright");
const axeModule = requireFromSite("@axe-core/playwright");
const AxeBuilder = axeModule.default || axeModule;
const widths = [320, 390, 768, 1024, 1280, 1440];
const routes = [
  "/resources/guides",
  "/services/asset-backed-lending/sydney",
  "/",
  "/services/commercial-property-finance",
  "/services/private-lending",
  "/resources/guides/commercial-property-loans-australia-complete-guide",
  "/resources/case-studies/surry-hills-commercial-acquisition",
  "/contact",
  "/resources/tools/commercial-property-loan-calculator",
];
if (args.includes("--interiors")) routes.push(
  "/services", "/resources", "/resources/case-studies", "/resources/insights", "/resources/tools",
  "/about", "/about/ben", "/resources/faqs", "/resources/glossary", "/terms",
  "/resources/tools/second-mortgage-calculator", "/resources/tools/commercial-real-estate-calculator",
  "/resources/tools/working-capital-calculator", "/resources/tools/asset-finance-roi-calculator",
  "/resources/tools/loan-comparison-tool", "/resources/tools/bridging-loan-calculator"
);
if (args.includes("--routes")) routes.splice(0, routes.length, ...option("--routes", "").split(","));
const results = [];
const startedAt = new Date().toISOString();
const browser = await chromium.launch({ headless: true });

async function check(name, fn) {
  const start = Date.now();
  try {
    const details = await fn();
    results.push({ name, status: "pass", durationMs: Date.now() - start, details });
    process.stdout.write(`PASS ${name}\n`);
  } catch (error) {
    results.push({ name, status: "fail", durationMs: Date.now() - start, error: error instanceof Error ? error.message : String(error) });
    process.stdout.write(`FAIL ${name}: ${error instanceof Error ? error.message : error}\n`);
  }
}

async function freshContext(width, { javaScriptEnabled = true, scriptGate } = {}) {
  const context = await browser.newContext({
    viewport: { width, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    javaScriptEnabled,
    serviceWorkers: "block",
  });
  const network = { writes: [], analytics: [], external: [], delayedScripts: [] };
  await context.route("**/*", async route => {
    const request = route.request();
    const url = new URL(request.url());
    const record = { method: request.method(), url: request.url(), resourceType: request.resourceType() };
    const analytics = /(?:google-analytics\.com|googletagmanager\.com|doubleclick\.net|googleadservices\.com|analytics\.google\.com|\/g\/collect(?:\?|$))/i.test(request.url());
    if (analytics) network.analytics.push(record);
    if (!["GET", "HEAD"].includes(request.method())) network.writes.push(record);
    if (url.origin !== base.origin) network.external.push(record);
    if (analytics || !["GET", "HEAD"].includes(request.method()) || url.origin !== base.origin) {
      await route.abort();
      return;
    }
    if (scriptGate && request.resourceType() === "script") {
      network.delayedScripts.push(record);
      await scriptGate;
    }
    await route.continue();
  });
  await context.addInitScript(() => {
    window.__designQaAnalytics = [];
    window.gtag = (...args) => window.__designQaAnalytics.push(args);
  });
  return { context, network };
}

async function ready(page, route) {
  const response = await page.goto(new URL(route, base).href, { waitUntil: "domcontentloaded" });
  assert.equal(response?.status(), 200, `HTTP status for ${route}`);
  await page.locator("main h1").waitFor({ state: "visible", timeout: 20_000 });
  await page.waitForLoadState("networkidle", { timeout: 20_000 });
  await page.waitForFunction(() => !document.querySelector('[data-route-loading="true"]'));
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
}

async function geometry(page) {
  return page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    const documentWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    const h1s = [...document.querySelectorAll("main h1")];
    const errors = [];
    const rectOf = node => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
    };
    const identify = node => `${node.tagName.toLowerCase()}${node.id ? `#${node.id}` : ""}${node.className && typeof node.className === "string" ? `.${node.className.trim().split(/\s+/).slice(0, 3).join(".")}` : ""}`;
    const visible = node => {
      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0 && style.clip !== "rect(0px, 0px, 0px, 0px)" && !node.closest("[hidden], [inert]");
    };
    const offenders = [...document.querySelectorAll("body *")].filter(visible).filter(node => {
      const rect = node.getBoundingClientRect();
      return rect.left < -2 || rect.right > viewport + 2;
    }).slice(0, 12).map(node => ({ element: identify(node), bounds: rectOf(node) }));
    if (documentWidth > viewport + 2) errors.push(`document width ${documentWidth}px exceeds viewport ${viewport}px: ${JSON.stringify(offenders)}`);
    if (h1s.length !== 1) errors.push(`expected one main H1; found ${h1s.length}`);
    const heading = h1s[0];
    if (heading) {
      const bounds = heading.getBoundingClientRect();
      if (!visible(heading) || bounds.left < -1 || bounds.right > viewport + 1) errors.push(`H1 is hidden or outside viewport: ${JSON.stringify(rectOf(heading))}`);
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      let text;
      while ((text = walker.nextNode())) {
        if (!text.textContent.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(text);
        for (const rect of range.getClientRects()) {
          if (rect.width === 0) continue;
          if (rect.left < -1 || rect.right > viewport + 1) errors.push(`H1 text exceeds viewport: ${text.textContent.trim()}`);
          for (let ancestor = text.parentElement; ancestor; ancestor = ancestor.parentElement) {
            const style = getComputedStyle(ancestor);
            const clip = ancestor.getBoundingClientRect();
            if (/(hidden|clip)/.test(style.overflowX) && (rect.left < clip.left - 2 || rect.right > clip.right + 2)) errors.push(`H1 text clipped horizontally by ${identify(ancestor)}`);
            if (/(hidden|clip)/.test(style.overflowY) && (rect.top < clip.top - 3 || rect.bottom > clip.bottom + 3)) errors.push(`H1 text clipped vertically by ${identify(ancestor)}`);
          }
        }
      }
      for (const control of document.querySelectorAll("main form input:not([type=hidden]), main form button, main form textarea, main form select")) {
        if (!visible(control)) continue;
        const rect = control.getBoundingClientRect();
        if (rect.left < bounds.right && rect.right > bounds.left && rect.top < bounds.bottom && rect.bottom > bounds.top) errors.push(`Form control overlaps H1: ${identify(control)}`);
      }
    }
    const brokenImages = [...document.querySelectorAll("main img")].filter(image => image.complete && image.naturalWidth === 0).map(image => image.getAttribute("src"));
    if (brokenImages.length) errors.push(`Broken loaded images: ${JSON.stringify(brokenImages)}`);
    const brokenToc = [...document.querySelectorAll('.article-toc a[href^="#"], nav[aria-label="Quick navigation"] a[href^="#"]')].map(link => link.getAttribute("href").slice(1)).filter(id => !document.getElementById(decodeURIComponent(id)));
    if (brokenToc.length) errors.push(`TOC has missing anchors: ${brokenToc.join(", ")}`);
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href");
    if (canonical !== `https://emetcapital.com.au${location.pathname === "/" ? "/" : location.pathname.replace(/\/$/, "")}`) errors.push(`Unexpected production canonical: ${canonical}`);
    const robots = [...document.querySelectorAll('meta[name="robots"]')].map(node => node.getAttribute("content") || "");
    if (!robots.some(value => /\bnoindex\b/i.test(value))) errors.push("Preview page has no noindex robots meta");
    return { errors: [...new Set(errors)], viewport, documentWidth, headline: heading?.textContent.trim(), headingBounds: heading ? rectOf(heading) : null, robots, canonical };
  });
}

async function enlargeText(page) {
  await page.evaluate(() => {
    // Text-only zoom simulation: snapshot first so nested elements do not compound.
    const sizes = [...document.querySelectorAll("body, body *")].map(node => {
      const style = getComputedStyle(node);
      return [node, parseFloat(style.fontSize), style.lineHeight === "normal" ? null : parseFloat(style.lineHeight)];
    });
    for (const [node, fontSize, lineHeight] of sizes) {
      node.style.setProperty("font-size", `${fontSize * 2}px`, "important");
      if (lineHeight !== null) node.style.setProperty("line-height", `${lineHeight * 2}px`, "important");
    }
  });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function layoutCase(route, width, textZoom = false) {
  const { context, network } = await freshContext(width);
  try {
    const page = await context.newPage();
    const pageErrors = [];
    page.on("pageerror", error => pageErrors.push(error.message));
    await ready(page, route);
    if (textZoom) await enlargeText(page);
    if (args.includes("--screenshots") && !textZoom) {
      const folder = path.join(site, "output/playwright");
      await fs.mkdir(folder, { recursive: true });
      await page.screenshot({ path: path.join(folder, `${width}-${route.replace(/[^a-z0-9]/gi, "_") || "home"}.png`), fullPage: false });
    }
    const metrics = await geometry(page);
    assert.deepEqual(metrics.errors, [], JSON.stringify(metrics, null, 2));
    assert.deepEqual(pageErrors, [], "Browser errors");
    assert.deepEqual(network.analytics, [], "Preview attempted analytics network requests");
    assert.deepEqual(network.writes, [], "Preview attempted a non-read request");
    if (!textZoom && width === 390 && !args.includes("--skip-axe")) {
      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      const violations = axe.violations.map(item => ({ id: item.id, impact: item.impact, targets: item.nodes.slice(0, 3).map(node => node.target) }));
      assert.deepEqual(violations, [], `Accessibility: ${JSON.stringify(violations)}`);
    }
    return { ...metrics, textZoom: textZoom ? "synthetic 200% text-only enlargement" : "100%", blockedExternalRequests: network.external };
  } finally { await context.close(); }
}

async function menuCase(mode, delayed = false, routePath = "/") {
  let release;
  const gate = delayed ? new Promise(resolve => { release = resolve; }) : undefined;
  const { context, network } = await freshContext(390, { javaScriptEnabled: delayed, scriptGate: gate });
  try {
    const page = await context.newPage();
    await page.goto(new URL(routePath, base).href, { waitUntil: delayed ? "commit" : "domcontentloaded" });
    await page.locator("main h1").waitFor({ state: "visible", timeout: 10_000 });
    const summary = page.locator('nav[aria-label="Primary navigation"] details summary');
    await summary.waitFor({ state: "visible" });
    assert.equal(await summary.count(), 1, "Expected one native mobile disclosure");
    if (mode === "keyboard") {
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()), "Skip to main content", "Fresh first Tab must focus skip link");
      for (let index = 0; index < 25 && !await summary.evaluate(node => node === document.activeElement); index += 1) await page.keyboard.press("Tab");
      assert.equal(await summary.evaluate(node => node === document.activeElement), true, "Native summary must be reachable using Tab");
      await page.keyboard.press("Enter");
    } else {
      // First pointer activation; do not synthesize an earlier pointerdown.
      await summary.click();
    }
    assert.equal(await summary.evaluate(node => node.parentElement.open), true, "First activation must open the native menu");
    if (delayed) {
      assert.ok(network.delayedScripts.length > 0, "Test did not intercept any scripts; delayed-JS condition was not exercised");
      release();
      await page.waitForLoadState("networkidle", { timeout: 20_000 });
      await page.waitForFunction(() => document.documentElement.dataset.prerenderReady === "true", undefined, { timeout: 20_000 });
      assert.equal(await summary.evaluate(node => node.parentElement.open), true, "Hydration closed the menu the user had already opened");
    }
    const link = page.locator('#mobile-navigation a[href="/services"]');
    await link.waitFor({ state: "visible" });
    if (mode === "keyboard") {
      await page.keyboard.press("Tab");
      assert.equal(await link.evaluate(node => node === document.activeElement), true, "The opened menu must expose its first link to keyboard navigation");
      await page.keyboard.press("Enter");
    } else await link.click();
    await page.waitForURL(url => url.origin === base.origin && url.pathname === "/services");
    await page.locator("main h1").waitFor({ state: "visible" });
    assert.match(await page.locator("main h1").innerText(), /commercial lending services/i, "Native menu must navigate to actual prerendered content");
    return { mode, delayedJavaScript: delayed, scriptsDelayed: network.delayedScripts.length, destination: page.url() };
  } finally {
    release?.();
    await context.close();
  }
}

async function formCase(route, name) {
  const { context, network } = await freshContext(390);
  try {
    const page = await context.newPage();
    await ready(page, route);
    await page.evaluate(() => { window.gtag = (...args) => window.__designQaAnalytics.push(args); });
    const form = page.locator(`form[name="${name}"]`).filter({ has: page.locator('button[type="submit"]') });
    assert.equal(await form.count(), 1, "Expected one visible interactive form");
    await form.locator('input[name="name"]').fill("Preview QA");
    await form.locator('input[name="email"]').fill("preview-qa@example.invalid");
    for (const [field, value] of [["phone", "0400000000"], ["business", "Preview QA"], ["loanAmount", "500000"]]) {
      const input = form.locator(`input[name="${field}"]`);
      if (await input.count()) await input.fill(value);
    }
    await form.locator('button[type="submit"]').click();
    await page.waitForFunction(() => [...document.querySelectorAll('[role="status"], [role="alert"], [data-state="open"]')].some(node => /preview/i.test(node.textContent || "") && /simulat|not sent|no .*sent|nothing.*sent/i.test(node.textContent || "")), undefined, { timeout: 5_000 });
    const analytics = await page.evaluate(() => window.__designQaAnalytics);
    assert.deepEqual(network.writes, [], "Simulated form attempted a POST or another write request; request was blocked");
    assert.deepEqual(network.analytics, [], "Preview attempted an analytics network request; request was blocked");
    assert.deepEqual(analytics, [], "Preview called gtag, including generate_lead");
    return { form: name, writeRequests: 0, analyticsRequests: 0, analyticsCalls: 0, explicitPreviewConfirmation: true };
  } finally { await context.close(); }
}

try {
  for (const route of routes) for (const width of widths) await check(`layout ${width}px ${route}`, () => layoutCase(route, width));
  for (const route of routes) for (const width of [320, 768, 1440]) await check(`text enlargement 200% ${width}px ${route}`, () => layoutCase(route, width, true));
  if (args.includes("--dev")) {
    results.push({ name: "Native navigation without/during JavaScript", status: "skipped", reason: "--dev selected; run again against complete prerendered output to accept these requirements." });
  } else {
    for (const mode of ["click", "keyboard"]) await check(`no-JS mobile first ${mode}`, () => menuCase(mode));
    for (const route of ["/", "/resources/guides/commercial-property-loans-australia-complete-guide"]) for (const mode of ["click", "keyboard"]) await check(`delayed-JS mobile first ${mode} ${route}`, () => menuCase(mode, true, route));
  }
  await check("preview homepage enquiry isolation", () => formCase("/", "homepage-contact"));
  await check("preview contact enquiry isolation", () => formCase("/contact", "contact"));
} finally {
  await browser.close();
  const report = {
    startedAt, finishedAt: new Date().toISOString(), baseUrl: base.href, site,
    assumptions: ["Preview build with noindex and form simulation enabled", "Network writes and external requests are blocked and recorded", "No-JS and delayed-JS checks require prerendered pages", "200% check synthetically doubles computed fonts and line heights; it is not a browser UI zoom test", "This script does not assess private hosting access control or real-user performance"],
    summary: { total: results.length, passed: results.filter(r => r.status === "pass").length, failed: results.filter(r => r.status === "fail").length, skipped: results.filter(r => r.status === "skipped").length },
    results,
  };
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(report.summary)}\nReport: ${output}\n`);
  process.exitCode = report.summary.failed || report.summary.skipped ? 1 : 0;
}
