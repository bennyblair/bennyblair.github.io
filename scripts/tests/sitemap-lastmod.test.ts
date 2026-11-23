import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { computeLastModified } from "../lib/sitemap-lastmod.mjs";

const IGNORE_SHA = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const SKIP_SHA = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
const BULK_SHA = "cccccccccccccccccccccccccccccccccccccccc";
const MATERIAL_SHA = "dddddddddddddddddddddddddddddddddddddddd";
const NORMAL_SHA = "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const OLD_SHA = "ffffffffffffffffffffffffffffffffffffffff";
const CREATION_SHA = "1111111111111111111111111111111111111111";

const policy = {
  version: 1,
  description: "test policy",
  ignoreCommits: [{ sha: IGNORE_SHA, reason: "mechanical wording sweep" }],
  trailer: "Sitemap-Lastmod",
  bulkFileThreshold: 25,
};

function commitBlock({ sha, date, trailer = "", files }: { sha: string; date: string; trailer?: string; files: string[] }) {
  const header = trailer ? `@@COMMIT@@${sha} ${date} ${trailer}` : `@@COMMIT@@${sha} ${date} `;
  return [header, "", ...files, ""].join("\n");
}

function bulkFiles(count: number, prefix = "src/content/guides") {
  return Array.from({ length: count }, (_, index) => `${prefix}/page-${String(index).padStart(3, "0")}.md`);
}

test("a file edited by an ignored SHA keeps its previous date", () => {
  const logText = [
    commitBlock({ sha: IGNORE_SHA, date: "2026-11-18", files: ["src/content/guides/example.md"] }),
    commitBlock({ sha: OLD_SHA, date: "2026-03-02", files: ["src/content/guides/example.md"] }),
  ].join("\n");

  const dates = computeLastModified(logText, policy);
  assert.equal(dates.get("src/content/guides/example.md"), "2026-03-02");
});

test("Sitemap-Lastmod: skip keeps the previous date", () => {
  const logText = [
    commitBlock({
      sha: SKIP_SHA,
      date: "2026-11-20",
      trailer: "skip",
      files: ["src/content/guides/example.md"],
    }),
    commitBlock({ sha: OLD_SHA, date: "2026-04-10", files: ["src/content/guides/example.md"] }),
  ].join("\n");

  const dates = computeLastModified(logText, policy);
  assert.equal(dates.get("src/content/guides/example.md"), "2026-04-10");
});

test("a 30-file commit with no trailer is skipped, and the same commit with Sitemap-Lastmod: material counts", () => {
  const files = bulkFiles(30);
  const skippedLog = [
    commitBlock({ sha: BULK_SHA, date: "2026-11-18", files }),
    commitBlock({ sha: OLD_SHA, date: "2026-01-15", files: [files[0]] }),
  ].join("\n");
  const materialLog = [
    commitBlock({ sha: MATERIAL_SHA, date: "2026-11-18", trailer: "material", files }),
    commitBlock({ sha: OLD_SHA, date: "2026-01-15", files: [files[0]] }),
  ].join("\n");

  assert.equal(computeLastModified(skippedLog, policy).get(files[0]), "2026-01-15");
  assert.equal(computeLastModified(materialLog, policy).get(files[0]), "2026-11-18");
});

test("a file with only skipped commits gets its oldest commit date", () => {
  const files = bulkFiles(30);
  const target = "src/content/guides/only-sweeps.md";
  const logText = [
    commitBlock({ sha: IGNORE_SHA, date: "2026-11-18", files: [target] }),
    commitBlock({ sha: SKIP_SHA, date: "2026-10-01", trailer: "skip", files: [target] }),
    commitBlock({ sha: BULK_SHA, date: "2026-03-01", files: [...files.slice(0, 29), target] }),
  ].join("\n");

  const dates = computeLastModified(logText, policy);
  assert.equal(dates.get(target), "2026-03-01");
});

test("a normal single-file commit updates the date", () => {
  const logText = [
    commitBlock({ sha: NORMAL_SHA, date: "2026-09-15", files: ["src/content/guides/example.md"] }),
    commitBlock({ sha: CREATION_SHA, date: "2025-09-17", files: ["src/content/guides/example.md"] }),
  ].join("\n");

  const dates = computeLastModified(logText, policy);
  assert.equal(dates.get("src/content/guides/example.md"), "2026-09-15");
});

test("every ignoreCommits SHA is 40 hex characters and has a reason", () => {
  const onDisk = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data", "sitemap-lastmod-policy.json"), "utf8"),
  ) as {
    ignoreCommits: Array<{ sha?: string; reason?: string }>;
  };

  assert.ok(Array.isArray(onDisk.ignoreCommits));
  assert.ok(onDisk.ignoreCommits.length > 0);
  for (const item of onDisk.ignoreCommits) {
    assert.match(String(item.sha || ""), /^[0-9a-f]{40}$/);
    assert.equal(String(item.reason || "").trim().length > 0, true, `${item.sha} is missing a reason`);
  }
});
