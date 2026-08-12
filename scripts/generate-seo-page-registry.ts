/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";
import { buildContentIndex } from "./lib/content-index.mjs";
import { resolveDesignatedService } from "./lib/seo-policy.mjs";
import {
  canonicalJson,
  checksum,
  newStableId,
  normaliseRoute,
} from "./lib/seo-control-plane.mjs";
import {
  getIndexableStaticRoutes,
  isRedirectSource,
  redirectRules,
  siteRoutes,
} from "../src/config/site-route-manifest";

const repoRoot = process.cwd();
const registryPath = path.join(repoRoot, "data", "seo-page-registry.json");
const programsPath = path.join(repoRoot, "data", "seo-programs", "index.json");
const bootstrap = process.argv.includes("--bootstrap");

type JsonRecord = Record<string, any>;

function readJson(relativePath: string) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function readExistingRegistry() {
  if (!fs.existsSync(registryPath)) {
    if (!bootstrap) throw new Error("seo-page-registry.json is missing; pass --bootstrap for the one-time import.");
    return undefined;
  }
  return JSON.parse(fs.readFileSync(registryPath, "utf8"));
}

function routeWords(route: string) {
  const tail = route.split("/").filter(Boolean).at(-1) || "emet capital";
  return tail.replaceAll("-", " ");
}

function contentSource(article: JsonRecord) {
  const raw = fs.readFileSync(path.join(repoRoot, article.sourcePath), "utf8");
  const parsed = matter(raw);
  return { raw, data: parsed.data, body: parsed.content };
}

function explicitValue(data: JsonRecord, ...keys: string[]) {
  for (const key of keys) if (data[key] !== undefined && data[key] !== null && data[key] !== "") return data[key];
  return undefined;
}

function initialId(existing: JsonRecord | undefined, pathValue: string, sourcePath: string, pageType: string) {
  const byPath = existing?.pages?.find((page: JsonRecord) => page.path === pathValue);
  if (byPath) return byPath.pageId;
  const sourceMatches = existing?.pages?.filter(
    (page: JsonRecord) => page.sourcePath === sourcePath && page.pageType === pageType && page.indexability !== "redirected",
  );
  if (sourceMatches?.length === 1) return sourceMatches[0].pageId;
  return newStableId("pg");
}

const outstanding = readJson("data/seo-outstanding-program.json");
const growth = readJson("data/seo-growth-program.json");
const visibilityRecovery = readJson("data/seo-visibility-recovery-program.json");
const protectedRegistry = readJson("data/indexing-recovery-protected-pages.json");
const existing = readExistingRegistry();
const baselineCommit = existing?.bootstrap?.baselineCommit || execFileSync("git", ["rev-parse", "HEAD"], {
  cwd: repoRoot,
  encoding: "utf8",
}).trim();

const protectedByPath = new Map<string, JsonRecord>();
function setProtection(route: string, item: JsonRecord) {
  const prior = protectedByPath.get(route);
  if (!prior || Date.parse(item.reviewAfter) > Date.parse(prior.reviewAfter)) protectedByPath.set(route, item);
}
for (const item of protectedRegistry.remediations || []) {
  for (const candidate of [item.url, item.canonicalUrl]) {
    const route = normaliseRoute(candidate);
    if (!route) continue;
    setProtection(route, item);
  }
}

const outstandingDay28 = (outstanding.reviewSchedule || []).find((item: JsonRecord) => item.label === "day_28");
if (outstandingDay28?.reviewAt && outstanding.release?.mergedAt) {
  const reviewAfter = `${outstandingDay28.reviewAt}T00:00:00+10:00`;
  for (const target of outstanding.targets || []) {
    const route = normaliseRoute(target.path);
    if (!route) continue;
    setProtection(route, {
      reviewAfter,
      mergedAt: outstanding.release.mergedAt,
      changeId: `chg_commit_${outstanding.release.commit}`,
      reason: "day-28 observation window for the SEO/AI growth release",
    });
  }
}

