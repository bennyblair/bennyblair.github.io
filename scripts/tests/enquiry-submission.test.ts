import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { createEnquiryId, submitEnquiry, submitNetlifyForm } from "../../src/lib/enquiry-submission";
import { enquiryPurposeLabel, normaliseTransactionPurpose, TRANSACTION_JOURNEYS } from "../../src/lib/transactions";
import { registerAnalyticsPaths, resetLandingAttributionForTests, safeAnalyticsPath, landingCategory, trackLead } from "../../src/lib/analytics";

function form() {
  const data = new FormData();
  data.set("form-name", "contact");
  data.set("name", "Test Person");
  data.set("email", "test@example.invalid");
  data.set("transactionPurpose", "refinance");
  data.set("loanAmount", "$500,000");
  data.set("landingPath", "/services/refinancing-solutions");
  data.set("enquiryId", "550e8400-e29b-41d4-a716-446655440000");
  data.set("trafficChannel", "paid");
  data.set("utm_source", "google");
  data.set("utm_medium", "cpc");
  data.set("utm_campaign", "brand");
  return data;
}

function newsletterForm() {
  const data = new FormData();
  data.set("form-name", "newsletter");
  data.set("email", "news@example.invalid");
  data.set("sourcePath", "/resources/insights");
  return data;
}

test("Netlify acceptance preserves form names and encodes fields without logging them", async () => {
  let calls = 0;
  const send: typeof fetch = async (url, options) => {
    calls += 1;
    assert.equal(url, "/");
    assert.equal(options?.method, "POST");
    assert.deepEqual(options?.headers, { "Content-Type": "application/x-www-form-urlencoded" });
    const body = new URLSearchParams(String(options?.body));
    assert.equal(body.get("form-name"), "contact");
    assert.equal(body.get("loanAmount"), "$500,000");
    assert.equal(body.get("transactionPurpose"), "refinance");
    assert.equal(body.get("email"), "test@example.invalid");
    assert.equal(body.get("enquiryId"), "550e8400-e29b-41d4-a716-446655440000");
    assert.equal(body.get("trafficChannel"), "paid");
    assert.equal(body.get("utm_source"), "google");
    assert.equal(body.get("utm_medium"), "cpc");
    assert.equal(body.get("utm_campaign"), "brand");
    return new Response("", { status: 200 });
  };
  assert.equal(await submitEnquiry(form(), false, send), "accepted");
  assert.equal(calls, 1);
});

test("preview, honeypot, failed HTTP and network responses cannot be accepted enquiries", async () => {
  const noNetwork: typeof fetch = async () => { throw new Error("Network must not run"); };
  assert.equal(await submitEnquiry(form(), true, noNetwork), "preview");
  const bot = form();
  bot.set("bot-field", "bot");
  assert.equal(await submitEnquiry(bot, false, noNetwork), "ignored");
  await assert.rejects(submitEnquiry(form(), false, async () => new Response("", { status: 500 })));
  await assert.rejects(submitEnquiry(form(), false, noNetwork));
});

test("transaction values are a fixed allowlist with four equal core journeys", () => {
  assert.deepEqual(TRANSACTION_JOURNEYS.map((journey) => journey.value), ["purchase", "refinance", "bridge", "equity_release"]);
  assert.equal(normaliseTransactionPurpose("purchase"), "purchase");
  assert.equal(normaliseTransactionPurpose("private_lending"), "private_lending");
  assert.equal(enquiryPurposeLabel("private_lending"), "Private lending");
  assert.equal(normaliseTransactionPurpose("test@example.invalid $500,000"), "not_provided");
  assert.equal(normaliseTransactionPurpose(null), "not_provided");
});

test("attribution retains public landing paths and rejects query, fragment and unknown paths", () => {
  registerAnalyticsPaths(["/services/refinancing-solutions", "/resources/guides/second-mortgages-for-business-guide"]);
  assert.equal(safeAnalyticsPath("/services/refinancing-solutions?email=private@example.invalid#balance"), "/services/refinancing-solutions");
  assert.equal(safeAnalyticsPath("/services/unregistered-private-name"), "/unknown");
  assert.equal(safeAnalyticsPath("/contact/"), "/contact");
  assert.equal(landingCategory("/services/refinancing-solutions"), "refinancing");
  assert.equal(landingCategory("/resources/guides/second-mortgages-for-business-guide"), "mortgages");
});

