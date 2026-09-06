import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { submitEnquiry } from "../../src/lib/enquiry-submission";
import { normaliseTransactionPurpose, TRANSACTION_JOURNEYS } from "../../src/lib/transactions";
import { registerAnalyticsPaths, safeAnalyticsPath, landingCategory, trackLead } from "../../src/lib/analytics";

function form() {
  const data = new FormData();
  data.set("form-name", "contact");
  data.set("name", "Test Person");
  data.set("email", "test@example.invalid");
  data.set("transactionPurpose", "refinance");
  data.set("loanAmount", "$500,000");
  data.set("landingPath", "/services/refinancing-solutions");
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

test("lead analytics contains only route/category and allowlisted purpose, never enquiry data", () => {
  const calls: unknown[][] = [];
  const saved = new Map<string, string>();
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    location: { origin: "https://emetcapital.com.au", pathname: "/services/refinancing-solutions", search: "?email=private@example.invalid" },
    sessionStorage: { getItem: (key: string) => saved.get(key) ?? null, setItem: (key: string, value: string) => saved.set(key, value) },
    gtag: (...args: unknown[]) => calls.push(args),
  } });
  Object.defineProperty(globalThis, "document", { configurable: true, value: { referrer: "https://chatgpt.com/c/private-conversation?secret=123" } });
  try {
    trackLead("contact", "refinance");
    trackLead("private@example.invalid", "$500,000");
    const [, event, payload] = calls[0] as [string, string, Record<string, string>];
    assert.equal(event, "generate_lead");
    assert.equal(payload.transaction_purpose, "refinance");
    assert.equal(payload.landing_path, "/services/refinancing-solutions");
    assert.equal(payload.landing_category, "refinancing");
    assert.equal(payload.page_referrer, "https://chatgpt.com");
    assert.doesNotMatch(JSON.stringify(calls), /private@|private-conversation|secret=|500,000/);
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else Reflect.deleteProperty(globalThis, "window");
    if (previousDocument) Object.defineProperty(globalThis, "document", previousDocument);
    else Reflect.deleteProperty(globalThis, "document");
  }
});

test("both static Netlify declarations cover every named input in the shared React form", () => {
  const source = fs.readFileSync("src/components/TransactionEnquiryForm.tsx", "utf8");
  const fields = [...source.matchAll(/<(?:input|Input|select|Textarea)\b[^>]*\bname="([^"]+)"/g)].map((match) => match[1]);
  const html = fs.readFileSync("index.html", "utf8");
  for (const formName of ["contact", "homepage-contact"]) {
    const declaration = html.match(new RegExp('<form name="' + formName + '"[^>]*>[\\s\\S]*?</form>'))?.[0];
    assert.ok(declaration, formName);
    for (const field of fields) assert.ok(declaration.includes('name="' + field + '"'), formName + " is missing " + field);
  }
});
