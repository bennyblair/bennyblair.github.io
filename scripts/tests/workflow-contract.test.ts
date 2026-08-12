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
  assert.match(workflow, /articles\.length\s*!==\s*2/);
  assert.match(workflow, /proposals\.length\s*!==\s*2/);
});
