import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { classifyFileChange, highestRisk, riskRank } from "./lib/seo-control-plane.mjs";

const repoRoot = process.cwd();
const safeRepoRoot = repoRoot.replaceAll("\\", "/");
function git(args, options = {}) {
  return execFileSync("git", ["-c", `safe.directory=${safeRepoRoot}`, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    ...options,
  });
}

const candidates = [...new Set([process.env.CONTENT_QA_BASE, "origin/main", "HEAD^"].filter(Boolean))];
let mergeBase;
for (const candidate of candidates) {
  try {
    mergeBase = git(["merge-base", candidate, "HEAD"], { stdio: ["ignore", "pipe", "ignore"] }).trim();
    break;
  } catch {
    // Try the next safe comparison base.
  }
}
if (!mergeBase) throw new Error("SEO risk classifier could not establish a Git comparison base.");

const changed = git(["diff", "--name-status", mergeBase, "HEAD"]).trim().split(/\r?\n/).filter(Boolean);
const untracked = git(["ls-files", "--others", "--exclude-standard"]).trim().split(/\r?\n/).filter(Boolean);
for (const file of untracked) changed.push(`A\t${file}`);

let branchName = process.env.GITHUB_HEAD_REF || "";
if (!branchName) {
  try { branchName = git(["branch", "--show-current"]).trim(); } catch {}
}
const governedDailyContent = branchName.startsWith("ai/daily-content-");
const governedGeneratedFiles = new Set([
  "data/seo-page-registry.json",
  "data/seo-programs/index.json",
]);

const results = changed.map((line) => {
  const [rawStatus, ...parts] = line.split("\t");
  const relativePath = parts.at(-1);
  const status = rawStatus[0];
  let previous = "";
  let current = "";
  if (status !== "A") {
    try { previous = git(["show", `${mergeBase}:${relativePath}`], { stdio: ["ignore", "pipe", "ignore"] }); } catch {}
  }
  if (status !== "D" && fs.existsSync(path.join(repoRoot, relativePath))) {
    current = fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
  }
  const classification = classifyFileChange({ relativePath, status, previous, current });
  if (governedDailyContent && governedGeneratedFiles.has(relativePath)) {
    return {
      relativePath,
      status,
      risk: "R2",
      reason: "generated metadata in a governed daily-content branch; exact scope gate is required",
    };
  }
  return { relativePath, status, ...classification };
});

const risk = highestRisk(results);
for (const result of results) console.log(`${result.risk} ${result.status} ${result.relativePath}: ${result.reason}`);
console.log(`Computed SEO change risk: ${risk}`);

if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `risk=${risk}\n`);
const allowed = process.env.SEO_MAX_ALLOWED_RISK;
if (allowed && riskRank(risk) > riskRank(allowed)) {
  console.error(`Computed ${risk} exceeds authorized ${allowed}.`);
  process.exit(1);
}