test("enquiry ids are unguessable UUIDs and are not derived from personal data", () => {
  const first = createEnquiryId();
  const second = createEnquiryId();
  assert.notEqual(first, second);
  assert.match(first, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  assert.doesNotMatch(first, /@|utm_|enquiry/i);
});

test("lead analytics contains only route/category and allowlisted purpose, never enquiry data", () => {
  const calls: unknown[][] = [];
  const session = new Map<string, string>();
  const local = new Map<string, string>();
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  resetLandingAttributionForTests();
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    location: { origin: "https://emetcapital.com.au", pathname: "/services/refinancing-solutions", search: "?utm_source=google&utm_medium=cpc&utm_campaign=brand&email=private@example.invalid" },
    sessionStorage: { getItem: (key: string) => session.get(key) ?? null, setItem: (key: string, value: string) => session.set(key, value) },
    localStorage: { getItem: (key: string) => local.get(key) ?? null, setItem: (key: string, value: string) => local.set(key, value), removeItem: (key: string) => local.delete(key) },
    gtag: (...args: unknown[]) => calls.push(args),
  } });
  Object.defineProperty(globalThis, "document", { configurable: true, value: { referrer: "https://chatgpt.com/c/private-conversation?secret=123" } });
  try {
    const enquiryId = "550e8400-e29b-41d4-a716-446655440000";
    trackLead("contact", "refinance", enquiryId);
    trackLead("private@example.invalid", "$500,000");
    const [, event, payload] = calls[0] as [string, string, Record<string, string>];
    assert.equal(event, "generate_lead");
    assert.equal(payload.transaction_purpose, "refinance");
    assert.equal(payload.landing_path, "/services/refinancing-solutions");
    assert.equal(payload.landing_category, "refinancing");
    assert.equal(payload.enquiry_id, enquiryId);
    assert.equal(payload.traffic_channel, "ai");
    assert.equal(payload.utm_source, "google");
    assert.equal(payload.utm_medium, "cpc");
    assert.equal(payload.utm_campaign, "brand");
    assert.equal(payload.page_referrer, "https://chatgpt.com");
    assert.equal(payload.send_to, "G-2FJ6VHKZ2Z");
    assert.deepEqual(calls[1], ["event", "conversion", {
      send_to: "AW-16887067533/w2SACJ7PzssaEI3nsPQ-",
      value: 1,
      currency: "AUD",
    }]);
    assert.equal(calls.length, 4);
    assert.doesNotMatch(JSON.stringify(calls), /private@|private-conversation|secret=|500,000/);
    assert.doesNotMatch([...session.values(), ...local.values()].join(), /private@|private-conversation|secret=/);
  } finally {
    resetLandingAttributionForTests();
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else Reflect.deleteProperty(globalThis, "window");
    if (previousDocument) Object.defineProperty(globalThis, "document", previousDocument);
    else Reflect.deleteProperty(globalThis, "document");
  }
});

test("both static Netlify declarations cover every named input in the shared React form", () => {
  const source = fs.readFileSync("src/components/TransactionEnquiryForm.tsx", "utf8");
  const fields = [...source.matchAll(/name="([^"]+)"/g)].map((match) => match[1]);
  const html = fs.readFileSync("index.html", "utf8");
  for (const formName of ["contact", "homepage-contact"]) {
    const declaration = html.match(new RegExp('<form name="' + formName + '"[^>]*>[\\s\\S]*?</form>'))?.[0];
    assert.ok(declaration, formName);
    for (const field of fields) assert.ok(declaration.includes('name="' + field + '"'), formName + " is missing " + field);
  }
});

test("the newsletter Netlify declaration covers every named input on the insights form", () => {
  const source = fs.readFileSync("src/pages/MarketInsights.tsx", "utf8");
  const fields = [...source.matchAll(/name="([^"]+)"/g)].map((match) => match[1]);
  const html = fs.readFileSync("index.html", "utf8");
  const declaration = html.match(/<form name="newsletter"[^>]*>[\s\S]*?<\/form>/)?.[0];
  assert.ok(declaration);
  for (const field of fields) assert.ok(declaration.includes('name="' + field + '"'), "newsletter is missing " + field);
  assert.match(source, /submitNetlifyForm/);
  assert.doesNotMatch(source, /trackLead|trackEnquiryStep|console\.log/);
});

test("newsletter signup posts the address to Netlify and is not a generate_lead", async () => {
  let calls = 0;
  const send: typeof fetch = async (url, options) => {
    calls += 1;
    assert.equal(url, "/");
    const body = new URLSearchParams(String(options?.body));
    assert.equal(body.get("form-name"), "newsletter");
    assert.equal(body.get("email"), "news@example.invalid");
    assert.equal(body.get("sourcePath"), "/resources/insights");
    return new Response("", { status: 200 });
  };
  assert.equal(await submitNetlifyForm(newsletterForm(), false, send), "accepted");
  assert.equal(calls, 1);
  const noNetwork: typeof fetch = async () => { throw new Error("Network must not run"); };
  assert.equal(await submitNetlifyForm(newsletterForm(), true, noNetwork), "preview");
  const bot = newsletterForm();
  bot.set("bot-field", "bot");
  assert.equal(await submitNetlifyForm(bot, false, noNetwork), "ignored");
});

test("the deployed tag loader and analytics module use the same GA4 stream", () => {
  const html = fs.readFileSync("index.html", "utf8");
  const analyticsSource = fs.readFileSync("src/lib/analytics.ts", "utf8");
  const ids = [...html.matchAll(/G-[A-Z0-9]+/g)].map((match) => match[0]);
  assert.ok(ids.length >= 2, "GA4 stream must configure and load the Google tag");
  assert.equal(new Set(ids).size, 1, "GA4 config and script loader IDs must match");
  assert.match(analyticsSource, new RegExp(`ga4: ["']${ids[0]}["']`));
  assert.doesNotMatch(
    html,
    /gtag\(["']config["'],\s*["']AW-/,
    "the shared production Google tag must not load the retired Analytics destination through a standalone Ads config",
  );
});

test("production CSP permits every Google measurement endpoint used by the tag", () => {
  const netlify = fs.readFileSync("netlify.toml", "utf8");
  const scriptSrc = netlify.match(/script-src ([^;]+);/)?.[1] ?? "";
  const connectSrc = netlify.match(/connect-src ([^;]+);/)?.[1] ?? "";
  assert.match(
    scriptSrc,
    /https:\/\/googleads\.g\.doubleclick\.net/,
    "Google form-start measurement script is blocked by script-src",
  );
  for (const endpoint of [
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://analytics.google.com",
    "https://googleads.g.doubleclick.net",
    "https://stats.g.doubleclick.net",
    "https://ad.doubleclick.net",
  ]) {
    assert.match(connectSrc, new RegExp(endpoint.replaceAll(".", "\\.")), `${endpoint} is blocked by connect-src`);
  }
});
