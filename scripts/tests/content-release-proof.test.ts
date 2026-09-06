import assert from "node:assert/strict";
import test from "node:test";
import { revisionIsDeployed, siteRevisionManifest } from "../lib/site-revision.mjs";
import { contentAssertionsPass, deploymentProofPassed, releaseFailureExitCode } from "../lib/content-release-proof.mjs";

test("repair deployment proof checks changed visible copy and exact link destinations", () => {
  const proofs = [
    { kind: "text-added", value: "Practical Summary" },
    { kind: "text-removed", value: "LLM-Ready Summary" },
    { kind: "link-added", value: "/services/caveat-loans" },
    { kind: "link-removed", value: "/services/old-route" },
  ];
  assert.equal(deploymentProofPassed(proofs, '<main><h2>Practical Summary</h2><a href="/services/caveat-loans">Service</a></main>'), true);
  assert.equal(deploymentProofPassed(proofs, '<h2>LLM-Ready Summary</h2><a href="/services/old-route">Service</a>'), false);
  assert.equal(deploymentProofPassed([{ kind: "text-added", value: "Practical Summary" }], '<script>Practical Summary</script>'), false);
});

test("unconfirmed deployment is indeterminate and cannot authorize automatic rollback", () => {
  assert.equal(releaseFailureExitCode({ healthyInfrastructureChecks: 8, confirmedReleaseChecks: 0 }), 20);
  assert.equal(releaseFailureExitCode({ healthyInfrastructureChecks: 2, confirmedReleaseChecks: 2 }), 20);
  assert.equal(releaseFailureExitCode({ healthyInfrastructureChecks: 3, confirmedReleaseChecks: 3, revisionConfirmed: true }), 10);
});


test("empty or removal-only assertions do not prove a deployment and Markdown uses rendered semantics", () => {
  assert.equal(deploymentProofPassed([], "<h1>Old page</h1>"), false);
  assert.equal(deploymentProofPassed([{ kind: "text-removed", value: "## LLM-Ready Summary" }], "<h2>LLM-Ready Summary</h2>"), false);
  assert.equal(contentAssertionsPass([{ kind: "text-removed", value: "## LLM-Ready Summary" }], "<h2>LLM-Ready Summary</h2>"), false);
  assert.equal(deploymentProofPassed([{ kind: "text-added", value: "## Practical Summary" }], "<h2>Practical Summary</h2>"), true);
});

test("deployment marker requires the exact expected full revision; old404 or unavailable deploy cannot trigger rollback", () => {
  const expectedRevision = "a".repeat(40);
  assert.deepEqual(siteRevisionManifest(expectedRevision), { schemaVersion: 1, revision: expectedRevision });
  assert.throws(() => siteRevisionManifest("unknown"), /full Git revision/);
  const good = JSON.stringify(siteRevisionManifest(expectedRevision));
  assert.equal(revisionIsDeployed({ expectedRevision, status: 200, body: good }), true);
  for (const candidate of [
    { status: 404, body: good },
    { status: 200, body: JSON.stringify(siteRevisionManifest("b".repeat(40))) },
    { status: 200, body: "<html>Old site fallback</html>" },
    { status: 0, body: "" },
  ]) {
    const revisionConfirmed = revisionIsDeployed({ expectedRevision, ...candidate });
    assert.equal(revisionConfirmed, false);
    assert.equal(releaseFailureExitCode({ healthyInfrastructureChecks: 8, confirmedReleaseChecks: 8, revisionConfirmed }), 20);
  }
  assert.equal(releaseFailureExitCode({ healthyInfrastructureChecks: 8, confirmedReleaseChecks: 8, revisionConfirmed: false }), 20);
});
