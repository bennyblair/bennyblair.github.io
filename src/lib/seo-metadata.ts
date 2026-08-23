const TITLE_LIMIT = 60;

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function normalizeSeoTitle(value: string): string {
  const title = collapseWhitespace(value || "");
  if (title.length <= TITLE_LIMIT) return title;

  const withoutBrand = title
    .replace(/\s*\|\s*Emet Capital(?: Case Studies)?\s*$/i, "")
    .trim();

  // Never write a visual truncation marker into metadata. Search engines can
  // shorten display snippets themselves, while CI enforces authored lengths.
  return withoutBrand || title;
}

export function normalizeSeoDescription(value: string): string {
  return collapseWhitespace(value || "");
}
