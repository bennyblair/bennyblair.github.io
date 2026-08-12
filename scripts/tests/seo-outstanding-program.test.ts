import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import matter from "gray-matter";
import { buildProtectedRouteMap } from "../lib/protected-cohort-policy.mjs";

const readJson = (relativePath: string) => JSON.parse(
  fs.readFileSync(path.join(process.cwd(), relativePath), "utf8"),
);
const program = readJson("data/seo-outstanding-program.json");
const protectedRegistry = readJson("data/indexing-recovery-protected-pages.json");
const promptSet = readJson("data/ai-citation-prompt-set.json");

test("outstanding program has complete GSC evidence, KPI definitions and scheduled reviews", () => {
  assert.equal(program.targets.length, 11);
  assert.equal(new Set(program.targets.map((target: { path: string }) => target.path)).size, 11);
  assert.equal(program.objectives.primaryKpis.length, 3);
  assert.equal(program.reviewSchedule[0].reviewAt, "2026-09-02");
  assert.equal(program.reviewSchedule[1].reviewAt, "2026-09-30");
  assert.deepEqual(program.baseline.siteTotals, {
    clicks: 84,
    impressions: 48423,
    ctr: 0.0017,
    averagePosition: 47,
  });

  const protectedRoutes = buildProtectedRouteMap(protectedRegistry);
  for (const target of program.targets) {
    assert.ok(fs.existsSync(path.join(process.cwd(), target.sourcePath)), `${target.sourcePath} is missing`);
    assert.equal(protectedRoutes.has(target.path), false, `${target.path} entered the protected cohort`);
    assert.ok(target.clicks >= 0 && target.impressions >= 0 && target.ctr >= 0);
  }
});
test("changed guide owners carry explicit review and source metadata", () => {
  for (const target of program.targets.filter((item: { sourcePath: string }) => item.sourcePath.endsWith(".md"))) {
    const { data, content } = matter(fs.readFileSync(path.join(process.cwd(), target.sourcePath), "utf8"));
    assert.equal(data.designatedServicePage.startsWith("/services/"), true);
    assert.equal(data.contentRisk, "high");
    assert.equal(data.humanReviewRequired, true);
    assert.ok(data.reviewedAt && data.expiresAt);
    assert.ok(Array.isArray(data.sources) && data.sources.length > 0);
    assert.ok(content.includes(`](${data.designatedServicePage})`));
    assert.equal(/^#\s+/m.test(content), false, `${target.path} must use the page template's H1`);
  }
});

test("AI citation prompt set is immutable, balanced and observation-ready", () => {
  assert.equal(promptSet.version, "1.0.0");
  assert.equal(promptSet.prompts.length, 30);
  assert.equal(new Set(promptSet.prompts.map((prompt: { id: string }) => prompt.id)).size, 30);
  assert.equal(new Set(promptSet.prompts.map((prompt: { prompt: string }) => prompt.prompt)).size, 30);
  const clusters = new Set(promptSet.prompts.map((prompt: { cluster: string }) => prompt.cluster));
  for (const cluster of ["caveat", "bridging", "equipment", "private lending", "commercial property", "business finance", "brand discovery"]) {
    assert.ok(clusters.has(cluster), `${cluster} prompt coverage is missing`);
  }
  assert.match(promptSet.citationRule, /mention is not a citation/i);
});

test("llms.txt curates every priority program route", () => {
  const generator = fs.readFileSync(
    path.join(process.cwd(), "scripts", "generate-site-files.ts"),
    "utf8",
  );

  for (const target of program.targets) {
    assert.ok(
      generator.includes(`"${target.path}"`),
      `${target.path} must remain in the curated llms.txt source`,
    );
  }

  const llmAuditRequiredRoutes = [
    "/services/business-finance",
    "/resources/guides/commercial-property-loans-australia-complete-guide",
    "/resources/guides/what-is-a-second-mortgage",
    "/resources/guides/what-is-private-lending-australia",
    "/resources/guides/business-lenders-australia-comparison-broker-commentary",
  ];
  for (const route of llmAuditRequiredRoutes) {
    assert.ok(generator.includes(`"${route}"`), `${route} must remain curated in llms.txt`);
  }
});