const visibilityDay28 = (visibilityRecovery.reviewSchedule || []).find((item: JsonRecord) => item.label === "day_28");
if (visibilityDay28?.reviewAt && visibilityRecovery.release?.materialChangeAt) {
  const reviewAfter = `${visibilityDay28.reviewAt}T00:00:00+10:00`;
  for (const target of visibilityRecovery.targets || []) {
    const route = normaliseRoute(target.path);
    if (!route) continue;
    setProtection(route, {
      reviewAfter,
      mergedAt: visibilityRecovery.release.materialChangeAt,
      changeId: visibilityRecovery.release.changeId,
      reason: "day-28 observation window for the visibility-recovery release",
    });
  }
}

// Preserve an active protection written by a reviewed material change. Without
// this, regenerating the registry could silently reopen a page before its
// observation window ends.
for (const page of existing?.pages || []) {
  const route = normaliseRoute(page.path);
  const reviewAfter = page.lifecycle?.protectedUntil;
  if (!route || !reviewAfter || Date.parse(reviewAfter) <= Date.now()) continue;
  setProtection(route, {
    reviewAfter,
    mergedAt: page.lifecycle?.lastMaterialChangeAt,
    changeId: page.lifecycle?.lastMaterialChangeId,
    reason: "preserved active registry protection",
  });
}

const programsByPath = new Map<string, Set<string>>();
function addProgram(pathValue: string, programId: string) {
  const route = normaliseRoute(pathValue);
  if (!route) return;
  const memberships = programsByPath.get(route) || new Set<string>();
  memberships.add(programId);
  programsByPath.set(route, memberships);
}
for (const target of outstanding.targets || []) addProgram(target.path, outstanding.programId);
for (const target of growth.targets || []) addProgram(target.path, growth.programId);
for (const target of visibilityRecovery.targets || []) addProgram(target.path, visibilityRecovery.programId);
for (const route of protectedByPath.keys()) addProgram(route, outstanding.programId);

const bootstrapChangedAt = "2026-08-06T00:00:00.000Z";
const defaultHighReview = "2026-11-04T00:00:00.000Z";
const defaultStandardReview = "2027-02-02T00:00:00.000Z";

function measurementFor(pageType: string) {
  if (["home", "service", "location", "tool"].includes(pageType)) {
    return {
      primaryOutcome: "qualified_organic_lead",
      successRuleId: "sr_qualified_service_demand_v1",
      exitRuleId: "er_service_guardrail_v1",
    };
  }
  if (["guide", "case-study", "resource"].includes(pageType)) {
    return {
      primaryOutcome: "nonbrand_click_and_service_assist",
      successRuleId: "sr_supporting_demand_v1",
      exitRuleId: "er_low_value_overlap_v1",
    };
  }
  return {
    primaryOutcome: "eligible_discovery",
    successRuleId: "sr_eligible_discovery_v1",
    exitRuleId: "er_no_search_mission_v1",
  };
}

function lifecycleFor(pathValue: string, indexability: string, decision = "none") {
  const protection = protectedByPath.get(pathValue);
  const protectedUntil = protection ? protection.reviewAfter || "9999-12-31T23:59:59.000Z" : null;
  const state = indexability === "indexable" ? "observing" : "closed";
  const contentRiskReview = indexability === "indexable" ? defaultStandardReview : null;
  return {
    state,
    decision,
    reviewAt: protectedUntil || contentRiskReview,
    protectedUntil,
    lastMaterialChangeId: protection?.changeId || (protection?.sourcePrs?.length
      ? `chg_pr_${protection.sourcePrs.join("_")}`
      : "chg_registry_bootstrap_20260806"),
    lastMaterialChangeAt: protection?.mergedAt || bootstrapChangedAt,
  };
}

