import assert from "node:assert/strict";
import test from "node:test";
import { checksum } from "../lib/seo-control-plane.mjs";
import { calculateOpportunityScore, validateProposal } from "../lib/seo-proposal.mjs";

function automationPolicy() {
  const policy = {
    schemaVersion: 1,
    policyId: "daily-content-automerge",
    version: "2026-08-12.1",
    status: "active",
    cadence: { articlesPerRun: 2, articlesPerWeek: 4 },
    authority: { allowedRisk: "R2", proposalApprover: "seo-policy-bot" },
  };
  return { ...policy, checksum: checksum({ ...policy, checksum: undefined }) };
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
