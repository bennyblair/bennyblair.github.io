import crypto from "node:crypto";
import matter from "gray-matter";
import { marked } from "marked";
import { plainReleaseText } from "./content-release-proof.mjs";
import { checksum } from "./seo-control-plane.mjs";
import { isInternalLinkOnlyChange } from "./content-change-policy.mjs";
import { isExactPublicEditorialRemediation } from "./public-editorial-remediation.mjs";
import { findActiveProtectedChanges, routeFromSource } from "./protected-cohort-policy.mjs";
import { GENERAL_INFORMATION_AUTOMATED_REVIEWER, GENERAL_INFORMATION_MODE, validateGeneralInformationReview } from "./general-information-review.mjs";

export const REPAIR_POLICY_PATH = "data/seo-content-repair-policy.json";
export const REPAIR_MANIFEST = /^data\/seo-repairs\/repair_[a-z0-9-]+\.json$/;
export const REPAIR_CONTENT = /^src\/content\/(?:guides|case-studies|insights)\/[^/]+\.md$/;
export const sourceHash = (source) => crypto.createHash("sha256").update(source).digest("hex");
const validDate = (date) => typeof date === "string" && Number.isFinite(Date.parse(date));

// Older automated audit labels found in the trusted registry/content that this
// path is allowed to retire. Human names (for example "Ben") and the current
// canonical independent reviewer are not on this list.
export const RETIREABLE_AUTOMATED_REVIEWERS = Object.freeze([
  "OpenClaw SEO source audit",
  "OpenClaw SEO content audit",
  "OpenClaw SEO evidence review",
  "Codex automated content review",
  "OpenClaw automated independent editorial reviewer",
]);

// Team queues from generate-seo-page-registry.ts. Every high-risk page is
// assigned reviewOwner "financial-review"; that slug is a queue, not a recorded
// human or financial reviewer identity, so it must not block retiring the
// automated labels above. Unknown or person-named owners do block.
const TRUSTED_REVIEW_OWNER_QUEUES = new Set(["financial-review", "seo-content-review", "seo-engineering"]);

export function isCursorAgentRunUrl(reference) {
  if (typeof reference !== "string") return false;
  try {
    const url = new URL(reference);
    if (url.protocol !== "https:" || url.username || url.password) return false;
    if (url.hostname !== "cursor.com") return false;
    if (url.port && url.port !== "443") return false;
    return /^\/agents\/[A-Za-z0-9][A-Za-z0-9_-]*\/?$/.test(url.pathname);
  } catch {
    return false;
  }
}

export function declaredSourceUrls(source) {
  const sources = matter(source).data?.sources;
  if (!Array.isArray(sources)) return [];
  return sources.map((item) => item?.url).filter((url) => typeof url === "string" && url.length);
}

function blockedLiveSourceUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol !== "https:" || Boolean(parsed.username || parsed.password)
      || /^(?:localhost|127\.|10\.|192\.168\.)/.test(parsed.hostname);
  } catch {
    return true;
  }
}

export async function fetchLiveSourceStatuses(urls, fetchImpl = globalThis.fetch) {
  const statuses = {};
  for (const url of [...new Set(urls)]) {
    if (blockedLiveSourceUrl(url)) {
      statuses[url] = 0;
      continue;
    }
    try {
      const response = await fetchImpl(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(20_000) });
      statuses[url] = Number(response?.status) || 0;
    } catch {
      statuses[url] = 0;
    }
  }
  return statuses;
}

function presentReviewers(before, registered) {
  return [before.reviewedBy, registered?.governance?.reviewedBy].filter((value) => value != null && value !== "");
}

function registryOrBaseBlocksReviewSupersession(before, registered) {
  const governance = registered?.governance || {};
  if (governance.humanReviewRequired === true || governance.humanReviewRequired === "true") return true;
  if (governance.reviewStatus === "editorial-review" || before.reviewStatus === "editorial-review") return true;
  const owner = governance.reviewOwner;
  if (owner && !TRUSTED_REVIEW_OWNER_QUEUES.has(owner)) return true;
  if (/human/i.test(String(owner || ""))) return true;
  return presentReviewers(before, registered).some((reviewer) => !RETIREABLE_AUTOMATED_REVIEWERS.includes(reviewer));
}

