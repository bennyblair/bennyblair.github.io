import type { ArticleSummary } from "./content";

export function normalizeGuideQuery(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** Search the directory's existing summaries without downloading article bodies. */
export function searchGuides(articles: ArticleSummary[], query: string, category = "All") {
  const normalized = normalizeGuideQuery(query);
  const terms = normalized.split(" ").filter(Boolean);
  return articles
    .filter(article => category === "All" || article.category === category)
    .map((article, index) => {
      const title = normalizeGuideQuery(article.title);
      const topic = normalizeGuideQuery(article.category);
      const text = normalizeGuideQuery([article.title, article.description, article.category, ...(article.tags || []), ...(article.keywords || [])].join(" "));
      const matches = terms.every(term => text.includes(term));
      const score = terms.length ? (title.includes(normalized) ? 20 : 0) + terms.reduce((total, term) => total + (title.includes(term) ? 4 : topic.includes(term) ? 2 : 0), 0) : 0;
      return { article, index, matches, score };
    })
    .filter(result => result.matches)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(result => result.article);
}
