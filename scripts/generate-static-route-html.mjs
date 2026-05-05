import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const repoRoot = process.cwd();
const srcDir = path.join(repoRoot, 'src');
const distDir = path.join(repoRoot, 'dist');
const indexPath = path.join(distDir, 'index.html');
const appPath = path.join(srcDir, 'App.tsx');
const netlifyTomlPath = path.join(repoRoot, 'netlify.toml');
const siteUrl = 'https://emetcapital.com.au';
const businessName = 'Emet Capital';
const legalName = 'Emet Capital Pty Ltd';
const abn = '50 682 228 182';
const titleLimit = 56;
const descriptionLimit = 150;

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf8');
const appSource = fs.readFileSync(appPath, 'utf8');

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function titleCase(value) {
  return value
    .split(/[-\s/]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeCanonical(value, routePath) {
  const canonical = value || routePath;
  if (canonical.startsWith('http://') || canonical.startsWith('https://')) return canonical;
  const route = canonical.startsWith('/') ? canonical : `/${canonical}`;
  return route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`;
}

function decodeJsString(value) {
  return value
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function collapseWhitespace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function trimAtWord(value, limit) {
  const normalized = collapseWhitespace(value);
  if (normalized.length <= limit) return normalized;
  const truncated = normalized.slice(0, Math.max(0, limit - 3));
  const lastSpace = truncated.lastIndexOf(' ');
  const safe = lastSpace > 35 ? truncated.slice(0, lastSpace) : truncated;
  return `${safe.trim()}...`;
}

function normalizeSeoTitle(value) {
  const title = collapseWhitespace(value);
  if (title.length <= titleLimit) return title;
  const withoutBrand = title.replace(/\s*\|\s*Emet Capital(?: Case Studies)?\s*$/i, '').trim();
  if (withoutBrand && withoutBrand.length <= titleLimit) return withoutBrand;
  return trimAtWord(withoutBrand || title, titleLimit);
}

function normalizeSeoDescription(value) {
  return trimAtWord(value, descriptionLimit);
}

function normalizeMeta(meta) {
  return {
    ...meta,
    title: normalizeSeoTitle(meta.title),
    description: normalizeSeoDescription(meta.description),
  };
}

function jsonLdScript(schema) {
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: businessName,
    legalName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Australian commercial finance brokerage helping business borrowers compare private lending, caveat loans, bridging finance, asset-backed lending, and commercial property finance options.',
    taxID: abn,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'ABN',
      value: abn,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
      addressRegion: 'NSW',
      addressLocality: 'Sydney',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+61-485-952-651',
      contactType: 'Customer Service',
      areaServed: 'AU',
      availableLanguage: 'English',
    },
    sameAs: ['https://www.linkedin.com/company/emet-capital'],
  };
}

function financialServiceSchema(meta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: businessName,
    legalName,
    description: meta.description || 'Commercial finance and private lending brokerage for Australian business borrowers.',
    url: meta.canonical || siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/logo.png`,
    telephone: '+61-485-952-651',
    email: 'enquiry@emetcapital.com.au',
    taxID: abn,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'ABN',
      value: abn,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
      addressRegion: 'NSW',
      addressLocality: 'Sydney',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
  };
}

function serviceSchema(meta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: meta.h1 || meta.title,
    description: meta.description,
    url: meta.canonical,
    provider: {
      '@type': 'FinancialService',
      name: businessName,
      legalName,
      url: siteUrl,
      taxID: abn,
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'ABN',
        value: abn,
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    serviceType: 'Commercial Finance',
  };
}

function labelFromSlug(part) {
  const mapped = {
    resources: 'Resources',
    guides: 'Guides',
    services: 'Services',
    tools: 'Tools',
    cities: 'Cities',
    'case-studies': 'Case Studies',
  };
  return mapped[part] || titleCase(part.replace(/-/g, ' '));
}

function breadcrumbSchema(routePath, pageTitle) {
  if (routePath === '/') return null;
  const parts = routePath.split('/').filter(Boolean);
  const items = [{ label: 'Home', href: '/' }];
  let current = '';
  parts.forEach((part, index) => {
    current += `/${part}`;
    items.push({
      label: index === parts.length - 1 ? pageTitle : labelFromSlug(part),
      href: index === parts.length - 1 ? undefined : current,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href === '/' ? `${siteUrl}/` : `${siteUrl}${item.href}` } : {}),
    })),
  };
}

