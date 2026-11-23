import assert from "node:assert/strict";
import test from "node:test";
import {
  applyRetiredCaveatProductCopy,
  isContextualInternalInlinkChange,
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

function guideSource(body, extraFrontmatter = []) {
  return ["---", 'title: "Guide"', ...extraFrontmatter, "---", body].join("\n");
}

test("classifies wrapping existing words in a live service link as a contextual inlink", () => {
  const before = guideSource(
    "Office property loans operate differently from other commercial property finance, reflecting the unique risk profile of workspace assets.",
  );
  const after = before.replace(
    "other commercial property finance, reflecting",
    "other [commercial property finance](/services/commercial-property-finance), reflecting",
  );

  assert.equal(isInternalLinkOnlyChange(before, after), false);
  assert.equal(isContextualInternalInlinkChange(before, after), true);
});

test("classifies wrapping private-lending and first-second-mortgages paths as contextual inlinks", () => {
  const privateBefore = guideSource("Funds are usually provided by private lenders, credit funds, or specialist financiers.");
  const privateAfter = privateBefore.replace(
    "by private lenders, credit funds",
    "by [private lenders](/services/private-lending), credit funds",
  );
  const mortgageBefore = guideSource("A second mortgage is usually a more formal property-backed loan.");
  const mortgageAfter = mortgageBefore.replace(
    "A second mortgage is usually",
    "A [second mortgage](/services/first-second-mortgages) is usually",
  );

  assert.equal(isContextualInternalInlinkChange(privateBefore, privateAfter), true);
  assert.equal(isContextualInternalInlinkChange(mortgageBefore, mortgageAfter), true);
});

test("classifies appending one short service-link sentence as a contextual inlink", () => {
  const before = guideSource(
    "A GST loan for commercial property settlement is a short-term commercial funding solution used when GST creates a cash gap at settlement and the borrower needs extra capital to complete the purchase on time.",
  );
  const after = before.replace(
    "complete the purchase on time.",
    "complete the purchase on time. If the main purchase loan is still being arranged, see how Emet Capital approaches [commercial property finance](/services/commercial-property-finance) as a broker.",
  );

  assert.equal(isContextualInternalInlinkChange(before, after), true);
});

test("classifies changing the anchor of an existing service link as a contextual inlink", () => {
  const before = guideSource(
    "Use the [commercial property finance service](/services/commercial-property-finance) and provide the contract.",
  );
  const after = before.replace(
    "[commercial property finance service]",
    "[talk to us about a commercial property loan]",
  );

  assert.equal(isInternalLinkOnlyChange(before, after), false);
  assert.equal(isContextualInternalInlinkChange(before, after), true);
});

const inlinkProbes = [
  [
    "H1 insertion",
    guideSource("Commercial property finance in Sydney is shaped by high values."),
    (source) =>
      source.replace(
        "Commercial property finance in Sydney is shaped by high values.",
        "# [Commercial property finance](/services/commercial-property-finance) in Sydney is shaped by high values.",
      ),
  ],
  [
    "third link to same URL",
    guideSource(
      [
        "See [bridging finance](/services/bridging-finance) in the first mention.",
        "See [bridging finance](/services/bridging-finance) in the second mention.",
        "A timing gap can stall a commercial settlement.",
      ].join("\n"),
    ),
    (source) =>
      source.replace(
        "A timing gap can stall a commercial settlement.",
        "A timing gap can stall a commercial settlement. See [bridging finance](/services/bridging-finance).",
      ),
  ],
  [
    "multi-line edits",
    guideSource("First commercial property finance sentence.\nSecond commercial property finance sentence."),
    (source) =>
      source
        .replace("First commercial property finance sentence.", "First [commercial property finance](/services/commercial-property-finance) sentence.")
        .replace("Second commercial property finance sentence.", "Second [commercial property finance](/services/commercial-property-finance) sentence."),
  ],
  [
    "em dash in an anchor",
    guideSource("Use the [commercial property finance service](/services/commercial-property-finance) and provide the contract."),
    (source) => source.replace("[commercial property finance service]", "[commercial property finance — service]"),
  ],
  [
    "claim phrase in an anchor",
    guideSource("Use the [commercial property finance service](/services/commercial-property-finance) and provide the contract."),
    (source) => source.replace("[commercial property finance service]", "[guaranteed approval]"),
  ],
  [
    "lender-role sentence",
    guideSource("A timing gap can stall a commercial settlement."),
    (source) =>
      source.replace(
        "A timing gap can stall a commercial settlement.",
        "A timing gap can stall a commercial settlement. Emet Capital is the lender on [bridging finance](/services/bridging-finance).",
      ),
  ],
  [
    "we are the lender sentence",
    guideSource("A timing gap can stall a commercial settlement."),
    (source) =>
      source.replace(
        "A timing gap can stall a commercial settlement.",
        "A timing gap can stall a commercial settlement. We are the lender behind [bridging finance](/services/bridging-finance).",
      ),
  ],
  [
    "ACL sentence",
    guideSource("A timing gap can stall a commercial settlement."),
    (source) =>
      source.replace(
        "A timing gap can stall a commercial settlement.",
        "A timing gap can stall a commercial settlement. We hold ACL 123456 and arrange [bridging finance](/services/bridging-finance).",
      ),
  ],
  [
    "FBAA membership sentence",
    guideSource("A timing gap can stall a commercial settlement."),
    (source) =>
      source.replace(
        "A timing gap can stall a commercial settlement.",
        "A timing gap can stall a commercial settlement. We are FBAA members arranging [bridging finance](/services/bridging-finance).",
      ),
  ],
  [
    "volume sentence",
    guideSource("A timing gap can stall a commercial settlement."),
    (source) =>
      source.replace(
        "A timing gap can stall a commercial settlement.",
        "A timing gap can stall a commercial settlement. We have $2 billion settled via [bridging finance](/services/bridging-finance).",
      ),
  ],
  [
    "caveat text",
    guideSource("A timing gap can stall a commercial settlement."),
    (source) =>
      source.replace(
        "A timing gap can stall a commercial settlement.",
        "A timing gap can stall a commercial settlement. This is not a caveat product; see [bridging finance](/services/bridging-finance).",
      ),
  ],
  [
    "bundled caveat guide link",
    guideSource("A timing gap can stall a commercial settlement."),
    (source) =>
      source.replace(
        "A timing gap can stall a commercial settlement.",
        "A timing gap can stall a commercial settlement. See [bridging finance](/services/bridging-finance) and the [caveat loans guide](/resources/guides/caveat-loans-australia-complete-guide).",
      ),
  ],
  [
    "HTML anchor",
    guideSource("A timing gap can stall a commercial settlement."),
    (source) =>
      source.replace(
        "A timing gap can stall a commercial settlement.",
        'A timing gap can stall a commercial settlement. See <a href="/services/bridging-finance">bridging finance</a>.',
      ),
  ],
  [
    "city /services URL",
    guideSource("A timing gap can stall a commercial settlement."),
    (source) =>
      source.replace(
        "A timing gap can stall a commercial settlement.",
        "A timing gap can stall a commercial settlement. See [Sydney bridging](/services/bridging-finance/cities/sydney).",
      ),
  ],
  [
    "trailing slash",
    guideSource("A timing gap can stall a commercial settlement."),
    (source) =>
      source.replace(
        "A timing gap can stall a commercial settlement.",
        "A timing gap can stall a commercial settlement. See [bridging finance](/services/bridging-finance/).",
      ),
  ],
  [
    "expiresAt frontmatter edit",
    guideSource("A timing gap can stall a commercial settlement.", ['expiresAt: "2026-11-05"']),
    (source) => source.replace('expiresAt: "2026-11-05"', 'expiresAt: "2027-02-03"'),
  ],
  [
    "metaTitle frontmatter edit",
    guideSource("A timing gap can stall a commercial settlement.", ['metaTitle: "Old title for the guide page"']),
    (source) => source.replace('metaTitle: "Old title for the guide page"', 'metaTitle: "New title for the guide page"'),
  ],
];

test("rejects contextual-inlink probes that must stay material", () => {
  for (const [name, before, mutate] of inlinkProbes) {
    assert.equal(isContextualInternalInlinkChange(before, mutate(before)), false, name);
  }
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

test("rewrites Emet-framed sections that still invite caveat loans", () => {
  const before = [
    "We usually start with four questions: what deadline is being solved, what property supports the facility, what is the exact repayment event, and what happens if the exit is late? If those answers are clear, a short-term caveat loan may be worth comparing.",
    "The aim is not to force the borrower into the fastest product. The aim is to identify which lender type and security structure best matches the transaction. In some cases, that may be [urgent caveat finance](/resources/guides/urgent-caveat-loans). In others, it may be [second mortgage finance](/services/first-second-mortgages), [bridging finance](/services/bridging-finance), [private lending](/services/private-lending), or [commercial property finance](/services/commercial-property-finance).",
    "A borrower with strong equity and a two-week deadline may suit a caveat-led approach. A borrower with more time and a clean refinance path may be better served by [commercial property refinancing](/services/refinancing-solutions). A borrower wanting to preserve an existing first mortgage may need [first and second mortgage funding](/resources/guides/second-mortgages-for-business-guide).",
  ].join("\n");
  const after = applyRetiredCaveatProductCopy(before);
  assert.equal(isRetiredProductCopyChange(before, after), true);
  assert.doesNotMatch(after, /caveat loan may be worth comparing/i);
  assert.doesNotMatch(after, /urgent caveat finance/i);
  assert.doesNotMatch(after, /caveat-led approach/i);
  assert.match(after, /second mortgage, bridging finance, or private lending facility may be worth comparing/);
});
