import { execFileSync } from "node:child_process";
import { REPAIR_MANIFEST, REPAIR_POLICY_PATH, validateRepairManifest } from "./lib/content-repair-policy.mjs";

const git = (args) => execFileSync("git", args, { encoding: "utf8" });
const base = git(["rev-parse", process.env.CONTENT_QA_BASE || "origin/main"]).trim();
const head = process.env.CONTENT_REPAIR_HEAD || "HEAD";
const changes = git(["diff", "--name-status", "--no-renames", base, head]).trim().split(/\r?\n/).filter(Boolean).map((line) => {
  const [status, file] = line.split("\t");
  return { status, file };
});
const manifests = changes.filter(({ file, status }) => REPAIR_MANIFEST.test(file) && status === "A");
if (manifests.length !== 1) throw new Error("Repair release requires exactly one added manifest");
const readAt = (ref, file) => git(["show", ref + ":" + file]);
const manifest = JSON.parse(readAt(head, manifests[0].file));
if (manifests[0].file !== "data/seo-repairs/" + manifest.repairId + ".json") throw new Error("Repair manifest filename must match identity");
const content = changes.filter((change) => change.file !== manifests[0].file).map((change) => ({
  ...change,
  previous: change.status === "A" ? "" : readAt(base, change.file),
  current: change.status === "D" ? "" : readAt(head, change.file),
}));
const result = validateRepairManifest({
  manifest,
  policy: JSON.parse(readAt(base, REPAIR_POLICY_PATH)),
  registry: JSON.parse(readAt(base, "data/seo-page-registry.json")),
  protectedCohort: JSON.parse(readAt(base, "data/indexing-recovery-protected-pages.json")),
  changes: content,
  baseSha: base,
});
if (result.errors.length) {
  for (const error of result.errors) console.error("ERROR " + error);
  process.exit(1);
}
console.log(JSON.stringify({ status: "passed", baseSha: base, headSha: git(["rev-parse", head]).trim(), repairId: manifest.repairId, pages: result.pages }, null, 2));
