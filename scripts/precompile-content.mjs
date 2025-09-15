import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to process frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, body] = match;
  const data = {};
  
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
      
      // Try to parse as JSON for arrays/objects
      if (value.startsWith('[') || value.startsWith('{')) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      } else if (value === 'true' || value === 'false') {
        data[key] = value === 'true';
      } else if (!isNaN(value) && value !== '') {
        data[key] = Number(value);
      } else {
        data[key] = value;
      }
    }
  });
  
  return { data, content: body };
}

// Function to process a directory of markdown files
function processMarkdownDirectory(dirPath) {
  const fullPath = path.resolve(__dirname, '..', dirPath);
  const articles = {};
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`Directory not found: ${fullPath}`);
    return articles;
  }
  
  const files = fs.readdirSync(fullPath);
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(fullPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: body } = parseFrontmatter(content);
      
      const slug = file.replace('.md', '');
      
      articles[slug] = {
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
  });
  
  return articles;
}

// Generate the content module
function generateContentModule() {
  const guides = processMarkdownDirectory('src/content/guides');
  const caseStudies = processMarkdownDirectory('src/content/case-studies');
  const insights = processMarkdownDirectory('src/content/insights');
  
  const moduleContent = `// Auto-generated content module
// Generated on ${new Date().toISOString()}

export const precompiledGuides = ${JSON.stringify(guides, null, 2)};

export const precompiledCaseStudies = ${JSON.stringify(caseStudies, null, 2)};

export const precompiledInsights = ${JSON.stringify(insights, null, 2)};

// Helper functions
export function getPrecompiledArticleBySlug(contentType, slug) {
  let articles;
  
  switch (contentType) {
    case 'guides':
      articles = precompiledGuides;
      break;
    case 'case-studies':
      articles = precompiledCaseStudies;
      break;
    case 'insights':
      articles = precompiledInsights;
      break;
    default:
      return null;
  }
  
  return articles[slug] || null;
}

export function getPrecompiledContentFiles(contentType) {
  let articles;
  
  switch (contentType) {
    case 'guides':
      articles = precompiledGuides;
      break;
    case 'case-studies':
      articles = precompiledCaseStudies;
      break;
    case 'insights':
      articles = precompiledInsights;
      break;
    default:
      return [];
  }
  
  return Object.values(articles);
}
`;

  const outputPath = path.resolve(__dirname, '..', 'src', 'lib', 'precompiled-content.ts');
  fs.writeFileSync(outputPath, moduleContent);
  
  console.log(`Generated precompiled content module with:`);
  console.log(`- ${Object.keys(guides).length} guides`);
  console.log(`- ${Object.keys(caseStudies).length} case studies`);
  console.log(`- ${Object.keys(insights).length} insights`);
  console.log(`Saved to: ${outputPath}`);
}

// Run the generation
generateContentModule();
