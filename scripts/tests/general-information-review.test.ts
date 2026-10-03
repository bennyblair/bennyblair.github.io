import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { sourceHash, validateRepairManifest } from "../lib/content-repair-policy.mjs";
import { assessScopedRepairCandidate } from "../lib/content-eligibility.mjs";

const policy = JSON.parse(fs.readFileSync("data/seo-content-repair-policy.json", "utf8"));
const now = new Date("2026-10-03T08:00:00Z");
function fixture(extra = "") {
  const file = "src/content/guides/example.md";
  const path = "/resources/guides/example";
  const previous = "---\ntitle: Example\ncontentRisk: high\nhumanReviewRequired: true\n---\nPrepare the documents.\n";
  const current = "---\ntitle: Example\ncontentRisk: high\nhumanReviewRequired: true\nsources:\n  - label: Business loan guide\n    url: https://business.gov.au/finance/funding/get-a-business-loan\n---\nPrepare a cash-flow forecast to discuss repayment planning.\n\nThis article is for informational purposes only and does not constitute financial advice.\n" + extra;
  const review = { reviewer: "OpenClaw independent reviewer", reviewedAt: "2026-10-03T07:00:00Z", score: 90, blockingFindings: [] };
  const source = "https://business.gov.au/finance/funding/get-a-business-loan";
  return {
    policy, now, baseSha: "a".repeat(40), protectedCohort: {},
    registry: { pages: [{ sourcePath: file, pageId: "pg_example", path, governance: { contentRisk: "high", maxAutomatedChangeRisk: "R0" }, lifecycle: { protectedUntil: null as string | null } }] },
    changes: [{ file, status: "M", previous, current }],
    manifest: { schemaVersion: 1, repairId: "repair_example", policyId: policy.policyId, policyVersion: policy.version, policyChecksum: policy.checksum, authorizationRef: policy.authorization.reference, baseSha: "a".repeat(40), editor: "Codex", review, kind: "substantive", reviewMode: "general-information-v1", pages: [{
      sourcePath: file, path, pageId: "pg_example", beforeSha256: sourceHash(previous), afterSha256: sourceHash(current), reason: "Help borrowers prepare for a lender discussion", evidence: [{ reference: source }], verification: [{ kind: "text-added", value: "Prepare a cash-flow forecast to discuss repayment planning." }],
      generalInformationReview: { mode: "general-information-v1", reviewer: review.reviewer, reviewedAt: review.reviewedAt, reviewedSourceSha256: sourceHash(current), automated: true, human: false, professionalFinancialReview: false, businessPurposeOnly: true, noPersonalAdvice: true, completePageChecked: true, unsupportedClaimsRemoved: true, blockingFindings: [], sources: [{ url: source, checkedAt: "2026-10-03T06:00:00Z" }], sourceClaimMap: [{ claim: "Prepare a cash-flow forecast to discuss repayment planning.", sources: [source] }] },
    }] },
  };
}
test("useful whole-page general information passes on historical high-risk/R0 pages without human approval", () => {
  assert.deepEqual(validateRepairManifest(fixture()).errors, []);
  assert.equal(assessScopedRepairCandidate({ page: { indexability: "indexable", governance: { contentRisk: "high", maxAutomatedChangeRisk: "R0" } } }).generalInformation, true);
});
test("unsupported promises, rates, eligibility and tax conclusions must be corrected then reviewed again", () => {
  for (const claim of ["Guaranteed approval.", "Funding within 24 hours.", "Interest rate is 8%.", "You will qualify.", "Interest is tax-deductible."]) {
    assert.match(validateRepairManifest(fixture(claim)).errors.join(" "), /rewrite and review again/);
  }
  assert.deepEqual(validateRepairManifest(fixture("Ask the lender which documents they need before considering an application.")).errors, []);
});
test("independent exact-page source review remains required and cannot pretend to be professional approval", () => {
  for (const mutation of [
    (input: ReturnType<typeof fixture>) => { input.manifest.review.reviewer = "Codex"; },
    (input: ReturnType<typeof fixture>) => { input.manifest.pages[0].generalInformationReview.professionalFinancialReview = true; },
    (input: ReturnType<typeof fixture>) => { input.manifest.pages[0].generalInformationReview.reviewedSourceSha256 = "0".repeat(64); },
    (input: ReturnType<typeof fixture>) => { input.manifest.pages[0].generalInformationReview.sources = []; },
    (input: ReturnType<typeof fixture>) => { input.manifest.pages[0].generalInformationReview.sourceClaimMap[0].claim = "A fabricated source claim."; },
    (input: ReturnType<typeof fixture>) => { input.registry.pages[0].lifecycle = { protectedUntil: "2026-10-10T00:00:00Z" }; },
  ]) {
    const input = fixture(); mutation(input); assert.ok(validateRepairManifest(input).errors.length);
  }
});
