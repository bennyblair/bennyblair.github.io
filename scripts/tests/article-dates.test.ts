import assert from "node:assert/strict";
import test from "node:test";
import { buildContentIndex } from "../lib/content-index.mjs";
import {
  formatArticleDate,
  getArticlePublicationLabels,
  getVisibleArticleUpdateDate,
  resolveArticleDateModified,
} from "../../src/lib/article-dates";

test("JSON-LD dateModified is reviewedDate when present, otherwise the publish date", () => {
  assert.equal(
    resolveArticleDateModified({ date: "2025-10-17", reviewedDate: "2026-10-13T22:06:06Z" }),
    "2026-10-13T22:06:06Z",
  );
  assert.equal(resolveArticleDateModified({ date: "2025-10-17" }), "2025-10-17");
  assert.equal(resolveArticleDateModified({ date: "2025-10-17", reviewedDate: "" }), "2025-10-17");
});

test("formats article dates in Australia/Sydney as D Month YYYY", () => {
  assert.equal(formatArticleDate("2025-10-17"), "17 October 2025");
  assert.equal(formatArticleDate("2026-10-13T22:06:06Z"), "14 October 2026");
  assert.equal(formatArticleDate("2026-01-15T22:00:00Z"), "16 January 2026");
});

test("shows Updated only when dateModified is a later Sydney calendar day than publish", () => {
  const later = getArticlePublicationLabels({
    date: "2025-10-17",
    reviewedDate: "2026-10-13T22:06:06Z",
  });
  assert.equal(later.dateModified, "2026-10-13T22:06:06Z");
  assert.equal(later.publishedText, "Published 17 October 2025");
  assert.equal(later.updatedText, "Updated 14 October 2026");

  assert.equal(getVisibleArticleUpdateDate({ date: "2025-10-17" }), null);
  assert.equal(getArticlePublicationLabels({ date: "2025-10-17" }).updatedText, null);
  assert.equal(
    getArticlePublicationLabels({ date: "2025-10-17", reviewedDate: "2025-10-17" }).updatedText,
    null,
  );
  assert.equal(
    getArticlePublicationLabels({ date: "2025-10-17", reviewedDate: "2025-10-16" }).updatedText,
    null,
  );
  assert.equal(
    getArticlePublicationLabels({
      date: "2026-10-14T00:00:00+11:00",
      reviewedDate: "2026-10-13T22:06:06Z",
    }).updatedText,
    null,
  );
});

test("second-mortgage equity guide visible Updated matches JSON-LD dateModified", () => {
  const article = buildContentIndex().guides.find(
    (item) => item.slug === "second-mortgage-loan-equity-access-strategies",
  );
  assert.ok(article, "expected the second-mortgage equity guide in the content index");
  const labels = getArticlePublicationLabels(article);
  assert.equal(labels.dateModified, article.reviewedDate);
  assert.equal(labels.dateModified, "2026-10-13T22:06:06Z");
  assert.equal(labels.publishedText, "Published 17 October 2025");
  assert.equal(labels.updatedText, "Updated 14 October 2026");
});
