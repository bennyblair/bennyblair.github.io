import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

type SearchMetrics = {
  clicks: number;
  impressions: number;
  ctr: number;
  averagePosition: number | null;
};

type PageObservation = {
  path: string;
  current: SearchMetrics;
  previous: SearchMetrics;
};

type ReviewInput = {
  label: "day_28" | "day_56";
  generatedAt: string;
  window: { start: string; end: string; completeThrough: string };
  comparisonWindow: { start: string; end: string };
  pages: PageObservation[];
  primaryKpis: {
    qualifiedOrganicLeads: { current: number | null; previous: number | null };
    nonbrandOrganicClicks: { current: number; previous: number };
    targetQueriesTop20: { current: number; previous: number };
  };
  drivers: {
    aiReferralLandings: number | null;
    linkedAiCitations: number | null;
    earnedReferringDomains: number | null;
  };
  guardrails: {
    protectedCohortMaterialEdits: number;
    expiredHighRiskClaims: number;
    newTechnicalIndexingErrors: number | null;
    organicQualifiedLeadRateDeclineTwoWindows: boolean | null;
  };
  caveats: string[];
};

type Program = {
  programId: string;
  targets: Array<{ path: string; cluster: string }>;
};

const change = (current: number, previous: number) => {
  const absolute = current - previous;
  const relative = previous === 0 ? null : absolute / previous;
  return { absolute, relative };
};

const percent = (value: number | null) => value === null ? "n/a" : `${(value * 100).toFixed(1)}%`;
const delta = (value: { absolute: number; relative: number | null }) =>
  `${value.absolute >= 0 ? "+" : ""}${value.absolute}${value.relative === null ? "" : ` (${percent(value.relative)})`}`;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isNonNegativeFinite = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

const inclusiveDays = (start: string, end: string) => {
  const startTime = Date.parse(`${start}T00:00:00Z`);
  const endTime = Date.parse(`${end}T00:00:00Z`);
  return Number.isNaN(startTime) || Number.isNaN(endTime)
    ? null
    : Math.round((endTime - startTime) / 86_400_000) + 1;
};

