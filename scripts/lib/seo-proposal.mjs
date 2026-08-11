import fs from "node:fs";
import path from "node:path";
import { checksum, normaliseRoute } from "./seo-control-plane.mjs";

const AUTOMATION_POLICY_PATH = "data/seo-content-automation-policy.json";

export function loadAutomationPolicy(repoRoot = process.cwd()) {
  const file = path.join(repoRoot, AUTOMATION_POLICY_PATH);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function validateAutomationPolicy(policy) {
  const errors = [];
  if (policy?.schemaVersion !== 1) errors.push("automation policy schemaVersion must be 1");
  if (policy?.policyId !== "daily-content-automerge") errors.push("automation policyId is invalid");
  if (policy?.status !== "active") errors.push("automation policy is not active");
  if (policy?.authority?.allowedRisk !== "R2") errors.push("automation policy may authorize only R2");
  if (policy?.cadence?.articlesPerRun !== 2 || policy?.cadence?.articlesPerWeek !== 4) {
    errors.push("automation policy must authorize exactly two articles per run and four per week");
  }
  const actual = checksum({ ...policy, checksum: undefined });
  if (policy?.checksum !== actual) errors.push(`automation policy checksum mismatch; expected ${actual}`);
  return { errors, checksum: actual };
}

export const SCORE_WEIGHTS = Object.freeze({
  commercialFit: 25,
  demonstratedDemand: 20,
  top20Probability: 15,
  conversionPotential: 15,
  evidenceAuthority: 10,
  differentiation: 10,
  internalLinkFit: 5,
});

export const PENALTY_LIMITS = Object.freeze({
  cannibalisation: 20,
  templatedLocation: 20,
  unsupportedClaim: 30,
  noBusinessPath: 20,
});

export function calculateOpportunityScore(score) {
  const positive = Object.entries(SCORE_WEIGHTS).reduce((total, [key, maximum]) => {
    const value = Number(score?.components?.[key]);
    if (!Number.isFinite(value) || value < 0 || value > maximum) {
      throw new Error(`${key} must be between 0 and ${maximum}`);
    }
    return total + value;
  }, 0);
  const penalty = Object.entries(PENALTY_LIMITS).reduce((total, [key, maximum]) => {
    const value = Number(score?.penalties?.[key] || 0);
    if (!Number.isFinite(value) || value < 0 || value > maximum) {
      throw new Error(`${key} penalty must be between 0 and ${maximum}`);
    }
    return total + value;
  }, 0);
  return Math.max(0, positive - penalty);
}

export function validateProposal(proposal, { automationPolicy } = {}) {
  const errors = [];
  const requiredStrings = ["proposalId", "pageId", "path", "sourcePath", "status", "risk", "problem"];
  for (const key of requiredStrings) if (!proposal?.[key] || typeof proposal[key] !== "string") errors.push(`${key} is required`);
  if (!/^prop_[a-f0-9]{32}$/i.test(proposal?.proposalId || "")) errors.push("proposalId is invalid");
  if (!/^pg_[a-f0-9]{32}$/i.test(proposal?.pageId || "")) errors.push("pageId is invalid");
  if (normaliseRoute(proposal?.path) !== proposal?.path) errors.push("path must be normalized");
  if (!["draft", "approved", "rejected", "built", "closed"].includes(proposal?.status)) errors.push("status is invalid");
  if (!["R1", "R2", "R3", "R4"].includes(proposal?.risk)) errors.push("risk is invalid");
  if ((proposal?.problem || "").length < 20) errors.push("problem must describe the user/business gap");
  if (!proposal?.targeting?.primaryQuery || !proposal?.targeting?.intent || !proposal?.targeting?.audience) {
    errors.push("targeting requires primaryQuery, intent, and audience");
  }
  if (!Array.isArray(proposal?.uniqueValue) || proposal.uniqueValue.length === 0) errors.push("uniqueValue requires at least one item");
  if (!Array.isArray(proposal?.evidence) || proposal.evidence.length === 0) errors.push("evidence requires at least one source");
  if (!Array.isArray(proposal?.internalLinks?.from) || !Array.isArray(proposal?.internalLinks?.to)) {
    errors.push("internalLinks requires from and to arrays");
  }
  if (!proposal?.measurement?.primaryOutcome || !proposal?.measurement?.successRule || !proposal?.measurement?.exitRule || !proposal?.measurement?.firstReviewAt) {
    errors.push("measurement requires outcome, success rule, exit rule, and first review date");
  }

  let computedScore;
  try {
    computedScore = calculateOpportunityScore(proposal?.score);
    if (proposal?.score?.total !== computedScore) errors.push(`score.total must equal computed score ${computedScore}`);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  if (proposal?.status === "approved") {
    if (computedScore < 55) errors.push("scores below 55 cannot be approved");
    if (!proposal.approval?.approvedBy || !proposal.approval?.approvedAt) errors.push("approved proposal requires approver and timestamp");
    if (proposal.approval?.automated === true) {
      const policyValidation = automationPolicy
        ? validateAutomationPolicy(automationPolicy)
        : { errors: ["active automation policy is required"] };
      errors.push(...policyValidation.errors);
      if (proposal.risk !== "R2") errors.push("automated page proposals must be R2");
      if (proposal.approval?.approvedBy !== automationPolicy?.authority?.proposalApprover) {
        errors.push("automated proposal approver does not match policy");
      }
      if (proposal.approval?.policyId !== automationPolicy?.policyId) errors.push("automated proposal policyId is invalid");
      if (proposal.approval?.policyVersion !== automationPolicy?.version) errors.push("automated proposal policyVersion is invalid");
      if (proposal.approval?.policyChecksum !== automationPolicy?.checksum) errors.push("automated proposal policyChecksum is invalid");
    } else if (["R2", "R3", "R4"].includes(proposal.risk) && !proposal.approval?.approvedBy) {
      errors.push(`${proposal.risk} proposal requires human approval`);
    }
    if (computedScore < 70 && !proposal.approval?.exceptionReason) {
      errors.push("score from 55 to 69 requires an exception reason");
    }
  }
  if (proposal?.risk === "R4" && proposal?.approval?.sendAuthorized === true) {
    errors.push("SEO page proposal cannot authorize external sending");
  }
  return { errors, computedScore };
}

export function loadProposals(repoRoot = process.cwd()) {
  const directory = path.join(repoRoot, "data", "seo-proposals");
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({ file: `data/seo-proposals/${file}`, proposal: JSON.parse(fs.readFileSync(path.join(directory, file), "utf8")) }));
}
