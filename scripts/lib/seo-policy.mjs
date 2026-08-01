import fs from "node:fs";
import path from "node:path";

const policyPath = path.join(process.cwd(), "data", "seo-topic-policy.json");
export const seoTopicPolicy = JSON.parse(fs.readFileSync(policyPath, "utf8"));

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "australia",
  "australian",
  "complete",
  "explained",
  "for",
  "from",
  "guide",
  "how",
  "in",
  "is",
  "of",
  "the",
  "to",
  "what",
  "when",
  "with",
]);

function singularize(token) {
  if (token.endsWith("ies") && token.length > 4) return `${token.slice(0, -3)}y`;
  if (token.endsWith("s") && !token.endsWith("ss") && token.length > 4) return token.slice(0, -1);
  return token;
}

export function normalizePhrase(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeForMatch(value) {
  return normalizePhrase(value).split(" ").map(singularize).join(" ");
}

export function intentTokens(value) {
  return new Set(
    normalizePhrase(value)
      .split(" ")
      .map(singularize)
      .filter((token) => token.length > 2 && !stopWords.has(token)),
  );
}

export function tokenSimilarity(a, b) {
  const left = intentTokens(a);
  const right = intentTokens(b);
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const token of left) if (right.has(token)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

function articleText(article) {
  const values = [
    article.primaryQuery,
    article.primary_query,
    article.title,
    article.category,
    article.pillar,
    ...(Array.isArray(article.tags) ? article.tags : []),
    ...(Array.isArray(article.keywords) ? article.keywords : []),
  ];
  return normalizeForMatch(values.filter(Boolean).join(" "));
}

export function resolveDesignatedService(article) {
  const explicit = article.designatedServicePage || article.designated_service_page;
  if (explicit) {
    const cluster = seoTopicPolicy.serviceClusters.find((item) => item.path === explicit);
    if (cluster) return cluster;
  }

  const focus = ` ${normalizeForMatch([article.primaryQuery, article.primary_query, article.title].filter(Boolean).join(" "))} `;
  const haystack = ` ${articleText(article)} `;
  let best = null;
  for (const cluster of seoTopicPolicy.serviceClusters) {
    let score = 0;
    for (const term of cluster.terms) {
      const normalized = normalizeForMatch(term);
      if (!normalized) continue;
      if (focus.includes(` ${normalized} `)) score += 100;
      if (haystack.includes(` ${normalized} `)) score += normalized.split(" ").length * 10 + normalized.length;
    }
    if (!best || score > best.score) best = { cluster, score };
  }

  return best?.score > 0
    ? best.cluster
    : seoTopicPolicy.serviceClusters.find((item) => item.id === "business-finance");
}

export function isLocationVariant(article) {
  const route = normalizePhrase(article.route || article.canonical || article.post_url || article.url);
  const titleAndQuery = normalizePhrase(
    [article.title, article.primaryQuery, article.primary_query, article.target_keyword].filter(Boolean).join(" "),
  );
  const nestedServiceRoute = /^services\s+[^\s]+\s+(?:cities\s+)?[^\s]+$/.test(route);
  const hasLocation = seoTopicPolicy.locationTerms.some((term) =>
    ` ${titleAndQuery} `.includes(` ${normalizePhrase(term)} `),
  );
  const hasFinanceIntent = Boolean(resolveDesignatedService(article));
  return nestedServiceRoute || (hasLocation && hasFinanceIntent);
}

export function hasServiceLink(body, servicePath) {
  const escaped = servicePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:href=["']${escaped}(?:[?#][^"']*)?["']|\\]\\(${escaped}(?:[?#][^)]*)?\\))`, "i").test(
    String(body ?? ""),
  );
}

export function comparableIntent(article) {
  return [article.primaryQuery, article.primary_query, article.title].filter(Boolean).join(" ");
}

export function findIntentOverlaps(article, candidates, threshold = 0.72) {
  const query = comparableIntent(article);
  const service = resolveDesignatedService(article)?.id;
  if (!query) return [];
  return candidates
    .filter((candidate) => candidate.file !== article.file)
    .map((candidate) => ({
      candidate,
      score: tokenSimilarity(query, comparableIntent(candidate)),
      sameCluster: resolveDesignatedService(candidate)?.id === service,
    }))
    .filter((result) => result.sameCluster && result.score >= threshold)
    .sort((a, b) => b.score - a.score);
}