export function validateReviewInput(input: unknown, program: Program): string[] {
  const errors: string[] = [];
  if (!isRecord(input)) return ["review input must be an object"];
  for (const section of ["window", "comparisonWindow", "primaryKpis", "drivers", "guardrails"] as const) {
    if (!isRecord(input[section])) errors.push(`${section} must be an object`);
  }
  if (!Array.isArray(input.pages)) errors.push("pages must be an array");
  if (!Array.isArray(input.caveats)) errors.push("caveats must be an array");
  if (errors.length) return errors;

  const review = input as unknown as ReviewInput;
  if (!["day_28", "day_56"].includes(review.label)) errors.push("invalid review label");
  for (const value of [review.generatedAt, review.window.start, review.window.end, review.window.completeThrough, review.comparisonWindow.start, review.comparisonWindow.end]) {
    if (typeof value !== "string" || Number.isNaN(Date.parse(value))) errors.push(`invalid date: ${value}`);
  }
  if (inclusiveDays(review.window.start, review.window.end) !== 28) errors.push("current performance window must contain exactly 28 days");
  if (inclusiveDays(review.comparisonWindow.start, review.comparisonWindow.end) !== 28) errors.push("comparison performance window must contain exactly 28 days");
  const targetPaths = new Set(program.targets.map((target) => target.path));
  const pagePaths = review.pages.map((page) => page.path);
  if (pagePaths.length !== targetPaths.size) errors.push(`expected ${targetPaths.size} page observations; received ${pagePaths.length}`);
  if (new Set(pagePaths).size !== pagePaths.length) errors.push("page observations contain duplicates");
  for (const page of review.pages) {
    if (!isRecord(page) || !isRecord(page.current) || !isRecord(page.previous)) {
      errors.push("every page observation must contain current and previous metric objects");
      continue;
    }
    if (!targetPaths.has(page.path)) errors.push(`unregistered target page: ${page.path}`);
    for (const period of [page.current, page.previous]) {
      const validCounts = isNonNegativeFinite(period.clicks) && isNonNegativeFinite(period.impressions);
      const validCtr = isNonNegativeFinite(period.ctr) && period.ctr <= 1;
      const validPosition = period.averagePosition === null
        || (isNonNegativeFinite(period.averagePosition) && period.averagePosition > 0);
      if (!validCounts || !validCtr || !validPosition) {
        errors.push(`invalid search metrics: ${page.path}`);
      }
      if (validCounts && period.clicks > period.impressions) errors.push(`clicks exceed impressions: ${page.path}`);
      const calculatedCtr = validCounts && period.impressions !== 0 ? period.clicks / period.impressions : 0;
      if (validCounts && validCtr && Math.abs(period.ctr - calculatedCtr) > 0.002) {
        errors.push(`CTR is inconsistent with clicks and impressions: ${page.path}`);
      }
      if (validCounts && period.impressions === 0 && period.averagePosition !== null) {
        errors.push(`average position must be null when impressions are zero: ${page.path}`);
      }
    }
  }
  const scalarValues: Array<[string, number | null]> = [
    ["qualifiedOrganicLeads.current", review.primaryKpis.qualifiedOrganicLeads?.current],
    ["qualifiedOrganicLeads.previous", review.primaryKpis.qualifiedOrganicLeads?.previous],
    ["nonbrandOrganicClicks.current", review.primaryKpis.nonbrandOrganicClicks?.current],
    ["nonbrandOrganicClicks.previous", review.primaryKpis.nonbrandOrganicClicks?.previous],
    ["targetQueriesTop20.current", review.primaryKpis.targetQueriesTop20?.current],
    ["targetQueriesTop20.previous", review.primaryKpis.targetQueriesTop20?.previous],
    ["aiReferralLandings", review.drivers.aiReferralLandings],
    ["linkedAiCitations", review.drivers.linkedAiCitations],
    ["earnedReferringDomains", review.drivers.earnedReferringDomains],
    ["protectedCohortMaterialEdits", review.guardrails.protectedCohortMaterialEdits],
    ["expiredHighRiskClaims", review.guardrails.expiredHighRiskClaims],
    ["newTechnicalIndexingErrors", review.guardrails.newTechnicalIndexingErrors],
  ];
  for (const [label, value] of scalarValues) {
    if (value !== null && (!isNonNegativeFinite(value) || !Number.isInteger(value))) errors.push(`${label} must be a non-negative integer or null`);
  }
  if (![true, false, null].includes(review.guardrails.organicQualifiedLeadRateDeclineTwoWindows)) {
    errors.push("organicQualifiedLeadRateDeclineTwoWindows must be boolean or null");
  }
  if (review.caveats.some((item) => typeof item !== "string" || !item.trim())) errors.push("caveats must contain non-empty strings");
  if (new Date(review.window.completeThrough) < new Date(review.window.end)) {
    errors.push("GSC data is not complete through the requested window end");
  }
  return errors;
}

