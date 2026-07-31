import claimData from "@/content/claims.json";

export type ClaimStatus = "verified" | "legacy-retained" | "expired";

export interface ClaimRecord {
  statement: string;
  definition: string;
  measurementPeriod: string;
  source: string;
  owner: string;
  verifiedAt: string;
  expiresAt: string;
  displayQualification: string;
  schemaAllowed: boolean;
  status: ClaimStatus;
  riskAcceptedAt?: string;
}

export const claims = claimData as Record<string, ClaimRecord>;

export function getClaim(id: string) {
  const claim = claims[id];
  if (!claim) throw new Error(`Unknown claim id: ${id}`);
  return claim;
}

export function claimCanBeAddedToSchema(id: string) {
  const claim = getClaim(id);
  if (!claim.schemaAllowed) return false;
  if (!claim.expiresAt) return claim.status === "legacy-retained";
  return new Date(claim.expiresAt).getTime() >= Date.now();
}
