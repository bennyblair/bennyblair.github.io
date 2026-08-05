import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const workOrder = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data", "authority-outreach-work-order.json"), "utf8"),
);

test("authority work order is deduplicated, source-backed and cannot authorise sending", () => {
  assert.equal(workOrder.mode, "draft_only");
  assert.equal(workOrder.sendAuthorized, false);
  assert.equal(workOrder.humanApprovalRequired, true);
  assert.equal(workOrder.prospects.length, 5);

  const domains = workOrder.prospects.map((item: { domain: string }) => item.domain);
  assert.equal(new Set(domains).size, domains.length);

  for (const prospect of workOrder.prospects) {
    const sourceHost = new URL(prospect.sourceUrl).hostname.replace(/^www\./, "");
    assert.equal(sourceHost, prospect.domain);
    assert.match(prospect.status, /^(researched_draft_only|research_hold)$/);
    assert.ok(prospect.fitEvidence.length >= 80);
    assert.ok(prospect.contribution.length >= 60);
    assert.ok(prospect.draftBody.length >= 180);
    assert.ok(prospect.emetAssetPaths.every((value: string) => value.startsWith("/")));
  }
});
