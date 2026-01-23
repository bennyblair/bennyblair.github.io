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
  keywords?: string[];
  location?: string;
  propertyType?: string;
  lvr?: string;
  quote?: string;
}

// Load markdown files at build time (Vite)
const guideModules = import.meta.glob("../content/guides/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const caseStudyModules = import.meta.glob("../content/case-studies/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

let guidesCache: Article[] | null = null;
let caseStudiesCache: Article[] | null = null;

// Fallback parser for when gray-matter fails
function simpleFrontmatterParser(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  frontmatter.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let value = parts.slice(1).join(':').trim();
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // Handle arrays (simple comma separated)
      if (value.startsWith('[') && value.endsWith(']')) {
        data[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      } else {
        data[key] = value;
      }
    }
  });

  return { data, content };
}

function parseArticlesFromModules(modules: Record<string, string>): Article[] {
  const articles: Article[] = [];
  for (const path in modules) {
    const raw = modules[path];
    let parsed;
    try {
      parsed = matter(raw);
    } catch (e) {
      console.warn(`Gray-matter failed for ${path}, using fallback parser. Error:`, e);
      try {
        parsed = simpleFrontmatterParser(raw);
      } catch (e2) {
        console.error(`Fallback parser also failed for ${path}`, e2);
        continue;
      }
    }
    
    if (!parsed || !parsed.data) {
       console.warn(`No data found for ${path}`);
       continue;
    }

    // slug = filename without extension
    const match = path.match(/([^\/]+)\.md$/);
    const slug = match ? match[1] : path;

    const data = parsed.data as any;
    const content = parsed.content || "";

    if (!data.title) {
        console.warn(`Skipping ${path}: No title found`);
        continue; 
    }

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
    });
  }

  // Sort newest first
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const getContentFiles = (contentType: string = "guides"): Article[] => {
  if (contentType === "guides") {
    if (!guidesCache) {
      guidesCache = parseArticlesFromModules(guideModules);
    }
    return guidesCache;
  }
  if (contentType === "case-studies") {
    if (!caseStudiesCache) {
      caseStudiesCache = parseArticlesFromModules(caseStudyModules);
    }
    return caseStudiesCache;
  }
  return [];
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