function staticTargeting(route: JsonRecord) {
  const query = route.path === "/" ? "commercial finance broker Australia" : routeWords(route.path);
  let intent = "informational";
  let servicePath: string | null = null;
  let exception: string | null = null;
  if (route.pageType === "service") {
    intent = "transactional";
    servicePath = route.path;
  } else if (route.pageType === "location") {
    intent = "commercial investigation";
    const parts = route.path.split("/").filter(Boolean);
    servicePath = `/${parts.slice(0, 2).join("/")}`;
    const service = parts[1].replaceAll("-", " ");
    const location = parts.at(-1)!.replaceAll("-", " ");
    return {
      primaryQuery: `${service} ${location}`,
      intent,
      designatedServicePagePath: servicePath,
      serviceOwnershipException: null,
    };
  } else if (route.pageType === "tool") {
    intent = "commercial investigation";
    servicePath = resolveDesignatedService({ title: query, primaryQuery: query })?.path || null;
  } else if (route.pageType === "home") {
    intent = "commercial investigation";
    servicePath = "/services/commercial-property-finance";
  } else {
    exception = `${route.pageType} page is not a service-supporting search landing page`;
  }
  return { primaryQuery: query, intent, designatedServicePagePath: servicePath, serviceOwnershipException: exception };
}

const records: JsonRecord[] = [];
for (const route of getIndexableStaticRoutes()) {
  const pathValue = normaliseRoute(route.path)!;
  const financial = ["home", "service", "location", "tool"].includes(route.pageType);
  const lifecycle = lifecycleFor(pathValue, "indexable");
  records.push({
    pageId: initialId(existing, pathValue, route.source, route.pageType),
    path: pathValue,
    sourcePath: route.source,
    pageType: route.pageType,
    indexability: "indexable",
    metadataStatus: "needs_review",
    metadataConfidence: route.pageType === "service" ? "medium" : "low",
    targeting: { ...staticTargeting(route), designatedServicePageId: null, country: "AU" },
    governance: {
      contentRisk: financial ? "high" : "low",
      maxAutomatedChangeRisk: "R0",
      contentOwner: route.pageType === "legal" ? "compliance" : "seo",
      reviewOwner: financial ? "financial-review" : "seo-content-review",
      sourceRequired: financial,
      sourceCount: 0,
      reviewEveryDays: financial ? 90 : 365,
      expiresAt: null,
    },
    lifecycle: { ...lifecycle, reviewAt: lifecycle.protectedUntil || (financial ? defaultHighReview : defaultStandardReview) },
    measurement: measurementFor(route.pageType),
    programIds: [...(programsByPath.get(pathValue) || [])].sort(),
  });
}

