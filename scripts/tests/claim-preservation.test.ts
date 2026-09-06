import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { LENDER_COUNT_PATTERN, isUnchangedPreservedClaim, isVerifiedLenderClaim } from "../lib/claim-preservation.mjs";

const policy = JSON.parse(fs.readFileSync("data/company-claim-preservation.json", "utf8"));
const registeredClaims = JSON.parse(fs.readFileSync("src/content/claims.json", "utf8"));
// Exercise historical unverified preservation independently of a later attestation.
const claims = { ...registeredClaims, "lender-network-50": { ...registeredClaims["lender-network-50"], status: "expired", source: "", verifiedAt: "", expiresAt: "" } };
function fixture(index = 0) {
  const entry = policy.entries[index];
  const source = fs.readFileSync(entry.sourcePath, "utf8");
  return { relativePath: entry.sourcePath, label: entry.ruleLabel, pattern: LENDER_COUNT_PATTERN, previous: source, current: source, policy, claims };
}

test("explicit owner instruction preserves only the unchanged unverified lender paragraphs at their existing URLs", () => {
  for (let i = 0; i < policy.entries.length; i++) {
    const input = fixture(i);
    assert.equal(isUnchangedPreservedClaim(input), true);
    input.current += "\n// An unrelated editorial correction.\n";
    assert.equal(isUnchangedPreservedClaim(input), true);
    assert.equal(input.claims["lender-network-50"].status, "expired");
  }
});

test("owner-confirmed lender count requires exact count, current dates and provenance", () => {
  const input = { source: "access to over 50 lenders", claims: registeredClaims, now: Date.parse("2026-09-08") };
  assert.equal(isVerifiedLenderClaim(input), true);
  for (const source of ["access to over 60 lenders", "over 50 lenders and over 70 lenders", "50 lenders"]) {
    assert.equal(isVerifiedLenderClaim({ ...input, source }), false);
  }
  for (const change of [{ source: "" }, { status: "expired" }, { verifiedAt: "invalid" }, { expiresAt: "2026-09-01" }, { schemaAllowed: true }]) {
    assert.equal(isVerifiedLenderClaim({ ...input, claims: { ...registeredClaims, "lender-network-50": { ...registeredClaims["lender-network-50"], ...change } } }), false);
  }
});

test("new claims, altered network counts, repeated occurrences and new locations fail closed", () => {
  const input = fixture();
  const paragraph = input.current.split("\n").find(line => /over 50 lenders/.test(line))!;
  assert.equal(isUnchangedPreservedClaim({ ...input, previous: "" }), false);
  assert.equal(isUnchangedPreservedClaim({ ...input, current: input.current.replace("over 50 lenders", "over 60 lenders") }), false);
  assert.match("access to over 60 lenders", LENDER_COUNT_PATTERN);
  assert.equal(isUnchangedPreservedClaim({ ...input, current: input.current + "\n" + paragraph }), false);
  assert.equal(isUnchangedPreservedClaim({ ...input, relativePath: "src/pages/NewPromotion.tsx" }), false);
});

test("retention cannot fabricate source verification, review expiry or schema permission", () => {
  const input = fixture();
  for (const change of [{ status: "verified" }, { source: "invented source" }, { verifiedAt: "2026-09-06" }, { expiresAt: "2027-01-01" }, { schemaAllowed: true }]) {
    assert.equal(isUnchangedPreservedClaim({ ...input, claims: { ...claims, "lender-network-50": { ...claims["lender-network-50"], ...change } } }), false);
  }
});
