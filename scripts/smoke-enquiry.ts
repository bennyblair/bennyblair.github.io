import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright";

const root = process.cwd();
const dist = path.join(root, "dist");
const output = path.join(root, "output/playwright");
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
const posts: URLSearchParams[] = [];
let responseStatus = 200;
let blockedExternal = 0;
const mime: Record<string, string> = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".mp4": "video/mp4" };

// Serve only local built assets through interception. No request reaches Netlify, analytics or another external server.
await context.route("**/*", async (route) => {
  const url = new URL(route.request().url());
  if (!["enquiry-check.invalid", "localhost"].includes(url.hostname)) {
    blockedExternal += 1;
    await route.abort();
    return;
  }
  if (route.request().method() === "POST") {
    posts.push(new URLSearchParams(route.request().postData() || ""));
    await route.fulfill({ status: responseStatus, body: responseStatus === 200 ? "Accepted in isolated test" : "Test failure" });
    return;
  }
  const relative = decodeURIComponent(url.pathname).slice(1);
  const candidate = path.resolve(dist, relative);
  if (!candidate.startsWith(dist + path.sep) && candidate !== dist) { await route.abort(); return; }
  const asset = path.extname(relative) ? candidate : path.join(dist, "index.html");
  try {
    await route.fulfill({ status: 200, contentType: mime[path.extname(asset)] || "application/octet-stream", body: await fs.readFile(asset) });
  } catch { await route.fulfill({ status: 404, body: "Missing test asset" }); }
});

const page = await context.newPage();
const errors: string[] = [];
page.on("pageerror", (error) => errors.push(error.message));
const leadCount = async (tab: Page) => tab.evaluate(() => (window.dataLayer || []).filter((item) => Array.from(item as ArrayLike<unknown>)[1] === "generate_lead").length);
const snapshot = async (name: string) => {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((offset) => window.scrollTo(0, offset), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(output, name + ".png"), fullPage: true, style: ".homepage-page > section { content-visibility: visible !important; }" });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), name + " overflows mobile viewport");
};
const contactDetails = async (formName: string) => {
  await page.getByRole("button", { name: "Continue to contact details" }).click();
  await page.locator("#" + formName + "-name").fill("Isolated Test");
  await page.locator("#" + formName + "-email").fill("test@example.invalid");
};
const submit = () => page.getByRole("button", { name: "Submit business finance enquiry" }).click();