export function buildReviewReport(input: ReviewInput, program: Program): string {
  const errors = validateReviewInput(input, program);
  if (errors.length) throw new Error(errors.join("\n"));

  const qualified = input.primaryKpis.qualifiedOrganicLeads;
  const nonbrand = change(input.primaryKpis.nonbrandOrganicClicks.current, input.primaryKpis.nonbrandOrganicClicks.previous);
  const top20 = change(input.primaryKpis.targetQueriesTop20.current, input.primaryKpis.targetQueriesTop20.previous);
  const hardGuardrailFailures = [
    input.guardrails.protectedCohortMaterialEdits > 0,
    input.guardrails.expiredHighRiskClaims > 0,
    (input.guardrails.newTechnicalIndexingErrors ?? 0) > 0,
    input.guardrails.organicQualifiedLeadRateDeclineTwoWindows === true,
  ].filter(Boolean).length;

  const lines = [
    `# SEO and AI growth review: ${input.label}`,
    "",
    `Generated: ${input.generatedAt}`,
    `Current window: ${input.window.start} to ${input.window.end}`,
    `Comparison window: ${input.comparisonWindow.start} to ${input.comparisonWindow.end}`,
    `GSC complete through: ${input.window.completeThrough}`,
    "",
    "## Outcome",
    "",
    hardGuardrailFailures
      ? `Guardrail review required: ${hardGuardrailFailures} failure(s) are recorded. Do not roll out further page changes until investigated.`
      : "No recorded hard guardrail failed in this input. Performance movement still needs page- and query-level interpretation.",
    "",
    "## Primary KPIs",
    "",
    `- Qualified organic leads: ${qualified.current ?? "not available"} vs ${qualified.previous ?? "not available"}`,
    `- Non-brand organic clicks: ${input.primaryKpis.nonbrandOrganicClicks.current} vs ${input.primaryKpis.nonbrandOrganicClicks.previous}; change ${delta(nonbrand)}`,
    `- Registered target queries in top 20: ${input.primaryKpis.targetQueriesTop20.current} vs ${input.primaryKpis.targetQueriesTop20.previous}; change ${delta(top20)}`,
    "",
    "## Driver metrics",
    "",
    `- AI referral landings: ${input.drivers.aiReferralLandings ?? "not available"}`,
    `- Linked AI citations: ${input.drivers.linkedAiCitations ?? "not available"}`,
    `- Earned referring domains: ${input.drivers.earnedReferringDomains ?? "not available"}`,
    "",
    "## Target-page comparison",
    "",
    "| Page | Clicks | Impressions | CTR | Avg position | Diagnostic |",
    "|---|---:|---:|---:|---:|---|",
  ];

  for (const page of input.pages) {
    const impressions = change(page.current.impressions, page.previous.impressions);
    const clicks = change(page.current.clicks, page.previous.clicks);
    let diagnostic = "Mixed or limited movement; inspect query and device segments.";
    if (page.previous.impressions === 0 && page.current.impressions > 0) {
      diagnostic = "New measurable visibility; inspect query relevance before changing copy.";
    } else if (impressions.absolute > 0 && page.current.ctr < page.previous.ctr) {
      diagnostic = "Visibility rose while CTR fell; inspect query mix and snippet fit.";
    } else if (clicks.absolute > 0 && impressions.absolute >= 0) {
      diagnostic = "Positive click movement; check lead quality before declaring success.";
    } else if (impressions.absolute < 0 && (page.current.averagePosition ?? 999) > (page.previous.averagePosition ?? 999)) {
      diagnostic = "Visibility and average rank weakened; investigate query ownership and external demand.";
    }
    lines.push(
      `| ${page.path} | ${page.current.clicks} (${delta(clicks)}) | ${page.current.impressions} (${delta(impressions)}) | ${percent(page.current.ctr)} | ${page.current.averagePosition?.toFixed(1) ?? "n/a"} | ${diagnostic} |`,
    );
  }

  lines.push(
    "",
    "## Guardrails",
    "",
    `- Protected-cohort material edits: ${input.guardrails.protectedCohortMaterialEdits}`,
    `- Expired high-risk claims: ${input.guardrails.expiredHighRiskClaims}`,
    `- New attributable technical indexing errors: ${input.guardrails.newTechnicalIndexingErrors ?? "not available"}`,
    `- Qualified-lead-rate decline across two windows: ${input.guardrails.organicQualifiedLeadRateDeclineTwoWindows ?? "not assessable"}`,
    "",
    "## Interpretation limits",
    "",
    "- This is an observational before/after comparison, not a causal experiment.",
    "- GSC average position can change when query mix changes; inspect query-level rows.",
    "- Low click and lead counts are volatile. Do not infer a stable conversion effect from a small sample.",
    "- AI answers are non-deterministic and linked-citation coverage is a sampled observation.",
  );
  if (input.caveats.length) {
    lines.push("", "## Source caveats", "", ...input.caveats.map((item) => `- ${item}`));
  }
  return lines.join("\n") + "\n";
}

function argument(name: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const inputPath = argument("--input");
  const outputPath = argument("--output");
  if (!inputPath || !outputPath) {
    throw new Error("Usage: tsx scripts/generate-seo-review.ts --input <review.json> --output <report.md>");
  }
  const program = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "seo-outstanding-program.json"), "utf8")) as Program;
  const input = JSON.parse(fs.readFileSync(path.resolve(inputPath), "utf8")) as ReviewInput;
  const report = buildReviewReport(input, program);
  const resolvedOutput = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(resolvedOutput), { recursive: true });
  fs.writeFileSync(resolvedOutput, report, "utf8");
  console.log(`SEO review written to ${resolvedOutput}`);
}
