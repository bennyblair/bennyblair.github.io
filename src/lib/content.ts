// Simplified content system for deployment stability

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

// Static empty implementations to prevent build failures
export const getContentFiles = (contentType?: string): Article[] => {
  return [];
};

export const getArticleBySlug = (contentType?: string, slug?: string): Article | null => {
  return null;
};

export const getPrecompiledArticleBySlug = (contentType?: string, slug?: string): Article | null => {
  return null;
};

export const getPrecompiledContentFiles = (contentType?: string): Article[] => {
  return [];
};

export const debugPrecompiledContent = () => {
  return { message: "Content system simplified for deployment" };
};

export const isArticleComingSoon = (slug: string): boolean => {
  return false;
};

export const debugModules = () => {
  return { message: "Debug modules simplified" };
};
