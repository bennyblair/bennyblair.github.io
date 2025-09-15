// Precompiled content module - manually generated for production reliability
// This bypasses Vite glob import issues in production builds

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

// Import content directly using static imports
import bridgingLoanContent from '../content/guides/bridging-loan.md?raw';
import noDocAbnLoansContent from '../content/guides/no-doc-abn-loans.md?raw';
import shortTermPropertyFinanceContent from '../content/guides/short-term-property-finance.md?raw';
import secondMortgageAustraliaContent from '../content/guides/second-mortgage-australia.md?raw';
import secondMortgageLendersAustraliaContent from '../content/guides/second-mortgage-lenders-australia.md?raw';
import noDocShortTermMortgagesContent from '../content/guides/no-doc-short-term-mortgages.md?raw';
import commercialAssetFinanceGuideContent from '../content/guides/2025-09-09-commercial-asset-finance-guide.md?raw';

// Simple frontmatter parser
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, body] = match;
  const data: Record<string, any> = {};
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Try to parse as JSON for arrays
      if (value.startsWith('[')) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      } else if (value === 'true' || value === 'false') {
        data[key] = value === 'true';
      } else if (!isNaN(Number(value)) && value !== '') {
        data[key] = Number(value);
      } else {
        data[key] = value;
      }
    }
  });
  
  return { data, content: body };
}

function createArticleFromContent(slug: string, content: string): Article {
  const { data, content: body } = parseFrontmatter(content);
  
  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    description: data.description || '',
    category: data.category || '',
    tags: data.tags || [],
    author: data.author || '',
    readingTime: data.readingTime || 5,
    featuredImage: data.featuredImage || '',
    content: body,
    loanAmount: data.loanAmount || '',
    loanType: data.loanType || '',
    industry: data.industry || '',
    duration: data.duration || '',
    outcome: data.outcome || '',
    challenge: data.challenge || '',
    featured: data.featured || false,
  };
}

// Precompiled articles map
const precompiledGuides: Record<string, Article> = {
  'bridging-loan': createArticleFromContent('bridging-loan', bridgingLoanContent),
  'no-doc-abn-loans': createArticleFromContent('no-doc-abn-loans', noDocAbnLoansContent),
  'short-term-property-finance': createArticleFromContent('short-term-property-finance', shortTermPropertyFinanceContent),
  'second-mortgage-australia': createArticleFromContent('second-mortgage-australia', secondMortgageAustraliaContent),
  'second-mortgage-lenders-australia': createArticleFromContent('second-mortgage-lenders-australia', secondMortgageLendersAustraliaContent),
  'no-doc-short-term-mortgages': createArticleFromContent('no-doc-short-term-mortgages', noDocShortTermMortgagesContent),
  '2025-09-09-commercial-asset-finance-guide': createArticleFromContent('2025-09-09-commercial-asset-finance-guide', commercialAssetFinanceGuideContent),
};

// Export functions for content access
export function getPrecompiledArticleBySlug(contentType: 'guides' | 'case-studies' | 'insights', slug: string): Article | null {
  switch (contentType) {
    case 'guides':
      return precompiledGuides[slug] || null;
    case 'case-studies':
      // Add case studies when available
      return null;
    case 'insights':
      // Add insights when available
      return null;
    default:
      return null;
  }
}

export function getPrecompiledContentFiles(contentType: 'guides' | 'case-studies' | 'insights'): Article[] {
  switch (contentType) {
    case 'guides':
      return Object.values(precompiledGuides);
    case 'case-studies':
      return [];
    case 'insights':
      return [];
    default:
      return [];
  }
}

// Debug function
export function debugPrecompiledContent() {
  return {
    guideKeys: Object.keys(precompiledGuides),
    guideCount: Object.keys(precompiledGuides).length,
    availableContent: Object.keys(precompiledGuides).map(key => ({
      slug: key,
      title: precompiledGuides[key].title,
      hasContent: precompiledGuides[key].content.length > 0
    }))
  };
}
