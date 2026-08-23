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
  featuredImage: "/images/articles/merchant-cash-advance-alternatives-australia.webp",
  featuredImageAlt: "Australian business owners comparing working-capital funding options",
  designatedServicePage: "/services/working-capital",
  contentRisk: "low",
  sources: [{ label: "business.gov.au — Apply for a business loan", url: "https://business.gov.au/finance/funding/apply-for-a-business-loan" }],
};

function informativeParagraph(index: number) {
  const decisions = [
    "invoice timing and debtor concentration before choosing invoice finance",
    "supplier deposits and shipping documents before considering trade finance",
    "seasonal stock turnover and gross margin before funding inventory",
    "daily card receipts and remittance pressure before replacing a cash advance",
    "property security and an exit event before considering a secured facility",
    "tax liabilities and an agreed payment schedule before funding an ATO balance",
    "equipment useful life and residual value before entering an asset facility",
    "contract milestones and certification timing before funding project work",
    "acquisition completion accounts and vendor terms before funding a purchase",
    "refinance deadlines and lender discharge requirements before settlement",
  ];
  return `Scenario ${index} examines ${decisions[index - 1]}. It identifies the documents a lender is likely to request, tests what happens when the expected receipt is delayed, and records the commercial stop condition that would make the structure unsuitable. The explanation also distinguishes general information from advice that may require an accountant, lawyer or licensed adviser. The resulting decision note states the funding purpose, repayment event, downside case and next verification step in language a business owner can use.`;
}

function validBody({ includeFaq = false } = {}) {
  const sections = Array.from(
    { length: 10 },
    (_, index) => `## Decision Area ${index + 1}\n\n${informativeParagraph(index + 1)}`,
  ).join("\n\n");
  const faq = includeFaq
    ? `\n\n## Frequently Asked Questions\n\n${Array.from(
        { length: 3 },
        (_, index) => {
          const answers = [
            "Compare the total dollar cost with the timing and reliability of the cash receipt expected to repay the facility.",
            "Check whether the lender requires property, receivables or another asset as security, and understand the enforcement consequences.",
            "Stress-test a delay in customer payment or settlement and confirm the business can still meet wages, tax and supplier obligations.",
          ];
          return `### What should a business compare in scenario ${index + 1}?\n\n${answers[index]}`;
        },
      ).join("\n\n")}`
    : "";

  return [
    "A direct answer for business owners comparing finance against the cash-flow event that created the funding need.",
    "[Working capital service](/services/working-capital), [invoice finance](/resources/guides/invoice-finance-australia-complete-guide), and [business lines of credit](/resources/guides/business-line-of-credit-australia) provide relevant next steps.",
    sections,
    faq,
    "## Related Guides",
    "- [Working Capital Loans](/resources/guides/working-capital-loans-for-smes)",
    "- [Trade Finance](/resources/guides/trade-finance-in-australia-how-it-helps-businesses-manage-imports)",
    "This article is for informational purposes only and does not constitute financial advice.",
  ].join("\n\n");
}

const imageInfo = () => ({ exists: true, bytes: 180_000, width: 1200, height: 630, format: "webp" });

test("accepts a concise reader-first article without forcing an FAQ or ten links", () => {
  const result = validateArticlePublicationContract({ data: validData, body: validBody(), imageInfo });
  assert.deepEqual(result.errors, []);
  assert.equal(result.metrics.faqPresent, false);
  assert.ok(result.metrics.internalLinks < 10);
});

test("accepts an intent-led FAQ with three standalone answers", () => {
  const result = validateArticlePublicationContract({ data: validData, body: validBody({ includeFaq: true }), imageInfo });
  assert.deepEqual(result.errors, []);
  assert.equal(result.metrics.faqQuestions, 3);
});

test("blocks internal QA labels, destructive metadata truncation, and placeholder media", () => {
  const result = validateArticlePublicationContract({
    data: {
      ...validData,
      metaTitle: "Merchant Cash Advance Alternatives for Australian...",
      featuredImage: "/placeholder.svg",
    },
    body: validBody().replace("## Decision Area 1", "## LLM-Readiness QA Summary"),
    imageInfo,
  });

  assert.ok(result.errors.some((error: string) => error.includes("internal editorial")));
  assert.ok(result.errors.some((error: string) => error.includes("truncation ellipsis")));
  assert.ok(result.errors.some((error: string) => error.includes("placeholder.svg")));
});

test("blocks duplicate H1s, heading skips, oversized media, and missing sources", () => {
  const result = validateArticlePublicationContract({
    data: { ...validData, sources: [] },
    body: validBody().replace("## Decision Area 1", "# Repeated Page Title").replace("## Decision Area 2", "#### Skipped Heading"),
    imageInfo: () => ({ exists: true, bytes: 400_000, width: 900, height: 900, format: "png" }),
  });

  assert.ok(result.errors.some((error: string) => error.includes("must not contain an H1")));
  assert.ok(result.errors.some((error: string) => error.includes("first body heading")));
  assert.ok(result.errors.some((error: string) => error.includes("250 KB")));
  assert.ok(result.errors.some((error: string) => error.includes("authoritative source")));
});

test("blocks near-duplicate reader paragraphs", () => {
  const repeated = "A lender compares cash flow, repayment timing, available security and the documented business purpose before assessing whether the commercial facility fits. The borrower should test a delayed-receipt scenario and identify the source that will clear the debt.";
  const body = validBody().replace(informativeParagraph(1), repeated).replace(informativeParagraph(2), `${repeated} This second copy adds only a few words.`);
  const result = validateArticlePublicationContract({ data: validData, body, imageInfo });
  assert.ok(result.errors.some((error: string) => error.includes("near-duplicate paragraphs")));
});
