import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const repoRoot = process.cwd();

function read(relativePath: string) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

test("the merge-capable website quality workflow runs every required repository gate", () => {
  const packageJson = JSON.parse(read("package.json"));
  const workflow = read(".github/workflows/bot-pr-build.yml");
  const requiredScripts = [
    "typecheck",
    "lint",
    "test",
    "qa:seo-control-plane",
    "qa:seo-new-pages",
    "qa:seo-risk",
    "qa:protected-cohort",
    "qa:claims",
    "qa:content",
    "audit:prod",
    "build",
    "qa:smoke",
    "qa:lighthouse",
  ];

  for (const script of requiredScripts) {
    assert.equal(typeof packageJson.scripts[script], "string", `package.json must define ${script}`);
    const escaped = script.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(
      workflow,
      new RegExp(`(?:npm\\s+(?:run\\s+)?${escaped})(?:\\s|$)`),
      `.github/workflows/bot-pr-build.yml must execute ${script}`,
    );
  }
  assert.match(workflow, /startsWith\(github\.head_ref, 'ai\/daily-content-'\).*'R2'.*'R3'/);
});

test("auto-merge waits for the complete website quality gate", () => {
  const workflow = read(".github/workflows/auto-merge-bot-prs.yml");
  assert.match(workflow, /requiredCheck\s*=\s*['"]Type, content, security, build and route checks['"]/);
  assert.match(workflow, /gate\.conclusion\s*!==\s*['"]success['"]/);
  assert.match(workflow, /finalGate\?\.conclusion\s*!==\s*['"]success['"]/);
  assert.match(workflow, /content-change:internal-links/);
  assert.match(workflow, /file\.status\s*!==\s*['"]modified['"]/);
  assert.match(workflow, /normalizeInternalLinks\(source\)\s*!==\s*normalizeInternalLinks\(previous\)/);
  assert.match(workflow, /ai\/daily-content-/);
  assert.match(workflow, /seo-risk:R2/);
  assert.match(workflow, /automation-policy:daily-content-v1/);
  assert.match(workflow, /articles\.length\s*!==\s*1/);
  assert.match(workflow, /articleImages\.length\s*!==\s*1/);
  assert.match(workflow, /proposals\.length\s*!==\s*1/);
  assert.match(workflow, /group:\s*seo-production-publication/);
  assert.match(workflow, /cancel-in-progress:\s*false/);
  assert.match(workflow, /validateRepairManifest/);
  assert.match(workflow, /validateReleaseGate/);
  assert.match(workflow, /main.data.commit.sha !== pr.base.sha/);
  assert.match(workflow, /Checkout trusted base policy and verifier/);
  assert.match(workflow, /latest\.data\.merged_at/);
  assert.match(workflow, /id:\s*merge_release/);
  assert.match(workflow, /audit:live:content-release/);
  assert.match(workflow, /git revert --no-edit/);
});

test("post-deploy audit checks every new article in a release", () => {
  const audit = read("scripts/audit-live-content-release.ts");
  const workflow = read(".github/workflows/post-deploy-content-audit.yml");

  assert.match(audit, /const expected = files\.map/);
  assert.doesNotMatch(audit, /files\.length\s*!==\s*1|expected one new article/);
  assert.match(workflow, /CONTENT_RELEASE_BASE:\s*\$\{\{ github\.event\.before \}\}/);
  assert.match(workflow, /audit:live:content-release/);
});

test("stale already-merged events cannot execute another release revision", () => {
  const workflow = read(".github/workflows/auto-merge-bot-prs.yml");
  assert.doesNotMatch(workflow, /return latest\.data\.merge_commit_sha/);
  const generation = read("scripts/generate-site-files.ts");
  assert.match(generation, /siteRevisionManifest/);
  assert.match(generation, /\.well-known/);
  const audit = read("scripts/audit-live-content-release.ts");
  assert.match(audit, /revisionIsDeployed/);
  assert.match(audit, /infrastructureHealthy && revisionConfirmed && pages/);
});

test("generic push audits are read-only and cannot compete with the publisher rollback", () => {
  const workflow = read(".github/workflows/post-deploy-content-audit.yml");
  assert.match(workflow, /contents:\s*read/);
  assert.doesNotMatch(workflow, /contents:\s*write|git revert|git push/);
  assert.match(workflow, /if:\s*always\(\)/);
  assert.match(workflow, /actions\/upload-artifact/);
  assert.match(read("scripts/audit-live-content-release.ts"), /!containsInternalEditorialLanguage\(plainText\(response.text\)\)/);
});
