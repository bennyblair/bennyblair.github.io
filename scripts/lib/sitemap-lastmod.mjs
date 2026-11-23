import fs from "node:fs";
import path from "node:path";

const COMMIT_PREFIX = "@@COMMIT@@";
const SHA_PATTERN = /^[0-9a-f]{40}$/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const BULK_PATH_PREFIXES = ["src/content/", "src/pages/"];

function asString(value) {
  return value == null ? "" : String(value);
}

function trailerTokens(trailer) {
  return asString(trailer)
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

function isBulkContentPath(file) {
  return BULK_PATH_PREFIXES.some((prefix) => file.startsWith(prefix));
}

export function gitLastmodLogArgs(policy) {
  const key = asString(policy?.trailer || "Sitemap-Lastmod");
  return [
    "log",
    `--format=${COMMIT_PREFIX}%H %cs %(trailers:key=${key},valueonly,separator=%x2C)`,
    "--name-only",
    "--no-renames",
    "--",
    "src",
  ];
}

export function loadSitemapLastmodPolicy(repoRoot) {
  const policyPath = path.join(repoRoot, "data", "sitemap-lastmod-policy.json");
  const policy = JSON.parse(fs.readFileSync(policyPath, "utf8"));
  if (policy?.version !== 1) {
    throw new Error("sitemap lastmod policy version must be 1");
  }
  if (!asString(policy.trailer)) {
    throw new Error("sitemap lastmod policy trailer is required");
  }
  if (!Number.isInteger(policy.bulkFileThreshold) || policy.bulkFileThreshold < 1) {
    throw new Error("sitemap lastmod policy bulkFileThreshold must be a positive integer");
  }
  if (!Array.isArray(policy.ignoreCommits)) {
    throw new Error("sitemap lastmod policy ignoreCommits must be an array");
  }
  return policy;
}

export function parseGitLog(logText) {
  const commits = [];
  let current = null;

  for (const rawLine of asString(logText).split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.startsWith(COMMIT_PREFIX)) {
      const match = line.match(/^@@COMMIT@@([0-9a-f]{40}) (\d{4}-\d{2}-\d{2})(?:\s+(.*))?$/i);
      current = match
        ? {
            sha: match[1].toLowerCase(),
            date: match[2],
            trailer: asString(match[3]).trim(),
            files: [],
          }
        : null;
      if (current) commits.push(current);
      continue;
    }
    if (!line || !current) continue;
    current.files.push(line.replaceAll("\\", "/"));
  }

  return commits;
}

export function shouldSkipCommit(commit, policy) {
  const ignore = new Set((policy.ignoreCommits || []).map((item) => asString(item.sha).toLowerCase()));
  const tokens = trailerTokens(commit.trailer);
  if (ignore.has(asString(commit.sha).toLowerCase())) return true;
  if (tokens.includes("skip")) return true;
  const bulkCount = (commit.files || []).filter(isBulkContentPath).length;
  const threshold = Number(policy.bulkFileThreshold);
  if (Number.isFinite(threshold) && bulkCount > threshold && !tokens.includes("material")) return true;
  return false;
}

export function computeLastModified(logText, policy) {
  const newest = new Map();
  const oldest = new Map();

  for (const commit of parseGitLog(logText)) {
    if (!SHA_PATTERN.test(commit.sha) || !DATE_PATTERN.test(commit.date)) continue;
    const skip = shouldSkipCommit(commit, policy);
    for (const file of commit.files) {
      oldest.set(file, commit.date);
      if (!skip && !newest.has(file)) newest.set(file, commit.date);
    }
  }

  const dates = new Map(newest);
  for (const [file, date] of oldest) {
    if (!dates.has(file)) dates.set(file, date);
  }
  return dates;
}
