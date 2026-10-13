import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { RETIREABLE_AUTOMATED_REVIEWERS, sourceHash, validateRepairManifest, validateRepairManifestWithLiveSources } from "../lib/content-repair-policy.mjs";
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
      sourcePath: file, path, pageId: "pg_example", beforeSha256: sourceHash(previous), afterSha256: sourceHash(current), reason: "Help borrowers prepare for a lender discussion", evidence: [{ reference: "https://cursor.com/agents/bc-test-general-information-review" }], verification: [{ kind: "text-added", value: "Prepare a cash-flow forecast to discuss repayment planning." }],
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

const legacyReviewedPage = "---\ntitle: Example\ndate: \"2025-10-17\"\nreviewed_date: \"2026-05-15\"\ncontentRisk: high\nreviewedBy: OpenClaw SEO source audit\nreviewedAt: \"2026-08-05\"\nreviewStatus: automated-editorial-review\nhumanReviewRequired: true\nexpiresAt: \"2026-11-05\"\n---\nPrepare the documents.\n";
type Fixture = ReturnType<typeof fixture>;
function rehash(input: Fixture) {
  const page = input.manifest.pages[0];
  page.beforeSha256 = sourceHash(input.changes[0].previous);
  page.afterSha256 = sourceHash(input.changes[0].current);
  page.generalInformationReview.reviewedSourceSha256 = page.afterSha256;
  return input;
}
function superseding(edit: (input: Fixture) => void = () => {}) {
  const input = fixture();
  input.changes[0].previous = legacyReviewedPage;
  input.changes[0].current = input.changes[0].current.replace("title: Example\n", "title: Example\ndate: \"2025-10-17\"\nreviewStatus: automated-editorial-review\n");
  edit(input);
  return rehash(input);
}
const editCurrent = (from: string, to: string) => (input: Fixture) => { input.changes[0].current = input.changes[0].current.replace(from, to); };
const errorsOf = (input: Fixture) => validateRepairManifest(input).errors.join(" ");

test("an exact canonical independent review may supersede older automated review metadata on high-risk pages", () => {
  assert.deepEqual(validateRepairManifest(superseding()).errors, []);
  const contentAudit = superseding((input) => {
    input.changes[0].previous = legacyReviewedPage.replace("reviewed_date: \"2026-05-15\"\n", "").replace("SEO source audit", "SEO content audit");
  });
  assert.deepEqual(validateRepairManifest(contentAudit).errors, []);
  const partialLegacy = superseding((input) => {
    input.changes[0].previous = legacyReviewedPage.replace("reviewedAt: \"2026-08-05\"\n", "").replace("expiresAt: \"2026-11-05\"\n", "");
  });
  assert.deepEqual(validateRepairManifest(partialLegacy).errors, []);

  const unchanged = superseding((input) => {
    input.changes[0].current = input.changes[0].current
      .replace("reviewedBy: OpenClaw independent reviewer", "reviewedBy: OpenClaw SEO source audit")
      .replace("reviewedAt: 2026-10-03T07:00:00Z", "reviewedAt: \"2026-08-05\"\nreviewed_date: \"2026-05-15\"")
      .replace("expiresAt: 2027-01-01T07:00:00Z", "expiresAt: \"2026-11-05\"");
  });
  assert.match(errorsOf(unchanged), /exact canonical risk, reviewer, review instant and review expiry/);
});

