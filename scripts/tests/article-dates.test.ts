import assert from "node:assert/strict";
import test from "node:test";
import { RETIREABLE_AUTOMATED_REVIEWERS } from "../lib/content-repair-policy.mjs";
import { buildContentIndex } from "../lib/content-index.mjs";
import {
  articleDateTimeAttribute,
  CANONICAL_CONTENT_REPAIR_REVIEWER,
  formatArticleDate,
  getArticlePublicationLabels,
  getVisibleArticleUpdateDate,
  resolveArticleDateModified,
} from "../../src/lib/article-dates";

const CANONICAL = CANONICAL_CONTENT_REPAIR_REVIEWER;
const INDEXED_ARTICLES = Object.values(buildContentIndex()).flat();

function visibleUpdateSlugs() {
  return INDEXED_ARTICLES
    .filter((article) => getVisibleArticleUpdateDate(article))
    .map((article) => article.slug)
    .sort();
}

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

test("parses the three non-ISO prose publish dates in Sydney and emits valid ISO datetime attributes", () => {
  const proseDates = [
    { value: "07 September 2025", text: "7 September 2025", attribute: "2025-09-07T00:00:00+10:00" },
    { value: "30 September 2025", text: "30 September 2025", attribute: "2025-09-30T00:00:00+10:00" },
  ];

  for (const { value, text, attribute } of proseDates) {
    assert.equal(formatArticleDate(value), text, value);
    assert.equal(articleDateTimeAttribute(value), attribute, value);
    assert.ok(!Number.isNaN(Date.parse(attribute)), attribute);
  }

  const pages = [
    INDEXED_ARTICLES.find((item) => item.slug === "mezzanine-finance-australia-complete-guide"),
    INDEXED_ARTICLES.find((item) => item.slug === "debtor-finance-supply-chain-finance-australia"),
    INDEXED_ARTICLES.find((item) => item.slug === "construction-finance-australia-complete-guide"),
  ];
  assert.equal(pages.filter(Boolean).length, 3);
  assert.deepEqual(
    pages.map((item) => item.date),
    ["07 September 2025", "30 September 2025", "30 September 2025"],
  );
  assert.deepEqual(
    pages.map((item) => getArticlePublicationLabels(item).publishedDateTime),
    ["2025-09-07T00:00:00+10:00", "2025-09-30T00:00:00+10:00", "2025-09-30T00:00:00+10:00"],
  );
  assert.deepEqual(
    pages.map((item) => getArticlePublicationLabels(item).publishedText),
    ["Published 7 September 2025", "Published 30 September 2025", "Published 30 September 2025"],
  );
});

test("shows Updated only for the canonical repair reviewer when reviewedAt is a later Sydney day", () => {
  const later = getArticlePublicationLabels({
    date: "2025-10-17",
    reviewedBy: CANONICAL,
    reviewedAt: "2026-10-13T22:06:06Z",
    reviewedDate: "2026-10-13T22:06:06Z",
  });
  assert.equal(later.dateModified, "2026-10-13T22:06:06Z");
  assert.equal(later.publishedText, "Published 17 October 2025");
  assert.equal(later.publishedDateTime, "2025-10-17");
  assert.equal(later.updatedText, "Updated 14 October 2026");
  assert.equal(later.updatedDateTime, "2026-10-13T22:06:06Z");

  assert.equal(getVisibleArticleUpdateDate({ date: "2025-10-17" }), null);
  assert.equal(getArticlePublicationLabels({ date: "2025-10-17" }).updatedText, null);
  assert.equal(
    getArticlePublicationLabels({
      date: "2025-10-17",
      reviewedBy: CANONICAL,
      reviewedAt: "2025-10-17",
    }).updatedText,
    null,
  );
  assert.equal(
    getArticlePublicationLabels({
      date: "2025-10-17",
      reviewedBy: CANONICAL,
      reviewedAt: "2025-10-16",
    }).updatedText,
    null,
  );
  assert.equal(
    getArticlePublicationLabels({
      date: "2026-10-14T00:00:00+11:00",
      reviewedBy: CANONICAL,
      reviewedAt: "2026-10-13T22:06:06Z",
    }).updatedText,
    null,
  );
});

test("retireable audit labels never show a visible Updated line", () => {
  assert.ok(RETIREABLE_AUTOMATED_REVIEWERS.length >= 5);
  for (const reviewedBy of RETIREABLE_AUTOMATED_REVIEWERS) {
    assert.notEqual(reviewedBy, CANONICAL);
    assert.equal(
      getVisibleArticleUpdateDate({
        date: "2025-01-01",
        reviewedBy,
        reviewedAt: "2026-10-13T22:06:06Z",
        reviewedDate: "2026-10-13T22:06:06Z",
      }),
      null,
      reviewedBy,
    );
  }

  const auditPage = INDEXED_ARTICLES.find((item) => item.slug === "mezzanine-finance-australia-complete-guide");
  assert.ok(auditPage);
  assert.equal(auditPage.reviewedBy, "OpenClaw SEO source audit");
  assert.ok(RETIREABLE_AUTOMATED_REVIEWERS.includes(auditPage.reviewedBy));
  assert.equal(getVisibleArticleUpdateDate(auditPage), null);
});

test("reviewed_date backfill never shows a visible Updated line", () => {
  assert.equal(
    getVisibleArticleUpdateDate({
      date: "2025-01-01",
      reviewedDate: "2026-05-15",
    }),
    null,
  );
  assert.equal(
    getVisibleArticleUpdateDate({
      date: "2025-01-01",
      reviewedBy: CANONICAL,
      reviewedDate: "2026-05-15",
    }),
    null,
    "canonical reviewer plus reviewedDate backfill still requires reviewedAt",
  );
  assert.equal(
    getVisibleArticleUpdateDate({
      date: "2025-01-01",
      reviewedBy: "OpenClaw SEO source audit",
      reviewedAt: "2026-05-15",
      reviewedDate: "2026-05-15",
    }),
    null,
  );

  const backfillPage = INDEXED_ARTICLES.find((item) => item.slug === "construction-finance-australia-complete-guide");
  assert.ok(backfillPage);
  assert.equal(backfillPage.date, "30 September 2025");
  assert.equal(backfillPage.reviewedDate, "2026-05-15");
  assert.equal(getVisibleArticleUpdateDate(backfillPage), null);
  assert.equal(getArticlePublicationLabels(backfillPage).updatedText, null);
});

test("second-mortgage equity guide shows Updated from canonical reviewedAt", () => {
  const article = INDEXED_ARTICLES.find(
    (item) => item.slug === "second-mortgage-loan-equity-access-strategies",
  );
  assert.ok(article, "expected the second-mortgage equity guide in the content index");
  assert.equal(article.reviewedBy, CANONICAL);
  const labels = getArticlePublicationLabels(article);
  assert.equal(labels.dateModified, article.reviewedDate);
  assert.equal(labels.dateModified, "2026-10-13T22:06:06Z");
  assert.equal(labels.publishedText, "Published 17 October 2025");
  assert.equal(labels.publishedDateTime, "2025-10-17");
  assert.equal(labels.updatedText, "Updated 14 October 2026");
  assert.equal(labels.updatedDateTime, "2026-10-13T22:06:06Z");
});

test("only the repaired guides show a visible Updated line", () => {
  assert.deepEqual(visibleUpdateSlugs(), [
    "best-bridging-loan-lenders-companies-2025",
    "commercial-mortgages-vs-residential-key-differences-explained",
    "commercial-property-loan-deposits-how-much-do-you-need",
    "second-mortgage-loan-equity-access-strategies",
  ]);
});
