import { marked } from "marked";

export function plainReleaseText(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#(?:39|x27);/gi, "'").replace(/\s+/g, " ").trim();
}

export function contentAssertionsPass(proofs, html) {
  if (!Array.isArray(proofs)) return false;
  const text = plainReleaseText(html);
  return proofs.every((proof) => {
    if (!["text-added", "text-removed", "link-added", "link-removed"].includes(proof.kind) || typeof proof.value !== "string") return false;
    const present = proof.kind.startsWith("link-")
      ? html.includes('href="' + proof.value + '"') || html.includes("href='" + proof.value + "'")
      : text.includes(plainReleaseText(marked.parse(proof.value, { async: false })));
    return proof.kind.endsWith("added") ? present : !present;
  });
}

export function deploymentProofPassed(proofs, html) {
  // Copy evidence alone requires a positive assertion. The production auditor
  // additionally requires the exact deployment marker for every release.
  return Array.isArray(proofs) && proofs.some(proof => ["text-added", "link-added"].includes(proof.kind)) && contentAssertionsPass(proofs, html);
}

export function releaseFailureExitCode({ healthyInfrastructureChecks, confirmedReleaseChecks, revisionConfirmed = false }) {
  // Even a healthy homepage and apparently changed copy cannot substitute for the exact deployed revision.
  return revisionConfirmed && healthyInfrastructureChecks >= 3 && confirmedReleaseChecks >= 3 ? 10 : 20;
}
