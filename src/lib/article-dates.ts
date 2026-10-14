export const ARTICLE_DATE_TIMEZONE = "Australia/Sydney";

/** Label written only by the body-changing content-repair path. */
export const CANONICAL_CONTENT_REPAIR_REVIEWER = "OpenClaw independent reviewer";

export type ArticleDateSource = {
  date: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewedDate?: string;
};

const MONTH_NUMBER: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

const ISO_DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
const ISO_DATETIME = /^\d{4}-\d{2}-\d{2}T/;
const PROSE_DATE = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/;

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

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

function parseCalendarDay(value: string): { year: number; month: number; day: number } | null {
  const iso = ISO_DATE_ONLY.exec(value);
  if (iso) {
    return { year: Number(iso[1]), month: Number(iso[2]), day: Number(iso[3]) };
  }

  const prose = PROSE_DATE.exec(value);
  if (!prose) return null;
  const month = MONTH_NUMBER[prose[2].toLowerCase()];
  if (!month) return null;
  const day = Number(prose[1]);
  const year = Number(prose[3]);
  if (day < 1 || day > 31) return null;
  return { year, month, day };
}

function sydneyOffsetMinutes(instant: Date): number {
  const zone = new Intl.DateTimeFormat("en-US", {
    timeZone: ARTICLE_DATE_TIMEZONE,
    timeZoneName: "shortOffset",
  })
    .formatToParts(instant)
    .find((part) => part.type === "timeZoneName")?.value ?? "";
  const match = /([+-])(\d{1,2})(?::?(\d{2}))?/.exec(zone.replace("GMT", "").replace("UTC", ""));
  if (!match) return 10 * 60;
  const sign = match[1] === "-" ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3] || 0));
}

function dateAtSydneyMidnight(year: number, month: number, day: number): Date {
  const utcGuess = Date.UTC(year, month - 1, day) - 11 * 60 * 60 * 1000;
  const offsetMinutes = sydneyOffsetMinutes(new Date(utcGuess));
  return new Date(Date.UTC(year, month - 1, day) - offsetMinutes * 60 * 1000);
}

function parsedArticleDate(value: string): Date | null {
  if (!value?.trim()) return null;
  const trimmed = value.trim();
  if (ISO_DATETIME.test(trimmed)) {
    const date = new Date(trimmed);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const parts = parseCalendarDay(trimmed);
  return parts ? dateAtSydneyMidnight(parts.year, parts.month, parts.day) : null;
}

function sydneyCalendarDay(value: string): string | null {
  const date = parsedArticleDate(value);
  return date ? new Intl.DateTimeFormat("en-CA", sydneyDayFormat).format(date) : null;
}

/** Same value currently written to JSON-LD `dateModified`. */
export function resolveArticleDateModified(article: ArticleDateSource): string {
  return article.reviewedDate || article.date;
}

export function formatArticleDate(value: string): string {
  const date = parsedArticleDate(value);
  return date ? date.toLocaleDateString("en-AU", sydneyDateFormat) : "";
}

/** Valid ISO date or datetime for a `<time dateTime>` attribute. */
export function articleDateTimeAttribute(value: string): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "";
  if (ISO_DATETIME.test(trimmed) && !Number.isNaN(Date.parse(trimmed))) return trimmed;
  if (ISO_DATE_ONLY.test(trimmed)) return trimmed;
  const parts = parseCalendarDay(trimmed);
  if (!parts) return trimmed;
  const midnight = dateAtSydneyMidnight(parts.year, parts.month, parts.day);
  const offsetMinutes = sydneyOffsetMinutes(midnight);
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absolute = Math.abs(offsetMinutes);
  const offset = `${sign}${pad2(Math.floor(absolute / 60))}:${pad2(absolute % 60)}`;
  return `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}T00:00:00${offset}`;
}

export function isLaterArticleDate(modified: string, published: string): boolean {
  const modifiedDay = sydneyCalendarDay(modified);
  const publishedDay = sydneyCalendarDay(published);
  return Boolean(modifiedDay && publishedDay && modifiedDay > publishedDay);
}

/** Visible update uses canonical repair `reviewedAt` only when later than publish. */
export function getVisibleArticleUpdateDate(article: ArticleDateSource): string | null {
  if (article.reviewedBy?.trim() !== CANONICAL_CONTENT_REPAIR_REVIEWER) return null;
  if (!article.reviewedAt?.trim()) return null;
  return isLaterArticleDate(article.reviewedAt, article.date) ? article.reviewedAt : null;
}

export function getArticlePublicationLabels(article: ArticleDateSource): {
  dateModified: string;
  publishedText: string;
  publishedDateTime: string;
  updatedText: string | null;
  updatedDateTime: string | null;
} {
  const dateModified = resolveArticleDateModified(article);
  const updatedDate = getVisibleArticleUpdateDate(article);
  return {
    dateModified,
    publishedText: `Published ${formatArticleDate(article.date)}`,
    publishedDateTime: articleDateTimeAttribute(article.date),
    updatedText: updatedDate ? `Updated ${formatArticleDate(updatedDate)}` : null,
    updatedDateTime: updatedDate ? articleDateTimeAttribute(updatedDate) : null,
  };
}
