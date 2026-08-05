import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";
import {
  findIntentOverlaps,
  isLocationVariant,
  normalizePhrase,
  resolveDesignatedService,
} from "./lib/seo-policy.mjs";
import { isInternalLinkOnlyChange } from "./lib/content-change-policy.mjs";

const repoRoot = process.cwd();
const contentRoot = path.join(repoRoot, "src", "content");
const claimsPath = path.join(contentRoot, "claims.json");
const contentDirectories = ["guides", "case-studies", "insights"];
const safeRepoRoot = repoRoot.replaceAll("\\", "/");
const highRiskPattern =
  /\b(?:guaranteed approval|guaranteed settlement|best lender|top lender|current (?:interest )?rates?|legal advice|tax advice)\b|\b\d+(?:\.\d+)?%\s+(?:interest|rate|lvr|return)\b/i;
const timeSensitivePattern = /\b(?:current|today|this month|202[4-9]|rate|interest|regulation|tax)\b/i;

function execGit(args, options = {}) {
  return execFileSync("git", ["-c", `safe.directory=${safeRepoRoot}`, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    ...options,
  });
}

function allMarkdownFiles() {
  return contentDirectories.flatMap((directory) => {
    const fullDirectory = path.join(contentRoot, directory);
    if (!fs.existsSync(fullDirectory)) return [];
    return fs
      .readdirSync(fullDirectory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => path.join(fullDirectory, file));
  });
}

function untrackedContentFiles() {
  try {
    const output = execGit(["ls-files", "--others", "--exclude-standard", "--", "src/content"], {
      stdio: ["ignore", "pipe", "ignore"],
    });
    return output
      .split(/\r?\n/)
      .filter((file) => file.endsWith(".md"))
      .map((file) => path.resolve(repoRoot, file));
  } catch {
    return [];
  }
}