export function publicHeadingCleanup(source) {
  return source
    .replace(/^(#{1,6})[ \t]+(?:LLM|AI)[ -]*(?:Ready|Readiness)(?:[ \t]+QA)?[ \t]+(Summary|Answer|Snapshot|Check)(?::[ \t]*(.*))?[ \t]*$/gim,
      (_heading, level, kind, detail) => level + " " + (detail || (/answer/i.test(kind) ? "Direct Answer" : /check/i.test(kind) ? "Reader Checklist" : "Practical Summary")))
    .replace(/^(#{1,6})[ \t]+Citation-Ready Answer:[ \t]*(.+)$/gim, "$1 $2");
}

export function isExactEditorialMigration(previous, current) {
  return previous !== current && (
    publicHeadingCleanup(previous) === current
    || nonfinancialEditorialCleanup(previous) === current
    || isExactPublicEditorialRemediation(previous, current)
  );
}

export function nonfinancialEditorialCleanup(source) {
  const parsed = matter(source);
  // A finite transformation, not a caller-supplied replacement or financial rewrite.
  const body = publicHeadingCleanup(parsed.content)
    .replace(/^# (.+)$/gm, (heading, title) => title.trim() === String(parsed.data.title || "").trim() ? "## " + title : heading)
    .replace(/^## Citation-Ready Answer:\s*(.+)$/gim, "## $1")
    .replace(/^## LLM[- ]readiness (?:QA )?(?:summary|snapshot|QA)$/gim, "## Practical Summary")
    .replace(/\brecieve\b/g, "receive")
    .replace(/\bseperate\b/g, "separate")
    .replace(/\bteh\b/g, "the");
  return source.slice(0, source.length - parsed.content.length) + body;
}

export function validateRepairPolicy(policy) {
  const errors = [];
  if (policy?.schemaVersion !== 1 || policy?.policyId !== "property-content-repair" || policy?.status !== "active") errors.push("inactive or invalid repair policy");
  if (!policy?.authorization?.reference || !policy?.authorization?.authorizedBy || !validDate(policy?.authorization?.authorizedAt)) errors.push("repair policy needs recorded programme authorization");
  if (policy?.authority?.branchPrefix !== "ai/content-repair-" || policy?.authority?.maxSubstantiveUrls !== 2 || policy?.authority?.maxMechanicalUrls !== 20) errors.push("repair batch bounds or branch prefix are invalid");
  if (policy?.authority?.requiredCheck !== "Type, content, security, build and route checks" || policy?.authority?.postDeployAuditRequired !== true) errors.push("repair policy may not weaken release gates");
  if (policy?.checksum !== checksum({ ...policy, checksum: undefined })) errors.push("repair policy checksum mismatch");
  return { errors };
}

function proofIsValid(proof, previous, current) {
  if (!proof || !["text-added", "text-removed", "link-added", "link-removed"].includes(proof.kind)) return false;
  if (typeof proof.value !== "string" || proof.value.trim().length < 8 || proof.value.length > 500) return false;
  const isLink = proof.kind.startsWith("link-");
  const fragment = isLink ? "](" + proof.value + ")" : plainReleaseText(marked.parse(proof.value, { async: false }));
  if (!fragment) return false;
  const before = isLink ? previous : plainReleaseText(marked.parse(matter(previous).content, { async: false }));
  const after = isLink ? current : plainReleaseText(marked.parse(matter(current).content, { async: false }));
  return proof.kind.endsWith("added")
    ? !before.includes(fragment) && after.includes(fragment)
    : before.includes(fragment) && !after.includes(fragment);
}

/** Called with trusted base policy/registry and exact before/after blobs; never executes PR code. */
export function validateRepairManifest({ manifest, policy, registry, protectedCohort, changes, baseSha, now = new Date(), liveSourceStatuses }) {
  const errors = [...validateRepairPolicy(policy).errors];
  const recordedEvidence = [];
  if (manifest?.schemaVersion !== 1 || !/^repair_[a-z0-9-]+$/.test(manifest?.repairId || "")) errors.push("invalid repair manifest identity");
  if (manifest?.policyId !== policy?.policyId || manifest?.policyVersion !== policy?.version || manifest?.policyChecksum !== policy?.checksum || manifest?.authorizationRef !== policy?.authorization?.reference) errors.push("repair authorization does not match trusted policy");
  if (!/^[a-f0-9]{40}$/.test(manifest?.baseSha || "") || manifest.baseSha !== baseSha) errors.push("repair manifest must name the exact current base revision");
  if (!manifest?.editor || !manifest?.review?.reviewer || manifest.editor === manifest.review.reviewer) errors.push("repair requires a separate editor and reviewer");
  if (!validDate(manifest?.review?.reviewedAt) || Date.parse(manifest.review.reviewedAt) > now.getTime() || !Array.isArray(manifest?.review?.blockingFindings) || manifest.review.blockingFindings.length || Number(manifest?.review?.score) < 85 || !Number.isFinite(Number(manifest?.review?.score))) errors.push("repair requires completed independent review scoring at least 85 with no blockers");
  const mechanical = manifest?.kind === "mechanical";
  if (!mechanical && manifest?.kind !== "substantive") errors.push("repair kind must be substantive or mechanical");
  const pages = Array.isArray(manifest?.pages) ? manifest.pages : [];
  const max = mechanical ? policy?.authority?.maxMechanicalUrls : policy?.authority?.maxSubstantiveUrls;
  if (!pages.length || pages.length > max || new Set(pages.map((page) => page.sourcePath)).size !== pages.length) errors.push("repair URL count exceeds its bounded policy or contains duplicates");
  if (changes.length !== pages.length) errors.push("every changed content file must have exactly one manifest row");
  for (const change of changes) {
    const { file, status, previous, current } = change;
    if (!REPAIR_CONTENT.test(file) || !["M", "modified"].includes(status)) { errors.push("repair may only modify existing content: " + file); continue; }
    const row = pages.find((page) => page.sourcePath === file);
    const registered = registry?.pages?.find((page) => page.sourcePath === file);
    if (!row || !registered || row.pageId !== registered.pageId || row.path !== registered.path || row.path !== routeFromSource(file)) { errors.push("repair page does not match trusted registry: " + file); continue; }
    if (previous === current || row.beforeSha256 !== sourceHash(previous) || row.afterSha256 !== sourceHash(current)) errors.push("repair evidence is stale or content is unchanged: " + file);
    if (!row.reason || !Array.isArray(row.evidence) || !row.evidence.length) errors.push("repair requires a reason and source evidence: " + file);
    else {
      for (const item of row.evidence) {
        if (!isCursorAgentRunUrl(item?.reference)) errors.push("repair evidence reference must be an https cursor.com/agents/ run URL: " + file);
        else recordedEvidence.push(item.reference);
      }
    }
    if (!Array.isArray(row.verification) || !row.verification.length || row.verification.some((proof) => !proofIsValid(proof, previous, current))) errors.push("repair needs changed-content deployment proof: " + file);
    if (registered.lifecycle?.protectedUntil && Date.parse(registered.lifecycle.protectedUntil) > now.getTime()) errors.push("active registry protection blocks repair: " + file);
    if (findActiveProtectedChanges([{ relativePath: file, source: previous }], protectedCohort || {}, now).length) errors.push("active indexing cohort blocks repair: " + file);
    const before = matter(previous).data;
    const after = matter(current).data;
    const generalInformationBackfill = !mechanical && manifest.reviewMode === GENERAL_INFORMATION_MODE;
    const exactReviewInstant = validDate(String(after.reviewedAt))
      && Date.parse(String(after.reviewedAt)) === Date.parse(manifest.review?.reviewedAt);
    const trustedAutomatedReviewer = manifest.review?.reviewer === GENERAL_INFORMATION_AUTOMATED_REVIEWER
      && after.reviewedBy === GENERAL_INFORMATION_AUTOMATED_REVIEWER;
    const reviewDays = Number(registered.governance?.reviewEveryDays);
    const expectedReviewDays = registered.governance?.contentRisk === "high" ? 90 : reviewDays;
    const validReviewCadence = Number.isFinite(reviewDays) && reviewDays > 0
      && (registered.governance?.contentRisk !== "high" || reviewDays === 90);
    const expectedExpiry = Date.parse(manifest.review?.reviewedAt) + expectedReviewDays * 24 * 60 * 60 * 1000;
    const exactReviewExpiry = validReviewCadence && validDate(String(after.expiresAt))
      && Date.parse(String(after.expiresAt)) === expectedExpiry && expectedExpiry > now.getTime();
    const noMetadataAliases = after.content_risk === undefined && after.reviewed_by === undefined
      && after.reviewed_at === undefined && after.reviewedDate === undefined && after.reviewed_date === undefined
      && after.expires_at === undefined;
    const exactGeneralInformationMetadata = generalInformationBackfill
      && after.contentRisk === registered.governance?.contentRisk
      && trustedAutomatedReviewer && exactReviewInstant && exactReviewExpiry && noMetadataAliases;
    if (generalInformationBackfill && !exactGeneralInformationMetadata)
      errors.push("general-information repair requires one exact canonical risk, reviewer, review instant and review expiry metadata set: " + file);
    // Existing review metadata may be superseded only on the fixed 90-day high-risk cadence
    // when the trusted base page/registry reviewer is a retireable automated audit label
    // and the trusted base registry does not record a human/financial review identity.
    const supersedesReviewMetadata = exactGeneralInformationMetadata
      && registered.governance?.contentRisk === "high"
      && !registryOrBaseBlocksReviewSupersession(before, registered);
    const allowsGeneralInformationReviewBackfill = (key) => {
      if (!exactGeneralInformationMetadata) return false;
      if (key === "contentRisk") return before.contentRisk === undefined && before.content_risk === undefined;
      if (key === "reviewedBy") return (before.reviewedBy === undefined || supersedesReviewMetadata)
        && before.reviewed_by === undefined && trustedAutomatedReviewer;
      if (key === "reviewedAt") return (before.reviewedAt === undefined || supersedesReviewMetadata)
        && before.reviewed_at === undefined && exactReviewInstant;
      if (["reviewedDate", "reviewed_date"].includes(key)) return before[key] !== undefined && after[key] === undefined;
      if (key === "expiresAt") return (before.expiresAt === undefined || supersedesReviewMetadata)
        && before.expires_at === undefined && exactReviewExpiry;
      return false;
    };
    const protectedMetadataKeys = ["contentRisk", "content_risk", "reviewedBy", "reviewed_by", "reviewedAt", "reviewed_at", "reviewedDate", "reviewed_date", "reviewStatus", "review_status", "humanReviewRequired", "human_review_required", "professionalFinancialReview", "professional_financial_review", "approvedBy", "approved_by", "reviewer", "reviewerName", "authorId", "date", "dateModified", "date_modified", "updatedAt", "updated_at", "author", "author_name", "authorName", "author_title", "authorTitle", "author_url", "authorUrl", "author_bio", "authorBio", "author_links", "authorLinks", "expiresAt", "expires_at", "canonical", "canonicalUrl", "canonical_url", "noindex", "robots", "slug"];
    for (const key of protectedMetadataKeys) {
      if (JSON.stringify(before[key]) !== JSON.stringify(after[key]) && !allowsGeneralInformationReviewBackfill(key)) {
        errors.push("repair may not alter protected metadata " + key + ": " + file);
      }
    }
    for (const key of new Set([...Object.keys(before), ...Object.keys(after)])) {
      const normalizedKey = key.toLowerCase().replaceAll("_", "");
      if (!protectedMetadataKeys.includes(key) && /review|approv|verif|check|sign.*off/.test(normalizedKey)
          && JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
        errors.push("repair may not introduce approval or review metadata alias " + key + ": " + file);
      }
    }
    const highRisk = registered.governance?.contentRisk === "high" || (before.contentRisk || before.content_risk) === "high" || /\/case-studies\//.test(file);
    if (mechanical) {
      const valid = manifest.transform === "internal-link-destinations-v1" ? isInternalLinkOnlyChange(previous, current)
        : manifest.transform === "public-headings-v1" ? previous !== current && publicHeadingCleanup(previous) === current
        : manifest.transform === "nonfinancial-editorial-v1" ? previous !== current && nonfinancialEditorialCleanup(previous) === current
        : manifest.transform === "public-editorial-v1" && !highRisk ? isExactPublicEditorialRemediation(previous, current)
        : false;
      if (!valid) errors.push("change is not the declared exact mechanical transformation: " + file);
      if (JSON.stringify(before) !== JSON.stringify(after)) errors.push("mechanical repair may not change frontmatter: " + file);
    } else if (manifest.reviewMode === GENERAL_INFORMATION_MODE) {
      if (policy.authority?.generalInformationMode !== GENERAL_INFORMATION_MODE) errors.push("trusted policy does not authorize general-information review");
      errors.push(...validateGeneralInformationReview({ source: current, sourceSha256: row.afterSha256, review: row.generalInformationReview, manifestReview: manifest.review, now, liveSourceStatuses }).map(error => error + ": " + file));
    } else {
      if (highRisk) errors.push("substantive high-risk content requires genuine financial review outside routine automation: " + file);
      // This reviewed, page-specific programme authority does not alter the global registry ceiling.
      if (row.metadataReview?.reviewer !== manifest.review?.reviewer || row.metadataReview?.reviewedAt !== manifest.review?.reviewedAt || row.metadataReview?.contentRisk !== registered.governance?.contentRisk || !["low", "medium"].includes(row.metadataReview?.contentRisk)) errors.push("substantive repair requires a scoped metadata and financial-risk review: " + file);
    }
  }
  return { errors, pages: pages.map(({ path }) => path), evidence: recordedEvidence };
}

export async function validateRepairManifestWithLiveSources({ fetch, ...opts }) {
  const urls = (opts.changes || []).flatMap((change) => declaredSourceUrls(change.current || ""));
  const liveSourceStatuses = await fetchLiveSourceStatuses(urls, fetch);
  return validateRepairManifest({ ...opts, liveSourceStatuses });
}

export function validateReleaseGate({ expectedSha, actualSha, gate }) {
  if (actualSha !== expectedSha) return ["PR revision changed after review"];
  if (!gate || gate.head_sha !== expectedSha || gate.status !== "completed" || gate.conclusion !== "success" || gate.app?.slug !== "github-actions") return ["required check must succeed on the exact reviewed revision"];
  return [];
}
