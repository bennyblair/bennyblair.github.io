import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = process.cwd();
const roots = ["src/pages", "src/components"];
const forbidden = [
  { label: "$2B+ / $2 billion facilitated", pattern: /\$2B\+|\$2\s+billion/gi },
  { label: "unsupported leading claim", pattern: /Australia['’]s Leading Commercial Finance/gi },
  { label: "unsupported lender-count claim", pattern: /(?:access to\s+)?(?:over\s+)?50\+?\s+lenders|over\s+50\s+lenders/gi },
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
function changedPublicFiles() {
  for (const candidate of [process.env.CONTENT_QA_BASE, "origin/main", "HEAD^"].filter(Boolean)) {
    try {
      const base = git(["merge-base", candidate, "HEAD"]);
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
for (const file of changedFiles) {
  const source = fs.readFileSync(file, "utf8");
  for (const rule of forbidden) {
    rule.pattern.lastIndex = 0;
    if (rule.pattern.test(source)) errors.push(`${path.relative(repoRoot, file)}: ${rule.label}`);
  }
}

const claims = JSON.parse(fs.readFileSync(path.join(repoRoot, "src/content/claims.json"), "utf8"));
const canonical = claims["funds-facilitated-150m"];
if (!canonical || canonical.statement !== "$150M+ funds facilitated" || canonical.status !== "verified") {
  errors.push("src/content/claims.json: canonical $150M+ verified claim is missing");
}
if (!canonical?.source || !canonical?.verifiedAt || !canonical?.expiresAt) {
  errors.push("src/content/claims.json: canonical claim requires source and review-expiry metadata");
}
const visible = roots.flatMap(filesBelow).map((file) => fs.readFileSync(file, "utf8")).join("\n");
if (!visible.includes("$150M+")) errors.push("canonical $150M+ claim is not present on a public page");

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}
console.log(`Authority claim integrity passed: $150M+ is canonical and ${changedFiles.length} changed public page files introduce no unsupported company statistics.`);
