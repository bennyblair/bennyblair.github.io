/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { buildContentIndex } from "../lib/content-index.mjs";
import { buildProtectedRouteMap } from "../lib/protected-cohort-policy.mjs";
import {
  assertTransition,
  classifyFileChange,
  validateRegistry,
} from "../lib/seo-control-plane.mjs";
import {
  getIndexableStaticRoutes,
  isRedirectSource,
  redirectRules,
} from "../../src/config/site-route-manifest";

const repoRoot = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(repoRoot, "data", "seo-page-registry.json"), "utf8"));

test("canonical SEO registry validates and exactly covers the current route estate", () => {
  const result = validateRegistry(registry);
  assert.deepEqual(result.errors, []);

  const content = Object.values(buildContentIndex(repoRoot)).flat() as any[];
  const expectedIndexable = new Set([
    ...getIndexableStaticRoutes().map((route) => route.path),
    ...content.filter((article) => !article.noindex && !isRedirectSource(article.route)).map((article) => article.route),
  ]);
  const registeredIndexable = new Set(
    registry.pages.filter((page: any) => page.indexability === "indexable").map((page: any) => page.path),
  );
  assert.deepEqual(registeredIndexable, expectedIndexable);

  const expectedNoindex = new Set(
    content.filter((article) => article.noindex && !isRedirectSource(article.route)).map((article) => article.route),
  );
  const registeredNoindex = new Set(
    registry.pages.filter((page: any) => page.indexability === "noindex").map((page: any) => page.path),
  );
  assert.deepEqual(registeredNoindex, expectedNoindex);

  const expectedRedirects = new Set(
    redirectRules
      .filter((rule) => rule.status === 301 && rule.from.startsWith("/") && !rule.from.includes("*") && !rule.from.includes(":"))
      .map((rule) => rule.from),
  );
  const registeredRedirects = new Set(
    registry.pages.filter((page: any) => page.indexability === "redirected").map((page: any) => page.path),
  );
  assert.deepEqual(registeredRedirects, expectedRedirects);
});

test("measurement contract distinguishes unavailable evidence from zero performance", () => {
  const schema = JSON.parse(
    fs.readFileSync(path.join(repoRoot, "data", "seo-observation.schema.json"), "utf8"),
  );
  assert.ok(schema.required.includes("sourceStatus"));
  const unavailableRule = schema.allOf.find(
    (rule: any) => rule.if?.properties?.sourceStatus?.const === "unavailable",
  );
  assert.equal(unavailableRule.then.properties.metrics.maxProperties, 0);
  assert.equal(unavailableRule.then.properties.pageId.const, null);
  assert.deepEqual(schema.properties.source.enum, ["gsc", "ga4", "crm", "ai_visibility"]);
});

test("all unreviewed legacy metadata fails closed for automated mutation", () => {
  const unreviewed = registry.pages.filter((page: any) => page.metadataStatus === "needs_review");
  assert.ok(unreviewed.length > 0);
  for (const page of unreviewed) assert.equal(page.governance.maxAutomatedChangeRisk, "R0", page.path);
});

test("all protected remediation routes are represented, including noindex-pending-evidence records", () => {
  const protectedSnapshot = JSON.parse(
    fs.readFileSync(path.join(repoRoot, "data", "indexing-recovery-protected-pages.json"), "utf8"),
  );
  const expected = new Set(buildProtectedRouteMap(protectedSnapshot).keys());
  const actual = new Set(
    registry.pages
      .filter((page: any) => Boolean(page.lifecycle.protectedUntil))
      .map((page: any) => page.path),
  );
  assert.equal(expected.size, 111);
  assert.deepEqual(actual, expected);
});

test("protected pages require a valid emergency override for a material decision", () => {
  const transition = {
    from: "review_due",
    to: "in_build",
    decision: "iterate",
    approved: true,
    protectedUntil: "2026-09-02T00:00:00+10:00",
  };
  assert.throws(
    () => assertTransition(transition, new Date("2026-08-06T00:00:00Z")),
    /emergency override/,
  );
  assert.equal(
    assertTransition(
      {
        ...transition,
        override: {
          incidentId: "inc_test",
          approver: "seo-owner",
          reason: "harmful factual error",
          expiresAt: "2026-08-07T00:00:00Z",
          rollbackRef: "commit_before_test",
        },
      },
      new Date("2026-08-06T00:00:00Z"),
    ),
    true,
  );
});

test("elapsed time can open review but cannot approve a material action", () => {
  assert.equal(
    assertTransition({ from: "observing", to: "review_due", decision: "none", approved: false }),
    true,
  );
  assert.throws(
    () => assertTransition({ from: "review_due", to: "in_build", decision: "iterate", approved: false }),
    /requires an approval/,
  );
});

test("risk classifier only treats explicit low-risk internal-link-only edits as R1 content", () => {
  const previous = `---\ntitle: Example\ncontentRisk: low\n---\nRead [our guide](/services/old).\n`;
  const linkOnly = `---\ntitle: Example\ncontentRisk: low\n---\nRead [our guide](/services/new).\n`;
  const bodyEdit = `---\ntitle: Example\ncontentRisk: low\n---\nRead the expanded [our guide](/services/new).\n`;
  assert.equal(
    classifyFileChange({ relativePath: "src/content/guides/example.md", previous, current: linkOnly }).risk,
    "R1",
  );
  assert.equal(
    classifyFileChange({ relativePath: "src/content/guides/example.md", previous, current: bodyEdit }).risk,
    "R2",
  );
  assert.equal(
    classifyFileChange({ relativePath: "src/config/site-route-manifest.ts", previous: "", current: "" }).risk,
    "R3",
  );
  assert.equal(
    classifyFileChange({ relativePath: "data/authority-outreach-work-order.json", previous: "", current: "" }).risk,
    "R4",
  );
});
