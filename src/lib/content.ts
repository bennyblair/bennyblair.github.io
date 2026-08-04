import contentIndex from "virtual:content-index";

export type ContentType = "guides" | "case-studies" | "insights";
export type ContentRisk = "low" | "high";

export interface ArticleSource {
  label: string;
  url: string;
}

export interface ArticleSummary {
  slug: string;
  contentType: ContentType;
  route: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  authorName?: string;
  authorTitle?: string;
  authorBio?: string;
  authorUrl?: string;
  authorLinks?: { label: string; url: string }[];
  reviewedBy?: string;
  reviewedAt?: string;
  reviewedDate?: string;
  lastVerified?: string;
  readingTime: number;
  featuredImage?: string;
  featured?: boolean;
  loanAmount?: string;
  loanType?: string;
  industry?: string;
  duration?: string;
  outcome?: string;
  challenge?: string;
  keywords?: string[];
  location?: string;
  propertyType?: string;
  lvr?: string;
  quote?: string;
  primaryQuery?: string;
  searchIntent?: string;
  intentCluster?: string;
  designatedServicePage?: string;
  contentRisk: ContentRisk;
  sources?: ArticleSource[];
  canonical?: string;
  noindex?: boolean;
  indexingReason?: string;
  claimIds?: string[];
  expiresAt?: string;
  sourcePath?: string;
}

export interface Article extends ArticleSummary {
  content: string;
}

type ArticleModuleLoader = () => Promise<Article>;

const guideModules = import.meta.glob("../content/guides/*.md", {
  query: "?emet-article",
  import: "default",
}) as Record<string, ArticleModuleLoader>;
const caseStudyModules = import.meta.glob("../content/case-studies/*.md", {
  query: "?emet-article",
  import: "default",
}) as Record<string, ArticleModuleLoader>;
const insightModules = import.meta.glob("../content/insights/*.md", {
  query: "?emet-article",
  import: "default",
}) as Record<string, ArticleModuleLoader>;

const contentLoaders: Record<ContentType, Record<string, ArticleModuleLoader>> = {
  guides: guideModules,
  "case-studies": caseStudyModules,
  insights: insightModules,
};

const articleBySlugCache = new Map<string, Promise<Article | null>>();

function asContentType(value: string): ContentType {
  if (value === "case-studies" || value === "insights") return value;
  return "guides";
}

function findLoader(contentType: ContentType, slug: string): ArticleModuleLoader | undefined {
  const suffix = `/${slug}.md`;
  return Object.entries(contentLoaders[contentType]).find(([path]) =>
    path.replaceAll("\\", "/").endsWith(suffix),
  )?.[1];
}

export function isRoutableContentArticle(contentType: string, slug: string): boolean {
  return getContentSummaries(contentType).some((article) => article.slug === slug);
}

export function getContentSummaries(contentType: string = "guides"): ArticleSummary[] {
  const normalizedType = asContentType(contentType);
  return [...(contentIndex[normalizedType] ?? [])].filter((article) => !article.noindex).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

// Retain the asynchronous API while returning metadata-only records.
export async function getContentFiles(contentType: string = "guides"): Promise<ArticleSummary[]> {
  return getContentSummaries(contentType);
}

export function getArticleSummary(contentType: string, slug?: string): ArticleSummary | null {
  if (!slug) return null;
  return getContentSummaries(contentType).find((article) => article.slug === slug) ?? null;
}

export async function getArticleBySlug(
  contentType: string = "guides",
  slug?: string,
): Promise<Article | null> {
  if (!slug) return null;

  const normalizedType = asContentType(contentType);
  const cacheKey = `${normalizedType}:${slug}`;
  if (!articleBySlugCache.has(cacheKey)) {
    articleBySlugCache.set(
      cacheKey,
      (async () => {
        const loader = findLoader(normalizedType, slug);
        if (!loader) return null;
        const article = await loader();
        return article?.title ? article : null;
      })(),
    );
  }
  return articleBySlugCache.get(cacheKey)!;
}

export const debugContent = () => ({
  message: "Content uses a metadata-only index and per-article lazy modules",
  guides: contentIndex.guides?.length ?? 0,
  caseStudies: contentIndex["case-studies"]?.length ?? 0,
  insights: contentIndex.insights?.length ?? 0,
});

export const isArticleComingSoon = async (_slug: string): Promise<boolean> => false;

export const debugModules = () => ({
  guidesCount: Object.keys(guideModules).length,
  caseStudiesCount: Object.keys(caseStudyModules).length,
  insightsCount: Object.keys(insightModules).length,
  lazy: true,
});
