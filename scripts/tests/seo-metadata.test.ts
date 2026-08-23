import assert from "node:assert/strict";
import test from "node:test";
import { normalizeSeoDescription, normalizeSeoTitle } from "../../src/lib/seo-metadata";

test("keeps deliberately authored metadata intact", () => {
  const title = "Merchant Cash Advance Alternatives Australia | Emet Capital";
  const description =
    "Compare merchant cash advance alternatives for Australian businesses, including invoice finance, trade finance, lines of credit and secured working capital.";

  assert.equal(normalizeSeoTitle(title), title);
  assert.equal(normalizeSeoDescription(description), description);
});

test("removes a brand suffix when a generated title exceeds the preferred length", () => {
  assert.equal(
    normalizeSeoTitle("Merchant Cash Advance Alternatives for Australian Businesses | Emet Capital"),
    "Merchant Cash Advance Alternatives for Australian Businesses",
  );
});

test("never persists a truncation ellipsis into long metadata", () => {
  const longDescription = `${"Detailed commercial finance information ".repeat(6)}for Australian business owners.`;
  const normalized = normalizeSeoDescription(longDescription);

  assert.equal(normalized.endsWith("..."), false);
  assert.equal(normalized.endsWith("…"), false);
  assert.match(normalized, /Australian business owners\.$/);
});
