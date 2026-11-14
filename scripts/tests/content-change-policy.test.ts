import assert from "node:assert/strict";
import test from "node:test";
import {
  applyRetiredCaveatProductCopy,
  isInternalLinkOnlyChange,
  isRetiredProductCopyChange,
  normalizeInternalLinkDestinations,
} from "../lib/content-change-policy.mjs";

test("normalizes supported internal markdown, HTML and reference-link destinations", () => {
  const content = [
    "[Guide](/resources/guides/old-guide)",
    '<a href="https://emetcapital.com.au/services/bridging-finance/cities/sydney">Sydney</a>',
    "[service]: /services/refinancing-solutions \"Refinancing\"",
  ].join("\n");

  assert.equal((normalizeInternalLinkDestinations(content).match(/<internal-route>/g) || []).length, 3);
});

test("classifies a destination-only migration as link-only", () => {
  const before = "Compare [refinancing](/resources/guides/commercial-property-refinancing-solutions).\nNext step.";
  const after = "Compare [refinancing](/services/refinancing-solutions).\r\nNext step.";

  assert.equal(isInternalLinkOnlyChange(before, after), true);
});

test("does not exempt anchor text, prose, frontmatter or external-source edits", () => {
  const before = [
    "---",
    'reviewedAt: "2026-08-01"',
    "---",
    "Compare [refinancing](/resources/guides/commercial-property-refinancing-solutions).",
    "Source: https://asic.gov.au/old",
  ].join("\n");

  assert.equal(
    isInternalLinkOnlyChange(before, before.replace("[refinancing]", "[commercial refinancing]")),
    false,
  );
  assert.equal(isInternalLinkOnlyChange(before, `${before}\nNew financial guidance.`), false);
  assert.equal(isInternalLinkOnlyChange(before, before.replace("2026-08-01", "2026-08-05")), false);
  assert.equal(isInternalLinkOnlyChange(before, before.replace("asic.gov.au/old", "asic.gov.au/new")), false);
});

test("does not exempt a route migration when substantive copy also changes", () => {
  const before = "Compare [refinancing](/resources/guides/commercial-property-refinancing-solutions).";
  const after = "Always compare [refinancing](/services/refinancing-solutions) before applying.";

  assert.equal(isInternalLinkOnlyChange(before, after), false);
});

test("retires caveat product CTAs while keeping educational guide links", () => {
  const before = [
    "---",
    'designatedServicePage: "/services/caveat-loans"',
    "---",
    "Borrowers seeking a transaction assessment can review Emet Capital's [caveat loan service](/services/caveat-loans); this guide provides general information, not legal, tax or financial advice.",
    "- [Caveat Loan Service](/services/caveat-loans)",
    "See the [caveat loans Australia guide](/resources/guides/caveat-loans-australia-complete-guide).",
  ].join("\n");
  const after = applyRetiredCaveatProductCopy(before);

  assert.equal(isRetiredProductCopyChange(before, after), true);
  assert.match(after, /designatedServicePage: "\/services\/first-second-mortgages"/);
  assert.match(after, /first and second mortgages page\]\(\/services\/first-second-mortgages\)/);
  assert.doesNotMatch(after, /caveat loan service/i);
  assert.match(after, /caveat loans Australia guide\]\(\/resources\/guides\/caveat-loans-australia-complete-guide\)/);
  assert.equal(isInternalLinkOnlyChange(before, after), false);
  assert.equal(isRetiredProductCopyChange(before, `${after}\nA new financial claim.`), false);
});

test("retargets retired city product URLs to the live mortgages page", () => {
  const before = "- [Caveat Loans Sydney](/services/caveat-loans/cities/sydney)";
  const after = applyRetiredCaveatProductCopy(before);
  assert.equal(after, "- [first and second mortgages page](/services/first-second-mortgages)");
  assert.equal(isRetiredProductCopyChange(before, after), true);
});

test("removes leftover Emet compare-and-explore caveat product copy and author bios", () => {
  const before = [
    "Emet Capital helps borrowers compare private lending mortgages with [bank lending](/resources/guides/private-lending-vs-bank-lending-which-is-better), commercial property loans, second mortgages, caveat loans, and refinance options.",
    "Ready to explore quick caveat loan options for your urgent funding needs? Engage with experienced finance brokers specialising in caveat lending who can match you with lenders genuinely capable of delivering speed, prepare your application comprehensively to eliminate common delays, and provide realistic timeline expectations based on your specific circumstances and property characteristics.",
    "Ben is a commercial finance broker at Emet Capital with 10 years' experience in private lending. He specialises in operational finance guides, scenario walkthroughs, and case studies across caveat loans, second mortgages, bridging finance, commercial property finance, private lending, and business finance for SMEs and property investors.",
    "Daniel is the Director at Emet Capital with 10 years' experience in commercial finance and private lending. He focuses on market commentary, lender behaviour, and strategic comparisons across caveat loans, second mortgages, bridging finance, commercial property finance, private lending, and business finance for SMEs and property investors.",
  ].join("\n");
  const after = applyRetiredCaveatProductCopy(before);

  assert.equal(isRetiredProductCopyChange(before, after), true);
  assert.doesNotMatch(after, /compare.*caveat loans/i);
  assert.doesNotMatch(after, /explore quick caveat loan options/i);
  assert.doesNotMatch(after, /specialising in caveat lending/i);
  assert.doesNotMatch(after, /across caveat loans, second mortgages/);
  assert.match(after, /first and second mortgages page\]\(\/services\/first-second-mortgages\)/);
  assert.match(after, /across second mortgages, bridging finance/);
});

test("does not keep Emet as the actor comparing caveat loans", () => {
  const before = [
    "Where a caveat loan is not the cleanest structure, we compare adjacent options such as [private mortgage lending](/resources/guides/private-mortgage-lending-commercial-borrowers), [commercial property loans](/resources/guides/commercial-property-loans-australia-complete-guide), [asset-backed lending](/resources/guides/asset-backed-lending-and-asset-finance), or business finance alternatives.",
    "For borrowers trying to understand urgent title issues, our **[caveat loans in Australia guide](/resources/guides/caveat-loans-australia-complete-guide)** gives the broader commercial context.",
  ].join("\n");
  const after = applyRetiredCaveatProductCopy(before);
  assert.equal(isRetiredProductCopyChange(before, after), true);
  assert.doesNotMatch(after, /we compare adjacent options/i);
  assert.doesNotMatch(after, /our \*\*\[caveat/i);
  assert.match(after, /the \*\*\[caveat loans in Australia guide/);
});
