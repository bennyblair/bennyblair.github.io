import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { canonicalJson } from "./lib/seo-control-plane.mjs";
import { loadAutomationPolicy, validateAutomationPolicy, validateProposal } from "./lib/seo-proposal.mjs";

const repoRoot = process.cwd();
const safeRepoRoot = repoRoot.replaceAll("\\", "/");
const baseRef = process.env.CONTENT_QA_BASE || "origin/main";

function git(args) {
  return execFileSync("git", ["-c", `safe.directory=${safeRepoRoot}`, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
  }).trim();
}

function readAt(ref, file) {
  return JSON.parse(git(["show", `${ref}:${file}`]));
}

const mergeBase = git(["merge-base", baseRef, "HEAD"]);
const changed = git(["diff", "--name-status", mergeBase, "HEAD"])
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => {
    const [status, ...parts] = line.split("\t");
    return { status: status[0], file: parts.at(-1) };
  });

const articles = changed.filter(({ status, file }) =>
  status === "A" && /^src\/content\/(?:guides|case-studies|insights)\/[^/]+\.md$/.test(file));
const proposals = changed.filter(({ status, file }) =>
  status === "A" && /^data\/seo-proposals\/prop_[a-f0-9]{32}\.json$/.test(file));
const expectedFixed = new Map([
  ["data/seo-page-registry.json", "M"],
  ["data/seo-programs/index.json", "M"],
]);
const allowed = new Set([...articles.map((item) => item.file), ...proposals.map((item) => item.file), ...expectedFixed.keys()]);
const errors = [];

if (articles.length !== 2) errors.push(`expected exactly two added articles; found ${articles.length}`);
if (proposals.length !== 2) errors.push(`expected exactly two added proposals; found ${proposals.length}`);
for (const item of changed) {
  if (!allowed.has(item.file)) errors.push(`unexpected automated content path: ${item.status} ${item.file}`);
  if (expectedFixed.has(item.file) && item.status !== expectedFixed.get(item.file)) {
    errors.push(`${item.file} must be modified, not ${item.status}`);
  }
}
for (const [file] of expectedFixed) {
  if (!changed.some((item) => item.file === file)) errors.push(`required generated file is missing: ${file}`);
}

const policy = loadAutomationPolicy(repoRoot);
errors.push(...validateAutomationPolicy(policy).errors);
const proposalRows = proposals.map(({ file }) => ({ file, proposal: JSON.parse(fs.readFileSync(path.join(repoRoot, file), "utf8")) }));
for (const { file, proposal } of proposalRows) {
  for (const error of validateProposal(proposal, { automationPolicy: policy }).errors) errors.push(`${file}: ${error}`);
  if (proposal.risk !== "R2") errors.push(`${file}: automated new content must be R2`);
  if (proposal.status !== "approved") errors.push(`${file}: automated new content must be approved`);
}

const oldRegistry = readAt(mergeBase, "data/seo-page-registry.json");
const newRegistry = JSON.parse(fs.readFileSync(path.join(repoRoot, "data/seo-page-registry.json"), "utf8"));
const oldIds = new Set(oldRegistry.pages.map((page) => page.pageId));
const addedPages = newRegistry.pages.filter((page) => !oldIds.has(page.pageId));
if (addedPages.length !== 2) errors.push(`registry must add exactly two pages; found ${addedPages.length}`);
const oldComparable = { ...oldRegistry, generatedAt: undefined, checksum: undefined };
const newComparable = {
  ...newRegistry,
  generatedAt: undefined,
  checksum: undefined,
  pages: newRegistry.pages.filter((page) => oldIds.has(page.pageId)),
};
if (canonicalJson(oldComparable) !== canonicalJson(newComparable)) errors.push("automated content may not mutate existing registry pages");

const articlePaths = new Set(articles.map((item) => item.file));
for (const page of addedPages) {
  if (!articlePaths.has(page.sourcePath)) errors.push(`${page.path}: registry sourcePath is not one of the two new articles`);
  const matches = proposalRows.filter(({ proposal }) => proposal.pageId === page.pageId && proposal.path === page.path);
  if (matches.length !== 1) errors.push(`${page.path}: expected one matching automated proposal`);
}

const oldPrograms = readAt(mergeBase, "data/seo-programs/index.json");
const newPrograms = JSON.parse(fs.readFileSync(path.join(repoRoot, "data/seo-programs/index.json"), "utf8"));
if (canonicalJson({ ...oldPrograms, generatedAt: undefined }) !== canonicalJson({ ...newPrograms, generatedAt: undefined })) {
  errors.push("automated content may only refresh data/seo-programs/index.json generatedAt");
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}
console.log("Automated content scope passed: exactly two R2 pages, two truthful policy approvals, and deterministic generated metadata.");
