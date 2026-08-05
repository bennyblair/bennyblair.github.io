import assert from "node:assert/strict";
import test from "node:test";
import { classifyAiReferral } from "../../src/lib/analytics";

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
});
