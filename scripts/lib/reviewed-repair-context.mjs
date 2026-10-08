import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";
import { REPAIR_MANIFEST, REPAIR_POLICY_PATH, validateRepairManifest } from "./content-repair-policy.mjs";

// Missing legacy risk metadata may use only the exact, independently reviewed
// repair's trusted registry value. This never writes or reclassifies an article.
export function validatedLegacyRepairRisks(input) {
  const result = validateRepairManifest(input);
  if (result.errors.length) throw new Error("Invalid reviewed repair context: " + result.errors.join("; "));
  const risks = new Map();
  if (input.manifest.kind !== "substantive") return risks;
  for (const change of input.changes) {
    const before = matter(change.previous).data;
    const after = matter(change.current).data;
    // A blank or invalid authored label is not missing metadata.
    if ([before, after].some(data => Object.hasOwn(data, "contentRisk") || Object.hasOwn(data, "content_risk"))) continue;
    const registered = input.registry.pages.find(page => page.sourcePath === change.file);
    if (!["low", "medium"].includes(registered.governance.contentRisk)) continue;
    risks.set(change.file, registered.governance.contentRisk);
  }
  return risks;
}

export function loadReviewedRepairContext(repoRoot, baseRef = process.env.CONTENT_QA_BASE || "origin/main") {
  const git = args => execFileSync("git", args, { cwd: repoRoot, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const baseSha = git(["rev-parse", "--verify", baseRef + "^{commit}"]).trim();
  const changes = git(["diff", "--name-status", "--no-renames", baseSha, "HEAD"]).trim().split(/\r?\n/).filter(Boolean).map(line => {
    const [status, file] = line.split("\t");
    return { status, file };
  });
  const manifests = changes.filter(change => change.status === "A" && REPAIR_MANIFEST.test(change.file));
  if (!manifests.length) return new Map();
  if (manifests.length !== 1) throw new Error("Reviewed repair context requires exactly one added manifest");
  const readAt = (ref, file) => git(["show", ref + ":" + file]);
  // Never apply committed approval to a dirty article or manifest, or a symlink.
  for (const change of changes) {
    const filename = path.resolve(repoRoot, change.file);
    if (!filename.startsWith(path.resolve(repoRoot) + path.sep) || !fs.lstatSync(filename).isFile() || fs.lstatSync(filename).isSymbolicLink() || fs.readFileSync(filename, "utf8") !== readAt("HEAD", change.file)) {
      throw new Error("Reviewed repair context requires unchanged committed files: " + change.file);
    }
  }
  const manifest = JSON.parse(readAt("HEAD", manifests[0].file));
  if (manifests[0].file !== "data/seo-repairs/" + manifest.repairId + ".json") throw new Error("Repair context manifest filename mismatch");
  return validatedLegacyRepairRisks({
    manifest,
    policy: JSON.parse(readAt(baseSha, REPAIR_POLICY_PATH)),
    registry: JSON.parse(readAt(baseSha, "data/seo-page-registry.json")),
    protectedCohort: JSON.parse(readAt(baseSha, "data/indexing-recovery-protected-pages.json")),
    baseSha,
    changes: changes.filter(change => change.file !== manifests[0].file).map(change => ({
      ...change,
      previous: readAt(baseSha, change.file),
      current: readAt("HEAD", change.file),
    })),
  });
}

export function dataWithReviewedRepairRisk(data, relativePath, risks) {
  const risk = risks.get(relativePath);
  if (!risk || Object.hasOwn(data, "contentRisk") || Object.hasOwn(data, "content_risk")) return data;
  return { ...data, contentRisk: risk };
}
