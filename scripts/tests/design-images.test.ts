import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { buildContentIndex } from "../lib/content-index.mjs";

test("every local article image and responsive thumbnail resolves to an asset", () => {
  const index = buildContentIndex(process.cwd());
  const missing: string[] = [];
  for (const article of Object.values(index).flat()) {
    for (const image of [article.featuredImage, article.featuredImageThumbnail]) {
      if (image?.startsWith("/") && !fs.existsSync(path.join(process.cwd(), "public", image))) missing.push(`${article.route}: ${image}`);
    }
  }
  assert.deepEqual(missing, []);
});
