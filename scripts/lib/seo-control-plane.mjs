import crypto from "node:crypto";
import { isInternalLinkOnlyChange } from "./content-change-policy.mjs";

export const CONTROL_PLANE_SCHEMA_VERSION = 1;
export const LIFECYCLE_STATES = Object.freeze([
  "proposed",
  "approved",
  "in_build",
  "live",
  "observing",
  "review_due",
  "closed",
]);
export const SEO_DECISIONS = Object.freeze([
  "none",
  "keep",
  "iterate",
  "consolidate",
  "noindex",
  "retire",
  "rollback",
]);
export const CONTENT_RISKS = Object.freeze(["low", "medium", "high"]);
export const CHANGE_RISKS = Object.freeze(["R0", "R1", "R2", "R3", "R4"]);

const TRANSITIONS = Object.freeze({
  proposed: new Set(["approved"]),
  approved: new Set(["in_build"]),
  in_build: new Set(["live", "closed"]),
  live: new Set(["observing"]),
  observing: new Set(["review_due"]),
  review_due: new Set(["observing", "in_build", "closed"]),
  closed: new Set(["proposed"]),
});

export function normaliseRoute(value) {
  if (!value) return undefined;
  try {
    const url = new URL(String(value), "https://emetcapital.com.au");
    return url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
  } catch {
    return undefined;
  }
}

export function normaliseQuery(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function canonicalise(value) {
  if (Array.isArray(value)) return value.map(canonicalise);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonicalise(value[key])]),
    );
  }
  return value;
}

export function canonicalJson(value) {
  return JSON.stringify(canonicalise(value));
}

export function checksum(value) {
  return crypto.createHash("sha256").update(canonicalJson(value)).digest("hex");
}

export function newStableId(prefix = "pg") {
  return `${prefix}_${crypto.randomUUID().replaceAll("-", "")}`;
}

export function assertTransition({ from, to, decision = "none", approved = false, protectedUntil, override }, now = new Date()) {
  if (!LIFECYCLE_STATES.includes(from) || !LIFECYCLE_STATES.includes(to)) {
    throw new Error(`Unknown SEO lifecycle transition ${from} -> ${to}.`);
  }
  if (!TRANSITIONS[from]?.has(to)) {
    throw new Error(`SEO lifecycle transition ${from} -> ${to} is not allowed.`);
  }
  if (!SEO_DECISIONS.includes(decision)) throw new Error(`Unknown SEO decision: ${decision}.`);

  const materialDecision = !["none", "keep"].includes(decision);
  if (materialDecision && !approved) {
    throw new Error(`${decision} requires an approval record before execution.`);
  }
  if (protectedUntil && Date.parse(protectedUntil) > now.getTime() && materialDecision) {
    const required = ["incidentId", "approver", "reason", "expiresAt", "rollbackRef"];
    const missing = required.filter((key) => !override?.[key]);
    if (missing.length) {
      throw new Error(`Protected page transition requires an emergency override (${missing.join(", ")}).`);
    }
    if (Date.parse(override.expiresAt) <= now.getTime()) {
      throw new Error("Emergency override has expired.");
    }
  }
  return true;
}

export function riskRank(risk) {
  return CHANGE_RISKS.indexOf(risk);
}

export function highestRisk(items) {
  return items.reduce((highest, item) => {
    const risk = typeof item === "string" ? item : item.risk;
    return riskRank(risk) > riskRank(highest) ? risk : highest;
  }, "R0");
}

function frontmatterValue(source, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return source.match(new RegExp(`^${escaped}:\\s*["']?([^"'\\r\\n]+)`, "mi"))?.[1]?.trim();
}

export function classifyFileChange({ relativePath, status = "M", previous = "", current = "" }) {
  const file = relativePath.replaceAll("\\", "/");
  if (file === "data/authority-outreach-work-order.json" || /(?:email|outreach).*(?:send|delivery)/i.test(file)) {
    return { risk: "R4", reason: "external communications or authority workflow" };
  }
  if (
    file.startsWith(".github/") ||
    file === "package.json" ||
    file === "package-lock.json" ||
    file.startsWith("scripts/") ||
    file.startsWith("src/config/") ||
    file === "netlify.toml" ||
    file === "vercel.json"
  ) {
    return { risk: "R3", reason: "release, control-plane, routing, or execution code" };
  }
  if (
    file === "data/seo-page-registry.json" ||
    file === "data/seo-control-plane.schema.json" ||
    file.startsWith("data/seo-programs/") ||
    file === "data/indexing-recovery-protected-pages.json"
  ) {
    return { risk: "R3", reason: "SEO authority, lifecycle, or protected-program definition" };
  }
  if (file.startsWith("src/content/") && file.endsWith(".md")) {
    if (status === "A") return { risk: "R2", reason: "new indexable content" };
    if (status === "D") return { risk: "R3", reason: "content retirement or consolidation" };
    const previousCanonical = frontmatterValue(previous, "canonical");
    const currentCanonical = frontmatterValue(current, "canonical");
    const previousNoindex = frontmatterValue(previous, "noindex");
    const currentNoindex = frontmatterValue(current, "noindex");
    if (previousCanonical !== currentCanonical || previousNoindex !== currentNoindex) {
      return { risk: "R3", reason: "canonical or indexability change" };
    }
    const contentRisk = frontmatterValue(current, "contentRisk") || frontmatterValue(current, "content_risk");
    if (contentRisk === "low" && isInternalLinkOnlyChange(previous, current)) {
      return { risk: "R1", reason: "explicitly low-risk internal-link-only change" };
    }
    return { risk: "R2", reason: "material content or targeting change" };
  }
  if (file.startsWith("src/pages/") || file.startsWith("src/components/")) {
    if (/canonical|noindex|robots|redirect/i.test(`${previous}\n${current}`)) {
      return { risk: "R3", reason: "page code with possible topology/indexability impact" };
    }
    return { risk: "R2", reason: "material page presentation or content change" };
  }
  if (/\.(?:png|jpe?g|webp|avif|svg)$/i.test(file)) {
    return { risk: "R1", reason: "reversible media asset" };
  }
  if (/\.(?:md|txt)$/i.test(file)) return { risk: "R1", reason: "documentation or discovery text" };
  return { risk: "R2", reason: "unclassified site change fails to a reviewed tier" };
}

