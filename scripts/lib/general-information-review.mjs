import matter from "gray-matter";
import { plainReleaseText } from "./content-release-proof.mjs";
import { marked } from "marked";

export const GENERAL_INFORMATION_MODE = "general-information-v1";
const forbiddenClaims = [
  [/\b(?:guaranteed|guarantee[sd]?)\s+(?:approval|finance|funding|settlement|returns?)\b/i, "approval or outcome guarantee"],
  [/\b(?:approval|funding|settlement|settle|approved)\b.{0,35}\b(?:within|in|as little as)\s+\d+\s*(?:hours?|days?)\b/i, "time promise"],
  [/\b(?:interest|rate|LVR|loan.to.value)\b.{0,50}\d+(?:\.\d+)?\s*%/i, "specific rate or eligibility threshold"],
  [/\b(?:is|are|will be|fully)\s+tax[- ]deductible\b/i, "tax conclusion"],
  [/\b(?:you|all borrowers|every business)\s+(?:will|always|automatically)\s+(?:qualify|be eligible|be approved)\b/i, "eligibility assurance"],
  [/\b(?:we recommend you|you should borrow|best loan for you)\b/i, "personal recommendation"],
];

/** Review evidence supplements deterministic checks; neither alone proves legal compliance. */
export function validateGeneralInformationReview({ source, sourceSha256, review, manifestReview, now }) {
  const errors = [];
  if (!review || review.mode !== GENERAL_INFORMATION_MODE) return ["complete general-information review required"];
  if (review.reviewer !== manifestReview.reviewer || review.reviewedAt !== manifestReview.reviewedAt ||
      review.reviewedSourceSha256 !== sourceSha256) errors.push("general-information review must match the independent reviewer and exact resulting page");
  for (const key of ["automated", "businessPurposeOnly", "noPersonalAdvice", "completePageChecked", "unsupportedClaimsRemoved"])
    if (review[key] !== true) errors.push(`general-information review must confirm ${key}`);
  if (review.human !== false || review.professionalFinancialReview !== false)
    errors.push("automated review must not claim human or professional financial approval");
  if (!Array.isArray(review.blockingFindings) || review.blockingFindings.length)
    errors.push("general-information review has unresolved findings");
  const sources = Array.isArray(review.sources) ? review.sources : [];
  const parsed = matter(source);
  const declared = new Set((parsed.data.sources || []).map(item => item.url));
  const checked = new Set();
  for (const item of sources) {
    let url;
    try { url = new URL(item.url); } catch { errors.push("invalid factual source URL"); continue; }
    const age = now.getTime() - Date.parse(item.checkedAt);
    if (url.protocol !== "https:" || /^(?:localhost|127\.|10\.|192\.168\.)/.test(url.hostname) || !declared.has(item.url) || !Number.isFinite(age) || age < 0 || age > 30 * 86400000)
      errors.push("factual sources must be declared HTTPS sources checked within 30 days");
    checked.add(item.url);
  }
  const claims = Array.isArray(review.sourceClaimMap) ? review.sourceClaimMap : [];
  if (!sources.length || !claims.length) errors.push("general-information review requires checked sources and a factual claim map");
  const text = plainReleaseText(marked.parse(parsed.content, { async: false }));
  for (const claim of claims) {
    if (typeof claim.claim !== "string" || claim.claim.length < 12 || !text.includes(claim.claim) ||
        !Array.isArray(claim.sources) || !claim.sources.length || claim.sources.some(url => !checked.has(url)))
      errors.push("each mapped factual claim must appear on the resulting page and cite a checked source");
  }
  const publicCopy = [parsed.data.title, parsed.data.description, parsed.data.metaTitle, parsed.data.metaDescription, parsed.data.featuredImageAlt, text].filter(Boolean).join(" ");
  for (const [pattern, finding] of forbiddenClaims) if (pattern.test(publicCopy)) errors.push(`general-information page contains ${finding}; rewrite and review again`);
  if (!text.includes("This article is for informational purposes only and does not constitute financial advice.")) errors.push("general-information disclaimer missing");
  return errors;
}
