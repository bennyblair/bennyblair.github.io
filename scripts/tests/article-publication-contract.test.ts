import assert from "node:assert/strict";
import test from "node:test";
import { validateArticlePublicationContract } from "../lib/article-publication-contract.mjs";

const validData = {
  title: "Merchant Cash Advance Alternatives for Australian Businesses",
  description:
    "Compare merchant cash advance alternatives for Australian businesses, including invoice finance, trade finance, lines of credit and secured working capital.",
  metaTitle: "Merchant Cash Advance Alternatives Australia | Emet Capital",
  metaDescription:
    "Compare merchant cash advance alternatives for Australian businesses, including invoice finance, trade finance, lines of credit and secured working capital.",
  featuredImage: "/images/articles/merchant-cash-advance-alternatives-australia.png",
};

function validBody() {
  const links = Array.from(
    { length: 10 },
    (_, index) => `- **[Guide ${index + 1}](/resources/guides/guide-${index + 1})** — useful related guidance.`,
  ).join("\n");
  const filler = Array.from({ length: 1600 }, (_, index) => `detail${index % 200}`).join(" ");
  const faqs = Array.from(
    { length: 5 },
    (_, index) => `### What should a business compare in scenario ${index + 1}?\n\nCompare cost, timing, security, and repayment fit.`,
  ).join("\n\n");

  return [
    "A direct answer for business owners.",
    "### Related In-Depth Guides",
    links,
    "## How the Options Compare",
    filler,
    "## Related Guides",
    links,
    "## Frequently Asked Questions",
    faqs,
    "This article is for informational purposes only and does not constitute financial advice.",
  ].join("\n\n");
}

test("accepts an article that satisfies the public publishing contract", () => {
  const errors = validateArticlePublicationContract({
    data: validData,
    body: validBody(),
    imageExists: () => true,
  });
  assert.deepEqual(errors, []);
});

test("blocks internal QA labels, destructive metadata truncation, and placeholder media", () => {
  const errors = validateArticlePublicationContract({
    data: {
      ...validData,
      metaTitle: "Merchant Cash Advance Alternatives for Australian...",
      featuredImage: "/placeholder.svg",
    },
    body: validBody().replace("## How the Options Compare", "## LLM-Readiness QA Summary"),
    imageExists: () => true,
  });

  assert.ok(errors.some((error: string) => error.includes("internal editorial")));
  assert.ok(errors.some((error: string) => error.includes("truncation ellipsis")));
  assert.ok(errors.some((error: string) => error.includes("placeholder.svg")));
});

test("blocks missing FAQ depth, duplicate headings, and missing image assets", () => {
  const body = validBody()
    .replace(/### What should a business compare in scenario [45]\?[\s\S]*?(?=\n\n###|\n\nThis article)/g, "")
    .replace("## Related Guides", "## How the Options Compare");
  const errors = validateArticlePublicationContract({
    data: validData,
    body,
    imageExists: () => false,
  });

  assert.ok(errors.some((error: string) => error.includes("FAQ section must contain 5-7")));
  assert.ok(errors.some((error: string) => error.includes("duplicate H2")));
  assert.ok(errors.some((error: string) => error.includes("does not exist")));
});
