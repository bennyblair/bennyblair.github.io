import assert from "node:assert/strict";
import test from "node:test";
import { buildReviewReport, validateReviewInput } from "../generate-seo-review";

const program = {
  programId: "test",
  targets: [
    { path: "/services/caveat-loans", cluster: "caveat" },
    { path: "/services/bridging-finance", cluster: "bridging" },
  ],
};

const input = {
  label: "day_28" as const,
  generatedAt: "2026-09-03T09:00:00+10:00",
  window: { start: "2026-08-06", end: "2026-09-02", completeThrough: "2026-09-02" },
  comparisonWindow: { start: "2026-07-09", end: "2026-08-05" },
  pages: [
    {
      path: "/services/caveat-loans",
      current: { clicks: 2, impressions: 300, ctr: 0.0067, averagePosition: 30 },
      previous: { clicks: 0, impressions: 200, ctr: 0, averagePosition: 50 },
    },
    {
      path: "/services/bridging-finance",
      current: { clicks: 0, impressions: 20, ctr: 0, averagePosition: 80 },
      previous: { clicks: 0, impressions: 0, ctr: 0, averagePosition: null },
    },
  ],
  primaryKpis: {
    qualifiedOrganicLeads: { current: 2, previous: 1 },
    nonbrandOrganicClicks: { current: 10, previous: 5 },
    targetQueriesTop20: { current: 3, previous: 1 },
  },
  drivers: { aiReferralLandings: 2, linkedAiCitations: 1, earnedReferringDomains: 0 },
  guardrails: {
    protectedCohortMaterialEdits: 0,
    expiredHighRiskClaims: 0,
    newTechnicalIndexingErrors: 0,
    organicQualifiedLeadRateDeclineTwoWindows: false,
  },
  caveats: ["Small sample."],
};

test("validates complete registered review inputs", () => {
  assert.deepEqual(validateReviewInput(input, program), []);
});

test("builds a decision-oriented report and distinguishes new visibility", () => {
  const report = buildReviewReport(input, program);
  assert.match(report, /Non-brand organic clicks: 10 vs 5/);
  assert.match(report, /New measurable visibility/);
  assert.match(report, /observational before\/after comparison/);
  assert.doesNotMatch(report, /caused by/);
});

test("rejects incomplete GSC windows and target coverage", () => {
  const broken = {
    ...input,
    window: { ...input.window, completeThrough: "2026-09-01" },
    pages: input.pages.slice(0, 1),
  };
  const errors = validateReviewInput(broken, program);
  assert.ok(errors.some((error) => error.includes("expected 2")));
  assert.ok(errors.some((error) => error.includes("not complete")));
});

test("rejects impossible or malformed analytics values", () => {
  const broken = {
    ...input,
    pages: [
      {
        ...input.pages[0],
        current: { clicks: 4, impressions: 2, ctr: 0.5, averagePosition: 0 },
      },
      {
        ...input.pages[1],
        current: { clicks: 0, impressions: 0, ctr: 0, averagePosition: 80 },
      },
    ],
    drivers: { ...input.drivers, linkedAiCitations: -1 },
  };
  const errors = validateReviewInput(broken, program);
  assert.ok(errors.some((error) => error.includes("clicks exceed impressions")));
  assert.ok(errors.some((error) => error.includes("invalid search metrics")));
  assert.ok(errors.some((error) => error.includes("position must be null")));
  assert.ok(errors.some((error) => error.includes("linkedAiCitations")));
});
