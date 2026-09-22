import fs from "node:fs";

const sprint = JSON.parse(fs.readFileSync("data/seo-accelerated-sprint.json", "utf8"));
const programme = JSON.parse(fs.readFileSync("data/seo-content-programme.json", "utf8"));
const keywords = JSON.parse(fs.readFileSync("data/seo-strategy-keywords.json", "utf8"));
const errors = [];
const outcomes = new Set(["deployed", "implemented_pending_release", "audit_passed_no_change", "blocked", "unknown"]);

if (sprint.schemaVersion !== 1 || sprint.mode !== "automation-first") errors.push("accelerated sprint identity is invalid");
if (sprint.servicePages?.length !== 5) errors.push("accelerated sprint must track exactly five service owners");
if (sprint.guideWave?.length !== 10) errors.push("accelerated sprint must track exactly ten guide outcomes");
if (sprint.baseline?.qualifiedOrganicLeads !== null) errors.push("qualified leads must remain null until a CRM-qualified source is joined");
if (sprint.baseline?.gscComparison?.sourceStatus !== "supplied_research_not_fresh_api") errors.push("research GSC baseline must retain its source limitation");

const rows = [...(sprint.servicePages || []), ...(sprint.guideWave || [])];
if (new Set(rows.map((row) => row.path)).size !== rows.length) errors.push("sprint paths must be unique");
for (const row of rows) {
  if (!row.path?.startsWith("/") || !outcomes.has(row.outcome) || !row.reason) errors.push(`invalid sprint outcome: ${row.path || "missing path"}`);
}
for (const owner of programme.commercialStrategy?.serviceOwners || []) {
  if (!sprint.servicePages.some((row) => row.path === owner)) errors.push(`missing service owner outcome: ${owner}`);
}
if (keywords.market !== "Australia" || !Array.isArray(keywords.keywords) || keywords.keywords.length < 10) errors.push("bounded Australian keyword set is incomplete");
for (const keyword of keywords.keywords || []) {
  if (!keyword.query || !keyword.serviceOwner || keyword.volume === undefined || keyword.difficulty === undefined) errors.push(`keyword row is incomplete: ${keyword.query || "missing query"}`);
}
const handsOff = programme.handsOffAutomation;
if (!handsOff || handsOff.routineUserActionsRequired !== false || handsOff.manualFallbackOwner !== null) {
  errors.push("programme must remain hands-off without a routine manual fallback owner");
}
if (handsOff?.blockedItemPolicy !== "defer_and_advance" || handsOff?.externalFailurePolicy !== "record_retry_next_scheduled_run") {
  errors.push("hands-off failure and blocker policies are invalid");
}
for (const job of ["editorialPreparationJob", "independentReviewJob", "newArticlePublisherJob", "repairPublisherJob", "lifecycleMeasurementJob"]) {
  if (!handsOff?.[job]) errors.push(`hands-off job is missing: ${job}`);
}
if (programme.rules?.routineUserOperationRequired !== false || programme.rules?.specialistRiskIsDeferredAutomatically !== true || programme.rules?.publicationCadenceNeverOverridesQualityGate !== true) {
  errors.push("hands-off programme guardrails are incomplete");
}
if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}
console.log(JSON.stringify({ status: "passed", sprintId: sprint.sprintId, services: sprint.servicePages.length, guides: sprint.guideWave.length, keywords: keywords.keywords.length }, null, 2));
