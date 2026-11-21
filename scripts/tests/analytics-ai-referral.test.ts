import assert from "node:assert/strict";
import test from "node:test";
import {
  AI_ASSIST_RETENTION_MS,
  classifyAiReferral,
  classifyTrafficChannel,
  getLandingAttribution,
  parseAiTouch,
  referrerHostname,
  registerAnalyticsPaths,
  resetLandingAttributionForTests,
  sanitiseCampaignValue,
} from "../../src/lib/analytics";

function memoryStorage() {
  const saved = new Map<string, string>();
  return {
    getItem: (key: string) => saved.get(key) ?? null,
    setItem: (key: string, value: string) => { saved.set(key, value); },
    removeItem: (key: string) => { saved.delete(key); },
    values: () => [...saved.values()],
  };
}

function withAnalyticsRuntime(
  options: {
    pathname: string;
    search?: string;
    referrer?: string;
    sessionStorage: ReturnType<typeof memoryStorage>;
    localStorage?: ReturnType<typeof memoryStorage>;
  },
  run: () => void,
) {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      location: { origin: "https://emetcapital.com.au", pathname: options.pathname, search: options.search ?? "" },
      sessionStorage: options.sessionStorage,
      localStorage: options.localStorage ?? memoryStorage(),
    },
  });
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: { referrer: options.referrer ?? "" },
  });
  try {
    resetLandingAttributionForTests();
    run();
  } finally {
    resetLandingAttributionForTests();
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else Reflect.deleteProperty(globalThis, "window");
    if (previousDocument) Object.defineProperty(globalThis, "document", previousDocument);
    else Reflect.deleteProperty(globalThis, "document");
  }
}

test("classifies supported AI referrers without retaining full URLs", () => {
  assert.deepEqual(classifyAiReferral("https://chatgpt.com/c/secret-conversation?private=1"), {
    aiSource: "chatgpt",
    detectionMethod: "referrer",
  });
  assert.deepEqual(classifyAiReferral("https://www.perplexity.ai/search?q=sensitive"), {
    aiSource: "perplexity",
    detectionMethod: "referrer",
  });
  assert.deepEqual(classifyAiReferral("https://copilot.microsoft.com/chats/abc"), {
    aiSource: "copilot",
    detectionMethod: "referrer",
  });
});
test("uses explicit AI campaign parameters and supports an unknown source", () => {
  assert.deepEqual(classifyAiReferral("", "?utm_source=chatgpt&utm_medium=referral"), {
    aiSource: "chatgpt",
    detectionMethod: "campaign",
  });
  assert.deepEqual(classifyAiReferral("", "?utm_source=unlisted-assistant&utm_medium=ai"), {
    aiSource: "unknown",
    detectionMethod: "campaign",
  });
});

test("does not misclassify ordinary search or malformed referrers", () => {
  assert.equal(classifyAiReferral("https://www.google.com/search?q=equipment+finance"), null);
  assert.equal(classifyAiReferral("https://www.bing.com/search?q=bridging+finance"), null);
  assert.equal(classifyAiReferral("not a url"), null);
  assert.equal(classifyAiReferral(""), null);
  assert.equal(classifyAiReferral("https://evilbing.com/chat"), null);
  assert.equal(classifyAiReferral("https://perplexity.ai.evil.example/search"), null);
});

test("recognises the official ChatGPT referral campaign", () => {
  assert.deepEqual(classifyAiReferral("", "?utm_source=chatgpt.com"), { aiSource: "chatgpt", detectionMethod: "campaign" });
});

test("AI-assisted attribution keeps only safe public paths and expires after 30 days", () => {
  registerAnalyticsPaths(["/services/refinancing-solutions"]);
  const now = 1791162000000;
  const touch = { aiSource: "perplexity", detectionMethod: "referrer", landingPath: "/services/refinancing-solutions", observedAt: now - 1000 };
  assert.deepEqual(parseAiTouch(JSON.stringify({ ...touch, secret: "must not be retained" }), now), touch);
  assert.equal(parseAiTouch(JSON.stringify({ ...touch, observedAt: now - AI_ASSIST_RETENTION_MS - 1 }), now), null);
  assert.equal(parseAiTouch(JSON.stringify({ ...touch, observedAt: now + 1 }), now), null);
  assert.equal(parseAiTouch(JSON.stringify({ ...touch, landingPath: "/contact?email=private@example.com" }), now), null);
  assert.equal(parseAiTouch(JSON.stringify({ ...touch, landingPath: "/private-user-path" }), now), null);
  assert.equal(parseAiTouch(JSON.stringify({ ...touch, aiSource: "arbitrary private value" }), now), null);
  assert.equal(parseAiTouch("not-json", now), null);
  assert.equal(parseAiTouch(null, now), null);
});

