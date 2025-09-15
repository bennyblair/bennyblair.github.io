import { getPrecompiledArticleBySlug, getPrecompiledContentFiles, debugPrecompiledContent } from './precompiled-content';

export { getPrecompiledArticleBySlug, getPrecompiledContentFiles, debugPrecompiledContent };

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
const guideModules = import.meta.glob('../content/guides/*.md', { 
  eager: true, 
  as: 'raw' 
});

const caseStudyModules = import.meta.glob('../content/case-studies/*.md', { 
  eager: true, 
  as: 'raw' 
});

const insightModules = import.meta.glob('../content/insights/*.md', { 
  eager: true, 
  as: 'raw' 
});

// Alternative fallback approach - try to import specific files we know exist
const manualGuideImports = {
  'bridging-loan': () => import('../content/guides/bridging-loan.md?raw'),
  'no-doc-abn-loans': () => import('../content/guides/no-doc-abn-loans.md?raw'),
  'short-term-property-finance': () => import('../content/guides/short-term-property-finance.md?raw'),
  'second-mortgage-australia': () => import('../content/guides/second-mortgage-australia.md?raw'),
  'second-mortgage-lenders-australia': () => import('../content/guides/second-mortgage-lenders-australia.md?raw'),
  'no-doc-short-term-mortgages': () => import('../content/guides/no-doc-short-term-mortgages.md?raw'),
  '2025-09-09-commercial-asset-finance-guide': () => import('../content/guides/2025-09-09-commercial-asset-finance-guide.md?raw'),
};

// Debug function to check what modules are loaded
export function debugModules() {
  const precompiledDebug = debugPrecompiledContent();
  const dynamicDebug = {
    guideKeys: Object.keys(guideModules),
    guideCount: Object.keys(guideModules).length
  };
  
  console.log('Precompiled content:', precompiledDebug);
  console.log('Dynamic modules:', dynamicDebug);
  
  return {
    precompiled: precompiledDebug,
    dynamic: dynamicDebug,
    total: precompiledDebug.guideCount + dynamicDebug.guideCount
  };
}

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
  
  // Filter and enhance content
  const filteredContent = filterAndEnhanceContent(body);
  
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
    content: filteredContent,
    loanAmount: getOptionalString('loanAmount'),
    loanType: getOptionalString('loanType'),
    industry: getOptionalString('industry'),
    duration: getOptionalString('duration'),
    outcome: getOptionalString('outcome'),
    challenge: getOptionalString('challenge'),
    featured: getBoolean('featured', false)
  };
}

/**
 * Filter and enhance content for better readability and quality
 */
function filterAndEnhanceContent(content: string): string {
  let filtered = content;
  
  // 1. Remove any remaining non-English characters
  filtered = removeNonEnglishContent(filtered);
  
  // 2. Remove excessive repetition common in AI-generated content
  filtered = removeDuplicateSentences(filtered);
  
  // 3. Improve paragraph structure
  filtered = improveContentStructure(filtered);
  
  // 4. Fix common formatting issues
  filtered = fixCommonFormattingIssues(filtered);
  
  return filtered;
}

/**
 * Remove content with non-English characters
 */
function removeNonEnglishContent(content: string): string {
  const lines = content.split('\n');
  const filteredLines = lines.filter(line => {
    // Keep lines that are primarily English
    // Simple check: if it contains common non-English characters, skip it
    const hasNonEnglish = /[\u4e00-\u9fff\u3400-\u4dbf\u20000-\u2a6df\u2a700-\u2b73f\u2b740-\u2b81f\u2b820-\u2ceaf]/.test(line);
    return !hasNonEnglish;
  });
  
  return filteredLines.join('\n');
}

/**
 * Remove duplicate sentences that are common in AI-generated content
 */
function removeDuplicateSentences(content: string): string {
  const sentences = content.split(/(?<=[.!?])\s+/);
  const seen = new Set<string>();
  const unique: string[] = [];
  
  for (const sentence of sentences) {
    const normalized = sentence.trim().toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation for comparison
      .replace(/\s+/g, ' '); // Normalize whitespace
    
    if (normalized.length > 10 && !seen.has(normalized)) {
      seen.add(normalized);
      unique.push(sentence);
    } else if (normalized.length <= 10) {
      // Keep short sentences as they might be important
      unique.push(sentence);
    }
  }
  
  return unique.join(' ').trim();
}

