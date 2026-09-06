import crypto from "node:crypto";
import matter from "gray-matter";
import { marked } from "marked";
import { plainReleaseText } from "./content-release-proof.mjs";
import { checksum } from "./seo-control-plane.mjs";
import { isInternalLinkOnlyChange } from "./content-change-policy.mjs";
import { isExactPublicEditorialRemediation } from "./public-editorial-remediation.mjs";
import { findActiveProtectedChanges, routeFromSource } from "./protected-cohort-policy.mjs";

export const REPAIR_POLICY_PATH = "data/seo-content-repair-policy.json";
export const REPAIR_MANIFEST = /^data\/seo-repairs\/repair_[a-z0-9-]+\.json$/;
export const REPAIR_CONTENT = /^src\/content\/(?:guides|case-studies|insights)\/[^/]+\.md$/;
export const sourceHash = (source) => crypto.createHash("sha256").update(source).digest("hex");
const validDate = (date) => typeof date === "string" && Number.isFinite(Date.parse(date));

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
export function validateRepairManifest({ manifest, policy, registry, protectedCohort, changes, baseSha, now = new Date() }) {
  const errors = [...validateRepairPolicy(policy).errors];
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
    if (!row.reason || !Array.isArray(row.evidence) || !row.evidence.length || row.evidence.some((item) => !item?.reference)) errors.push("repair requires a reason and source evidence: " + file);
    if (!Array.isArray(row.verification) || !row.verification.length || row.verification.some((proof) => !proofIsValid(proof, previous, current))) errors.push("repair needs changed-content deployment proof: " + file);
    if (registered.lifecycle?.protectedUntil && Date.parse(registered.lifecycle.protectedUntil) > now.getTime()) errors.push("active registry protection blocks repair: " + file);
    if (findActiveProtectedChanges([{ relativePath: file, source: previous }], protectedCohort || {}, now).length) errors.push("active indexing cohort blocks repair: " + file);
    const before = matter(previous).data;
    const after = matter(current).data;
    for (const key of ["contentRisk", "content_risk", "reviewedBy", "reviewed_by", "reviewedAt", "reviewed_at", "reviewedDate", "reviewed_date", "reviewStatus", "review_status", "humanReviewRequired", "human_review_required", "reviewer", "reviewerName", "authorId", "date", "dateModified", "date_modified", "updatedAt", "updated_at", "author", "author_name", "authorName", "author_title", "authorTitle", "author_url", "authorUrl", "author_bio", "authorBio", "author_links", "authorLinks", "expiresAt", "expires_at", "canonical", "canonicalUrl", "canonical_url", "noindex", "robots", "slug"]) {
      if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) errors.push("repair may not alter protected metadata " + key + ": " + file);
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
    } else {
      if (highRisk) errors.push("substantive high-risk content requires genuine financial review outside routine automation: " + file);
      // This reviewed, page-specific programme authority does not alter the global registry ceiling.
      if (row.metadataReview?.reviewer !== manifest.review?.reviewer || row.metadataReview?.reviewedAt !== manifest.review?.reviewedAt || row.metadataReview?.contentRisk !== registered.governance?.contentRisk || !["low", "medium"].includes(row.metadataReview?.contentRisk)) errors.push("substantive repair requires a scoped metadata and financial-risk review: " + file);
    }
  }
  return { errors, pages: pages.map(({ path }) => path) };
}

export function validateReleaseGate({ expectedSha, actualSha, gate }) {
  if (actualSha !== expectedSha) return ["PR revision changed after review"];
  if (!gate || gate.head_sha !== expectedSha || gate.status !== "completed" || gate.conclusion !== "success" || gate.app?.slug !== "github-actions") return ["required check must succeed on the exact reviewed revision"];
  return [];
}
