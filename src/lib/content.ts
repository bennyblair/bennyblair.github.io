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
  featured?: boolean;
}

// Import all markdown files at build time using Vite's glob imports
const guideModules = import.meta.glob('/src/content/guides/*.md', { 
  eager: true, 
  as: 'raw' 
});

const caseStudyModules = import.meta.glob('/src/content/case-studies/*.md', { 
  eager: true, 
  as: 'raw' 
});

const insightModules = import.meta.glob('/src/content/insights/*.md', { 
  eager: true, 
  as: 'raw' 
});

// Simple frontmatter parser
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: content };
  }

  const frontmatter = match[1];
  const body = match[2];
  
  // Parse YAML-like frontmatter
  const data: Record<string, string | number | string[] | boolean> = {};
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value: string = line.slice(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Parse arrays (simple format: [item1, item2])
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayValue = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
        data[key] = arrayValue;
        return;
      }
      
      // Parse booleans
      if (value === 'true' || value === 'false') {
        data[key] = value === 'true';
        return;
      }
      
      // Parse numbers
      if (!isNaN(Number(value)) && value !== '') {
        data[key] = Number(value);
        return;
      }
      
      data[key] = value;
    }
  });
  
  return { data, content: body };
}

function createArticleFromModule(filePath: string, content: string): Article {
  const { data, content: body } = parseFrontmatter(content);
  const filename = filePath.split('/').pop() || '';
  const slug = filename.replace('.md', '');
  
  // Helper functions for type-safe data extraction
  const getString = (key: string, defaultValue: string = ''): string => {
    const value = data[key];
    return typeof value === 'string' ? value : defaultValue;
  };
  
  const getNumber = (key: string, defaultValue: number = 0): number => {
    const value = data[key];
    return typeof value === 'number' ? value : defaultValue;
  };
  
  const getBoolean = (key: string, defaultValue: boolean = false): boolean => {
    const value = data[key];
    return typeof value === 'boolean' ? value : defaultValue;
  };
  
  const getStringArray = (key: string, defaultValue: string[] = []): string[] => {
    const value = data[key];
    return Array.isArray(value) ? value : defaultValue;
  };
  
  const getOptionalString = (key: string): string | undefined => {
    const value = data[key];
    return typeof value === 'string' ? value : undefined;
  };
  
  return {
    slug,
    title: getString('title', 'Untitled'),
    date: getString('date', new Date().toISOString().split('T')[0]),
    description: getString('description'),
    category: getString('category', 'General'),
    tags: getStringArray('tags'),
    author: getString('author', 'EMET Capital'),
    readingTime: getNumber('readingTime', 5),
    featuredImage: getOptionalString('featuredImage'),
    content: body,
    loanAmount: getOptionalString('loanAmount'),
    loanType: getOptionalString('loanType'),
    industry: getOptionalString('industry'),
    duration: getOptionalString('duration'),
    outcome: getOptionalString('outcome'),
    challenge: getOptionalString('challenge'),
    featured: getBoolean('featured', false)
  };
}

export function getContentFiles(contentType: 'guides' | 'case-studies' | 'insights'): Article[] {
  let modules: Record<string, string>;
  
  switch (contentType) {
    case 'guides':
      modules = guideModules;
      break;
    case 'case-studies':
      modules = caseStudyModules;
      break;
    case 'insights':
      modules = insightModules;
      break;
    default:
      return [];
  }
  
  const articles = Object.entries(modules).map(([filePath, content]) => 
    createArticleFromModule(filePath, content)
  );
  
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(contentType: 'guides' | 'case-studies' | 'insights', slug: string): Article | null {
  let modules: Record<string, string>;
  
  switch (contentType) {
    case 'guides':
      modules = guideModules;
      break;
    case 'case-studies':
      modules = caseStudyModules;
      break;
    case 'insights':
      modules = insightModules;
      break;
    default:
      return null;
  }
  
  // Find the module that matches the slug
  const matchingEntry = Object.entries(modules).find(([filePath]) => {
    const filename = filePath.split('/').pop() || '';
    const fileSlug = filename.replace('.md', '');
    return fileSlug === slug;
  });
  
  if (!matchingEntry) {
    return null;
  }
  
  const [filePath, content] = matchingEntry;
  return createArticleFromModule(filePath, content);
}