/**
 * Improve content structure and readability
 */
function improveContentStructure(content: string): string {
  let improved = content;
  
  // Fix paragraph breaks - ensure proper spacing
  improved = improved.replace(/\n{3,}/g, '\n\n');
  
  // Ensure headers have proper spacing
  improved = improved.replace(/([^\n])\n(#{1,6}\s)/g, '$1\n\n$2');
  improved = improved.replace(/(#{1,6}[^\n]*)\n([^#\n])/g, '$1\n\n$2');
  
  // Ensure lists have proper spacing
  improved = improved.replace(/([^\n])\n([-*+]\s)/g, '$1\n\n$2');
  improved = improved.replace(/([^\n])\n(\d+\.\s)/g, '$1\n\n$2');
  
  return improved;
}

/**
 * Fix common formatting issues in content
 */
function fixCommonFormattingIssues(content: string): string {
  let fixed = content;
  
  // Fix spacing around punctuation
  fixed = fixed.replace(/\s+([.!?])/g, '$1'); // Remove spaces before punctuation
  fixed = fixed.replace(/([.!?])([A-Z])/g, '$1 $2'); // Add space after punctuation before capitals
  
  // Fix dash usage - use em dashes consistently
  fixed = fixed.replace(/(\w)\s*[-–—]\s*(\w)/g, '$1—$2');
  
  // Fix quote marks - use standard quotes for now
  fixed = fixed.replace(/"([^"]*)"/g, '"$1"');
  fixed = fixed.replace(/'([^']*)'/g, "'$1'");
  
  // Fix ellipsis
  fixed = fixed.replace(/\.{3}/g, '…');
  
  // Ensure proper capitalization after colons in titles/headers
  fixed = fixed.replace(/(#{1,6}[^:\n]*:\s*)([a-z])/g, (match, prefix, letter) => 
    prefix + letter.toUpperCase()
  );
  
  return fixed;
}

export function getContentFiles(contentType: 'guides' | 'case-studies' | 'insights'): Article[] {
  // First try precompiled content (production-safe)
  const precompiledArticles = getPrecompiledContentFiles(contentType);
  if (precompiledArticles.length > 0) {
    console.log(`Loaded ${precompiledArticles.length} articles from precompiled content`);
    return precompiledArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // Fallback to dynamic imports (development)
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

// Check if an article is referenced in interlinking data (coming soon)
export async function isArticleComingSoon(contentType: 'guides' | 'case-studies' | 'insights', slug: string): Promise<boolean> {
  try {
    // Import interlinking data
    const response = await fetch('/data/interlinks.csv');
    if (!response.ok) return false;
    
    const csvText = await response.text();
    const lines = csvText.split('\n');
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Parse CSV row (simple parsing for our use case)
      const columns = line.split(',');
      if (columns.length >= 6) {
        const targetUrl = columns[5]?.replace(/"/g, '').trim(); // target_url column
        
        // Check if this URL matches our content type and slug
        const expectedUrl = `/resources/${contentType}/${slug}`;
        if (targetUrl === expectedUrl) {
          return true;
        }
      }
    }
    
    return false;
  } catch (error) {
    console.warn('Could not check interlinking data:', error);
    return false;
  }
}

export async function getArticleBySlug(contentType: 'guides' | 'case-studies' | 'insights', slug: string): Promise<Article | null> {
  // First try precompiled content (production-safe)
  const precompiledArticle = getPrecompiledArticleBySlug(contentType, slug);
  if (precompiledArticle) {
    console.log('Loaded article from precompiled content:', slug);
    return precompiledArticle;
  }

  // Fallback to dynamic imports (development)
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
  
  if (matchingEntry) {
    const [filePath, content] = matchingEntry;
    console.log('Loaded article from dynamic import:', slug);
    return createArticleFromModule(filePath, content);
  }
  
  // Fallback: try manual imports for guides
  if (contentType === 'guides' && manualGuideImports[slug]) {
    try {
      const module = await manualGuideImports[slug]();
      const content = typeof module === 'string' ? module : module.default;
      console.log('Loaded article from manual import:', slug);
      return createArticleFromModule(`../content/guides/${slug}.md`, content);
    } catch (error) {
      console.error(`Failed to load article ${slug}:`, error);
      return null;
    }
  }
  
  console.warn('Article not found in any content source:', slug);
  return null;
}