function defaultSchemas(meta) {
  const schemas = [financialServiceSchema(meta), organizationSchema()];
  const breadcrumb = breadcrumbSchema(meta.routePath, meta.h1 || meta.title);
  if (breadcrumb) schemas.push(breadcrumb);
  if (meta.routePath?.startsWith('/services/')) schemas.push(serviceSchema(meta));
  return schemas;
}

function stripUnsafeHtml(value) {
  return String(value || '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/href=("|')javascript:[\s\S]*?\1/gi, 'href="#"');
}

function stripLeadingH1(html) {
  return String(html || '').replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, '');
}

function staticFooterHtml() {
  const serviceLinks = [
    ['/services/commercial-property-finance', 'Commercial Property Finance'],
    ['/services/private-lending', 'Private Lending'],
    ['/services/caveat-loans', 'Caveat Loans'],
    ['/services/bridging-finance', 'Bridging Finance'],
    ['/services/asset-backed-lending', 'Asset-Backed Lending'],
    ['/services/first-second-mortgages', 'First & Second Mortgages'],
  ];
  const trustLinks = [
    ['/editorial-standards', 'Editorial Standards'],
    ['/complaints-process', 'Complaints Process'],
    ['/privacy-policy', 'Privacy Policy'],
    ['/terms', 'Terms'],
  ];
  const renderLinks = (links) => links
    .map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`)
    .join('');

  return `
<footer class="static-footer-links" aria-label="Static footer links">
  <h2>Emet Capital trust and service links</h2>
  <p>${legalName}. ABN ${abn}. General information only. This website does not provide financial, legal, or tax advice.</p>
  <nav aria-label="Key commercial finance services"><ul>${renderLinks(serviceLinks)}</ul></nav>
  <nav aria-label="Trust and legal pages"><ul>${renderLinks(trustLinks)}</ul></nav>
</footer>`;
}

function markdownToStaticHtml(markdown) {
  const withoutLdJson = String(markdown || '').replace(/<script[\s\S]*?<\/script>/gi, '');
  const html = marked.parse(withoutLdJson, { async: false, gfm: true });
  return stripLeadingH1(stripUnsafeHtml(html));
}

function extractReadableTextFromComponent(source) {
  const textMatches = [];
  for (const match of source.matchAll(/>([^<>{}][^<>{}]*)</g)) {
    const value = decodeJsString(match[1]).trim();
    if (value && !/^[\s|•·,.;:!?-]+$/.test(value)) textMatches.push(value);
  }
  for (const match of source.matchAll(/\b[A-Za-z_$][\w$]*=['"]([^'"]{20,})['"]/g)) {
    textMatches.push(decodeJsString(match[1]));
  }
  for (const match of source.matchAll(/\b[A-Za-z_$][\w$]*:\s*['"]([^'"]{20,})['"]/g)) {
    textMatches.push(decodeJsString(match[1]));
  }
  for (const match of source.matchAll(/['"]([^'"\n]{30,})['"]/g)) {
    const value = decodeJsString(match[1]);
    const wordCount = (value.match(/\b[\w'-]+\b/g) || []).length;
    if (wordCount >= 5) textMatches.push(value);
  }
  return [...new Set(textMatches)]
    .filter((value) => !/^(className|href|src|import|const)\b/.test(value))
    .filter((value) => !/^https?:\/\//.test(value))
    .filter((value) => !/^\/(services|resources|tools|contact|about)\b/.test(value))
    .filter((value) => !/(^|\s)(bg-|text-|border-|rounded-|grid|flex|space-|mx-|my-|px-|py-|mb-|mt-|w-|h-)/.test(value))
    .join('\n\n')
    .replace(/\s+\n/g, '\n')
    .trim();
}

function componentTextToStaticHtml(title, description, source) {
  const text = extractReadableTextFromComponent(source);
  const paragraphs = [description, ...text.split(/\n{2,}/)]
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 80);
  return paragraphs.map((part, index) => {
    if (index === 0) return `<p>${escapeHtml(part)}</p>`;
    if (part.length < 90 && /^[A-Z0-9][A-Za-z0-9\s&,'():/-]+$/.test(part)) {
      return `<h2>${escapeHtml(part)}</h2>`;
    }
    return `<p>${escapeHtml(part)}</p>`;
  }).join('\n');
}

function extractTagContent(source, tagName) {
  const match = source.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, 'i'));
  return match ? decodeJsString(match[1].replace(/\{[^}]*\}/g, '').trim()) : '';
}

function extractMetaContent(source, attr, value) {
  const regex = new RegExp(`<meta[^>]*${attr}=["']${escapeRegex(value)}["'][^>]*content=["']([^"']*)["'][^>]*>`, 'i');
  const match = source.match(regex);
  return match ? decodeJsString(match[1]) : '';
}

function extractAttrFromSelfClosingTag(source, tagName, attr) {
  const tagMatch = source.match(new RegExp(`<${tagName}[\\s\\S]*?\\/>`, 'i'));
  if (!tagMatch) return '';
  const attrMatch = tagMatch[0].match(new RegExp(`${attr}=\"([\\s\\S]*?)\"`, 'i'));
  return attrMatch ? decodeJsString(attrMatch[1]) : '';
}

function extractFirstAvailableAttr(source, tagNames, attr) {
  for (const tagName of tagNames) {
    const value = extractAttrFromSelfClosingTag(source, tagName, attr);
    if (value) return value;
  }
  return '';
}

function extractLinkHref(source, rel) {
  const regex = new RegExp(`<link[^>]*rel=["']${escapeRegex(rel)}["'][^>]*href=["']([^"']*)["'][^>]*>`, 'i');
  const match = source.match(regex);
  return match ? decodeJsString(match[1]) : '';
}

function slugToPhrase(slug) {
  return titleCase(slug.replace(/\//g, ' ').replace(/-/g, ' '));
}

function buildImportMap(source) {
  const importMap = new Map();
  for (const match of source.matchAll(/const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\("([^"]+)"\)\);/g)) {
    importMap.set(match[1], match[2]);
  }
  return importMap;
}

function buildRouteEntries(source) {
  const routes = [];
  for (const match of source.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<([^\s/>]+)(?:\s|\/>)/g)) {
    const routePath = match[1];
    const componentName = match[2];
    if (componentName === 'Navigate') continue;
    if (routePath === '*' || routePath.includes('*')) continue;
    routes.push({ path: routePath, componentName });
  }
  return routes;
}

function netlifyPatternToRegex(pattern) {
  let regex = '^';
  for (let i = 0; i < pattern.length; i += 1) {
    const char = pattern[i];
    if (char === ':') {
      let j = i + 1;
      while (j < pattern.length && /[A-Za-z0-9_-]/.test(pattern[j])) j += 1;
      const name = pattern.slice(i + 1, j);
      regex += name === 'splat' ? '.*' : '[^/]+';
      i = j - 1;
      continue;
    }
    if (char === '*') {
      regex += '.*';
      continue;
    }
    regex += escapeRegex(char);
  }
  regex += '$';
  return new RegExp(regex);
}

function parseRedirectAliases() {
  if (!fs.existsSync(netlifyTomlPath)) return { exact: new Set(), patterns: [] };
  const text = fs.readFileSync(netlifyTomlPath, 'utf8');
  const exact = new Set();
  const patterns = [];
  for (const block of text.split('[[redirects]]').slice(1)) {
    const fromMatch = block.match(/from\s*=\s*"([^"]+)"/);
    const toMatch = block.match(/to\s*=\s*"([^"]+)"/);
    const statusMatch = block.match(/status\s*=\s*(\d+)/);
    if (!fromMatch || !toMatch || !statusMatch) continue;
    const fromPath = fromMatch[1];
    const toPath = toMatch[1];
    const status = Number(statusMatch[1]);
    if (![301, 302].includes(status)) continue;
    const normalizedFrom = fromPath.startsWith('/') ? (fromPath.replace(/\/$/, '') || '/') : fromPath;
    const normalizedToRaw = toPath.startsWith('http://') || toPath.startsWith('https://')
      ? new URL(toPath).pathname
      : toPath;
    const normalizedTo = normalizedToRaw.startsWith('/') ? (normalizedToRaw.replace(/\/$/, '') || '/') : normalizedToRaw;
    if (!fromPath.startsWith('/') || normalizedFrom === normalizedTo || fromPath === '/*') continue;
    if (fromPath.includes(':') || fromPath.includes('*')) {
      patterns.push(netlifyPatternToRegex(fromPath));
    } else {
      exact.add(normalizedFrom);
    }
  }
  return { exact, patterns };
}

function isRedirectAlias(routePath, redirectAliases) {
  const normalized = routePath.replace(/\/$/, '') || '/';
  return redirectAliases.exact.has(normalized) || redirectAliases.patterns.some((pattern) => pattern.test(normalized));
}

function readComponentSource(importPath) {
  let filePath = path.join(srcDir, `${importPath.replace(/^\.\//, '')}.tsx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(srcDir, `${importPath.replace(/^\.\//, '')}.ts`);
  }
  if (!fs.existsSync(filePath)) return null;
  return { filePath, source: fs.readFileSync(filePath, 'utf8') };
}

function resolveImportFile(fromFilePath, importPath) {
  let basePath = '';
  if (importPath.startsWith('@/')) {
    basePath = path.join(srcDir, importPath.replace(/^@\//, ''));
  } else if (importPath.startsWith('.')) {
    basePath = path.resolve(path.dirname(fromFilePath), importPath);
  } else {
    return null;
  }

  for (const ext of ['.tsx', '.ts']) {
    const filePath = `${basePath}${ext}`;
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
}

function expandCityComponentSource(component) {
  const importedSources = [];
  for (const match of component.source.matchAll(/import\s+([A-Z]\w*)\s+from\s+['"]([^'"]+)['"]/g)) {
    const componentName = match[1];
    const importPath = match[2];
    if (!/(CityPage|CityTemplate)$/.test(componentName)) continue;
    if (!new RegExp(`<${componentName}\\b`).test(component.source)) continue;

    const importedFilePath = resolveImportFile(component.filePath, importPath);
    if (!importedFilePath || importedFilePath === component.filePath) continue;
    importedSources.push(fs.readFileSync(importedFilePath, 'utf8'));
  }
  return [component.source, ...importedSources].join('\n\n');
}

function pickStaticH1(componentSource, fallbackTitle) {
  const candidates = [...componentSource.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((match) => decodeJsString(match[1].replace(/<[^>]+>/g, '').replace(/\{[^}]*\}/g, '')).trim())
    .filter(Boolean)
    .filter((value) => !/^(loading|article not found|case study not found|coming soon)/i.test(value));
  return candidates[0] || fallbackTitle.replace(/\s*\|\s*Emet Capital.*$/, '').trim();
}

function extractComponentMeta(routePath, componentSource, sourcePath) {
  const seoTitle = extractFirstAvailableAttr(componentSource, ['SEO', 'BridgingFinanceCityPage'], 'title');
  const seoDescription = extractFirstAvailableAttr(componentSource, ['SEO', 'BridgingFinanceCityPage'], 'description');
  const seoKeywords = extractFirstAvailableAttr(componentSource, ['SEO', 'BridgingFinanceCityPage'], 'keywords');
  const seoCanonical = extractFirstAvailableAttr(componentSource, ['SEO', 'BridgingFinanceCityPage'], 'canonical');

  const helmetTitle = extractTagContent(componentSource, 'title');
  const helmetDescription = extractMetaContent(componentSource, 'name', 'description');
  const helmetKeywords = extractMetaContent(componentSource, 'name', 'keywords');
  const helmetCanonical = extractLinkHref(componentSource, 'canonical');

  const title = seoTitle || helmetTitle || `${slugToPhrase(routePath === '/' ? 'home' : routePath)} | Emet Capital`;
  const description = seoDescription || helmetDescription || `Explore ${slugToPhrase(routePath)} with Emet Capital.`;
  const keywords = seoKeywords || helmetKeywords || '';
  const canonical = normalizeCanonical(seoCanonical || helmetCanonical, routePath);
  const h1 = pickStaticH1(componentSource, title);

  return {
    routePath,
    title,
    description,
    keywords,
    canonical,
    h1,
    noscript: description,
    staticHtml: componentTextToStaticHtml(h1, description, componentSource),
    sourcePath,
  };
}

function parseMarkdownDirectory(relativeDir) {
  const fullDir = path.join(srcDir, relativeDir);
  return fs.readdirSync(fullDir)
    .filter((file) => file.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => {
      const raw = fs.readFileSync(path.join(fullDir, file), 'utf8');
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, '');
      return { slug, data, content };
    });
}

function toIsoDate(value) {
  if (!value) return '';
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function formatDisplayDate(value) {
  const dateValue = toIsoDate(value);
  if (!dateValue) return '';
  const parsed = new Date(`${dateValue}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return dateValue;
  return parsed.toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

function pickModifiedDate(frontmatter) {
  return (
    frontmatter.dateModified ||
    frontmatter.modified ||
    frontmatter.updated ||
    frontmatter.lastUpdated ||
    frontmatter.schema?.article?.dateModified ||
    frontmatter.date
  );
}

function staticArticleHeaderHtml(frontmatter, contentType) {
  const author = frontmatter.author || 'Emet Capital';
  const published = formatDisplayDate(frontmatter.date);
  const updated = formatDisplayDate(pickModifiedDate(frontmatter));
  const pieces = [`Written by ${escapeHtml(author)}`];
  if (published) pieces.push(`Published: ${escapeHtml(published)}`);
  if (updated) pieces.push(`Updated: ${escapeHtml(updated)}`);
  return `<p class="static-article-meta">${escapeHtml(contentType)} information. ${pieces.join('. ')}.</p>`;
}

function extractJsonLdFromMarkdown(markdown) {
  const schemas = [];
  for (const match of String(markdown || '').matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      schemas.push(JSON.parse(match[1].trim()));
    } catch {
      // Ignore malformed embedded schema and fall back to generated schema.
    }
  }
  return schemas;
}

function stripMarkdownSyntax(value) {
  return collapseWhitespace(String(value || '')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[*_`>#-]/g, ' ')
    .replace(/<[^>]+>/g, ' '));
}

function parseFaqsFromMarkdown(markdown) {
  const content = String(markdown || '');
  const sectionMatch = content.match(/(?:^|\n)##\s+(?:Frequently Asked Questions|FAQs?)([\s\S]*)/i);
  if (!sectionMatch) return [];
  const section = sectionMatch[1].split(/\n##\s+/)[0];
  const faqs = [];

  const headingMatches = [...section.matchAll(/\n###\s+(.+?)\n([\s\S]*?)(?=\n###\s+|\n##\s+|$)/g)];
  for (const match of headingMatches) {
    const question = stripMarkdownSyntax(match[1]);
    const answer = stripMarkdownSyntax(match[2]);
    if (question && answer && question.length < 180) faqs.push({ question, answer: trimAtWord(answer, 650) });
  }

  if (faqs.length > 0) return faqs.slice(0, 12);

  const boldMatches = [...section.matchAll(/\*\*(?:Q:\s*)?([^*?]+\?)\*\*\s*([\s\S]*?)(?=\n\*\*(?:Q:\s*)?[^*?]+\?\*\*|\n##\s+|$)/gi)];
  for (const match of boldMatches) {
    const question = stripMarkdownSyntax(match[1]);
    const answer = stripMarkdownSyntax(match[2]);
    if (question && answer) faqs.push({ question, answer: trimAtWord(answer, 650) });
  }
  return faqs.slice(0, 12);
}

function faqSchemaFromMarkdown(frontmatter, markdown) {
  if (frontmatter.schema?.faq?.['@type'] === 'FAQPage') return frontmatter.schema.faq;
  const embedded = extractJsonLdFromMarkdown(markdown).find((schema) => schema?.['@type'] === 'FAQPage');
  if (embedded) return embedded;
  const faqs = parseFaqsFromMarkdown(markdown);
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function articleSchema(routePath, frontmatter, markdownContent, contentType) {
  const title = frontmatter.title || slugToPhrase(routePath);
  const description = frontmatter.description || `Read this ${contentType.toLowerCase()} from Emet Capital.`;
  const datePublished = toIsoDate(frontmatter.date);
  const dateModified = toIsoDate(pickModifiedDate(frontmatter)) || datePublished;
  const keywords = Array.isArray(frontmatter.keywords || frontmatter.tags)
    ? (frontmatter.keywords || frontmatter.tags)
    : String(frontmatter.keyword || frontmatter.keywords || '').split(',').map((value) => value.trim()).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: frontmatter.author || businessName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: businessName,
      legalName,
      url: siteUrl,
      taxID: abn,
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'ABN',
        value: abn,
      },
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': normalizeCanonical(routePath, routePath),
    },
    articleSection: frontmatter.category || contentType,
    keywords,
    wordCount: (markdownContent.match(/\b[\w'-]+\b/g) || []).length,
    inLanguage: 'en-AU',
    isAccessibleForFree: true,
  };
}

function buildGuideMeta(routePath, frontmatter, sourcePath, markdownContent = '') {
  const title = frontmatter.title || slugToPhrase(routePath);
  const description = frontmatter.description || `Read our guide on ${slugToPhrase(routePath)}.`;
  const keywordValue = Array.isArray(frontmatter.keywords) ? frontmatter.keywords.join(', ') : (frontmatter.keyword || frontmatter.keywords || '');
  const baseMeta = {
    routePath,
    title: `${title} | Emet Capital`,
    description,
    keywords: keywordValue,
    canonical: normalizeCanonical(routePath, routePath),
    h1: title,
    noscript: description,
    staticHtml: `${staticArticleHeaderHtml(frontmatter, 'Guide')}\n${markdownToStaticHtml(markdownContent)}`,
    sourcePath,
  };
  const faqSchema = faqSchemaFromMarkdown(frontmatter, markdownContent);
  return {
    ...baseMeta,
    schemas: [
      ...defaultSchemas(baseMeta),
      articleSchema(routePath, frontmatter, markdownContent, 'Guide'),
      ...(faqSchema ? [faqSchema] : []),
    ],
  };
}

function buildCaseStudyMeta(routePath, frontmatter, sourcePath, markdownContent = '') {
  const title = frontmatter.title || slugToPhrase(routePath);
  const description = frontmatter.description || `Read this Emet Capital case study on ${slugToPhrase(routePath)}.`;
  const keywordValue = Array.isArray(frontmatter.keywords) ? frontmatter.keywords.join(', ') : (frontmatter.keyword || frontmatter.keywords || '');
  const baseMeta = {
    routePath,
    title: `${title} | Emet Capital Case Studies`,
    description,
    keywords: keywordValue,
    canonical: normalizeCanonical(routePath, routePath),
    h1: title,
    noscript: description,
    staticHtml: `${staticArticleHeaderHtml(frontmatter, 'Case study')}\n${markdownToStaticHtml(markdownContent)}`,
    sourcePath,
  };
  return {
    ...baseMeta,
    schemas: [
      ...defaultSchemas(baseMeta),
      articleSchema(routePath, frontmatter, markdownContent, 'Case Study'),
    ],
  };
}

function inferServiceCityMeta(routePath, componentMeta) {
  const parts = routePath.split('/').filter(Boolean);
  const citySlug = parts.at(-1) || '';
  const serviceSlug = parts.includes('cities') ? parts[parts.indexOf('cities') - 1] : parts.at(-2) || '';
  const city = titleCase(citySlug);
  const service = titleCase(serviceSlug);
  const inferredH1 = `${service} ${city}`;
  const baseTitle = componentMeta.title || `${service} ${city} | Emet Capital`;
  const cityDescription = buildCityMetaDescription(serviceSlug, service, city);
  const description = !componentMeta.description || /^Explore Services\b/i.test(componentMeta.description) || /solutions in .+ from Emet Capital/i.test(componentMeta.description)
    ? cityDescription
    : componentMeta.description;
  const keywords = componentMeta.keywords || `${service.toLowerCase()} ${city}, ${service.toLowerCase()} ${city} finance`;
  return {
    ...componentMeta,
    title: baseTitle,
    description,
    keywords,
    h1: componentMeta.h1 && componentMeta.h1.toLowerCase().includes(city.toLowerCase()) ? componentMeta.h1 : inferredH1,
    noscript: description,
  };
}

function buildCityMetaDescription(serviceSlug, service, city) {
  const templates = {
    'equipment-finance': `Equipment finance in ${city} for vehicles, machinery, medical assets and business equipment. Discuss lender fit, structure and documents with Emet Capital.`,
    'caveat-loans': `Caveat loan options in ${city} for business-purpose funding where property security, documents and exit are clear. Discuss fit with Emet Capital.`,
    'asset-backed-lending': `Asset-backed lending in ${city} for business borrowers using property, equipment or receivables as security. Discuss structure with Emet Capital.`,
    'bridging-finance': `Bridging finance in ${city} for commercial acquisitions, refinance gaps and settlement deadlines where security and exit are clear.`,
    'private-lending': `Private lending in ${city} for business borrowers who need non-bank options assessed against security, purpose, documents and exit.`,
    'first-second-mortgages': `First and second mortgage options in ${city} for business borrowers using property equity where security and exit are clear.`,
    'commercial-property-development': `Commercial property development finance in ${city} for site acquisition, construction and residual stock scenarios subject to assessment.`,
    'refinancing-solutions': `Commercial refinancing in ${city} for business borrowers seeking to restructure debt, release equity or solve timing pressure.`,
    'business-acquisition': `Business acquisition finance in ${city} for buyers assessing security, cash flow, vendor timing and repayment strategy.`,
    'debt-consolidation': `Business debt consolidation in ${city} for commercial borrowers wanting clearer repayments and a more workable debt structure.`,
    'working-capital': `Working capital finance in ${city} for business cash-flow timing, tax, inventory and supplier pressure subject to lender assessment.`,
    'trade-finance': `Trade finance in ${city} for importers, exporters and businesses managing supplier, inventory and payment timing.`,
    'smsf-lending': `SMSF commercial property lending in ${city} for trustees assessing LRBA structure, documents and compliance requirements.`,
  };
  return templates[serviceSlug] || `${service} options in ${city} for Australian business borrowers, subject to lender assessment and clear documents.`;
}

function replaceOrInsertMeta(html, attrs, content) {
  if (!content) return html;
  const attrPattern = Object.entries(attrs)
    .map(([k, v]) => `${k}=["']${escapeRegex(v)}["']`)
    .join('(?=[^>]*?)');
  const tagRegex = new RegExp(`<meta(?=[^>]*${attrPattern})[^>]*>`, 'i');
  const tag = `<meta ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')} content="${escapeHtml(content)}">`;
  if (tagRegex.test(html)) return html.replace(tagRegex, tag);
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function replaceOrInsertLink(html, rel, href) {
  const tagRegex = new RegExp(`<link(?=[^>]*rel=["']${escapeRegex(rel)}["'])[^>]*>`, 'i');
  const tag = `<link rel="${rel}" href="${href}">`;
  if (tagRegex.test(html)) return html.replace(tagRegex, tag);
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function replaceOrInsertHreflang(html, hrefLang, href) {
  const tagRegex = new RegExp(`<link(?=[^>]*rel=["']alternate["'])(?=[^>]*hreflang=["']${escapeRegex(hrefLang)}["'])[^>]*>`, 'i');
  const tag = `<link rel="alternate" hreflang="${hrefLang}" href="${href}" />`;
  if (tagRegex.test(html)) return html.replace(tagRegex, tag);
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function renderHtml(meta) {
  let html = baseHtml;
  html = html.replace(/<noscript><main class="static-seo-content"[\s\S]*?<\/main><\/noscript>/gi, '');
  html = html.replace(/\s*<!--[^>]*(?:JSON-LD|Organization Schema)[\s\S]*?-->\s*<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/\s*<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  html = replaceOrInsertMeta(html, { name: 'description' }, meta.description);
  html = replaceOrInsertMeta(html, { name: 'keywords' }, meta.keywords);
  html = replaceOrInsertMeta(html, { property: 'og:title' }, meta.title);
  html = replaceOrInsertMeta(html, { property: 'og:description' }, meta.description);
  html = replaceOrInsertMeta(html, { property: 'og:url' }, meta.canonical);
  html = replaceOrInsertMeta(html, { name: 'twitter:title' }, meta.title);
  html = replaceOrInsertMeta(html, { name: 'twitter:description' }, meta.description);
  html = replaceOrInsertLink(html, 'canonical', meta.canonical);
  html = replaceOrInsertHreflang(html, 'en-AU', meta.canonical);
  html = replaceOrInsertHreflang(html, 'en', meta.canonical);
  html = replaceOrInsertHreflang(html, 'x-default', meta.canonical);

  const schemaScripts = (meta.schemas?.length ? meta.schemas : defaultSchemas(meta))
    .filter(Boolean)
    .map(jsonLdScript)
    .join('\n  ');
  html = html.replace('</head>', `  ${schemaScripts}\n</head>`);

  const staticBody = meta.staticHtml || `<p>${escapeHtml(meta.noscript)}</p>`;
  const noscriptBlock = `<noscript><main class="static-seo-content" style="padding:24px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:960px;margin:0 auto;color:#111"><h1>${escapeHtml(meta.h1)}</h1>${staticBody}${staticFooterHtml()}</main></noscript>`;
  html = html.replace(/<body([^>]*)>/i, `<body$1>${noscriptBlock}`);
  return html;
}

const importMap = buildImportMap(appSource);
const routerEntries = buildRouteEntries(appSource);
const redirectAliases = parseRedirectAliases();
const generatedRoutes = new Map();
const skippedAliasRoutes = new Set();

for (const entry of routerEntries) {
  if (isRedirectAlias(entry.path, redirectAliases)) {
    skippedAliasRoutes.add(entry.path);
    continue;
  }

  if (entry.path.includes(':slug')) {
    if (entry.path.includes('/resources/guides/:slug')) {
      for (const article of parseMarkdownDirectory('content/guides')) {
        const routePath = entry.path.replace(':slug', article.slug);
        generatedRoutes.set(routePath, normalizeMeta(buildGuideMeta(routePath, article.data, `src/content/guides/${article.slug}.md`, article.content)));
      }
    }

    if (entry.path.includes('/resources/case-studies/:slug') || entry.path.includes('/case-studies/:slug')) {
      for (const article of parseMarkdownDirectory('content/case-studies')) {
        const routePath = entry.path.replace(':slug', article.slug);
        generatedRoutes.set(routePath, normalizeMeta(buildCaseStudyMeta(routePath, article.data, `src/content/case-studies/${article.slug}.md`, article.content)));
      }
    }
    continue;
  }

  const importPath = importMap.get(entry.componentName);
  if (!importPath) continue;

  const component = readComponentSource(importPath);
  if (!component) continue;

  const isServiceCityRoute = entry.path.includes('/cities/') || /\/services\/[^/]+\/(sydney|melbourne|brisbane|perth|adelaide|gold-coast)$/.test(entry.path);
  const sourceForStaticExtraction = isServiceCityRoute ? expandCityComponentSource(component) : component.source;

  const sourcePath = path.relative(repoRoot, component.filePath).replace(/\\/g, '/');
  let meta = extractComponentMeta(entry.path, sourceForStaticExtraction, sourcePath);
  if (isServiceCityRoute) {
    meta = inferServiceCityMeta(entry.path, meta);
  }

  generatedRoutes.set(entry.path, normalizeMeta(meta));
}

const jsonOutputPath = path.join(repoRoot, 'scripts', 'seo-route-data.generated.json');
const routeData = Object.fromEntries([...generatedRoutes.entries()].map(([route, meta]) => {
  const { staticHtml, schemas, ...publicMeta } = meta;
  return [route, publicMeta];
}));
fs.writeFileSync(jsonOutputPath, JSON.stringify(routeData, null, 2));

function removeRouteDirectory(route) {
  if (!route || route === '/') return;
  const routeDir = path.join(distDir, route.replace(/^\//, ''));
  if (fs.existsSync(routeDir)) fs.rmSync(routeDir, { recursive: true, force: true });
}

function removeStaleGeneratedArtifacts() {
  for (const route of skippedAliasRoutes) removeRouteDirectory(route);
  for (const artifact of ['*', '\uf02a']) {
    const artifactPath = path.join(distDir, artifact);
    if (fs.existsSync(artifactPath)) fs.rmSync(artifactPath, { recursive: true, force: true });
  }
}

removeStaleGeneratedArtifacts();

for (const [route, meta] of generatedRoutes.entries()) {
  const html = renderHtml(meta);
  const routeDir = route === '/' ? distDir : path.join(distDir, route.replace(/^\//, ''));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
}

console.log(`Generated static SEO HTML for ${generatedRoutes.size} routes.`);