function changedContentFiles() {
  const explicitBase = process.env.CONTENT_QA_BASE;
  const candidates = [...new Set([explicitBase, "origin/main", "HEAD^"].filter(Boolean))];
  const failures = [];
  for (const base of candidates) {
    try {
      const mergeBase = execGit(["merge-base", String(base), "HEAD"], {
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      const output = execGit(["diff", "--name-only", "--diff-filter=AM", mergeBase, "--", "src/content"]);
      const materialChanges = new Set(untrackedContentFiles());
      let linkOnlyChanges = 0;

      for (const relative of output.split(/\r?\n/).filter((file) => file.endsWith(".md"))) {
        const absolute = path.resolve(repoRoot, relative);
        let previous;
        try {
          previous = execGit(["show", `${mergeBase}:${relative}`], {
            stdio: ["ignore", "pipe", "ignore"],
          });
        } catch {
          materialChanges.add(absolute);
          continue;
        }

        const current = fs.readFileSync(absolute, "utf8");
        if (isInternalLinkOnlyChange(previous, current)) linkOnlyChanges += 1;
        else materialChanges.add(absolute);
      }

      return { files: materialChanges, linkOnlyChanges, mergeBase };
    } catch (error) {
      failures.push(`${base}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  throw new Error(`Content QA could not establish a Git comparison base. ${failures.join(" | ")}`);
}

function words(value) {
  return value
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function shingles(value, size = 3) {
  const tokens = words(value);
  const result = new Set();
  for (let index = 0; index <= tokens.length - size; index += 1) {
    result.add(tokens.slice(index, index + size).join(" "));
  }
  return result;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const value of a) if (b.has(value)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
}

const files = allMarkdownFiles();
const changeSet = changedContentFiles();
const changed = changeSet.files;
const parsed = files.map((file) => {
  const raw = fs.readFileSync(file, "utf8");
  const result = matter(raw);
  return {
    file,
    data: result.data,
    body: result.content,
    shingles: shingles(result.content),
    ...result.data,
  };
});
const errors = [];
const warnings = [];

for (const article of parsed) {
  const relative = path.relative(repoRoot, article.file).replaceAll("\\", "/");
  const wordCount = words(article.body).length;
  const h2Count = (article.body.match(/^##\s+/gm) || []).length;

  if (!article.data.title) errors.push(`${relative}: missing title`);
  if (!article.data.description || String(article.data.description).length < 70) {
    errors.push(`${relative}: missing or weak description`);
  }
  if (!article.data.date) errors.push(`${relative}: missing date`);
  if (!article.data.author) errors.push(`${relative}: missing author`);
  if (wordCount < 600) errors.push(`${relative}: ${wordCount} words; minimum is 600`);
  if (h2Count < 3) errors.push(`${relative}: ${h2Count} H2 sections; minimum is 3`);

  if (!changed.has(article.file)) continue;

  const primaryQuery = article.data.primaryQuery || article.data.primary_query || asArray(article.data.keywords)[0] || article.data.title;
  const searchIntent = article.data.searchIntent || article.data.search_intent || "informational";
  const designatedService = resolveDesignatedService({ ...article.data, primaryQuery });

  if (!primaryQuery) errors.push(`${relative}: no primary query could be resolved`);
  if (!searchIntent) errors.push(`${relative}: no search intent could be resolved`);
  if (!designatedService) errors.push(`${relative}: no commercial service page could be resolved`);

  if (!article.data.primaryQuery && !article.data.primary_query) {
    warnings.push(`${relative}: primaryQuery inferred as "${primaryQuery}"; add it explicitly in the publisher`);
  }
  if (!article.data.searchIntent && !article.data.search_intent) {
    warnings.push(`${relative}: searchIntent inferred as informational; add it explicitly in the publisher`);
  }
  if (!article.data.designatedServicePage && !article.data.designated_service_page) {
    warnings.push(`${relative}: designated service inferred as ${designatedService?.path}; add it explicitly in the publisher`);
  }

  const detectedHighRisk =
    relative.includes("/case-studies/") ||
    highRiskPattern.test(`${article.data.title || ""}\n${article.data.description || ""}\n${article.body}`);
  const resolvedRisk = article.data.contentRisk || article.data.content_risk || (detectedHighRisk ? "high" : "low");
  if (detectedHighRisk && resolvedRisk !== "high") {
    errors.push(`${relative}: financial/statistical claims require contentRisk: high`);
  }

  if (resolvedRisk === "high") {
    if (asArray(article.data.sources).length === 0) errors.push(`${relative}: high-risk content requires sources`);
    if (!article.data.reviewedBy || !article.data.reviewedAt) {
      errors.push(`${relative}: high-risk content requires reviewedBy and reviewedAt`);
    }
    if (timeSensitivePattern.test(`${article.data.title || ""}\n${article.body}`) && !article.data.expiresAt) {
      errors.push(`${relative}: time-sensitive high-risk content requires expiresAt`);
    }
  }

  if (article.data.expiresAt && new Date(article.data.expiresAt).getTime() < Date.now()) {
    errors.push(`${relative}: expiresAt is in the past`);
  }
}

const newlyAdded = new Set();
try {
  const comparisonBase = changeSet.mergeBase || "origin/main";
  const output = execGit(["diff", "--name-only", "--diff-filter=A", comparisonBase, "--", "src/content"], {
    stdio: ["ignore", "pipe", "ignore"],
  });
  for (const file of output.split(/\r?\n/).filter((file) => file.endsWith(".md"))) {
    newlyAdded.add(path.resolve(repoRoot, file));
  }
} catch {
  // Similarity still runs for explicitly changed content when a merge base is unavailable.
  for (const file of changed) newlyAdded.add(file);
}
for (const file of untrackedContentFiles()) newlyAdded.add(file);

for (const article of parsed.filter((candidate) => newlyAdded.has(candidate.file))) {
  let strongest = { score: 0, file: "" };
  for (const existing of parsed) {
    if (existing.file === article.file || path.dirname(existing.file) !== path.dirname(article.file)) continue;
    const score = jaccard(article.shingles, existing.shingles);
    if (score > strongest.score) strongest = { score, file: existing.file };
  }
  const relative = path.relative(repoRoot, article.file).replaceAll("\\", "/");
  const strongestRelative = path.relative(repoRoot, strongest.file).replaceAll("\\", "/");
  if (strongest.score >= 0.75) {
    errors.push(`${relative}: ${(strongest.score * 100).toFixed(1)}% similar to ${strongestRelative}; new URL blocked`);
  } else if (strongest.score >= 0.55) {
    errors.push(
      `${relative}: ${(strongest.score * 100).toFixed(1)}% similar to ${strongestRelative}; update the stronger URL instead`,
    );
  }

  const route = article.canonical || `/resources/${article.file.includes(`${path.sep}case-studies${path.sep}`) ? "case-studies" : "guides"}/${path.basename(article.file, ".md")}`;
  if (isLocationVariant({ ...article, route })) {
    errors.push(`${relative}: new city/suburb/service-location variants are blocked by SEO policy`);
  }

  const normalizedQuery = normalizePhrase(article.primaryQuery || article.primary_query || asArray(article.keywords)[0] || article.title);
  const exactMatch = parsed.find((candidate) => {
    if (candidate.file === article.file || newlyAdded.has(candidate.file)) return false;
    const candidateQuery = normalizePhrase(candidate.primaryQuery || candidate.primary_query || asArray(candidate.keywords)[0] || candidate.title);
    return normalizedQuery && candidateQuery === normalizedQuery;
  });
  if (exactMatch) {
    errors.push(`${relative}: primary intent already belongs to ${path.relative(repoRoot, exactMatch.file).replaceAll("\\", "/")}`);
  }

  const overlap = findIntentOverlaps(
    { ...article, primaryQuery: normalizedQuery },
    parsed.filter((candidate) => !newlyAdded.has(candidate.file)),
  )[0];
  if (overlap) {
    const overlapPath = path.relative(repoRoot, overlap.candidate.file).replaceAll("\\", "/");
    errors.push(`${relative}: ${(overlap.score * 100).toFixed(1)}% intent overlap with ${overlapPath}; strengthen the existing URL instead`);
  }
}

const claims = JSON.parse(fs.readFileSync(claimsPath, "utf8"));
for (const [id, claim] of Object.entries(claims)) {
  const required = ["statement", "definition", "owner", "status"];
  for (const field of required) {
    if (!claim[field]) errors.push(`src/content/claims.json: ${id} is missing ${field}`);
  }
  if (!["verified", "legacy-retained", "expired"].includes(claim.status)) {
    errors.push(`src/content/claims.json: ${id} has invalid status ${claim.status}`);
  }
  if (claim.status === "verified" && (!claim.source || !claim.verifiedAt || !claim.expiresAt)) {
    errors.push(`src/content/claims.json: verified claim ${id} requires source, verifiedAt and expiresAt`);
  }
  if (claim.status === "legacy-retained" && !claim.riskAcceptedAt) {
    errors.push(`src/content/claims.json: legacy-retained claim ${id} requires riskAcceptedAt`);
  }
}

if (warnings.length) warnings.forEach((warning) => console.warn(`WARN ${warning}`));
if (errors.length) {
  errors.forEach((error) => console.error(`ERROR ${error}`));
  console.error(`Content quality gate failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(
  `Content quality gate passed for ${parsed.length} articles (${changed.size} material changes; ${changeSet.linkOnlyChanges} internal-link-only migrations exempted).`,
);
