import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  applyRetiredCaveatProductCopy,
  isContextualInternalInlinkChange,
  isContextualInternalLinkChange,
  isInternalLinkOnlyChange,
  isRetiredProductCopyChange,
  loadInlinkExemptionEntries,
  normalizeInternalLinkDestinations,
  sha256Utf8,
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

function sampleExemption() {
  const entry = loadInlinkExemptionEntries().find((item) => item.id === "C3");
  assert.ok(entry, "C3 must exist in the committed inlink exemption manifest");
  return entry;
}

test("a manifest entry matches", () => {
  const entry = sampleExemption();
  const before = guideSource(entry.before);
  const after = guideSource(entry.after);

  assert.equal(isInternalLinkOnlyChange(before, after), false);
  assert.equal(isContextualInternalInlinkChange(before, after, entry.file), true);
  assert.equal(isContextualInternalLinkChange(before, after, entry.file), true);
});

test("one changed character in after-line is rejected", () => {
  const entry = sampleExemption();
  const before = guideSource(entry.before);
  const after = guideSource(`${entry.after}x`);

  assert.equal(isContextualInternalInlinkChange(before, after, entry.file), false);
});

test("the right after-line on the wrong file is rejected", () => {
  const entry = sampleExemption();
  const before = guideSource(entry.before);
  const after = guideSource(entry.after);

  assert.equal(
    isContextualInternalInlinkChange(
      before,
      after,
      "src/content/guides/gst-loan-for-commercial-property-settlement-in-australia.md",
    ),
    false,
  );
});

test("an extra changed line is rejected", () => {
  const entry = sampleExemption();
  const before = guideSource(`${entry.before}\nUnchanged second sentence.`);
  const after = guideSource(`${entry.after}\nChanged second sentence.`);

  assert.equal(isContextualInternalInlinkChange(before, after, entry.file), false);
});

test("a frontmatter change is rejected", () => {
  const entry = sampleExemption();
  const before = guideSource(entry.before, ['expiresAt: "2026-11-05"']);
  const after = guideSource(entry.after, ['expiresAt: "2027-02-03"']);

  assert.equal(isContextualInternalInlinkChange(before, after, entry.file), false);
});

test("a hidden-span variant of the same line is rejected", () => {
  const entry = sampleExemption();
  const before = guideSource(entry.before);
  const after = guideSource(entry.after.replace("](", "<span hidden>x</span>]("));

  assert.equal(isContextualInternalInlinkChange(before, after, entry.file), false);
});

test("a titled link variant of the same line is rejected", () => {
  const entry = sampleExemption();
  const before = guideSource(entry.before);
  const after = guideSource(
    entry.after.replace("](/services/commercial-property-finance)", '](/services/commercial-property-finance "Commercial property finance")'),
  );

  assert.equal(isContextualInternalInlinkChange(before, after, entry.file), false);
});

test("an image variant of the same line is rejected", () => {
  const entry = sampleExemption();
  const before = guideSource(entry.before);
  const after = guideSource(entry.after.replace("[commercial property finance]", "![commercial property finance]"));

  assert.equal(isContextualInternalInlinkChange(before, after, entry.file), false);
});

test("removing the manifest lookup makes the suite fail", () => {
  const policyPath = fileURLToPath(new URL("../lib/content-change-policy.mjs", import.meta.url));
  const source = fs.readFileSync(policyPath, "utf8");
  const fnStart = source.indexOf("export function isContextualInternalInlinkChange");
  const fnEnd = source.indexOf("export const isContextualInternalLinkChange");
  assert.ok(fnStart >= 0 && fnEnd > fnStart);
  const fn = source.slice(fnStart, fnEnd);
  assert.match(source, /data\/inlink-exemptions/);
  assert.match(source, /loadInlinkExemptionEntries\(/);
  assert.match(source, /sha256Utf8/);
  assert.match(source, /matchesExemptionEntry/);
  assert.match(fn, /inlinkExemptions\.some/);
  assert.match(fn, /matchesExemptionEntry/);
  assert.doesNotMatch(source, /INLINK_CLAIM_DENYLIST|ALLOWED_SERVICE_PATH|isAllowedInlinkLineEdit|WRAP_CLOSE/);
  const entries = loadInlinkExemptionEntries();
  assert.equal(entries.length, 27);
  assert.equal(new Set(entries.map((entry) => entry.file)).size, 27);
  for (const entry of entries) {
    assert.equal(entry.beforeSha256, sha256Utf8(entry.before), entry.id);
    assert.equal(entry.afterSha256, sha256Utf8(entry.after), entry.id);
    assert.equal(
      isContextualInternalInlinkChange(guideSource(entry.before), guideSource(entry.after), entry.file),
      true,
      entry.id,
    );
  }
});

test("malformed exemption entries and duplicate file keys fail to load", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "inlink-exemptions-"));
  const valid = {
    id: "fixture",
    entries: [
      {
        id: "C3",
        file: "src/content/guides/office-property-loans-financing-commercial-workspace.md",
        before: "before line",
        after: "after line",
        beforeSha256: sha256Utf8("before line"),
        afterSha256: sha256Utf8("after line"),
      },
    ],
  };
  fs.writeFileSync(path.join(directory, "ok.json"), JSON.stringify(valid));
  assert.equal(loadInlinkExemptionEntries(directory).length, 1);

  fs.writeFileSync(path.join(directory, "bad.json"), "{not json");
  assert.throws(() => loadInlinkExemptionEntries(directory), /not valid JSON/);
  fs.unlinkSync(path.join(directory, "bad.json"));

  fs.writeFileSync(path.join(directory, "missing.json"), JSON.stringify({ id: "x" }));
  assert.throws(() => loadInlinkExemptionEntries(directory), /entries array/);
  fs.unlinkSync(path.join(directory, "missing.json"));

  const mismatch = structuredClone(valid);
  mismatch.entries[0].afterSha256 = sha256Utf8("other line");
  fs.writeFileSync(path.join(directory, "mismatch.json"), JSON.stringify(mismatch));
  assert.throws(() => loadInlinkExemptionEntries(directory), /sha256 does not match/);
  fs.unlinkSync(path.join(directory, "mismatch.json"));

  fs.writeFileSync(path.join(directory, "dup.json"), JSON.stringify(valid));
  assert.throws(() => loadInlinkExemptionEntries(directory), /duplicate inlink exemption file key/);
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
