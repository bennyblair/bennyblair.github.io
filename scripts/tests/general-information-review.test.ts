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
  const current = "---\ntitle: Example\ncontentRisk: high\nhumanReviewRequired: true\nreviewedBy: OpenClaw independent reviewer\nreviewedAt: 2026-10-03T07:00:00Z\nexpiresAt: 2027-01-01T07:00:00Z\nsources:\n  - label: Business loan guide\n    url: https://business.gov.au/finance/funding/get-a-business-loan\n---\nPrepare a cash-flow forecast to discuss repayment planning.\n\nThis article is for informational purposes only and does not constitute financial advice.\n" + extra;
  const review = { reviewer: "OpenClaw independent reviewer", reviewedAt: "2026-10-03T07:00:00Z", score: 90, blockingFindings: [] };
  const source = "https://business.gov.au/finance/funding/get-a-business-loan";
  return {
    policy, now, baseSha: "a".repeat(40), protectedCohort: {},
    registry: { pages: [{ sourcePath: file, pageId: "pg_example", path, governance: { contentRisk: "high", maxAutomatedChangeRisk: "R0", reviewEveryDays: 90 }, lifecycle: { protectedUntil: null as string | null } }] },
    changes: [{ file, status: "M", previous, current }],
    manifest: { schemaVersion: 1, repairId: "repair_example", policyId: policy.policyId, policyVersion: policy.version, policyChecksum: policy.checksum, authorizationRef: policy.authorization.reference, baseSha: "a".repeat(40), editor: "Codex", review, kind: "substantive", reviewMode: "general-information-v1", pages: [{
      sourcePath: file, path, pageId: "pg_example", beforeSha256: sourceHash(previous), afterSha256: sourceHash(current), reason: "Help borrowers prepare for a lender discussion", evidence: [{ reference: source }], verification: [{ kind: "text-added", value: "Prepare a cash-flow forecast to discuss repayment planning." }],
      generalInformationReview: { mode: "general-information-v1", reviewer: review.reviewer, reviewedAt: review.reviewedAt, reviewedSourceSha256: sourceHash(current), automated: true, human: false, professionalFinancialReview: false, businessPurposeOnly: true, noPersonalAdvice: true, completePageChecked: true, unsupportedClaimsRemoved: true, claimCoverage: "complete", unmappedFactualClaims: [], blockingFindings: [], sources: [{ url: source, checkedAt: "2026-10-03T06:00:00Z", status: 200 }], sourceClaimMap: [{ claim: "Prepare a cash-flow forecast to discuss repayment planning.", sources: [source] }] },
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
    (input: ReturnType<typeof fixture>) => { input.manifest.pages[0].generalInformationReview.sources[0].status = 404; },
    (input: ReturnType<typeof fixture>) => { input.manifest.pages[0].generalInformationReview.claimCoverage = "partial"; },
    (input: ReturnType<typeof fixture>) => { input.manifest.pages[0].generalInformationReview.unmappedFactualClaims = ["A lender-specific eligibility statement remains unchecked."]; },
    (input: ReturnType<typeof fixture>) => { input.manifest.pages[0].generalInformationReview.sourceClaimMap[0].claim = "A fabricated source claim."; },
    (input: ReturnType<typeof fixture>) => { input.registry.pages[0].lifecycle = { protectedUntil: "2026-10-10T00:00:00Z" }; },
  ]) {
    const input = fixture(); mutation(input); assert.ok(validateRepairManifest(input).errors.length);
  }
});
test("all declared sources are checked and protected risk metadata cannot change", () => {
  const unchecked = fixture();
  unchecked.changes[0].current = unchecked.changes[0].current.replace("---\nPrepare", "  - label: Second source\n    url: https://asic.gov.au/example\n---\nPrepare");
  unchecked.manifest.pages[0].afterSha256 = sourceHash(unchecked.changes[0].current);
  unchecked.manifest.pages[0].generalInformationReview.reviewedSourceSha256 = sourceHash(unchecked.changes[0].current);
  assert.match(validateRepairManifest(unchecked).errors.join(" "), /every declared factual source/);

  const loweredRisk = fixture();
  loweredRisk.changes[0].current = loweredRisk.changes[0].current.replace("contentRisk: high", "contentRisk: low");
  loweredRisk.manifest.pages[0].afterSha256 = sourceHash(loweredRisk.changes[0].current);
  loweredRisk.manifest.pages[0].generalInformationReview.reviewedSourceSha256 = sourceHash(loweredRisk.changes[0].current);
  assert.match(validateRepairManifest(loweredRisk).errors.join(" "), /protected metadata contentRisk/);
});
test("general-information review may backfill exact gate metadata without lowering risk", () => {
  const input = fixture();
  input.changes[0].previous = input.changes[0].previous.replace("contentRisk: high\n", "");
  input.manifest.pages[0].beforeSha256 = sourceHash(input.changes[0].previous);
  input.manifest.pages[0].afterSha256 = sourceHash(input.changes[0].current);
  input.manifest.pages[0].generalInformationReview.reviewedSourceSha256 = sourceHash(input.changes[0].current);
  assert.deepEqual(validateRepairManifest(input).errors, []);

  const lowered = structuredClone(input);
  lowered.changes[0].current = lowered.changes[0].current.replace("contentRisk: high", "contentRisk: low");
  lowered.manifest.pages[0].afterSha256 = sourceHash(lowered.changes[0].current);
  lowered.manifest.pages[0].generalInformationReview.reviewedSourceSha256 = sourceHash(lowered.changes[0].current);
  assert.match(validateRepairManifest(lowered).errors.join(" "), /protected metadata contentRisk/);

  const riskAliasCollision = fixture();
  riskAliasCollision.changes[0].previous = riskAliasCollision.changes[0].previous.replace("contentRisk: high", "content_risk: high");
  riskAliasCollision.changes[0].current = riskAliasCollision.changes[0].current.replace("contentRisk: high", "contentRisk: low\ncontent_risk: high");
  riskAliasCollision.registry.pages[0].governance.contentRisk = "low";
  riskAliasCollision.manifest.pages[0].beforeSha256 = sourceHash(riskAliasCollision.changes[0].previous);
  riskAliasCollision.manifest.pages[0].afterSha256 = sourceHash(riskAliasCollision.changes[0].current);
  riskAliasCollision.manifest.pages[0].generalInformationReview.reviewedSourceSha256 = sourceHash(riskAliasCollision.changes[0].current);
  assert.match(validateRepairManifest(riskAliasCollision).errors.join(" "), /protected metadata contentRisk/);

  const reviewerSpoof = fixture();
  reviewerSpoof.manifest.review.reviewer = "Jane Doe CFP, human financial adviser";
  reviewerSpoof.manifest.pages[0].generalInformationReview.reviewer = reviewerSpoof.manifest.review.reviewer;
  reviewerSpoof.changes[0].current = reviewerSpoof.changes[0].current.replace(
    "reviewedBy: OpenClaw independent reviewer",
    "reviewedBy: Jane Doe CFP, human financial adviser",
  );
  reviewerSpoof.manifest.pages[0].afterSha256 = sourceHash(reviewerSpoof.changes[0].current);
  reviewerSpoof.manifest.pages[0].generalInformationReview.reviewedSourceSha256 = sourceHash(reviewerSpoof.changes[0].current);
  assert.match(validateRepairManifest(reviewerSpoof).errors.join(" "), /trusted automated reviewer identity|protected metadata reviewedBy/);
});
test("general-information metadata is validated as one atomic final state", () => {
  const exact = fixture();
  exact.manifest.pages[0].afterSha256 = sourceHash(exact.changes[0].current);
  exact.manifest.pages[0].generalInformationReview.reviewedSourceSha256 = sourceHash(exact.changes[0].current);
  assert.deepEqual(validateRepairManifest(exact).errors, []);

  let adversary = 0;
  for (const mutate of [
    (source: string) => source.replace("expiresAt: 2027-01-01T07:00:00Z", "expiresAt: 2026-10-02T07:00:00Z"),
    (source: string) => source.replace("reviewedBy: OpenClaw independent reviewer", "reviewedBy: Jane Doe CFP, human financial adviser"),
    (source: string) => source.replace("reviewedBy: OpenClaw independent reviewer\n", ""),
    (source: string) => source.replace("reviewedAt: 2026-10-03T07:00:00Z", "reviewedAt: 2026-10-03T07:00:00Z\nreviewed_date: 2025-01-01"),
    (source: string) => source.replace("---\nPrepare", "professionalFinancialReview: true\n---\nPrepare"),
    (source: string) => source.replace("---\nPrepare", "approvedBy: Jane Doe CFP, human financial adviser\n---\nPrepare"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "Reviewed by Jane Doe CFP, human financial adviser. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "Jane Doe, financial adviser, reviewed and approved this article. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "This article was professionally reviewed and approved by Jane Doe, CFP. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "Professional approval was provided by Jane Doe, a licensed mortgage broker. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "Reviewed for accuracy by Jane Doe, a financial adviser. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "Approved for publication by Jane Doe, a solicitor. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "Reviewed by Jane Doe, CFP. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "This article was checked and signed off by Jane Doe, an accountant. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "This article carries approval from Jane Doe, a financial adviser. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "Verified by Jane Doe, a lawyer. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "Signed off by Jane Doe, CFP. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "Verified by a lawyer. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "Checked by an accountant. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "Signed off by a CFP. Prepare a cash-flow forecast"),
    (source: string) => source.replace("Prepare a cash-flow forecast", "Signed off for publication by Jane Doe, CFP. Prepare a cash-flow forecast"),
    (source: string) => source.replace("---\nPrepare", "professionalReview: true\n---\nPrepare"),
    (source: string) => source.replace("---\nPrepare", "professionalApproval: true\n---\nPrepare"),
    (source: string) => source.replace("---\nPrepare", "financialReviewStatus: approved\n---\nPrepare"),
    (source: string) => source.replace("---\nPrepare", "financiallyReviewedBy: Jane Doe, CFP\n---\nPrepare"),
    (source: string) => source.replace("---\nPrepare", "humanReviewedBy: Jane Doe\n---\nPrepare"),
    (source: string) => source.replace("---\nPrepare", "signedOffBy: Jane Doe, CFP\n---\nPrepare"),
    (source: string) => source.replace("---\nPrepare", "checkedBy: Jane Doe, accountant\n---\nPrepare"),
  ]) {
    adversary += 1;
    const input = structuredClone(exact);
    input.changes[0].current = mutate(input.changes[0].current);
    input.manifest.pages[0].afterSha256 = sourceHash(input.changes[0].current);
    input.manifest.pages[0].generalInformationReview.reviewedSourceSha256 = sourceHash(input.changes[0].current);
    assert.ok(validateRepairManifest(input).errors.length, `adversary ${adversary} must be rejected`);
  }

  const wrongHighRiskCadence = structuredClone(exact);
  wrongHighRiskCadence.registry.pages[0].governance.reviewEveryDays = 180;
  wrongHighRiskCadence.changes[0].current = wrongHighRiskCadence.changes[0].current.replace(
    "expiresAt: 2027-01-01T07:00:00Z",
    "expiresAt: 2027-04-01T07:00:00Z",
  );
  wrongHighRiskCadence.manifest.pages[0].afterSha256 = sourceHash(wrongHighRiskCadence.changes[0].current);
  wrongHighRiskCadence.manifest.pages[0].generalInformationReview.reviewedSourceSha256 = sourceHash(wrongHighRiskCadence.changes[0].current);
  assert.match(validateRepairManifest(wrongHighRiskCadence).errors.join(" "), /exact canonical risk, reviewer, review instant and review expiry/);
});
