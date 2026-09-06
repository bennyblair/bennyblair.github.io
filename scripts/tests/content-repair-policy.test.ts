import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { checksum } from "../lib/seo-control-plane.mjs";
import { isExactEditorialMigration, publicHeadingCleanup, nonfinancialEditorialCleanup, sourceHash, validateRepairManifest, validateRepairPolicy, validateReleaseGate } from "../lib/content-repair-policy.mjs";

const policy = JSON.parse(fs.readFileSync("data/seo-content-repair-policy.json", "utf8"));
const baseSha = "a".repeat(40);
const now = new Date("2026-09-06T12:00:00Z");

function fixture({ count = 1, kind = "substantive", contentRisk = "medium", transform = "" } = {}) {
  const changes = Array.from({ length: count }, (_, i) => {
    const file = "src/content/guides/example-" + i + ".md";
    const previous = "---\ntitle: Example\ncontentRisk: " + contentRisk + "\nreviewedBy: Existing reviewer\nreviewedAt: 2026-08-01\n---\n# Example\n\nPrepare teh documents. [Service](/services/old-service)\n";
    const current = transform === "internal-link-destinations-v1" ? previous.replace("/services/old-service", "/services/new-service")
      : kind === "mechanical" ? nonfinancialEditorialCleanup(previous)
      : previous.replace("Prepare teh documents.", "Prepare the property ownership documents for discussion.");
    return { file, status: "M", previous, current };
  });
  const registry = { pages: changes.map((change, i) => ({
    pageId: "pg_" + i,
    path: "/resources/guides/example-" + i,
    sourcePath: change.file,
    metadataStatus: "needs_review",
    governance: { contentRisk, maxAutomatedChangeRisk: "R0" },
    lifecycle: { protectedUntil: null as string | null },
  })) };
  const pages = changes.map((change, i) => ({
    sourcePath: change.file,
    path: registry.pages[i].path,
    pageId: registry.pages[i].pageId,
    beforeSha256: sourceHash(change.previous),
    afterSha256: sourceHash(change.current),
    reason: "Improve the reader's document preparation step without changing financial claims.",
    evidence: [{ reference: "existing-source-and-editorial-review" }],
    verification: [{ kind: transform === "internal-link-destinations-v1" ? "link-added" : "text-added", value: transform === "internal-link-destinations-v1" ? "/services/new-service" : kind === "mechanical" ? "Prepare the documents." : "Prepare the property ownership documents for discussion." }],
    metadataReview: { reviewer: "independent-editor", reviewedAt: "2026-09-06T10:00:00Z", contentRisk },
  }));
  return {
    policy, registry, changes, baseSha, now, protectedCohort: { remediations: [] },
    manifest: {
      schemaVersion: 1, repairId: "repair_example", policyId: policy.policyId, policyVersion: policy.version, policyChecksum: policy.checksum,
      authorizationRef: policy.authorization.reference, baseSha, editor: "Codex",
      review: { reviewer: "independent-editor", reviewedAt: "2026-09-06T10:00:00Z", score: 90, blockingFindings: [] as string[] },
      kind, transform, pages,
    },
  };
}

test("current repair policy is valid and cannot silently broaden batch or release authority", () => {
  assert.deepEqual(validateRepairPolicy(policy).errors, []);
  const changed = { ...policy, authority: { ...policy.authority, maxSubstantiveUrls: 50 }, checksum: undefined };
  changed.checksum = checksum(changed);
  assert.match(validateRepairPolicy(changed).errors.join(" "), /bounds/);
});

test("programme authorization permits one or two scoped routine repairs without globally changing registry risk ceilings", () => {
  const input = fixture({ count: 2 });
  assert.deepEqual(validateRepairManifest(input).errors, []);
  assert.ok(input.registry.pages.every(page => page.governance.maxAutomatedChangeRisk === "R0"));
  assert.match(validateRepairManifest(fixture({ count: 3 })).errors.join(" "), /count/);
});

test("larger batches require an exact deterministic transformation and are bounded at twenty", () => {
  assert.deepEqual(validateRepairManifest(fixture({ count: 20, kind: "mechanical", transform: "nonfinancial-editorial-v1" })).errors, []);
  assert.match(validateRepairManifest(fixture({ count: 21, kind: "mechanical", transform: "nonfinancial-editorial-v1" })).errors.join(" "), /count/);
  const input = fixture({ kind: "mechanical", transform: "nonfinancial-editorial-v1" });
  input.changes[0].current += "\nA new financial claim.\n";
  input.manifest.pages[0].afterSha256 = sourceHash(input.changes[0].current);
  assert.match(validateRepairManifest(input).errors.join(" "), /exact mechanical/);
});