const contentIndex = buildContentIndex(repoRoot);
for (const article of Object.values(contentIndex).flat() as JsonRecord[]) {
  const pathValue = normaliseRoute(article.route)!;
  if (isRedirectSource(pathValue)) continue;
  const source = contentSource(article);
  let primaryQuery = explicitValue(source.data, "primaryQuery", "primary_query") || article.keywords?.[0] || article.title;
  const searchIntent = explicitValue(source.data, "searchIntent", "search_intent") || "informational";
  const explicitService = explicitValue(source.data, "designatedServicePage", "designated_service_page");
  const servicePath = explicitService || resolveDesignatedService({ ...article, ...source.data, primaryQuery })?.path || null;
  const existingQueryOwner = records.find(
    (record) => record.indexability === "indexable" && record.targeting.primaryQuery.toLowerCase() === String(primaryQuery).toLowerCase(),
  );
  const queryAdjustedForOwnership = Boolean(existingQueryOwner);
  if (queryAdjustedForOwnership) primaryQuery = article.title;
  const explicitRisk = explicitValue(source.data, "contentRisk", "content_risk");
  const contentRisk = explicitRisk === "high" || article.contentType === "case-studies"
    ? "high"
    : explicitRisk === "low"
      ? "low"
      : "medium";
  const completeHighRiskReview =
    contentRisk !== "high" ||
    (article.sources?.length > 0 && Boolean(article.reviewedBy) && Boolean(article.reviewedAt));
  const metadataVerified = Boolean(
    explicitValue(source.data, "primaryQuery", "primary_query") &&
      explicitValue(source.data, "searchIntent", "search_intent") &&
      explicitService &&
      explicitRisk &&
      completeHighRiskReview &&
      !queryAdjustedForOwnership,
  );
  const indexability = article.noindex ? "noindex" : "indexable";
  const programIds = [...(programsByPath.get(pathValue) || [])].sort();
  const protectedItem = protectedByPath.get(pathValue);
  const lifecycle = lifecycleFor(pathValue, indexability, article.noindex ? "noindex" : "none");
  const explicitProtectedUntil = explicitValue(source.data, "protectedUntil", "protected_until");
  if (explicitProtectedUntil && Date.parse(String(explicitProtectedUntil)) > Date.now()) {
    lifecycle.protectedUntil = String(explicitProtectedUntil);
    lifecycle.lastMaterialChangeId = `chg_content_review_${String(article.reviewedAt || source.data.reviewedAt || "manual").replaceAll(/[^0-9a-z]+/gi, "_")}`;
    lifecycle.lastMaterialChangeAt = article.reviewedAt || source.data.reviewedAt || new Date().toISOString();
  }
  const reviewAt = article.noindex
    ? null
    : lifecycle.protectedUntil || protectedItem?.reviewAfter || (contentRisk === "high" ? defaultHighReview : defaultStandardReview);

  records.push({
    pageId: initialId(existing, pathValue, article.sourcePath, article.contentType === "case-studies" ? "case-study" : "guide"),
    path: pathValue,
    sourcePath: article.sourcePath,
    pageType: article.contentType === "case-studies" ? "case-study" : article.contentType === "insights" ? "resource" : "guide",
    indexability,
    metadataStatus: metadataVerified ? "verified" : "needs_review",
    metadataConfidence: metadataVerified ? "high" : explicitRisk ? "medium" : "low",
    targeting: {
      primaryQuery: String(primaryQuery),
      intent: String(searchIntent),
      designatedServicePagePath: servicePath,
      designatedServicePageId: null,
      serviceOwnershipException: servicePath ? null : "service owner requires manual review",
      country: "AU",
    },
    governance: {
      contentRisk,
      maxAutomatedChangeRisk: metadataVerified && contentRisk === "low" ? "R1" : "R0",
      contentOwner: "seo-content",
      reviewOwner: contentRisk === "high" ? "financial-review" : "seo-content-review",
      sourceRequired: contentRisk !== "low",
      sourceCount: article.sources?.length || 0,
      reviewEveryDays: contentRisk === "high" ? 90 : contentRisk === "medium" ? 180 : 365,
      reviewedBy: article.reviewedBy || null,
      reviewedAt: article.reviewedAt || null,
      expiresAt: article.expiresAt || null,
    },
    lifecycle: { ...lifecycle, reviewAt },
    measurement: measurementFor(article.contentType === "case-studies" ? "case-study" : "guide"),
    programIds,
  });
}

records.sort((left, right) => left.path.localeCompare(right.path));
const canonicalByPath = new Map(records.filter((record) => record.indexability === "indexable").map((record) => [record.path, record]));

for (const record of records) {
  const servicePath = record.targeting.designatedServicePagePath;
  record.targeting.designatedServicePageId = servicePath ? canonicalByPath.get(servicePath)?.pageId || null : null;
  if (servicePath && !record.targeting.designatedServicePageId) {
    record.metadataStatus = "needs_review";
    record.metadataConfidence = "low";
    record.governance.maxAutomatedChangeRisk = "R0";
    record.targeting.serviceOwnershipException = `unregistered service owner ${servicePath}`;
  }
}

