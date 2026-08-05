/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from "node:assert/strict";
import test from "node:test";
import { buildPortfolioAudit, canonicalGscRows, proposedPortfolioState, reviewCohort } from "../generate-seo-portfolio-audit";

const page = (overrides: any = {}) => ({
  pageId: `pg_${"1".repeat(32)}`,
  path: "/services/example",
  pageType: "service",
  indexability: "indexable",
  metadataStatus: "needs_review",
  metadataConfidence: "low",
  targeting: { primaryQuery: "example finance" },
  governance: { contentRisk: "high", maxAutomatedChangeRisk: "R0" },
  lifecycle: { protectedUntil: null },
  ...overrides,
});

test("portfolio backfill cohorts business-critical and editorial pages separately", () => {
  assert.equal(reviewCohort(page()), "01_business_critical");
  assert.equal(reviewCohort(page({ pageType: "guide" })), "03_editorial");
});

test("canonical GSC rows aggregate host variants", () => {
  const rows = canonicalGscRows({
    topPages: [
      { path: "https://emetcapital.com.au/services/example", clicks: 1, impressions: 10, position: 5 },
      { path: "https://www.emetcapital.com.au/services/example/", clicks: 1, impressions: 30, position: 15 },
    ],
  });
  assert.equal(rows.size, 1);
  assert.equal(rows.get("/services/example").impressions, 40);
  assert.equal(rows.get("/services/example").position, 12.5);
});

test("protected and unreviewed pages fail closed", () => {
  assert.equal(
    proposedPortfolioState(page({ lifecycle: { protectedUntil: "2026-12-01T00:00:00Z" } }), null, new Date("2026-08-06T00:00:00Z")),
    "observe_protected",
  );
  assert.equal(proposedPortfolioState(page(), null, new Date("2026-08-06T00:00:00Z")), "complete_metadata_query_owner_review");
});

test("partial page evidence cannot authorize destructive portfolio decisions", () => {
  const registry = { checksum: "a".repeat(64), pages: [page()] };
  const audit = buildPortfolioAudit(registry, { performanceWindow: {}, totals: {}, topPages: [] }, "2026-08-06T00:00:00Z");
  assert.equal(audit.reviewPolicy.ageAuthorizesAction, false);
  assert.match(audit.materialDecisionBacklog.consolidate, /^none_authorized/);
  assert.equal(audit.reviewCohorts["01_business_critical"].length, 1);
  assert.ok(audit.reviewBatches.every((batch: any) => batch.records.length <= 50));
  assert.ok(audit.reviewBatches.every((batch: any) => batch.mutationAuthorized === false));
});

test("segmented evidence reports exact registered-query cohorts without inventing variants", () => {
  const registry = { checksum: "a".repeat(64), pages: [page({ metadataStatus: "verified" })] };
  const audit = buildPortfolioAudit(
    registry,
    {
      performanceWindow: {},
      totals: {},
      topPages: [],
      queryRows: [{ path: "/services/example", query: "example finance", brandClass: "nonbrand", impressions: 10, position: 8 }],
      coverage: { dimensions: ["page", "query", "device", "country", "brandVsNonBrand"], rowLimitTruncated: {} },
    },
    "2026-08-06T00:00:00Z",
  );
  assert.equal(audit.queryOwnership.runtimeQueryCohorts.observedExactRegisteredTargets, 1);
  assert.equal(audit.queryOwnership.runtimeQueryCohorts.exactTargetsTop10, 1);
  assert.deepEqual(audit.evidence.missingDimensions, ["qualifiedLead"]);
});
