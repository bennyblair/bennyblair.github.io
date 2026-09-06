import assert from "node:assert/strict";
import test from "node:test";
import { normalizeGuideQuery, searchGuides } from "../../src/lib/guide-search";
import type { ArticleSummary } from "../../src/lib/content";

const article = (slug: string, title: string, description: string, category: string, tags: string[] = []): ArticleSummary => ({slug, title, description, category, tags, contentType:"guides", route:`/resources/guides/${slug}`, date:"2026-09-01", author:"Ben", readingTime:5, contentRisk:"low"});
const guides = [article("equipment", "Equipment finance", "Finance for a growing business", "Business Finance", ["machinery"]), article("bridging", "Bridging finance in Sydney", "Property-backed lending for settlements", "Bridging Finance"), article("property", "Property-backed finance", "Comparing bridging finance in Sydney", "Property Finance")];

test("blank or punctuation-only searches retain the directory order", () => {
  assert.deepEqual(searchGuides(guides, "  — "), guides);
  assert.equal(normalizeGuideQuery("  PROPERTY–BACKED  "), "property backed");
});
test("multi-word searches match across fields and ignore case, punctuation and word order", () => {
  assert.deepEqual(searchGuides(guides,"SYDNEY bridging").map(a=>a.slug),["bridging","property"]);
  assert.equal(searchGuides(guides,"property-backed").length,2);
  assert.equal(searchGuides(guides,"machinery")[0].slug,"equipment");
});
test("topic selection intersects search, and clear restores the selected topic", () => {
  assert.deepEqual(searchGuides(guides,"Sydney","Property Finance").map(a=>a.slug),["property"]);
  assert.deepEqual(searchGuides(guides,"","Business Finance").map(a=>a.slug),["equipment"]);
  assert.deepEqual(searchGuides(guides,"machinery","Property Finance"),[]);
});
test("exact title matches precede description-only matches without mutating source order", () => {
  const before=guides.map(a=>a.slug);
  assert.deepEqual(searchGuides([...guides].reverse(),"bridging finance").map(a=>a.slug),["bridging","property"]);
  assert.deepEqual(guides.map(a=>a.slug),before);
});
