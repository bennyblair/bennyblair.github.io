import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { purposeForServicePath } from "../../src/lib/transactions";

const repoRoot = process.cwd();
const srcRoot = path.join(repoRoot, "src");

function walkSource(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkSource(full));
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) files.push(full);
  }
  return files;
}

test("purposeForServicePath maps the five money service paths", () => {
  assert.equal(purposeForServicePath("/services/commercial-property-finance"), "purchase");
  assert.equal(purposeForServicePath("/services/refinancing-solutions"), "refinance");
  assert.equal(purposeForServicePath("/services/bridging-finance"), "bridge");
  assert.equal(purposeForServicePath("/services/first-second-mortgages"), "equity_release");
  assert.equal(purposeForServicePath("/services/private-lending"), "private_lending");
  assert.equal(purposeForServicePath("/services/working-capital"), undefined);
});

test("EnquiryCta source pins phone and email and does not hardcode analytics events", () => {
  const source = fs.readFileSync(path.join(srcRoot, "components/EnquiryCta.tsx"), "utf8");
  assert.match(source, /tel:\+61485952651/);
  assert.match(source, /mailto:enquiry@emetcapital\.com\.au/);
  assert.doesNotMatch(source, /data-analytics-event="/);
});

test("literal analytics events stay on the existing allowlist", () => {
  const allowed = new Set([
    "header_enquiry_cta",
    "property_pillar_enquiry",
    "service_enquiry",
    "transaction_journey_select",
  ]);
  const found = new Set<string>();
  const enquireEvents = new Set<string>();
  for (const file of walkSource(srcRoot)) {
    const source = fs.readFileSync(file, "utf8");
    for (const match of source.matchAll(/data-analytics-event="([^"]+)"/g)) found.add(match[1]);
    if (file.endsWith(`${path.sep}EnquiryCta.tsx`)) continue;
    for (const match of source.matchAll(/enquireEvent=\{?["']([^"']+)["']\}?/g)) enquireEvents.add(match[1]);
  }
  assert.deepEqual(found, allowed);
  for (const value of enquireEvents) {
    assert.ok(value === "service_enquiry" || value === "property_pillar_enquiry", value);
  }
});