try {
  await page.goto("https://enquiry-check.invalid/services/refinancing-solutions?email=private@example.invalid");
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.locator('a[href="/contact?purpose=refinance"]').first().click();
  await page.getByRole("heading", { level: 1, name: "Discuss Your Business Finance Transaction" }).waitFor();
  assert.equal(await page.locator("#contact-purpose").inputValue(), "refinance");
  await page.locator("#contact-amount").fill("$500,000");
  await page.locator("#contact-timing").fill("30 September");
  await snapshot("contact-mobile-transaction");
  await contactDetails("contact");
  await page.getByText("Add property and repayment details (optional)", { exact: true }).click();
  await page.locator("#contact-security-type").selectOption("residential");
  await page.locator("#contact-security-location").fill("Private suburb");
  await page.locator("#contact-security-value").fill("$1,200,000");
  await page.locator("#contact-existing-debt").fill("$300,000");
  await page.locator("#contact-repayment").fill("Private repayment information");
  await page.locator("#contact-message").fill("Private message");
  await snapshot("contact-mobile-details");

  responseStatus = 500;
  await submit();
  await page.getByRole("alert").filter({ hasText: "could not be submitted" }).waitFor();
  assert.equal(await leadCount(page), 0);
  assert.equal(await page.locator("#contact-name").inputValue(), "Isolated Test");
  responseStatus = 200;
  await submit();
  await page.getByRole("status").filter({ hasText: "Your enquiry has been submitted" }).waitFor();
  assert.equal(await leadCount(page), 1);
  assert.equal(posts.length, 2);
  assert.equal(posts[1].get("form-name"), "contact");
  assert.equal(posts[1].get("transactionPurpose"), "refinance");
  assert.equal(posts[1].get("loanAmount"), "$500,000");
  assert.equal(posts[1].get("securityType"), "residential");
  assert.equal(posts[1].get("landingPath"), "/services/refinancing-solutions");
  assert.equal(posts[1].get("landingCategory"), "refinancing");
  const analytics = await page.evaluate(() => JSON.stringify(window.dataLayer));
  assert.doesNotMatch(analytics, /private@example|test@example|Isolated Test|500,000|Private suburb|1,200,000|300,000|Private repayment|Private message/);
  await snapshot("contact-mobile-success");

  // Homepage has the same four journeys and a separate Netlify form name.
  await page.goto("https://enquiry-check.invalid/");
  await page.getByRole("heading", { level: 1 }).waitFor();
  assert.equal(await page.locator("[data-analytics-event=transaction_journey_select]").count(), 4);
  assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1);
  await snapshot("homepage-mobile");
  await page.locator(".homepage-page > section:first-child").screenshot({ path: path.join(output, "homepage-mobile-hero.png") });
  await page.locator("#homepage-contact-purpose").selectOption("equity_release");
  await contactDetails("homepage-contact");
  await page.locator(".home-contact-card").screenshot({ path: path.join(output, "homepage-mobile-contact-details.png") });
  await submit();
  await page.getByRole("status").filter({ hasText: "Your enquiry has been submitted" }).waitFor();
  assert.equal(posts.at(-1)?.get("form-name"), "homepage-contact");
  assert.equal(posts.at(-1)?.get("transactionPurpose"), "equity_release");
  assert.equal(await leadCount(page), 1);

  // Analytics failures must not encourage duplicate submissions after server acceptance.
  await page.goto("https://enquiry-check.invalid/contact");
  await page.locator("#contact-purpose").selectOption("bridge");
  await contactDetails("contact");
  await page.evaluate(() => { window.gtag = () => { throw new Error("Analytics unavailable in test"); }; });
  await submit();
  await page.getByRole("status").filter({ hasText: "Your enquiry has been submitted" }).waitFor();

  // Production-built code on localhost must still avoid simulated leads and network submissions.
  const preview = await context.newPage();
  await preview.goto("http://localhost/contact");
  await preview.locator("#contact-purpose").selectOption("purchase");
  await preview.getByRole("button", { name: "Continue to contact details" }).click();
  await preview.locator("#contact-name").fill("Preview Test");
  await preview.locator("#contact-email").fill("preview@example.invalid");
  const before = posts.length;
  await preview.getByRole("button", { name: "Submit business finance enquiry" }).click();
  await preview.getByRole("status").filter({ hasText: "Preview only" }).waitFor();
  assert.equal(posts.length, before);
  assert.equal(await leadCount(preview), 0);

  for (const service of ["commercial-property-finance", "refinancing-solutions", "bridging-finance", "first-second-mortgages", "caveat-loans"]) {
    await page.goto("https://enquiry-check.invalid/services/" + service);
    await page.getByRole("heading", { level: 1 }).waitFor();
    assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1, service);
    assert.ok((await page.locator("main").innerText()).includes("residential or commercial"), service);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), service + " overflows");
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("https://enquiry-check.invalid/");
  await page.getByRole("heading", { level: 1 }).waitFor();
  await snapshot("homepage-desktop");
  await page.locator(".homepage-page > section:first-child").screenshot({ path: path.join(output, "homepage-desktop-hero.png") });
  assert.equal(await page.locator(".homepage-page > section:first-child video").count(), 0);
  assert.equal(await page.locator(".home-contact-form").count(), 1);
  assert.equal(await page.locator(".home-process.emet-funnel-section").count(), 1);
  await page.locator(".home-contact-card").screenshot({ path: path.join(output, "homepage-desktop-contact-transaction.png") });
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ status: "pass", interceptedPosts: posts.length, realExternalRequests: 0, externalRequestsBlocked: blockedExternal, screenshots: output, checks: ["mobile and desktop", "four journeys", "service-purpose prefill", "failed submission retains data and emits no lead", "accepted contact/home forms emit one lead", "private fields excluded from analytics", "landing category retained", "localhost preview does not send or count", "five service pages"] }, null, 2));
} finally {
  await browser.close();
}
