import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Custom renderer to add IDs to headings
const renderer = new marked.Renderer();
renderer.heading = function({ text, depth }) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  return `<h${depth} id="${escapedText}">${text}</h${depth}>`;
};

marked.use({ renderer });

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export function convertMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  // Remove any JSON-LD blocks from the markdown
  const cleanedMarkdown = markdown.replace(/```json[\s\S]*?```/g, '');
  
  // Convert markdown to HTML
  const rawHtml = marked(cleanedMarkdown) as string;
  
  // Sanitize the HTML
  return DOMPurify.sanitize(rawHtml);
}

export function extractTableOfContents(markdown: string): TableOfContentsItem[] {
  if (!markdown) return [];
  
  const tocItems: TableOfContentsItem[] = [];
  const lines = markdown.split('\n');
  
  lines.forEach(line => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      
      // Only include h2 and h3 for cleaner TOC
      if (level >= 2 && level <= 3) {
        tocItems.push({ id, text, level });
      }
    }
  });
  
  return tocItems;
}

export function stripFirstHeading(markdown: string): string {
  if (!markdown) return '';
  
  const lines = markdown.split('\n');
  const firstLineIsH1 = /^#\s+/.test(lines[0]);
  
  if (firstLineIsH1) {
    return lines.slice(1).join('\n').trim();
  }
  
  return markdown;
}