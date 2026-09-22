const ALLOWED_AUTOMATED_RISKS = new Set(["R1", "R2"]);

const numberOrNull = (value) => {
  const parsed = Number(value);
  return value === null || value === undefined || value === "" || !Number.isFinite(parsed) ? null : parsed;
};

export function demandScore(metric) {
  const impressions = numberOrNull(metric?.impressions);
  const clicks = numberOrNull(metric?.clicks);
  if (impressions === null && clicks === null) return { score: 0, available: false };
  let score = impressions >= 1000 ? 20 : impressions >= 250 ? 16 : impressions >= 50 ? 12 : impressions > 0 ? 8 : 0;
  if ((clicks || 0) > 0) score += 5;
  return { score: Math.min(25, score), available: true };
}

export function assessContentEligibility({ page, audit, metric, config, protectedNow = false }) {
  const blockers = [];
  const unknowns = [];
  const serviceOwners = new Set(config?.commercialStrategy?.serviceOwners || []);
  const priorityPaths = new Set(config?.priorityPaths || []);
  const path = page?.path || "";
  const serviceOwner = page?.targeting?.designatedServicePagePath || null;
  const primaryQuery = page?.targeting?.primaryQuery || null;
  const automatedRisk = page?.governance?.maxAutomatedChangeRisk || null;
  const contentRisk = audit?.contentRisk || page?.governance?.contentRisk || null;
  const strategyConfigured = serviceOwners.size > 0;
  const businessFit = !strategyConfigured || serviceOwners.has(path) || serviceOwners.has(serviceOwner) || priorityPaths.has(path);

  if (page?.indexability !== "indexable") blockers.push(`indexability:${page?.indexability || "unknown"}`);
  if (protectedNow) blockers.push("active_protection_window");
  if (!businessFit) blockers.push("outside_accelerated_commercial_focus");
  if (!automatedRisk) unknowns.push("automated_change_permission_missing");
  else if (!ALLOWED_AUTOMATED_RISKS.has(automatedRisk)) blockers.push(`automated_change_permission:${automatedRisk}`);
  if (!primaryQuery) unknowns.push("primary_query_missing");
  if (!serviceOwner && !serviceOwners.has(path)) unknowns.push("service_owner_missing");
  if (contentRisk === "high") {
    if (!audit?.reviewedBy || !audit?.reviewedAt) blockers.push("genuine_specialist_review_required");
    if (!audit?.hasSources) blockers.push("authoritative_sources_missing");
  }
  if (audit?.expiredEvidence) blockers.push("evidence_expired");
  if (audit?.flags?.includes("missing_referenced_image")) blockers.push("referenced_image_missing");

  const demand = demandScore(metric);
  const components = {
    businessFit: businessFit ? 35 : 0,
    demonstratedDemand: demand.score,
    distinctIntent: primaryQuery && (serviceOwner || serviceOwners.has(path)) ? 20 : primaryQuery ? 10 : 0,
    approvedEvidence: audit?.hasSources ? 15 : 0,
    serpAttainability: numberOrNull(metric?.position) !== null ? 5 : 0,
  };
  const priorityScore = Object.values(components).reduce((total, value) => total + value, 0);
  const status = blockers.length ? "blocked" : unknowns.length ? "unknown" : "eligible";
  return {
    status,
    blockers,
    unknowns,
    checkedBeforeDrafting: true,
    businessFit,
    demandAvailable: demand.available,
    components,
    priorityScore,
  };
}

export function assessProposalEligibility(review) {
  const errors = [];
  if (!review || typeof review !== "object") return ["eligibilityReview is required before drafting"];
  for (const field of ["commercialFit", "intentOwnerChecked", "permissionChecked", "evidenceReady"]) {
    if (review[field] !== true) errors.push(`eligibilityReview ${field} must be true`);
  }
  if (review.professionalReviewRequired !== false) {
    errors.push("eligibilityReview professionalReviewRequired must be false for autonomous publication");
  }
  if (!review.checkedAt || Number.isNaN(Date.parse(review.checkedAt))) {
    errors.push("eligibilityReview checkedAt must be a valid timestamp");
  }
  if (!Array.isArray(review.blockingFindings)) errors.push("eligibilityReview blockingFindings must be an array");
  else if (review.blockingFindings.length) errors.push("eligibilityReview has unresolved blocking findings");
  return errors;
}