for (const rule of redirectRules) {
  if (rule.status !== 301 || !rule.from.startsWith("/") || rule.from.includes("*") || rule.from.includes(":")) continue;
  const sourcePath = normaliseRoute(rule.from)!;
  const destinationPath = normaliseRoute(rule.to)!;
  const destination = canonicalByPath.get(destinationPath);
  records.push({
    pageId: initialId(existing, sourcePath, "src/config/site-route-manifest.ts", "redirect"),
    path: sourcePath,
    sourcePath: "src/config/site-route-manifest.ts",
    pageType: "redirect",
    indexability: "redirected",
    metadataStatus: "verified",
    metadataConfidence: "high",
    redirectToPageId: destination?.pageId || null,
    redirectToPath: destinationPath,
    targeting: {
      primaryQuery: `${routeWords(sourcePath)} legacy route`,
      intent: "redirect",
      designatedServicePagePath: null,
      designatedServicePageId: null,
      serviceOwnershipException: "redirect source has no independent search mission",
      country: "AU",
    },
    governance: {
      contentRisk: "low",
      maxAutomatedChangeRisk: "R0",
      contentOwner: "engineering",
      reviewOwner: "seo-engineering",
      sourceRequired: false,
      sourceCount: 0,
      reviewEveryDays: 365,
      expiresAt: null,
    },
    lifecycle: lifecycleFor(sourcePath, "redirected", "consolidate"),
    measurement: measurementFor("system"),
    programIds: [...(programsByPath.get(sourcePath) || [])].sort(),
  });
}

records.sort((left, right) => left.path.localeCompare(right.path));

const routePatterns = [
  ...siteRoutes
    .filter((route) => route.path.includes(":") || route.path === "*")
    .map((route) => ({
      pattern: route.path,
      type: route.path === "*" ? "not_found" : "dynamic",
      destination: null,
      status: route.path === "*" ? 404 : null,
      sourcePath: route.source,
    })),
  ...redirectRules
    .filter((rule) => rule.from.includes("*") || rule.from.includes(":"))
    .map((rule) => ({
      pattern: rule.from,
      type: rule.status === 404 ? "not_found" : "redirect",
      destination: rule.to,
      status: rule.status,
      sourcePath: "src/config/site-route-manifest.ts",
    })),
];

const baseRegistry = {
  schemaVersion: 1,
  site: "https://emetcapital.com.au",
  generatedAt: new Date().toISOString(),
  bootstrap: existing?.bootstrap || {
    capturedAt: "2026-08-06T00:00:00.000Z",
    baselineCommit,
    reason: "Initial import of the complete deployed route, noindex, and redirect estate into the SEO control plane.",
  },
  measurementRules: {
    primary: ["qualified_organic_leads", "nonbrand_organic_clicks", "target_queries_top_20"],
    observationDimensions: ["page", "query", "cluster", "device", "country", "brandVsNonBrand"],
    insufficientEvidenceOutcome: "extend_observation",
    materialChangeResetsObservation: true,
    missingSourceDataIsZero: false,
  },
  routePatterns,
  pages: records,
};

if (existing) {
  const existingComparable = { ...existing, generatedAt: undefined, checksum: undefined };
  const nextComparable = { ...baseRegistry, generatedAt: undefined };
  if (canonicalJson(existingComparable) === canonicalJson(nextComparable)) baseRegistry.generatedAt = existing.generatedAt;
}

const registry = { ...baseRegistry, checksum: "" };
registry.checksum = checksum({ ...registry, checksum: undefined });
fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);

const programSources = [
  { programId: outstanding.programId, kind: "measurement-and-remediation", definitionPath: "data/seo-outstanding-program.json", status: "active" },
  { programId: growth.programId, kind: "existing-demand-growth", definitionPath: "data/seo-growth-program.json", status: "active" },
  { programId: visibilityRecovery.programId, kind: "visibility-recovery", definitionPath: "data/seo-visibility-recovery-program.json", status: "observing" },
  { programId: "indexing-recovery-protected-2026-08-05", kind: "protected-cohort", definitionPath: "data/indexing-recovery-protected-pages.json", status: "observing" },
].map((program) => ({
  ...program,
  contentChecksum: checksum(readJson(program.definitionPath)),
}));
fs.mkdirSync(path.dirname(programsPath), { recursive: true });
fs.writeFileSync(
  programsPath,
  `${JSON.stringify({ schemaVersion: 1, generatedAt: baseRegistry.generatedAt, programs: programSources }, null, 2)}\n`,
);

const counts = records.reduce((result: Record<string, number>, record) => {
  result[record.indexability] = (result[record.indexability] || 0) + 1;
  return result;
}, {});
console.log(`SEO page registry generated: ${records.length} records (${JSON.stringify(counts)}), checksum ${registry.checksum}.`);