test("campaign values keep tokens only and drop emails, URLs and query strings", () => {
  assert.equal(sanitiseCampaignValue("chatgpt.com"), "chatgpt.com");
  assert.equal(sanitiseCampaignValue(" brand-campaign "), "brand-campaign");
  assert.equal(sanitiseCampaignValue("private@example.com"), "");
  assert.equal(sanitiseCampaignValue("https://evil.example/path"), "");
  assert.equal(sanitiseCampaignValue("foo?email=private@example.com"), "");
  assert.equal(referrerHostname("https://www.google.com/search?q=private-query"), "google.com");
  assert.equal(referrerHostname("https://chatgpt.com/c/secret-conversation?private=1"), "chatgpt.com");
  assert.equal(referrerHostname("not a url"), "");
});

test("traffic channel prefers AI, then paid, organic, referral and direct", () => {
  assert.equal(classifyTrafficChannel({ aiDetected: true, gclidPresent: true, utmMedium: "cpc", referrerHost: "google.com" }), "ai");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: true, utmMedium: "", referrerHost: "google.com" }), "paid");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "CPC", referrerHost: "" }), "paid");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "ppc", referrerHost: "" }), "paid");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "paid", referrerHost: "" }), "paid");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "paidsearch", referrerHost: "" }), "paid");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "display", referrerHost: "" }), "paid");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "cpm", referrerHost: "" }), "paid");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "organic", referrerHost: "" }), "organic");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "", referrerHost: "google.com" }), "organic");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "", referrerHost: "google.com.au" }), "organic");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "", referrerHost: "www.bing.com" }), "organic");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "", referrerHost: "search.yahoo.com" }), "organic");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "", referrerHost: "duckduckgo.com" }), "organic");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "", referrerHost: "news.example.com" }), "referral");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "", referrerHost: "evilbing.com" }), "referral");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "", referrerHost: "emetcapital.com.au" }), "direct");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "", referrerHost: "www.emetcapital.com.au" }), "direct");
  assert.equal(classifyTrafficChannel({ aiDetected: false, gclidPresent: false, utmMedium: "", referrerHost: "" }), "direct");
});

test("first-touch campaign fields persist in session storage across a later contact view", () => {
  registerAnalyticsPaths(["/services/refinancing-solutions"]);
  const session = memoryStorage();
  const local = memoryStorage();
  withAnalyticsRuntime({
    pathname: "/services/refinancing-solutions",
    search: "?utm_source=google&utm_medium=cpc&utm_campaign=brand&gclid=SECRETCLICK&email=private@example.invalid",
    referrer: "https://www.google.com/search?q=private-query",
    sessionStorage: session,
    localStorage: local,
  }, () => {
    const first = getLandingAttribution();
    assert.equal(first.traffic_channel, "paid");
    assert.equal(first.utm_source, "google");
    assert.equal(first.utm_medium, "cpc");
    assert.equal(first.utm_campaign, "brand");
    assert.equal(first.landing_path, "/services/refinancing-solutions");
    assert.doesNotMatch(session.values().join(), /SECRETCLICK|private-query|private@|https:\/\/www\.google\.com/);
  });
  withAnalyticsRuntime({
    pathname: "/contact",
    search: "",
    referrer: "https://emetcapital.com.au/services/refinancing-solutions",
    sessionStorage: session,
    localStorage: local,
  }, () => {
    const later = getLandingAttribution();
    assert.equal(later.traffic_channel, "paid");
    assert.equal(later.utm_source, "google");
    assert.equal(later.utm_medium, "cpc");
    assert.equal(later.utm_campaign, "brand");
    assert.equal(later.landing_path, "/services/refinancing-solutions");
  });
});

test("an AI first touch stays classified as ai when later campaign tags are absent", () => {
  registerAnalyticsPaths(["/services/refinancing-solutions"]);
  const session = memoryStorage();
  withAnalyticsRuntime({
    pathname: "/services/refinancing-solutions",
    search: "?utm_source=chatgpt.com&utm_medium=referral&utm_campaign=ai-assist",
    referrer: "",
    sessionStorage: session,
  }, () => {
    assert.equal(getLandingAttribution().traffic_channel, "ai");
    assert.equal(getLandingAttribution().utm_source, "chatgpt.com");
  });
  withAnalyticsRuntime({
    pathname: "/contact",
    search: "",
    referrer: "https://emetcapital.com.au/",
    sessionStorage: session,
  }, () => {
    const later = getLandingAttribution();
    assert.equal(later.traffic_channel, "ai");
    assert.equal(later.utm_source, "chatgpt.com");
    assert.equal(later.utm_medium, "referral");
    assert.equal(later.utm_campaign, "ai-assist");
  });
});
