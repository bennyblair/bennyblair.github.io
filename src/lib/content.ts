import matter from "gray-matter";
import seoRouteData from "../../scripts/seo-route-data.generated.json";

export interface Article {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: number;
  featuredImage?: string;
  content: string;
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
}

type RawModuleLoader = () => Promise<string>;

const guideModules = import.meta.glob("../content/guides/*.md", { query: "?raw", import: "default" }) as Record<string, RawModuleLoader>;
const caseStudyModules = import.meta.glob("../content/case-studies/*.md", { query: "?raw", import: "default" }) as Record<string, RawModuleLoader>;

const contentLoaders: Record<string, Record<string, RawModuleLoader>> = {
  guides: guideModules,
  "case-studies": caseStudyModules,
  insights: {},
};

const articleListCache = new Map<string, Promise<Article[]>>();
const articleBySlugCache = new Map<string, Promise<Article | null>>();
const seoRoutes = seoRouteData as Record<string, { canonical?: string; sourcePath?: string }>;

function simpleFrontmatterParser(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  frontmatter.split("\n").forEach((line) => {
    const parts = line.split(":");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let value = parts.slice(1).join(":").trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (value.startsWith("[") && value.endsWith("]")) {
        data[key] = value.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));
      } else {
        data[key] = value;
      }
    }
  });

  return { data, content };
}

function parseArticle(path: string, raw: string): Article | null {
  let parsed;
  try {
    parsed = matter(raw);
  } catch (e) {
    console.warn(`Gray-matter failed for ${path}, using fallback parser.`, e);
    parsed = simpleFrontmatterParser(raw);
  }

  if (!parsed?.data) return null;

  const match = path.match(/([^/]+)\.md$/);
  const slug = match ? match[1] : path;
  const data = parsed.data as any;
  const content = parsed.content || "";

  if (!data.title) return null;

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? new Date().toISOString(),
    description: data.description ?? "",
    category: data.category ?? "Guides",
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author ?? "Emet Capital",
    readingTime: Number(data.readingTime ?? 8),
    featuredImage: data.featuredImage,
    content,
    loanAmount: data.loanAmount,
    loanType: data.loanType,
    industry: data.industry,
    duration: data.duration,
    outcome: data.outcome,
    challenge: data.challenge,
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    location: data.location,
    propertyType: data.propertyType,
    lvr: data.lvr,
    quote: data.quote,
  };
}

function getArticleRoute(contentType: string, slug: string): string {
  return contentType === "case-studies"
    ? `/resources/case-studies/${slug}`
    : `/resources/guides/${slug}`;
}

export function isRoutableContentArticle(contentType: string, slug: string): boolean {
  const routePath = getArticleRoute(contentType, slug);
  return Boolean(seoRoutes[routePath]?.canonical);
}

async function loadArticlesFromModules(modules: Record<string, RawModuleLoader>): Promise<Article[]> {
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const raw = await loader();
      return parseArticle(path, raw);
    })
  );

  return entries
    .filter((article): article is Article => Boolean(article))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const getContentFiles = async (contentType: string = "guides"): Promise<Article[]> => {
  const loaders = contentLoaders[contentType] ?? {};
  if (!articleListCache.has(contentType)) {
    articleListCache.set(contentType, loadArticlesFromModules(loaders));
  }
  return articleListCache.get(contentType)!;
};

export const getArticleBySlug = async (contentType: string = "guides", slug?: string): Promise<Article | null> => {
  if (!slug) return null;
  const cacheKey = `${contentType}:${slug}`;
  if (!articleBySlugCache.has(cacheKey)) {
    articleBySlugCache.set(
      cacheKey,
      (async () => {
        const list = await getContentFiles(contentType);
        return list.find((a) => a.slug === slug) ?? null;
      })()
    );
  }
  return articleBySlugCache.get(cacheKey)!;
};

export const getPrecompiledArticleBySlug = async (_contentType?: string, _slug?: string): Promise<Article | null> => {
  return null;
};

export const getPrecompiledContentFiles = async (_contentType?: string): Promise<Article[]> => {
  return [];
};

export const debugPrecompiledContent = () => {
  return { message: "Content loaded via import.meta.glob", guides: Object.keys(guideModules).length };
};

export const isArticleComingSoon = async (_slug: string): Promise<boolean> => {
  return false;
};

export const debugModules = () => {
  return {
    guidesCount: Object.keys(guideModules).length,
    caseStudiesCount: Object.keys(caseStudyModules).length,
    lazy: true,
  };
};
