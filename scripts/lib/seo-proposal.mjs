import fs from "node:fs";
import path from "node:path";
import { checksum, normaliseRoute } from "./seo-control-plane.mjs";

const AUTOMATION_POLICY_PATH = "data/seo-content-automation-policy.json";
const AUTOMATION_POLICY_HISTORY_PATH = "data/seo-content-automation-policy-history.json";

export function loadAutomationPolicy(repoRoot = process.cwd()) {
  const file = path.join(repoRoot, AUTOMATION_POLICY_PATH);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function loadAutomationPolicyHistory(repoRoot = process.cwd()) {
  const file = path.join(repoRoot, AUTOMATION_POLICY_HISTORY_PATH);
  if (!fs.existsSync(file)) return [];
  const history = JSON.parse(fs.readFileSync(file, "utf8"));
  if (history?.schemaVersion !== 1 || !Array.isArray(history?.policies)) {
    throw new Error("automation policy history schema is invalid");
  }
  return history.policies;
}

export function validateAutomationPolicy(policy, { requireCurrentCadence = true } = {}) {
  const errors = [];
  if (policy?.schemaVersion !== 1) errors.push("automation policy schemaVersion must be 1");
  if (policy?.policyId !== "daily-content-automerge") errors.push("automation policyId is invalid");
  if (policy?.status !== "active") errors.push("automation policy is not active");
  if (policy?.authority?.allowedRisk !== "R2") errors.push("automation policy may authorize only R2");
  const days = policy?.cadence?.days;
  const articlesPerRun = policy?.cadence?.articlesPerRun;
  const articlesPerWeek = policy?.cadence?.articlesPerWeek;
  if (!Array.isArray(days) || days.length === 0 || new Set(days).size !== days.length) {
    errors.push("automation policy cadence days must be a non-empty unique list");
  }
  if (!Number.isInteger(articlesPerRun) || articlesPerRun < 1 || !Number.isInteger(articlesPerWeek) || articlesPerWeek < 1) {
    errors.push("automation policy cadence counts must be positive integers");
  } else if (Array.isArray(days) && articlesPerWeek !== days.length * articlesPerRun) {
    errors.push("automation policy articlesPerWeek must equal scheduled days times articlesPerRun");
  }
  if (requireCurrentCadence && (days?.length !== 2 || days?.[0] !== "Tuesday" || days?.[1] !== "Thursday" || articlesPerRun !== 1 || articlesPerWeek !== 2)) {
    errors.push("automation policy must authorize exactly one article per run and two per week");
  }
  if (policy?.authority?.exactArticlesPerChange !== articlesPerRun) {
    errors.push("automation policy exactArticlesPerChange must match articlesPerRun");
  }
  if (requireCurrentCadence) {
    if (policy?.authority?.qualityReviewRequired !== true) errors.push("automation policy must require an article quality review");
    if (Number(policy?.authority?.minimumQualityScore) !== 85) errors.push("automation policy minimum quality score must be 85");
    if (Number(policy?.authority?.qualityContractVersion) !== 1) errors.push("automation policy quality contract version must be 1");
    if (policy?.authority?.automatedContentRisk !== "low") errors.push("automation policy must restrict automated articles to low content risk");
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

export const ARTICLE_QUALITY_DIMENSIONS = Object.freeze([
  "intentCoverage",
  "informationGain",
  "specificity",
  "evidence",
  "readability",
  "repetition",
  "compliance",
  "aiAnswerUsefulness",
]);

export function calculateArticleQualityScore(review) {
  const values = ARTICLE_QUALITY_DIMENSIONS.map((dimension) => {
    const value = Number(review?.dimensions?.[dimension]);
    if (!Number.isFinite(value) || value < 0 || value > 100) {
      throw new Error(`qualityReview ${dimension} must be between 0 and 100`);
    }
    return value;
  });
  return Number((values.reduce((total, value) => total + value, 0) / values.length).toFixed(1));
}

export function validateArticleQualityReview(review, { minimumScore = 85 } = {}) {
  const errors = [];
  if (!review || typeof review !== "object") return { errors: ["qualityReview is required"] };
  if (!review.promptVersion || !review.evaluatorModel || !review.reviewedAt) {
    errors.push("qualityReview requires promptVersion, evaluatorModel, and reviewedAt");
  }
  if (Number.isNaN(new Date(review.reviewedAt).getTime())) errors.push("qualityReview reviewedAt must be a valid timestamp");
  let computedScore;
  try {
    computedScore = calculateArticleQualityScore(review);
    if (Number(review.overallScore) !== computedScore) {
      errors.push(`qualityReview overallScore must equal computed score ${computedScore}`);
    }
    if (computedScore < minimumScore) errors.push(`qualityReview score must be at least ${minimumScore}`);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
  if (!Array.isArray(review.blockingFindings)) errors.push("qualityReview blockingFindings must be an array");
  else if (review.blockingFindings.length) errors.push("qualityReview has unresolved blocking findings");
  if (!Array.isArray(review.sourceClaimMap) || review.sourceClaimMap.length === 0) {
    errors.push("qualityReview sourceClaimMap requires at least one claim-to-source row");
  } else {
    for (const row of review.sourceClaimMap) {
      if (!row?.claim || !/^https:\/\//i.test(String(row?.sourceUrl || ""))) {
        errors.push("qualityReview sourceClaimMap rows require claim and HTTPS sourceUrl");
      }
    }
  }
  return { errors, computedScore };
}

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

export function validateProposal(proposal, { automationPolicy, automationPolicyHistory = [] } = {}) {
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
      const candidates = [automationPolicy, ...automationPolicyHistory].filter(Boolean);
      const referencedPolicy = candidates.find((policy) =>
        policy.policyId === proposal.approval?.policyId
        && policy.version === proposal.approval?.policyVersion
        && policy.checksum === proposal.approval?.policyChecksum);
      const policyValidation = referencedPolicy
        ? validateAutomationPolicy(referencedPolicy, { requireCurrentCadence: referencedPolicy === automationPolicy })
        : { errors: [candidates.length ? "automated proposal policy provenance is not present in current or immutable history" : "active automation policy is required"] };
      errors.push(...policyValidation.errors);
      if (proposal.risk !== "R2") errors.push("automated page proposals must be R2");
      if (referencedPolicy && proposal.approval?.approvedBy !== referencedPolicy.authority?.proposalApprover) {
        errors.push("automated proposal approver does not match policy");
      }
      if (referencedPolicy?.authority?.qualityReviewRequired === true) {
        const quality = validateArticleQualityReview(proposal.qualityReview, {
          minimumScore: Number(referencedPolicy.authority.minimumQualityScore || 85),
        });
        errors.push(...quality.errors);
      }
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