test("superseding review metadata rejects a wrong reviewer, review instant or expiry", () => {
  const cases: [string, (input: Fixture) => void, RegExp[]][] = [
    ["previous reviewer retained", editCurrent("reviewedBy: OpenClaw independent reviewer", "reviewedBy: OpenClaw SEO source audit"), [/exact canonical/, /protected metadata reviewedAt/, /protected metadata expiresAt/, /protected metadata reviewed_date/]],
    ["forged human reviewer", editCurrent("reviewedBy: OpenClaw independent reviewer", "reviewedBy: Jane Doe CFP, human financial adviser"), [/exact canonical/, /protected metadata reviewedBy/]],
    ["untrusted manifest reviewer", (input) => {
      input.manifest.review.reviewer = "OpenClaw SEO source audit v2";
      input.manifest.pages[0].generalInformationReview.reviewer = input.manifest.review.reviewer;
      editCurrent("reviewedBy: OpenClaw independent reviewer", "reviewedBy: OpenClaw SEO source audit v2")(input);
    }, [/trusted automated reviewer identity/, /protected metadata reviewedBy/]],
    ["previous instant retained", editCurrent("reviewedAt: 2026-10-03T07:00:00Z", "reviewedAt: \"2026-08-05\""), [/exact canonical/, /protected metadata reviewedBy/, /protected metadata expiresAt/]],
    ["instant differs from manifest review", (input) => {
      editCurrent("reviewedAt: 2026-10-03T07:00:00Z", "reviewedAt: 2026-10-03T06:00:00Z")(input);
      editCurrent("expiresAt: 2027-01-01T07:00:00Z", "expiresAt: 2027-01-01T06:00:00Z")(input);
    }, [/exact canonical/, /protected metadata reviewedAt/, /protected metadata expiresAt/]],
    ["previous expiry retained", editCurrent("expiresAt: 2027-01-01T07:00:00Z", "expiresAt: \"2026-11-05\""), [/exact canonical/, /protected metadata reviewedAt/]],
    ["expiry one day late", editCurrent("expiresAt: 2027-01-01T07:00:00Z", "expiresAt: 2027-01-02T07:00:00Z"), [/exact canonical/, /protected metadata expiresAt/]],
    ["expiry on a 180-day cadence", (input) => {
      input.registry.pages[0].governance.reviewEveryDays = 180;
      editCurrent("expiresAt: 2027-01-01T07:00:00Z", "expiresAt: 2027-04-01T07:00:00Z")(input);
    }, [/exact canonical/, /protected metadata expiresAt/]],
    ["expiry removed", editCurrent("expiresAt: 2027-01-01T07:00:00Z\n", ""), [/exact canonical/, /protected metadata expiresAt/]],
  ];
  for (const [name, edit, patterns] of cases) {
    const errors = errorsOf(superseding(edit));
    for (const pattern of patterns) assert.match(errors, pattern, name);
  }
});

test("superseding review metadata cannot carry any other protected, alias or approval metadata change", () => {
  for (const [edit, pattern] of [
    [editCurrent("reviewStatus: automated-editorial-review", "reviewStatus: human-approved"), /protected metadata reviewStatus/],
    [editCurrent("humanReviewRequired: true", "humanReviewRequired: false"), /protected metadata humanReviewRequired/],
    [editCurrent("contentRisk: high", "contentRisk: medium"), /protected metadata contentRisk/],
    [editCurrent("date: \"2025-10-17\"", "date: \"2026-10-03\""), /protected metadata date:/],
    [editCurrent("title: Example\n", "title: Example\nreviewed_date: \"2026-10-03\"\n"), /protected metadata reviewed_date/],
    [editCurrent("title: Example\n", "title: Example\nreviewedDate: \"2026-10-03\"\n"), /protected metadata reviewedDate/],
    [editCurrent("title: Example\n", "title: Example\nreviewed_by: OpenClaw independent reviewer\n"), /protected metadata reviewed_by/],
    [editCurrent("title: Example\n", "title: Example\nexpires_at: 2027-01-01T07:00:00Z\n"), /protected metadata expires_at/],
    [editCurrent("title: Example\n", "title: Example\ndateModified: \"2026-10-03\"\n"), /protected metadata dateModified/],
    [editCurrent("title: Example\n", "title: Example\nauthor: Daniel\n"), /protected metadata author:/],
    [editCurrent("title: Example\n", "title: Example\napprovedBy: Jane Doe CFP\n"), /protected metadata approvedBy/],
    [editCurrent("title: Example\n", "title: Example\nprofessionalFinancialReview: true\n"), /protected metadata professionalFinancialReview/],
    [editCurrent("title: Example\n", "title: Example\ncanonical: /elsewhere\n"), /protected metadata canonical/],
    [editCurrent("title: Example\n", "title: Example\nslug: elsewhere\n"), /protected metadata slug/],
    [editCurrent("title: Example\n", "title: Example\nnoindex: true\n"), /protected metadata noindex/],
    [editCurrent("title: Example\n", "title: Example\nfinancialReviewStatus: approved\n"), /approval or review metadata alias financialReviewStatus/],
  ] as [(input: Fixture) => void, RegExp][]) {
    assert.match(errorsOf(superseding(edit)), pattern);
  }
});

