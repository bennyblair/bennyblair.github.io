import policy from "../../data/seo-topic-policy.json";
import type { ArticleSummary } from "@/lib/content";

export interface ServiceLink {
  id: string;
  path: string;
  label: string;
  description: string;
  terms: string[];
}

const serviceClusters = policy.serviceClusters as ServiceLink[];

function normalize(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((token) => {
      if (token.endsWith("ies") && token.length > 4) return `${token.slice(0, -3)}y`;
      if (token.endsWith("s") && !token.endsWith("ss") && token.length > 4) return token.slice(0, -1);
      return token;
    })
    .join(" ");
}

export function getDesignatedService(article: ArticleSummary): ServiceLink {
  const explicit = serviceClusters.find((cluster) => cluster.path === article.designatedServicePage);
  if (explicit) return explicit;

  const focus = ` ${normalize([article.primaryQuery, article.title].filter(Boolean).join(" "))} `;
  const haystack = ` ${normalize([
    article.primaryQuery,
    article.title,
    article.category,
    ...(article.tags ?? []),
    ...(article.keywords ?? []),
  ].join(" "))} `;
  let best: { cluster: ServiceLink; score: number } | null = null;

  for (const cluster of serviceClusters) {
    let score = 0;
    for (const term of cluster.terms) {
      const normalized = normalize(term);
      if (focus.includes(` ${normalized} `)) score += 100;
      if (haystack.includes(` ${normalized} `)) score += normalized.split(" ").length * 10 + normalized.length;
    }
    if (!best || score > best.score) best = { cluster, score };
  }

  return best?.score
    ? best.cluster
    : serviceClusters.find((cluster) => cluster.id === "business-finance")!;
}

export function rankRelatedArticles(current: ArticleSummary, candidates: ArticleSummary[]) {
  const currentService = getDesignatedService(current);
  const currentTags = new Set((current.tags ?? []).map(normalize));

  return candidates
    .filter((candidate) => candidate.slug !== current.slug)
    .map((candidate) => {
      const candidateService = getDesignatedService(candidate);
      const sharedTags = (candidate.tags ?? []).filter((tag) => currentTags.has(normalize(tag))).length;
      const recency = Number.isFinite(new Date(candidate.date).getTime()) ? new Date(candidate.date).getTime() : 0;
      return {
        candidate,
        sameService: candidateService.id === currentService.id,
        sharedTags,
        recency,
      };
    })
    .sort((a, b) =>
      Number(b.sameService) - Number(a.sameService) ||
      b.sharedTags - a.sharedTags ||
      b.recency - a.recency ||
      a.candidate.slug.localeCompare(b.candidate.slug),
    )
    .map(({ candidate }) => candidate);
}

export function getServiceClusters() {
  return [...serviceClusters];
}
