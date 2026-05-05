const TITLE_LIMIT = 56;
const DESCRIPTION_LIMIT = 150;

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function trimAtWord(value: string, limit: number): string {
  const normalized = collapseWhitespace(value);
  if (normalized.length <= limit) return normalized;

  const truncated = normalized.slice(0, Math.max(0, limit - 3));
  const lastSpace = truncated.lastIndexOf(" ");
  const safe = lastSpace > 35 ? truncated.slice(0, lastSpace) : truncated;
  return `${safe.trim()}...`;
}

export function normalizeSeoTitle(value: string): string {
  const title = collapseWhitespace(value || "");
  if (title.length <= TITLE_LIMIT) return title;

  const withoutBrand = title
    .replace(/\s*\|\s*Emet Capital(?: Case Studies)?\s*$/i, "")
    .trim();

  if (withoutBrand && withoutBrand.length <= TITLE_LIMIT) return withoutBrand;
  return trimAtWord(withoutBrand || title, TITLE_LIMIT);
}

export function normalizeSeoDescription(value: string): string {
  return trimAtWord(value || "", DESCRIPTION_LIMIT);
}