test("superseding is limited to the general-information path on registered 90-day high-risk pages", () => {
  const snakeCaseAlias = superseding((input) => {
    input.changes[0].previous = legacyReviewedPage.replace("reviewedBy:", "reviewed_by:");
  });
  assert.match(errorsOf(snakeCaseAlias), /protected metadata reviewed_by/);

  const mediumRisk = superseding((input) => {
    input.registry.pages[0].governance = { ...input.registry.pages[0].governance, contentRisk: "medium", reviewEveryDays: 180 };
    input.changes[0].previous = legacyReviewedPage.replace("contentRisk: high", "contentRisk: medium");
    input.changes[0].current = input.changes[0].current.replace("contentRisk: high", "contentRisk: medium").replace("expiresAt: 2027-01-01T07:00:00Z", "expiresAt: 2027-04-01T07:00:00Z");
  });
  const mediumErrors = errorsOf(mediumRisk);
  assert.doesNotMatch(mediumErrors, /exact canonical/);
  for (const key of ["reviewedBy", "reviewedAt", "expiresAt"]) assert.match(mediumErrors, new RegExp("protected metadata " + key + ":"));

  const outsideGeneralInformation = superseding((input) => { input.manifest.reviewMode = ""; });
  assert.match(errorsOf(outsideGeneralInformation), /protected metadata reviewedBy/);
  assert.match(errorsOf(outsideGeneralInformation), /genuine financial review/);

  const mechanical = superseding((input) => { Object.assign(input.manifest, { kind: "mechanical", transform: "nonfinancial-editorial-v1" }); });
  assert.match(errorsOf(mechanical), /protected metadata reviewedBy/);
  assert.match(errorsOf(mechanical), /mechanical repair may not change frontmatter/);
});

test("absent review metadata is still backfilled only as the exact canonical set", () => {
  assert.deepEqual(validateRepairManifest(fixture()).errors, []);
  const reviewedDateOnly = fixture();
  reviewedDateOnly.changes[0].previous = reviewedDateOnly.changes[0].previous.replace("title: Example\n", "title: Example\nreviewed_date: \"2026-06-11\"\n");
  assert.deepEqual(validateRepairManifest(rehash(reviewedDateOnly)).errors, []);

  const mediumBackfill = fixture();
  mediumBackfill.registry.pages[0].governance = { ...mediumBackfill.registry.pages[0].governance, contentRisk: "medium", reviewEveryDays: 180 };
  mediumBackfill.changes[0].previous = "---\ntitle: Example\ncontentRisk: medium\nhumanReviewRequired: true\nreviewed_date: \"2026-06-11\"\n---\nPrepare the documents.\n";
  mediumBackfill.changes[0].current = mediumBackfill.changes[0].current.replace("contentRisk: high", "contentRisk: medium").replace("expiresAt: 2027-01-01T07:00:00Z", "expiresAt: 2027-04-01T07:00:00Z");
  assert.deepEqual(validateRepairManifest(rehash(mediumBackfill)).errors, []);

  const wrongBackfillExpiry = fixture();
  editCurrent("expiresAt: 2027-01-01T07:00:00Z", "expiresAt: 2027-01-02T07:00:00Z")(wrongBackfillExpiry);
  assert.match(errorsOf(rehash(wrongBackfillExpiry)), /exact canonical/);
  const wrongBackfillReviewer = fixture();
  editCurrent("reviewedBy: OpenClaw independent reviewer", "reviewedBy: OpenClaw SEO source audit")(wrongBackfillReviewer);
  assert.match(errorsOf(rehash(wrongBackfillReviewer)), /protected metadata reviewedBy/);
});

