/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { normaliseRoute } from "./lib/seo-control-plane.mjs";

type Page = Record<string, any>;

export function reviewCohort(page: Page): string {
  if (["home", "service", "company", "tool"].includes(page.pageType)) return "01_business_critical";
  if (page.pageType === "location") return "02_locations";
  if (["guide", "case-study"].includes(page.pageType)) return "03_editorial";
  return "04_supporting_redirects_noindex";
}

export function canonicalGscRows(report: any): Map<string, any> {
  const grouped = new Map<string, any>();
  for (const row of report?.topPages || []) {
    const route = normaliseRoute(row.path || row.page);
    if (!route) continue;
    const current = grouped.get(route) || { clicks: 0, impressions: 0, positionNumerator: 0, sourceRows: 0 };
    const impressions = Number(row.impressions || 0);
    current.clicks += Number(row.clicks || 0);
    current.impressions += impressions;
    current.positionNumerator += Number(row.position || 0) * impressions;
    current.sourceRows += 1;
    grouped.set(route, current);
  }
  for (const value of grouped.values()) {
    value.ctr = value.impressions ? value.clicks / value.impressions : 0;
    value.position = value.impressions ? value.positionNumerator / value.impressions : 0;
  }
  return grouped;
}

export function proposedPortfolioState(page: Page, metric: any, now: Date): string {
  const protectedUntil = page.lifecycle?.protectedUntil ? Date.parse(page.lifecycle.protectedUntil) : 0;
  if (protectedUntil > now.getTime()) return "observe_protected";
  if (page.indexability === "redirected") return "keep_existing_consolidation";
  if (page.indexability === "noindex") return "review_noindex_evidence";
  if (page.metadataStatus === "needs_review") return "complete_metadata_query_owner_review";
  if (metric?.impressions >= 5 && metric.position >= 4 && metric.position <= 40) return "evidence_review_candidate";
  return "keep_collect_evidence";
}

export function buildPortfolioAudit(registry: any, gsc: any | null, generatedAt: string) {
  const now = new Date(generatedAt);
  const metrics = gsc ? canonicalGscRows(gsc) : new Map();
  const pages = registry.pages || [];
  const normalizeQuery = (value: string) => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
  const pageByPath = new Map(pages.map((page: Page) => [page.path, page]));
  const queryRows = Array.isArray(gsc?.queryRows) ? gsc.queryRows : [];
  const exactTargets = new Map<string, { impressions: number; positionNumerator: number }>();
  for (const row of queryRows) {
    const page = pageByPath.get(normaliseRoute(row.path || row.page));
    if (!page || normalizeQuery(row.query) !== normalizeQuery(page.targeting?.primaryQuery)) continue;
    const current = exactTargets.get(page.pageId) || { impressions: 0, positionNumerator: 0 };
    const impressions = Number(row.impressions || 0);
    current.impressions += impressions;
    current.positionNumerator += Number(row.position || 0) * impressions;
    exactTargets.set(page.pageId, current);
  }
  const exactTargetPositions = [...exactTargets.values()]
    .filter((value) => value.impressions > 0)
    .map((value) => value.positionNumerator / value.impressions);
  const counts = (field: string) => pages.reduce((result: Record<string, number>, page: Page) => {
    const key = String(page[field]);
    result[key] = (result[key] || 0) + 1;
    return result;
  }, {});
  const reviewPages = pages
    .filter((page: Page) => page.metadataStatus === "needs_review")
    .map((page: Page) => ({
      pageId: page.pageId,
      path: page.path,
      pageType: page.pageType,
      cohort: reviewCohort(page),
      primaryQuery: page.targeting?.primaryQuery,
      metadataConfidence: page.metadataConfidence,
      contentRisk: page.governance?.contentRisk,
      maxAutomatedChangeRisk: page.governance?.maxAutomatedChangeRisk,
      protectedUntil: page.lifecycle?.protectedUntil,
      observed: metrics.has(page.path),
      proposedPortfolioState: proposedPortfolioState(page, metrics.get(page.path), now),
    }))
    .sort((left: any, right: any) => left.cohort.localeCompare(right.cohort) || left.path.localeCompare(right.path));
  const allStates = pages.map((page: Page) => proposedPortfolioState(page, metrics.get(page.path), now));
  const stateCounts = allStates.reduce((result: Record<string, number>, value: string) => {
    result[value] = (result[value] || 0) + 1;
    return result;
  }, {});
  const reviewCohorts = {
    "01_business_critical": reviewPages.filter((page: any) => page.cohort === "01_business_critical"),
    "02_locations": reviewPages.filter((page: any) => page.cohort === "02_locations"),
    "03_editorial": reviewPages.filter((page: any) => page.cohort === "03_editorial"),
    "04_supporting_redirects_noindex": reviewPages.filter((page: any) => page.cohort === "04_supporting_redirects_noindex"),
  };
  const reviewBatches = Object.entries(reviewCohorts).flatMap(([cohort, rows]) => {
    const batches = [];
    for (let start = 0; start < rows.length; start += 50) {
      batches.push({
        batchId: `${cohort}_${String(start / 50 + 1).padStart(2, "0")}`,
        cohort,
        status: "pending_human_review",
        mutationAuthorized: false,
        records: rows.slice(start, start + 50),
      });
    }
    return batches;
  });
  return {
    schemaVersion: 1,
    generatedAt,
    registryChecksum: registry.checksum,
    estate: {
      total: pages.length,
      indexability: counts("indexability"),
      pageTypes: counts("pageType"),
      metadataStatus: counts("metadataStatus"),
      protected: pages.filter((page: Page) => page.lifecycle?.protectedUntil).length,
    },
    evidence: gsc
      ? {
          status: "partial",
          window: gsc.performanceWindow,
          siteTotals: gsc.totals,
          canonicalPageRows: metrics.size,
          availableDimensions: gsc.coverage?.dimensions || ["page"],
          missingDimensions: queryRows.length ? ["qualifiedLead"] : ["query", "device", "country", "brandVsNonBrand", "qualifiedLead"],
          queryPrivacyOmissions: Boolean(queryRows.length),
          rowLimitTruncated: gsc.coverage?.rowLimitTruncated || {},
        }
      : { status: "unavailable", reason: "no GSC report supplied" },
    queryOwnership: {
      registeredPrimaryQueries: pages.filter((page: Page) => page.indexability === "indexable").length,
      runtimeQueryCohorts: queryRows.length
        ? {
            status: "partial",
            segmentedRows: queryRows.length,
            brandRows: queryRows.filter((row: any) => row.brandClass === "brand").length,
            nonbrandRows: queryRows.filter((row: any) => row.brandClass === "nonbrand").length,
            observedExactRegisteredTargets: exactTargetPositions.length,
            exactTargetsTop10: exactTargetPositions.filter((position) => position <= 10).length,
            exactTargetsTop20: exactTargetPositions.filter((position) => position <= 20).length,
            exactTargetsPositions4To20: exactTargetPositions.filter((position) => position >= 4 && position <= 20).length,
            caveat: "Exact matches only; query variants and anonymized rows are not inferred.",
          }
        : "blocked_until_query_rows_are_available",
      rule: "One normalized primary-query owner unless a documented exception is present.",
    },
    portfolioStateCounts: stateCounts,
    reviewPolicy: {
      ageAuthorizesAction: false,
      materialChangesRequireHumanApproval: true,
      protectedChangesRequireEmergencyOverride: true,
      missingEvidenceMeansUnavailableNotZero: true,
      maxBatchSize: 50,
    },
    reviewCohorts,
    reviewBatches,
    materialDecisionBacklog: {
      iterate: "proposal_only_after_complete_page_and_query_evidence",
      consolidate: "none_authorized_from_partial_page-only_evidence",
      noindex: "none_authorized_from_partial_page-only_evidence",
      retire: "none_authorized_from_partial_page-only_evidence",
    },
  };
}

