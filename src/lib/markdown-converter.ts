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

export interface FAQItem {
  question: string;
  answer: string;
}

export function convertMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  // Remove embedded schema blocks. Page templates generate validated JSON-LD;
  // legacy articles sometimes contain malformed or duplicate raw scripts.
  let cleanedMarkdown = markdown
    .replace(/```json[\s\S]*?```/gi, '')
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
  
  // Replace FAQ section with placeholder
  // Matches: ## FAQs, ## Frequently Asked Questions, ## 6. Frequently Asked Questions (FAQ), ## FAQ Section
  cleanedMarkdown = cleanedMarkdown.replace(/##\s*(?:\d+\.\s*)?(?:Frequently Asked Questions|FAQs?|FAQ Section)(?:.*)?\s*\n([\s\S]*?)(?=\n## |\n# |$)/i, '\n<div id="faq-placeholder"></div>\n');
  
  // Convert markdown to HTML
  const rawHtml = marked(cleanedMarkdown) as string;
  
  // Sanitize the HTML and canonicalise a known legacy link that still exists
  // in old articles. This keeps rendered internal links direct while the
  // original editorial record remains unchanged.
  return DOMPurify.sanitize(rawHtml).replace(
    /href="(?:https:\/\/(?:www\.)?emetcapital\.com\.au)?\/commercial-property-loans\/?"/g,
    'href="/services/commercial-property-finance"',
  );
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

export function extractFAQs(markdown: string): FAQItem[] {
  if (!markdown) return [];

  const cleanedMarkdown = markdown
    .replace(/```json[\s\S]*?```/gi, '')
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
  
  // Matches: ## FAQs, ## Frequently Asked Questions, ## 6. Frequently Asked Questions (FAQ), ## FAQ Section
  const faqMatch = cleanedMarkdown.match(/##\s*(?:\d+\.\s*)?(?:Frequently Asked Questions|FAQs?|FAQ Section)(?:.*)?\s*\n([\s\S]*?)(?=\n## |\n# |$)/i);
  if (!faqMatch) return [];
  
  const faqSection = faqMatch[1];
  const faqs: FAQItem[] = [];
  
  // Try to match h3 format first (### Question?)
  // Allow single or double newlines after question
  const h3Matches = faqSection.match(/###\s+([^\n]+)\n+([^\n#]+(?:\n(?!###)[^\n#]+)*)/g);
  
  if (h3Matches && h3Matches.length > 0) {
    // Parse h3 format
    h3Matches.forEach(match => {
      // Split by newline to separate question and answer
      const parts = match.split(/\n+/);
      const question = parts[0].replace(/^###\s+/, '').trim();
      const answer = parts.slice(1).join('\n').trim();
      if (question && answer) {
        faqs.push({ question, answer });
      }
    });
    return faqs;
  }
  
  // Fallback to bold format (**Question?**)
  const lines = faqSection.split('\n');
  let currentFAQ: Partial<FAQItem> = {};
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check if this is a question (starts with ** and ends with **)
    const questionMatch = trimmedLine.match(/^\*\*(.*?)\*\*(.*)$/);
    if (questionMatch) {
      // Save previous FAQ if complete
      if (currentFAQ.question && currentFAQ.answer) {
        faqs.push(currentFAQ as FAQItem);
      }
      
      // Start new FAQ
      const questionText = (questionMatch[1] + questionMatch[2]).trim();
      currentFAQ = {
        question: questionText.replace(/\?$/, '') + '?', // ensure question ends with ?
        answer: ''
      };
    } else if (trimmedLine && currentFAQ.question) {
      // Build the answer (append lines)
      if (currentFAQ.answer) {
        currentFAQ.answer += ' ' + trimmedLine;
      } else {
        currentFAQ.answer = trimmedLine;
      }
    }
  }
  
  // Don't forget the last FAQ
  if (currentFAQ.question && currentFAQ.answer) {
    faqs.push(currentFAQ as FAQItem);
  }
  
  return faqs;
}

export function stripFirstHeading(markdown: string): string {
  if (!markdown) return '';
  
  const lines = markdown.replace(/^\s*\n/, '').split('\n');
  const firstLineIsH1 = /^#\s+/.test(lines[0]);
  
  if (firstLineIsH1) {
    return lines.slice(1).join('\n').trim();
  }
  
  return markdown;
}