test("every retireable automated audit label may be superseded on a high-risk page", () => {
  assert.deepEqual([...RETIREABLE_AUTOMATED_REVIEWERS], [
    "OpenClaw SEO source audit",
    "OpenClaw SEO content audit",
    "OpenClaw SEO evidence review",
    "Codex automated content review",
    "OpenClaw automated independent editorial reviewer",
  ]);
  for (const label of RETIREABLE_AUTOMATED_REVIEWERS) {
    const input = superseding((next) => {
      next.changes[0].previous = legacyReviewedPage.replace("OpenClaw SEO source audit", label);
      next.registry.pages[0].governance = {
        ...next.registry.pages[0].governance,
        reviewOwner: "financial-review",
        reviewedBy: label,
      };
    });
    assert.deepEqual(validateRepairManifest(input).errors, [], label);
  }
});

test("trusted registry human or financial review flags block supersession even when the page label looks automated", () => {
  const cases: [string, (input: Fixture) => void][] = [
    ["registry reviewedBy Ben", (input) => { input.registry.pages[0].governance.reviewedBy = "Ben"; }],
    ["registry humanReviewRequired", (input) => { input.registry.pages[0].governance.humanReviewRequired = true; }],
    ["registry reviewStatus editorial-review", (input) => { input.registry.pages[0].governance.reviewStatus = "editorial-review"; }],
    ["registry human reviewOwner", (input) => { input.registry.pages[0].governance.reviewOwner = "Ben"; }],
    ["registry human-financial reviewOwner", (input) => { input.registry.pages[0].governance.reviewOwner = "human-financial-review"; }],
    ["base page editorial-review status", (input) => {
      input.changes[0].previous = legacyReviewedPage.replace("reviewStatus: automated-editorial-review", "reviewStatus: editorial-review");
      input.changes[0].current = input.changes[0].current.replace("reviewStatus: automated-editorial-review", "reviewStatus: editorial-review");
    }],
  ];
  for (const [name, edit] of cases) {
    const errors = errorsOf(superseding(edit));
    assert.match(errors, /protected metadata reviewedBy/, name);
    assert.match(errors, /protected metadata reviewedAt/, name);
    assert.match(errors, /protected metadata expiresAt/, name);
  }
});

const trustedRegistry = JSON.parse(fs.readFileSync("data/seo-page-registry.json", "utf8"));
const evidenceRun = "https://cursor.com/agents/bc-test-ben-review-protection";
function realBenPage(sourcePath: string, editCurrentSource: (current: string) => string, edit: (input: Fixture) => void = () => {}) {
  const registered = trustedRegistry.pages.find((page: { sourcePath: string }) => page.sourcePath === sourcePath);
  assert.equal(registered?.governance?.reviewedBy, "Ben");
  const previous = fs.readFileSync(sourcePath, "utf8");
  const input = fixture();
  input.changes[0].file = sourcePath;
  input.changes[0].previous = previous;
  input.changes[0].current = editCurrentSource(previous);
  input.registry = { pages: [structuredClone(registered)] };
  Object.assign(input.manifest.pages[0], {
    sourcePath,
    path: registered.path,
    pageId: registered.pageId,
    evidence: [{ reference: evidenceRun }],
    generalInformationReview: {
      ...input.manifest.pages[0].generalInformationReview,
      sources: (input.manifest.pages[0].generalInformationReview.sources || []).map((item: { url: string }) => item),
    },
  });
  const sourceUrls = [...previous.matchAll(/url: "?(https:\/\/[^"\n]+)"?/g)].map((match) => match[1]);
  input.manifest.pages[0].generalInformationReview.sources = sourceUrls.map((url) => ({ url, checkedAt: "2026-10-03T06:00:00Z", status: 200 }));
  input.manifest.pages[0].generalInformationReview.sourceClaimMap = [{ claim: "This article is for informational purposes only and does not constitute financial advice.", sources: sourceUrls.slice(0, 1) }];
  edit(input);
  return rehash(input);
}
function canonicalBenReplacement(source: string) {
  return source
    .replace('reviewedBy: "Ben"', 'reviewedBy: "OpenClaw independent reviewer"')
    .replace('reviewedAt: "2026-08-13"', 'reviewedAt: "2026-10-03T07:00:00Z"')
    .replace('expiresAt: "2027-08-13"', 'expiresAt: "2027-01-01T07:00:00Z"')
    .replace('reviewed_date: "2026-08-13"\n', "");
}
function keepBenInstantShortenExpiry(source: string) {
  return source
    .replace('reviewedBy: "Ben"', 'reviewedBy: "OpenClaw independent reviewer"')
    .replace('expiresAt: "2027-08-13"', 'expiresAt: "2026-11-11T00:00:00.000Z"')
    .replace('reviewed_date: "2026-08-13"\n', "");
}