export function validateRegistry(registry, { now = new Date(), allowOverdue = true } = {}) {
  const errors = [];
  const warnings = [];
  if (registry?.schemaVersion !== CONTROL_PLANE_SCHEMA_VERSION) {
    errors.push(`schemaVersion must be ${CONTROL_PLANE_SCHEMA_VERSION}`);
  }
  if (registry?.site !== "https://emetcapital.com.au") errors.push("site must be https://emetcapital.com.au");
  if (!Array.isArray(registry?.pages)) errors.push("pages must be an array");
  if (errors.length) return { errors, warnings };

  const pageIds = new Set();
  const paths = new Set();
  const canonicalPaths = new Set(
    registry.pages.filter((page) => page.indexability === "indexable").map((page) => page.path),
  );
  const normalizedQueryOwners = new Map();

  for (const [index, page] of registry.pages.entries()) {
    const prefix = `pages[${index}]`;
    if (!/^pg_[a-f0-9]{32}$/i.test(page.pageId || "")) errors.push(`${prefix}: invalid stable pageId`);
    if (pageIds.has(page.pageId)) errors.push(`${prefix}: duplicate pageId ${page.pageId}`);
    pageIds.add(page.pageId);
    if (normaliseRoute(page.path) !== page.path) errors.push(`${prefix}: path is not normalized: ${page.path}`);
    if (paths.has(page.path)) errors.push(`${prefix}: duplicate path ${page.path}`);
    paths.add(page.path);
    if (!page.sourcePath) errors.push(`${prefix}: sourcePath is required`);
    if (!CONTENT_RISKS.includes(page.governance?.contentRisk)) errors.push(`${prefix}: invalid contentRisk`);
    if (!CHANGE_RISKS.includes(page.governance?.maxAutomatedChangeRisk)) {
      errors.push(`${prefix}: invalid maxAutomatedChangeRisk`);
    }
    if (!LIFECYCLE_STATES.includes(page.lifecycle?.state)) errors.push(`${prefix}: invalid lifecycle state`);
    if (!SEO_DECISIONS.includes(page.lifecycle?.decision)) errors.push(`${prefix}: invalid lifecycle decision`);
    if (!page.targeting?.primaryQuery) errors.push(`${prefix}: primaryQuery is required`);
    if (!page.targeting?.intent) errors.push(`${prefix}: intent is required`);
    if (!page.measurement?.primaryOutcome || !page.measurement?.successRuleId || !page.measurement?.exitRuleId) {
      errors.push(`${prefix}: complete measurement policy is required`);
    }
    if (page.indexability === "indexable") {
      if (page.lifecycle.state === "closed") errors.push(`${prefix}: indexable page cannot be closed`);
      const ownerKey = normaliseQuery(page.targeting.primaryQuery);
      const currentOwners = normalizedQueryOwners.get(ownerKey) || [];
      currentOwners.push(page);
      normalizedQueryOwners.set(ownerKey, currentOwners);
    }
    if (page.indexability === "redirected") {
      if (page.lifecycle.state !== "closed" || page.lifecycle.decision !== "consolidate") {
        errors.push(`${prefix}: redirect must be closed with consolidate decision`);
      }
      if (!page.redirectToPath || !canonicalPaths.has(page.redirectToPath)) {
        errors.push(`${prefix}: redirect target is not an indexable registered page: ${page.redirectToPath}`);
      }
    }
    if (page.lifecycle?.protectedUntil && Date.parse(page.lifecycle.protectedUntil) > now.getTime()) {
      if (!page.programIds?.length) errors.push(`${prefix}: protected page must belong to a program`);
    }
    if (!allowOverdue && page.lifecycle?.reviewAt && Date.parse(page.lifecycle.reviewAt) < now.getTime()) {
      warnings.push(`${prefix}: review is overdue (${page.lifecycle.reviewAt})`);
    }
    if (page.metadataStatus === "needs_review" && page.governance.maxAutomatedChangeRisk !== "R0") {
      errors.push(`${prefix}: unreviewed metadata must not authorize mutation`);
    }
  }

  for (const [query, owners] of normalizedQueryOwners) {
    if (!query || owners.length < 2) continue;
    const withoutException = owners.filter((page) => !page.targeting.queryOwnerException);
    if (withoutException.length > 1) {
      errors.push(
        `primary query "${query}" has multiple owners without exceptions: ${withoutException.map((page) => page.path).join(", ")}`,
      );
    }
  }

  const actualChecksum = checksum({ ...registry, checksum: undefined });
  if (registry.checksum !== actualChecksum) errors.push(`registry checksum mismatch; expected ${actualChecksum}`);
  return { errors, warnings };
}
