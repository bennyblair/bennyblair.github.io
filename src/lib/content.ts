import matter from "gray-matter";

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
}

// Load markdown files at build time (Vite)
const guideModules = import.meta.glob("../content/guides/*.md", { as: "raw", eager: true }) as Record<string, string>;

let guidesCache: Article[] | null = null;

function parseArticlesFromModules(modules: Record<string, string>): Article[] {
  const articles: Article[] = [];
  for (const path in modules) {
    const raw = modules[path];
    const parsed = matter(raw);
    // slug = filename without extension
    const match = path.match(/([^\/]+)\.md$/);
    const slug = match ? match[1] : path;

    const data = parsed.data as any;
    const content = parsed.content || "";

    if (!data || !data.title) continue; // skip invalid

    articles.push({
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
    });
  }

  // Sort newest first
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const getContentFiles = (contentType: string = "guides"): Article[] => {
  if (contentType !== "guides") return [];
  if (!guidesCache) {
    guidesCache = parseArticlesFromModules(guideModules);
  }
  return guidesCache;
};

export const getArticleBySlug = (contentType: string = "guides", slug?: string): Article | null => {
  if (!slug) return null;
  const list = getContentFiles(contentType);
  return list.find(a => a.slug === slug) ?? null;
};

export const getPrecompiledArticleBySlug = (_contentType?: string, _slug?: string): Article | null => {
  return null;
};

export const getPrecompiledContentFiles = (_contentType?: string): Article[] => {
  return [];
};

export const debugPrecompiledContent = () => {
  return { message: "Content loaded via import.meta.glob", guides: Object.keys(guideModules).length };
};

export const isArticleComingSoon = (_slug: string): boolean => {
  return false;
};

export const debugModules = () => {
  return { guidesCount: Object.keys(guideModules).length };
};