import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

export function getContentFiles(contentType: 'guides' | 'case-studies' | 'insights'): Article[] {
  const contentDir = path.join(process.cwd(), 'src', 'content', contentType);
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const filenames = fs.readdirSync(contentDir);
  
  const articles = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(contentDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: filename.replace('.md', ''),
        title: data.title,
        date: data.date,
        description: data.description,
        category: data.category,
        tags: data.tags || [],
        author: data.author,
        readingTime: data.readingTime,
        featuredImage: data.featuredImage,
        content,
        loanAmount: data.loanAmount,
        loanType: data.loanType,
        industry: data.industry,
        duration: data.duration,
        outcome: data.outcome,
        challenge: data.challenge,
        featured: data.featured
      } as Article;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return articles;
}

export function getArticleBySlug(contentType: 'guides' | 'case-studies' | 'insights', slug: string): Article | null {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', contentType, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      category: data.category,
      tags: data.tags || [],
      author: data.author,
      readingTime: data.readingTime,
      featuredImage: data.featuredImage,
      content,
      loanAmount: data.loanAmount,
      loanType: data.loanType,
      industry: data.industry,
      duration: data.duration,
      outcome: data.outcome,
      challenge: data.challenge,
      featured: data.featured
    } as Article;
  } catch (error) {
    return null;
  }
}