test("human Ben reviews on both real pages cannot be superseded, including keeping Ben's instant and shortening expiresAt", () => {
  const pages = [
    "src/content/guides/commercial-property-investor-loan-checklist.md",
    "src/content/guides/commercial-bridging-finance-compressed-settlement-case-study.md",
  ];
  for (const sourcePath of pages) {
    const replaced = realBenPage(sourcePath, canonicalBenReplacement);
    assert.match(errorsOf(replaced), /protected metadata reviewedBy/, sourcePath);
    assert.match(errorsOf(replaced), /protected metadata reviewedAt/, sourcePath);
    assert.match(errorsOf(replaced), /protected metadata expiresAt/, sourcePath);

    const keepInstant = realBenPage(sourcePath, keepBenInstantShortenExpiry, (input) => {
      input.manifest.review.reviewedAt = "2026-08-13";
      input.manifest.pages[0].generalInformationReview.reviewedAt = "2026-08-13";
    });
    assert.match(errorsOf(keepInstant), /protected metadata reviewedBy/, sourcePath + " keep instant");
    assert.match(errorsOf(keepInstant), /protected metadata expiresAt/, sourcePath + " keep instant");
    assert.doesNotMatch(errorsOf(keepInstant), /protected metadata reviewedAt:/, sourcePath + " keep instant does not rewrite reviewedAt");
  }
});

test("general-information evidence cannot be a local path or arbitrary https URL", () => {
  const local = fixture();
  local.manifest.pages[0].evidence = [{ reference: "/home/node/.openclaw/workspace/independent-review.json" }];
  assert.match(errorsOf(local), /https cursor.com\/agents\/ run URL/);
  const factual = fixture();
  factual.manifest.pages[0].evidence = [{ reference: "https://business.gov.au/finance/funding/get-a-business-loan" }];
  assert.match(errorsOf(factual), /https cursor.com\/agents\/ run URL/);
  assert.ok(validateRepairManifest(fixture()).evidence.includes("https://cursor.com/agents/bc-test-general-information-review"));
});

test("CI live source fetch fails closed on non-2xx and does not trust the manifest status", async () => {
  const source = "https://business.gov.au/finance/funding/get-a-business-loan";
  assert.match(
    validateRepairManifest({ ...fixture(), liveSourceStatuses: { [source]: 404 } }).errors.join(" "),
    /CI-observed factual source response must be 2xx/,
  );
  assert.deepEqual(validateRepairManifest({ ...fixture(), liveSourceStatuses: { [source]: 200 } }).errors, []);

  const fetched = await validateRepairManifestWithLiveSources({
    ...fixture(),
    fetch: async (url: string) => ({ status: 503, url }),
  });
  assert.match(fetched.errors.join(" "), /CI-observed factual source response must be 2xx/);

  const liveOk = await validateRepairManifestWithLiveSources({
    ...fixture(),
    fetch: async (url: string) => ({ status: 200, url }),
  });
  assert.deepEqual(liveOk.errors, []);
  assert.deepEqual(liveOk.evidence, ["https://cursor.com/agents/bc-test-general-information-review"]);
});