function markdown(audit: any): string {
  const cohortLines = Object.entries(audit.reviewCohorts).map(
    ([name, rows]: [string, any]) => `- ${name}: ${rows.length} records`,
  );
  const stateLines = Object.entries(audit.portfolioStateCounts).map(([name, count]) => `- ${name}: ${count}`);
  return [
    `# SEO portfolio and legacy backfill baseline — ${audit.generatedAt.slice(0, 10)}`,
    "",
    `Registry checksum: \`${audit.registryChecksum}\``,
    "",
    "## Estate",
    "",
    `- 489 canonical records: ${audit.estate.indexability.indexable} indexable, ${audit.estate.indexability.redirected} redirects, ${audit.estate.indexability.noindex} noindex.`,
    `- Page types include ${audit.estate.pageTypes.guide} guides and ${audit.estate.pageTypes.location} locations.`,
    `- ${audit.estate.metadataStatus.needs_review} legacy records need metadata/query-ownership review; all fail closed at R0 automation.`,
    `- ${audit.estate.protected} routes are protected from material action without an emergency override.`,
    "",
    "## Evidence boundary",
    "",
    `GSC is ${audit.evidence.status}. Available dimensions: ${(audit.evidence.availableDimensions || []).join(", ")}. Qualified-lead evidence remains unavailable, and Search Console query privacy omissions apply. No consolidation, noindex or retirement decision is authorised from this evidence alone.`,
    "",
    "## Controlled backfill cohorts",
    "",
    ...cohortLines,
    "",
    "Each cohort is processed in batches of at most 50. Review verifies title, description, canonical, primary-query owner, intent, sources, financial-risk class, review owner and measurement policy. A completed review may create a proposal; it does not approve execution.",
    "",
    "## Current portfolio states",
    "",
    ...stateLines,
    "",
    "## Growth implications",
    "",
    "- Prioritise existing pages with demonstrated impressions and positions 4–40 after query-level evidence is available.",
    "- Improve titles, opening answers, comparison/checklist structure, sources, original examples and internal links only after ownership/cannibalisation review.",
    "- Treat AI visibility as a fixed-prompt observation program; citation gaps inform topic/entity improvements, not automatic thin-page creation.",
    "- Use qualified organic leads as the business outcome once an aggregate GA4/CRM source is validated. Until then, report it as unavailable.",
    "",
  ].join("\n");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const value = (flag: string) => {
    const index = args.indexOf(flag);
    return index >= 0 ? args[index + 1] : undefined;
  };
  const registryPath = value("--registry") || path.join(process.cwd(), "data", "seo-page-registry.json");
  const gscPath = value("--gsc-report");
  const generatedAt = value("--generated-at") || new Date().toISOString();
  const outputDir = value("--output-dir") || path.join(process.cwd(), "audits", "seo-control-plane");
  const audit = buildPortfolioAudit(
    JSON.parse(fs.readFileSync(registryPath, "utf8")),
    gscPath ? JSON.parse(fs.readFileSync(gscPath, "utf8")) : null,
    generatedAt,
  );
  fs.mkdirSync(outputDir, { recursive: true });
  const stamp = generatedAt.slice(0, 10);
  const jsonPath = path.join(outputDir, `portfolio-baseline-${stamp}.json`);
  const mdPath = path.join(outputDir, `portfolio-baseline-${stamp}.md`);
  fs.writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`);
  fs.writeFileSync(mdPath, markdown(audit));
  console.log(JSON.stringify({ json: jsonPath, markdown: mdPath, reviewRecords: audit.estate.metadataStatus.needs_review }));
}
