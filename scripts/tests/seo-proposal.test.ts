import assert from "node:assert/strict";
import test from "node:test";
import { checksum } from "../lib/seo-control-plane.mjs";
import { calculateArticleQualityScore, calculateOpportunityScore, validateArticleQualityReview, validateProposal } from "../lib/seo-proposal.mjs";

function automationPolicy() {
  const policy = {
    schemaVersion: 1,
    policyId: "daily-content-automerge",
    version: "2026-08-24.1",
    status: "active",
    cadence: { days: ["Tuesday", "Thursday"], articlesPerRun: 1, articlesPerWeek: 2 },
    authority: {
      allowedRisk: "R2",
      exactArticlesPerChange: 1,
      proposalApprover: "seo-policy-bot",
      qualityReviewRequired: true,
      minimumQualityScore: 85,
      qualityContractVersion: 1,
      automatedContentRisk: "low",
    },
  };
  return { ...policy, checksum: checksum({ ...policy, checksum: undefined }) };
}

function qualityReview(overrides: Record<string, unknown> = {}) {
  return {
    promptVersion: "article-quality-v1",
    evaluatorModel: "independent-editor",
    reviewedAt: "2026-08-24T00:00:00Z",
    dimensions: {
      intentCoverage: 90,
      informationGain: 86,
      specificity: 88,
      evidence: 90,
      readability: 92,
      repetition: 87,
      compliance: 95,
      aiAnswerUsefulness: 88,
    },
    overallScore: 89.5,
    blockingFindings: [],
    sourceClaimMap: [{ claim: "The article explains the documented finance comparison.", sourceUrl: "https://business.gov.au/finance/funding/choose-your-funding" }],
    ...overrides,
  };
}

function proposal(overrides: Record<string, unknown> = {}) {
  return {
    schemaVersion: 1,
    proposalId: "prop_0123456789abcdef0123456789abcdef",
    pageId: "pg_0123456789abcdef0123456789abcdef",
    path: "/resources/guides/example-page",
    sourcePath: "src/content/guides/example-page.md",
    status: "approved",
    risk: "R2",
    problem: "Borrowers need a differentiated explanation of this decision.",
    targeting: { primaryQuery: "example finance query", intent: "commercial investigation", audience: "Australian SME borrowers" },
    uniqueValue: ["Expert-reviewed worked decision example"],
    evidence: [{ type: "gsc", reference: "gsc-gap-1" }],
    internalLinks: { from: ["/services/business-finance"], to: ["/services/business-finance"] },
    measurement: {
      primaryOutcome: "qualified_organic_lead",
      successRule: "Reach top 20 and assist a qualified lead",
      exitRule: "Consolidate if it overlaps without qualified demand",
      firstReviewAt: "2026-11-01T00:00:00Z",
    },
    score: {
      components: { commercialFit: 20, demonstratedDemand: 15, top20Probability: 12, conversionPotential: 12, evidenceAuthority: 8, differentiation: 8, internalLinkFit: 5 },
      penalties: { cannibalisation: 0, templatedLocation: 0, unsupportedClaim: 0, noBusinessPath: 0 },
      total: 80,
    },
    approval: { approvedBy: "seo-owner", approvedAt: "2026-08-06T00:00:00Z", automated: false },
    ...overrides,
  };
}

test("opportunity score applies bounded components and penalties", () => {
  assert.equal(calculateOpportunityScore(proposal().score), 80);
  assert.throws(
    () => calculateOpportunityScore({ components: { ...proposal().score.components, commercialFit: 26 }, penalties: proposal().score.penalties }),
    /commercialFit/,
  );
});

test("approved R3 proposals cannot claim automated approval", () => {
  assert.deepEqual(validateProposal(proposal()).errors, []);
  assert.match(
    validateProposal(proposal({
      risk: "R3",
      approval: { approvedBy: "seo-policy-bot", approvedAt: "2026-08-06T00:00:00Z", automated: true },
    }), { automationPolicy: automationPolicy() }).errors.join(" "),
    /must be R2/,
  );
});

test("R2 automation requires truthful policy provenance", () => {
  const policy = automationPolicy();
  const approved = proposal({
    qualityReview: qualityReview(),
    approval: {
      approvedBy: "seo-policy-bot",
      approvedAt: "2026-08-12T00:00:00Z",
      automated: true,
      policyId: policy.policyId,
      policyVersion: policy.version,
      policyChecksum: policy.checksum,
    },
  });
  assert.deepEqual(validateProposal(approved, { automationPolicy: policy }).errors, []);
  assert.match(validateProposal(approved).errors.join(" "), /active automation policy/);
});

test("article quality review is reproducible and fails closed", () => {
  const review = qualityReview();
  assert.equal(calculateArticleQualityScore(review), 89.5);
  assert.deepEqual(validateArticleQualityReview(review).errors, []);
  assert.match(
    validateArticleQualityReview(qualityReview({ blockingFindings: ["Repeated conclusion"] })).errors.join(" "),
    /blocking findings/,
  );
  assert.match(
    validateArticleQualityReview(qualityReview({ overallScore: 70 })).errors.join(" "),
    /computed score/,
  );
});

test("historical automated approvals validate against immutable policy history", () => {
  const current = automationPolicy();
  const historicalBase = {
    ...current,
    version: "2026-08-12.1",
    cadence: { days: ["Tuesday", "Thursday"], articlesPerRun: 2, articlesPerWeek: 4 },
    authority: { ...current.authority, exactArticlesPerChange: 2 },
    checksum: undefined,
  };
  const historical = { ...historicalBase, checksum: checksum(historicalBase) };
  const approved = proposal({
    qualityReview: qualityReview(),
    approval: {
      approvedBy: "seo-policy-bot",
      approvedAt: "2026-08-12T00:00:00Z",
      automated: true,
      policyId: historical.policyId,
      policyVersion: historical.version,
      policyChecksum: historical.checksum,
    },
  });

  assert.deepEqual(validateProposal(approved, { automationPolicy: current, automationPolicyHistory: [historical] }).errors, []);
  assert.match(validateProposal(approved, { automationPolicy: current }).errors.join(" "), /immutable history/);
});

test("borderline proposals require an exception and low scores are rejected", () => {
  const base = proposal();
  const borderlineScore = {
    ...base.score,
    components: { ...base.score.components, commercialFit: 5 },
    total: 65,
  };
  assert.match(validateProposal(proposal({ score: borderlineScore })).errors.join(" "), /exception reason/);
  const lowScore = { ...borderlineScore, components: { ...borderlineScore.components, commercialFit: 0, demonstratedDemand: 0 }, total: 45 };
  assert.match(validateProposal(proposal({ score: lowScore })).errors.join(" "), /below 55/);
});
