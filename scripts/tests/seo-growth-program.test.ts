import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import matter from "gray-matter";

type GrowthTarget = {
  path: string;
  sourcePath: string;
  primaryQuery: string;
  searchIntent: string;
  designatedServicePage: string;
  cohortStatus: string;
  baseline: {
    impressions: number;
    clicks: number;
    averagePosition: number;
  };
};

type GrowthProgram = {
  measurementPolicy: {
    firstReviewAt: string;
    decisionWindowDays: number[];
  };
  targets: GrowthTarget[];
};

const repoRoot = process.cwd();
const program = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "data", "seo-growth-program.json"), "utf8"),
) as GrowthProgram;

test("SEO growth targets are unique, eligible, and have usable baselines", () => {
  assert.equal(program.targets.length, 6);
  assert.equal(new Set(program.targets.map((target) => target.path)).size, program.targets.length);
  assert.equal(
    new Set(program.targets.map((target) => target.primaryQuery.toLowerCase())).size,
    program.targets.length,
  );
  assert.deepEqual(program.measurementPolicy.decisionWindowDays, [28, 56]);
  assert.ok(Date.parse(program.measurementPolicy.firstReviewAt));

  for (const target of program.targets) {
    assert.equal(target.cohortStatus, "eligible", `${target.path} must remain outside the protected cohort`);
    assert.ok(target.baseline.impressions > 0, `${target.path} needs a GSC impression baseline`);
    assert.ok(target.baseline.clicks >= 0, `${target.path} has invalid clicks`);
    assert.ok(target.baseline.averagePosition > 0, `${target.path} has invalid average position`);
  }
});

test("growth target frontmatter matches the intent and service ownership registry", () => {
  for (const target of program.targets) {
    const absolutePath = path.join(repoRoot, target.sourcePath);
    assert.ok(fs.existsSync(absolutePath), `${target.sourcePath} is missing`);

    const { data, content } = matter(fs.readFileSync(absolutePath, "utf8"));
    assert.ok(String(data.title).length <= 56, `${target.path} title will be truncated`);
    assert.ok(String(data.description).length <= 150, `${target.path} description will be truncated`);
    assert.equal(data.primaryQuery, target.primaryQuery, `${target.path} primaryQuery drifted`);
    assert.equal(data.searchIntent, target.searchIntent, `${target.path} searchIntent drifted`);
    assert.equal(
      data.designatedServicePage,
      target.designatedServicePage,
      `${target.path} designated service drifted`,
    );
    assert.ok(
      content.includes(`](${target.designatedServicePage})`),
      `${target.path} must link to its designated service page`,
    );
    assert.equal(/^#\s+/m.test(content), false, `${target.path} must use the page template's single H1`);
  }
});

test("reader-facing headings do not expose internal AI optimisation labels", () => {
  const internalLabel = /^#{1,6}\s+.*(?:LLM[- ]Ready|LLM[- ]Readiness|Citation[- ]Ready)/im;

  for (const target of program.targets) {
    const { content } = matter(
      fs.readFileSync(path.join(repoRoot, target.sourcePath), "utf8"),
    );
    assert.equal(internalLabel.test(content), false, `${target.path} contains an internal AI label`);
  }
});
