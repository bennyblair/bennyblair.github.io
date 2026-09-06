import crypto from "node:crypto";

// Preserve the existing targeted check, and catch changes to other advertised
// aggregate network sizes rather than allowing "50" to become "60".
export const LENDER_COUNT_PATTERN = /(?:access to\s+)?(?:over\s+)?50\+?\s+lenders|(?:access to\s+(?:over\s+)?|(?:network|panel)\s+of\s+(?:over\s+)?|over\s+)\d+\+?\s+lenders|\b\d+\+\s+lenders/gi;

export function claimContextHash(value) {
  return crypto.createHash("sha256").update(value.replace(/\s+/g, " ").trim()).digest("hex");
}

function contexts(source, pattern) {
  return [...source.matchAll(new RegExp(pattern.source, pattern.flags))].map(match => {
    const start = source.lastIndexOf("\n", match.index) + 1;
    const end = source.indexOf("\n", match.index);
    return claimContextHash(source.slice(start, end < 0 ? undefined : end));
  });
}

export function isUnchangedPreservedClaim({ relativePath, label, pattern, previous, current, policy, claims }) {
  if (policy?.schemaVersion !== 1 || policy?.status !== "active" || !policy?.authorization?.reference) return false;
  const entry = policy.entries?.find(item => item.sourcePath === relativePath && item.ruleLabel === label);
  if (!entry || entry.verificationStatus !== "unverified-existing" || entry.maximumOccurrences !== 1) return false;
  const claim = claims?.[entry.claimId];
  // Preservation records are not a route to verify, renew or enable claim schema.
  if (claim?.status !== entry.registryStatus || claim?.schemaAllowed !== false || claim?.source || claim?.verifiedAt || claim?.expiresAt) return false;
  const before = contexts(previous, pattern);
  const after = contexts(current, pattern);
  return before.length === entry.maximumOccurrences && after.length === before.length
    && before.every(value => value === entry.contextSha256)
    && after.every(value => value === entry.contextSha256);
}