test("high-risk pages allow nonfinancial typo, heading and link cleanup while refusing substantive financial rewrites", () => {
  assert.deepEqual(validateRepairManifest(fixture({ contentRisk: "high", kind: "mechanical", transform: "nonfinancial-editorial-v1" })).errors, []);
  assert.deepEqual(validateRepairManifest(fixture({ contentRisk: "high", kind: "mechanical", transform: "internal-link-destinations-v1" })).errors, []);
  assert.match(validateRepairManifest(fixture({ contentRisk: "high" })).errors.join(" "), /genuine financial review/);
});

test("active protection blocks even mechanical changes; expired holds do not block repairs", () => {
  const input = fixture({ kind: "mechanical", transform: "nonfinancial-editorial-v1" });
  input.registry.pages[0].lifecycle.protectedUntil = "2026-09-10T00:00:00Z";
  assert.match(validateRepairManifest(input).errors.join(" "), /active registry protection/);
  input.registry.pages[0].lifecycle.protectedUntil = "2026-09-02T00:00:00Z";
  assert.deepEqual(validateRepairManifest(input).errors, []);
  const protectedCohort = { remediations: [{ url: input.registry.pages[0].path, reviewAfter: "2026-09-10T00:00:00Z" }] };
  assert.match(validateRepairManifest({ ...input, protectedCohort }).errors.join(" "), /active indexing cohort/);
});

test("exact revision, content hashes, independent review and changed-content proofs fail closed", () => {
  for (const mutate of [
    (input: ReturnType<typeof fixture>) => { input.manifest.baseSha = "b".repeat(40); },
    (input: ReturnType<typeof fixture>) => { input.manifest.pages[0].afterSha256 = "0".repeat(64); },
    (input: ReturnType<typeof fixture>) => { input.manifest.review.reviewer = "Codex"; },
    (input: ReturnType<typeof fixture>) => { input.manifest.review.blockingFindings.push("Unverified claim"); },
    (input: ReturnType<typeof fixture>) => { input.manifest.pages[0].verification = [{ kind: "text-added", value: "Example" }]; },
    (input: ReturnType<typeof fixture>) => { input.manifest.authorizationRef = "unapproved"; },
    (input: ReturnType<typeof fixture>) => { input.changes[0].file = "src/pages/Homepage.tsx"; },
  ]) {
    const input = fixture(); mutate(input);
    assert.ok(validateRepairManifest(input).errors.length);
  }
});

test("repair cannot falsify reviewer metadata, lower risk, or change canonical routing", () => {
  for (const field of ["reviewedBy", "reviewedAt", "contentRisk", "canonical"]) {
    const input = fixture();
    input.changes[0].current = field === "canonical" ? input.changes[0].current.replace("title: Example", "title: Example\ncanonical: /elsewhere") : input.changes[0].current.replace(new RegExp(field + ": [^\\n]+"), field + ": forged");
    input.manifest.pages[0].afterSha256 = sourceHash(input.changes[0].current);
    assert.match(validateRepairManifest(input).errors.join(" "), /protected metadata/);
  }
});

test("release requires the latest successful GitHub Actions check on the exact reviewed revision", () => {
  const gate = { head_sha: baseSha, status: "completed", conclusion: "success", app: { slug: "github-actions" } };
  assert.deepEqual(validateReleaseGate({ expectedSha: baseSha, actualSha: baseSha, gate }), []);
  for (const broken of [{ ...gate, conclusion: "failure" }, { ...gate, status: "in_progress" }, { ...gate, head_sha: "b".repeat(40) }, { ...gate, app: { slug: "another-app" } }, null]) {
    assert.ok(validateReleaseGate({ expectedSha: baseSha, actualSha: baseSha, gate: broken }).length);
  }
  assert.ok(validateReleaseGate({ expectedSha: baseSha, actualSha: "b".repeat(40), gate }).length);
});


test("actual LLM-Ready headings are repaired without changing claims and cannot disguise a body rewrite", () => {
  const previous = "---\ntitle: Finance guide\n---\n## LLM-Ready Summary\n\nThe lender may assess the documented exit.\n\n## LLM-Readiness Answer\n\nThe facts remain unchanged.\n";
  const updated = publicHeadingCleanup(previous);
  assert.match(updated, /## Practical Summary/);
  assert.match(updated, /## Direct Answer/);
  assert.ok(isExactEditorialMigration(previous, updated));
  assert.equal(isExactEditorialMigration(previous, updated.replace("may assess", "guarantees")), false);
  assert.equal(isExactEditorialMigration(previous, updated.replace("title: Finance guide", "title: Guaranteed loans")), false);
});


test("routine repair cannot manufacture author or visible review freshness metadata", () => {
  for (const extra of ["reviewedDate: 2026-09-06", "date: 2026-09-06", "author: Daniel", "humanReviewRequired: false", "reviewStatus: human-approved"]) {
    const input = fixture();
    input.changes[0].current = input.changes[0].current.replace("title: Example", "title: Example\n" + extra);
    input.manifest.pages[0].afterSha256 = sourceHash(input.changes[0].current);
    assert.match(validateRepairManifest(input).errors.join(" "), /protected metadata/);
  }
});
