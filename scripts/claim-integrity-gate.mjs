import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { LENDER_COUNT_PATTERN, isUnchangedPreservedClaim, isVerifiedLenderClaim } from "./lib/claim-preservation.mjs";

const repoRoot = process.cwd();
const roots = ["src/pages", "src/components"];
const volumeClaimPattern =
  /\$2B\+|\$2\s*bn\+?|\b2bn\+?\b|\$2\s+billion|\b2\s+billion\b|\$1B\+|\$1\s*bn\+?|\$1\s+billion|\$150M\+\s+funds facilitated|\$500m\+\s+settled|suffix:\s*["']B\+["']/gi;
const forbidden = [
  { label: "unsupported aggregate dollar-volume claim", pattern: volumeClaimPattern },
  { label: "unsupported leading claim", pattern: /Australia['’]s Leading Commercial Finance/gi },
  { label: "unsupported lender-count claim", pattern: LENDER_COUNT_PATTERN },
  { label: "unsupported experience-duration claim", pattern: /(?:over\s+)?15\+?\s+years(?:\s+of)?\s+(?:industry\s+)?experience/gi },
  { label: "unsupported success-rate claim", pattern: /95%\s+client success rate/gi },
  { label: "unsupported deal-approval claim", pattern: /87%\s+(?:of\s+)?deals?\s+approved|Deal Success Rate[\s\S]{0,80}87/gi },
  { label: "unsupported approval-speed statistic", pattern: /(?:90%\s+within\s+48\s+hours|48HR[\s\S]{0,30}Fast Approval)/gi },
  { label: "unverified Google rating", pattern: /5(?:\.0)?\s+(?:star|Google rating)|18\s+reviews/gi },
  { label: "unsupported successful-deals count", pattern: /300\+\s+Successful Deals/gi },
];

function filesBelow(relative) {
  const absolute = path.join(repoRoot, relative);
  const files = [];
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const child = path.join(absolute, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path.relative(repoRoot, child)));
    else if (/\.(?:tsx?|jsx?)$/.test(entry.name)) files.push(child);
  }
  return files;
}

const errors = [];
const safeRepoRoot = repoRoot.replaceAll("\\", "/");
function git(args) {
  return execFileSync("git", ["-c", `safe.directory=${safeRepoRoot}`, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}
let comparisonBase;
function changedPublicFiles() {
  for (const candidate of [process.env.CONTENT_QA_BASE, "origin/main", "HEAD^"].filter(Boolean)) {
    try {
      const base = git(["merge-base", candidate, "HEAD"]);
      comparisonBase = base;
      const tracked = git(["diff", "--name-only", "--diff-filter=AM", base, "--", ...roots]).split(/\r?\n/);
      const untracked = git(["ls-files", "--others", "--exclude-standard", "--", ...roots]).split(/\r?\n/);
      return [...new Set([...tracked, ...untracked].filter(Boolean))].map((file) => path.join(repoRoot, file));
    } catch {
      // Try the next deterministic comparison base.
    }
  }
  throw new Error("claim integrity gate could not establish a Git comparison base");
}

const changedFiles = changedPublicFiles();
const claims = JSON.parse(fs.readFileSync(path.join(repoRoot, "src/content/claims.json"), "utf8"));
const preservationPolicy = JSON.parse(fs.readFileSync(path.join(repoRoot, "data/company-claim-preservation.json"), "utf8"));
const retained = [];
for (const file of changedFiles) {
  const source = fs.readFileSync(file, "utf8");
  const relativePath = path.relative(repoRoot, file).replaceAll("\\", "/");
  let previous = "";
  try { previous = git(["show", `${comparisonBase}:${relativePath}`]); } catch { /* Added files have no preserved claims. */ }
  for (const rule of forbidden) {
    rule.pattern.lastIndex = 0;
    if (rule.pattern.test(source)) {
      if (rule.label === "unsupported lender-count claim" && isVerifiedLenderClaim({ source, claims })) continue;
      if (isUnchangedPreservedClaim({ relativePath, label: rule.label, pattern: rule.pattern, previous, current: source, policy: preservationPolicy, claims })) {
        retained.push(`${relativePath}: existing unverified lender statement retained exactly under the owner's instruction`);
      } else errors.push(`${relativePath}: ${rule.label}`);
    }
  }
}

const withdrawn = claims["funds-facilitated-1b"];
if (!withdrawn || withdrawn.status !== "expired" || withdrawn.schemaAllowed !== false) {
  errors.push("src/content/claims.json: funds-facilitated volume claim must remain expired and excluded from schema");
}
const visible = roots.flatMap(filesBelow).map((file) => fs.readFileSync(file, "utf8")).join("\n");
volumeClaimPattern.lastIndex = 0;
if (volumeClaimPattern.test(visible)) {
  errors.push("unsupported aggregate dollar-volume claim is present on a public page");
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}
for (const note of retained) console.log(`RETAINED (not verified) ${note}`);
console.log(`Authority claim integrity passed: aggregate dollar-volume claims are withdrawn and ${changedFiles.length} changed public page files introduce no unsupported company statistics.`);
