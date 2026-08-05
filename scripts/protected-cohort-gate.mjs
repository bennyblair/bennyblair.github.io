import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { findActiveProtectedChanges } from "./lib/protected-cohort-policy.mjs";

const repoRoot = process.cwd();
const safeRepoRoot = repoRoot.replaceAll("\\", "/");
const registry = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "data", "indexing-recovery-protected-pages.json"), "utf8"),
);
function git(args, options = {}) {
  return execFileSync("git", ["-c", `safe.directory=${safeRepoRoot}`, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    ...options,
  });
}

function changedSourceFiles() {
  const candidates = [...new Set([process.env.CONTENT_QA_BASE, "origin/main", "HEAD^"].filter(Boolean))];
  const failures = [];
  for (const base of candidates) {
    try {
      const mergeBase = git(["merge-base", String(base), "HEAD"], {
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      const tracked = git([
        "diff", "--name-only", "--diff-filter=AM", mergeBase, "--", "src/content", "src/pages",
      ]).split(/\r?\n/);
      const untracked = git([
        "ls-files", "--others", "--exclude-standard", "--", "src/content", "src/pages",
      ]).split(/\r?\n/);
      return [...new Set([...tracked, ...untracked].filter(Boolean))];
    } catch (error) {
      failures.push(`${base}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  throw new Error(`Protected-cohort gate could not establish a Git comparison base. ${failures.join(" | ")}`);
}

const changes = changedSourceFiles().map((relativePath) => ({
  relativePath,
  source: fs.readFileSync(path.join(repoRoot, relativePath), "utf8"),
}));
const violations = findActiveProtectedChanges(changes, registry);

if (violations.length) {
  for (const violation of violations) {
    console.error(
      `ERROR ${violation.relativePath}: ${violation.route} is in the active indexing-recovery cohort until ${violation.reviewAfter}.`,
    );
  }
  console.error("Protected indexing-recovery pages must remain unchanged until their scheduled evidence review.");
  process.exit(1);
}

console.log(
  `Protected-cohort gate passed (${registry.remediations.length} remediations; ${changes.length} changed route source files checked).`,
);
