export const ARTICLE_DATE_TIMEZONE = "Australia/Sydney";

export type ArticleDateSource = {
  date: string;
  reviewedDate?: string;
};

const sydneyDateFormat: Intl.DateTimeFormatOptions = {
  timeZone: ARTICLE_DATE_TIMEZONE,
  year: "numeric",
  month: "long",
  day: "numeric",
};

const sydneyDayFormat: Intl.DateTimeFormatOptions = {
  timeZone: ARTICLE_DATE_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

function parsedArticleDate(value: string): Date | null {
  if (!value?.trim()) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Same value currently written to JSON-LD `dateModified`. */
export function resolveArticleDateModified(article: ArticleDateSource): string {
  return article.reviewedDate || article.date;
}

export function formatArticleDate(value: string): string {
  const date = parsedArticleDate(value);
  return date ? date.toLocaleDateString("en-AU", sydneyDateFormat) : "";
}

function sydneyCalendarDay(value: string): string | null {
  const date = parsedArticleDate(value);
  return date ? new Intl.DateTimeFormat("en-CA", sydneyDayFormat).format(date) : null;
}

export function isLaterArticleDate(modified: string, published: string): boolean {
  const modifiedDay = sydneyCalendarDay(modified);
  const publishedDay = sydneyCalendarDay(published);
  return Boolean(modifiedDay && publishedDay && modifiedDay > publishedDay);
}

/** Visible update uses the JSON-LD dateModified value only when it is later than publish. */
export function getVisibleArticleUpdateDate(article: ArticleDateSource): string | null {
  const dateModified = resolveArticleDateModified(article);
  return isLaterArticleDate(dateModified, article.date) ? dateModified : null;
}

export function getArticlePublicationLabels(article: ArticleDateSource): {
  dateModified: string;
  publishedText: string;
  updatedText: string | null;
} {
  const dateModified = resolveArticleDateModified(article);
  const updatedDate = getVisibleArticleUpdateDate(article);
  return {
    dateModified,
    publishedText: `Published ${formatArticleDate(article.date)}`,
    updatedText: updatedDate ? `Updated ${formatArticleDate(updatedDate)}` : null,
  };
}
