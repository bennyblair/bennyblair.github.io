import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import test from "node:test";
import { sourceHash } from "../lib/content-repair-policy.mjs";
import { validateArticlePublicationContract } from "../lib/article-publication-contract.mjs";
import { validatedLegacyRepairRisks, loadReviewedRepairContext, dataWithReviewedRepairRisk } from "../lib/reviewed-repair-context.mjs";

const policy = JSON.parse(fs.readFileSync("data/seo-content-repair-policy.json", "utf8"));
const file = "src/content/guides/example.md";
function fixture() {
  const previous = "---\ntitle: Example\nauthor: Ben\nreviewed_date: 2026-08-01\n---\n## Documents\nPrepare the documents.\n";
  const current = previous.replace("Prepare the documents.", "Organise the property documents and mark missing information.");
  const risk = "medium";
  const baseSha = "a".repeat(40);
  const reviewedAt = "2026-09-06T10:00:00Z";
  const registry = { pages: [{ pageId: "pg_example", path: "/resources/guides/example", sourcePath: file, governance: { contentRisk: risk, maxAutomatedChangeRisk: "R0" }, lifecycle: { protectedUntil: null as string | null } }] };
  const row = { sourcePath: file, path: registry.pages[0].path, pageId: "pg_example", beforeSha256: sourceHash(previous), afterSha256: sourceHash(current), reason: "Test-only operational repair", evidence: [{ reference: "synthetic-test-evidence" }], verification: [{ kind: "text-added", value: "Organise the property documents and mark missing information." }], metadataReview: { reviewer: "test-independent-editor", reviewedAt, contentRisk: risk } };
  return { baseSha, policy, registry, protectedCohort: { remediations: [] }, changes: [{ file, status: "M", previous, current }], manifest: { schemaVersion: 1, repairId: "repair_example", policyId: policy.policyId, policyVersion: policy.version, policyChecksum: policy.checksum, authorizationRef: policy.authorization.reference, baseSha, editor: "test-author", review: { reviewer: "test-independent-editor", reviewedAt, score: 90, blockingFindings: [] as string[] }, kind: "substantive", pages: [row] } };
}

test("exact reviewed repair derives only missing risk without modifying source, review or registry", () => {
  const input = fixture(); const original = structuredClone(input);
  const risks = validatedLegacyRepairRisks(input);
  assert.equal(risks.get(file), "medium"); assert.deepEqual(input, original);
  const data = { title: "Example" }; const augmented = dataWithReviewedRepairRisk(data, file, risks);
  assert.deepEqual(data, { title: "Example" }); assert.deepEqual(augmented, { title: "Example", contentRisk: "medium" });
  const before = validateArticlePublicationContract({ data, body: "Short incomplete article" }).errors;
  const after = validateArticlePublicationContract({ data: augmented, body: "Short incomplete article" }).errors;
  assert.ok(before.includes("contentRisk is required")); assert.ok(!after.includes("contentRisk is required"));
  assert.deepEqual(after, before.filter(error => error !== "contentRisk is required"));
});

test("authored risk labels, blanks and aliases cannot be replaced by context", () => {
  const risks = new Map([[file, "low"]]);
  for (const data of [{ contentRisk: "high" }, { contentRisk: "" }, { contentRisk: null }, { content_risk: "high" }]) assert.equal(dataWithReviewedRepairRisk(data, file, risks), data);
  assert.deepEqual(dataWithReviewedRepairRisk({}, "src/content/guides/new.md", risks), {});
  const input = fixture();
  for (const change of input.changes) { change.previous = change.previous.replace("title: Example", "title: Example\ncontentRisk: medium"); change.current = change.current.replace("title: Example", "title: Example\ncontentRisk: medium"); }
  input.manifest.pages[0].beforeSha256 = sourceHash(input.changes[0].previous); input.manifest.pages[0].afterSha256 = sourceHash(input.changes[0].current);
  assert.equal(validatedLegacyRepairRisks(input).size, 0);
});

test("stale hashes/base, absent or conflicting independent review, protections and source reclassification fail closed", () => {
  const mutations = [
    (x: ReturnType<typeof fixture>) => { x.manifest.baseSha = "b".repeat(40); },
    (x: ReturnType<typeof fixture>) => { x.manifest.pages[0].afterSha256 = "0".repeat(64); },
    (x: ReturnType<typeof fixture>) => { x.manifest.review.reviewer = "test-author"; },
    (x: ReturnType<typeof fixture>) => { x.manifest.review.blockingFindings = ["unverified claim"]; },
    (x: ReturnType<typeof fixture>) => { x.manifest.pages[0].metadataReview.contentRisk = "low"; },
    (x: ReturnType<typeof fixture>) => { x.registry.pages[0].governance.contentRisk = "high"; x.manifest.pages[0].metadataReview.contentRisk = "high"; },
    (x: ReturnType<typeof fixture>) => { x.registry.pages[0].lifecycle.protectedUntil = "2999-01-01T00:00:00Z"; },
    (x: ReturnType<typeof fixture>) => { x.changes[0].status = "A"; },
    (x: ReturnType<typeof fixture>) => { x.changes[0].current = x.changes[0].current.replace("title: Example", "title: Example\ncontentRisk: low"); x.manifest.pages[0].afterSha256 = sourceHash(x.changes[0].current); },
  ];
  for (const mutate of mutations) { const input = fixture(); mutate(input); assert.throws(() => validatedLegacyRepairRisks(input)); }
});

function gitFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "reviewed-risk-test-"));
  const git = (args: string[]) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  const write = (name: string, text: string) => { fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true }); fs.writeFileSync(path.join(root, name), text); };
  git(["init", "--quiet"]); git(["config", "user.email", "fixture@example.invalid"]); git(["config", "user.name", "Test fixture"]);
  const input = fixture(); write(file, input.changes[0].previous); write("data/seo-content-repair-policy.json", JSON.stringify(policy)); write("data/seo-page-registry.json", JSON.stringify(input.registry)); write("data/indexing-recovery-protected-pages.json", JSON.stringify(input.protectedCohort)); git(["add", "."]); git(["commit", "--quiet", "-m", "Synthetic base"]);
  const base = git(["rev-parse", "HEAD"]); input.baseSha = base; input.manifest.baseSha = base;
  const commitRepair = () => { write(file, input.changes[0].current); write("data/seo-repairs/repair_example.json", JSON.stringify(input.manifest)); git(["add", "."]); git(["commit", "--quiet", "-m", "Synthetic reviewed repair"]); };
  return { root, git, write, input, base, commitRepair };
}

test("real committed manifest context works; ordinary unreviewed changes receive no fallback", () => {
  const f = gitFixture();
  try { assert.equal(loadReviewedRepairContext(f.root, f.base).size, 0); f.write(file, f.input.changes[0].current); assert.equal(loadReviewedRepairContext(f.root, f.base).size, 0); f.commitRepair(); assert.equal(loadReviewedRepairContext(f.root, f.base).get(file), "medium"); }
  finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});

test("real Git context rejects dirty source or manifest, extra file changes, multiple manifests and stale current base", () => {
  for (const variation of ["source", "manifest", "extra", "duplicate", "stale-base"]) {
    const f = gitFixture();
    try {
      f.commitRepair();
      if (variation === "source") f.write(file, f.input.changes[0].current + "Unreviewed words.");
      if (variation === "manifest") f.write("data/seo-repairs/repair_example.json", JSON.stringify({ ...f.input.manifest, editor: "changed" }));
      if (variation === "extra") { f.write("unrelated.txt", "not approved"); f.git(["add", "."]); f.git(["commit", "--quiet", "-m", "Extra path"]); }
      if (variation === "duplicate") { f.write("data/seo-repairs/repair_other.json", JSON.stringify(f.input.manifest)); f.git(["add", "."]); f.git(["commit", "--quiet", "-m", "Extra manifest"]); }
      if (variation === "stale-base") { f.git(["checkout", "--quiet", "-b", "new-main", f.base]); f.write("base-advanced.txt", "new base"); f.git(["add", "."]); f.git(["commit", "--quiet", "-m", "Advance base"]); const advanced = f.git(["rev-parse", "HEAD"]); f.git(["checkout", "--quiet", "-"]); assert.throws(() => loadReviewedRepairContext(f.root, advanced)); }
      else assert.throws(() => loadReviewedRepairContext(f.root, f.base));
    } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
  }
});


test("article CLI uses exact reviewed context only for existing repairs and keeps new-article requirements", () => {
  const f = gitFixture();
  try {
    f.write("src/data/article-authors.json", JSON.stringify({ authors: { Ben: {} } }));
    f.git(["add", "."]); f.git(["commit", "--quiet", "-m", "Synthetic authors"]);
    f.base = f.git(["rev-parse", "HEAD"]); f.input.baseSha = f.base; f.input.manifest.baseSha = f.base; f.commitRepair();
    const cli = path.resolve("scripts/article-qa.mjs");
    const run = (extra: string[]) => spawnSync(process.execPath, [cli, file, ...extra], { cwd: f.root, env: { ...process.env, CONTENT_QA_BASE: f.base }, encoding: "utf8" });
    const existing = run([]), fresh = run(["--new-article"]);
    assert.equal(existing.status, 1); // Other missing contract fields still block this deliberately incomplete fixture.
    assert.doesNotMatch(existing.stderr, /contentRisk is required/);
    assert.match(existing.stderr, /metaTitle is required/);
    assert.equal(fresh.status, 1); assert.match(fresh.stderr, /contentRisk is required/);
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});

test("whole-content gate still rejects detected high-risk claims despite a reviewed medium registry fallback", () => {
  const f = gitFixture();
  try {
    f.write("data/seo-topic-policy.json", fs.readFileSync("data/seo-topic-policy.json", "utf8"));
    f.write("src/content/claims.json", "{}"); f.git(["add", "."]); f.git(["commit", "--quiet", "-m", "Synthetic claims"]);
    f.base = f.git(["rev-parse", "HEAD"]); f.input.baseSha = f.base; f.input.manifest.baseSha = f.base;
    f.input.changes[0].current += "\nThis sentence mentions legal advice.\n";
    f.input.manifest.pages[0].afterSha256 = sourceHash(f.input.changes[0].current); f.commitRepair();
    const result = spawnSync(process.execPath, [path.resolve("scripts/content-quality-gate.mjs")], { cwd: f.root, env: { ...process.env, CONTENT_QA_BASE: f.base }, encoding: "utf8" });
    assert.equal(result.status, 1); assert.match(result.stderr, /financial\/statistical claims require contentRisk: high/);
    assert.doesNotMatch(result.stderr, /contentRisk is required/);
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});
