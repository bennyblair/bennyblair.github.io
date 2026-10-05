import assert from "node:assert/strict";
import test from "node:test";
import { AI_ASSIST_RETENTION_MS, classifyAiReferral, parseAiTouch, registerAnalyticsPaths } from "../../src/lib/analytics";

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
