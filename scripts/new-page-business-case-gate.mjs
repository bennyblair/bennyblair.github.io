import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { loadProposals, validateProposal } from "./lib/seo-proposal.mjs";

const repoRoot = process.cwd();
const registryPath = "data/seo-page-registry.json";
const current = JSON.parse(fs.readFileSync(path.join(repoRoot, registryPath), "utf8"));
const proposals = loadProposals(repoRoot);
const errors = [];

for (const { file, proposal } of proposals) {
  const validation = validateProposal(proposal);
  for (const error of validation.errors) errors.push(`${file}: ${error}`);
}

function git(args, options = {}) {
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8", ...options });
}

const candidates = [...new Set([process.env.CONTENT_QA_BASE, "origin/main", "HEAD^"].filter(Boolean))];
let baseRegistry;
for (const candidate of candidates) {
  try {
    const mergeBase = git(["merge-base", candidate, "HEAD"], { stdio: ["ignore", "pipe", "ignore"] }).trim();
    baseRegistry = JSON.parse(git(["show", `${mergeBase}:${registryPath}`], { stdio: ["ignore", "pipe", "ignore"] }));
    break;
  } catch {
    // Initial control-plane bootstrap intentionally has no base registry.
  }
}

if (!baseRegistry) {
  if (!current.bootstrap?.baselineCommit || !current.bootstrap?.reason) errors.push("initial registry requires bootstrap evidence");
  else console.log(`Initial registry bootstrap accepted at ${current.bootstrap.baselineCommit}.`);
} else {
  const oldPaths = new Set(baseRegistry.pages.filter((page) => page.indexability === "indexable").map((page) => page.path));
  const newPages = current.pages.filter((page) => page.indexability === "indexable" && !oldPaths.has(page.path));
  for (const page of newPages) {
    const matching = proposals.filter(({ proposal }) => proposal.pageId === page.pageId && proposal.path === page.path);
    if (matching.length !== 1) {
      errors.push(`${page.path}: requires exactly one proposal matching pageId ${page.pageId}`);
      continue;
    }
    const proposal = matching[0].proposal;
    if (proposal.status !== "approved" && proposal.status !== "built") errors.push(`${page.path}: proposal is not approved`);
    if (proposal.sourcePath !== page.sourcePath) errors.push(`${page.path}: proposal sourcePath does not match registry`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}
console.log(`New-page business-case gate passed (${proposals.length} proposal files checked).`);
