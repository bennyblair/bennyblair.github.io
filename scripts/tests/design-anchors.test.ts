import assert from "node:assert/strict";
import test from "node:test";
import { extractTableOfContents, getFaqHeadingId, extractFAQs } from "../../src/lib/markdown-converter";

test("contents anchors are identical for Windows and Unix article line endings", () => {
  const markdown = "## Preparing a transaction\n### Timeline\nBody\n## FAQ: Private Debt Australia\n### What is required?\nAnswer";
  const expected = [
    { id: "preparing-a-transaction", text: "Preparing a transaction", level: 2 },
    { id: "section-timeline", text: "Timeline", level: 3 },
    { id: "faq-private-debt-australia", text: "FAQ: Private Debt Australia", level: 2 },
  ];
  assert.deepEqual(extractTableOfContents(markdown), expected);
  assert.deepEqual(extractTableOfContents(markdown.replaceAll("\n", "\r\n")), expected);
});

test("separately rendered FAQ uses the contents heading anchor", () => {
  for (const heading of ["Frequently Asked Questions", "FAQ", "FAQ Section", "FAQ: Second Mortgage Application Checklist Australia"]) {
    const markdown = `## ${heading}\r\n### Question?\r\nAnswer`;
    assert.equal(getFaqHeadingId(markdown), extractTableOfContents(markdown)[0].id);
  }
});

test("FAQ answers do not absorb a trailing disclosure on Windows", () => {
  const source = "## FAQ\n### What is required?\nEvidence of the exit.\n\nGeneral information only.";
  assert.deepEqual(extractFAQs(source.replaceAll("\n", "\r\n")), extractFAQs(source));
  assert.equal(extractFAQs(source)[0].answer, "Evidence of the exit.");
});
