import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const repoRoot = process.cwd();
const srcDir = path.join(repoRoot, 'src');
const distDir = path.join(repoRoot, 'dist');
const indexPath = path.join(distDir, 'index.html');
const appPath = path.join(srcDir, 'App.tsx');
const siteUrl = 'https://emetcapital.com.au';

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

function stripUnsafeHtml(value) {
  return String(value || '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/href=("|')javascript:[\s\S]*?\1/gi, 'href="#"');
}

function markdownToStaticHtml(markdown) {
  const withoutLdJson = String(markdown || '').replace(/<script[\s\S]*?<\/script>/gi, '');
  return stripUnsafeHtml(marked.parse(withoutLdJson, { async: false, gfm: true }));
}

function extractReadableTextFromComponent(source) {
  const textMatches = [];
  for (const match of source.matchAll(/>([^<>{}][^<>{}]*)</g)) {
    const value = decodeJsString(match[1]).trim();
    if (value && !/^[\s|•·,.;:!?-]+$/.test(value)) textMatches.push(value);
  }
  for (const match of source.matchAll(/(?:title|description|subtitle|label|children)=['"]([^'"]{20,})['"]/g)) {
    textMatches.push(decodeJsString(match[1]));
  }
  return [...new Set(textMatches)]
    .filter((value) => !/^(className|href|src|import|const)\b/.test(value))
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
    routes.push({ path: routePath, componentName });
  }
  return routes;
}

function readComponentSource(importPath) {
  let filePath = path.join(srcDir, `${importPath.replace(/^\.\//, '')}.tsx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(srcDir, `${importPath.replace(/^\.\//, '')}.ts`);
  }
  if (!fs.existsSync(filePath)) return null;
  return { filePath, source: fs.readFileSync(filePath, 'utf8') };
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
  const h1Match = componentSource.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? decodeJsString(h1Match[1].replace(/<[^>]+>/g, '')) : title.replace(/\s*\|\s*Emet Capital.*$/, '').trim();

  return {
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
    .map((file) => {
      const raw = fs.readFileSync(path.join(fullDir, file), 'utf8');
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, '');
      return { slug, data, content };
    });
}

function buildGuideMeta(routePath, frontmatter, sourcePath, markdownContent = '') {
  const title = frontmatter.title || slugToPhrase(routePath);
  const description = frontmatter.description || `Read our guide on ${slugToPhrase(routePath)}.`;
  const keywordValue = Array.isArray(frontmatter.keywords) ? frontmatter.keywords.join(', ') : (frontmatter.keyword || frontmatter.keywords || '');
  return {
    title: `${title} | Emet Capital`,
    description,
    keywords: keywordValue,
    canonical: normalizeCanonical(routePath, routePath),
    h1: title,
    noscript: description,
    staticHtml: markdownToStaticHtml(markdownContent),
    sourcePath,
  };
}

function buildCaseStudyMeta(routePath, frontmatter, sourcePath, markdownContent = '') {
  const title = frontmatter.title || slugToPhrase(routePath);
  const description = frontmatter.description || `Read this Emet Capital case study on ${slugToPhrase(routePath)}.`;
  const keywordValue = Array.isArray(frontmatter.keywords) ? frontmatter.keywords.join(', ') : (frontmatter.keyword || frontmatter.keywords || '');
  return {
    title: `${title} | Emet Capital Case Studies`,
    description,
    keywords: keywordValue,
    canonical: normalizeCanonical(routePath, routePath),
    h1: title,
    noscript: description,
    staticHtml: markdownToStaticHtml(markdownContent),
    sourcePath,
  };
}

function inferServiceCityMeta(routePath, componentMeta) {
  const parts = routePath.split('/').filter(Boolean);
  const citySlug = parts.at(-1) || '';
  const serviceSlug = parts.includes('cities') ? parts[parts.indexOf('cities') - 1] : parts.at(-2) || '';
  const city = titleCase(citySlug);
  const service = titleCase(serviceSlug);
  const baseTitle = componentMeta.title || `${service} ${city} | Emet Capital`;
  const description = componentMeta.description || `${service} solutions in ${city} from Emet Capital.`;
  const keywords = componentMeta.keywords || `${service.toLowerCase()} ${city}, ${service.toLowerCase()} ${city} finance`;
  return {
    ...componentMeta,
    title: baseTitle,
    description,
    keywords,
    h1: componentMeta.h1 || `${service} ${city}`,
    noscript: description,
  };
}

function replaceOrInsertMeta(html, attrs, content) {
  if (!content) return html;
  const attrPattern = Object.entries(attrs)
    .map(([k, v]) => `${k}=["']${escapeRegex(v)}["']`)
    .join('(?=[^>]*?)');
  const tagRegex = new RegExp(`<meta(?=[^>]*${attrPattern})[^>]*>`, 'i');
  const tag = `<meta ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')} content="${content}">`;
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
  html = html.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);
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

  const staticBody = meta.staticHtml || `<p>${escapeHtml(meta.noscript)}</p>`;
  const noscriptBlock = `<noscript><main class="static-seo-content" style="padding:24px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:960px;margin:0 auto;color:#111"><h1>${escapeHtml(meta.h1)}</h1>${staticBody}</main></noscript>`;
  html = html.replace(/<body([^>]*)>/i, `<body$1>${noscriptBlock}`);
  return html;
}

const importMap = buildImportMap(appSource);
const routerEntries = buildRouteEntries(appSource);
const generatedRoutes = new Map();

for (const entry of routerEntries) {
  if (entry.path.includes(':slug')) {
    if (entry.path.includes('/resources/guides/:slug')) {
      for (const article of parseMarkdownDirectory('content/guides')) {
        const routePath = entry.path.replace(':slug', article.slug);
        generatedRoutes.set(routePath, buildGuideMeta(routePath, article.data, `src/content/guides/${article.slug}.md`, article.content));
      }
    }

    if (entry.path.includes('/resources/case-studies/:slug') || entry.path.includes('/case-studies/:slug')) {
      for (const article of parseMarkdownDirectory('content/case-studies')) {
        const routePath = entry.path.replace(':slug', article.slug);
        generatedRoutes.set(routePath, buildCaseStudyMeta(routePath, article.data, `src/content/case-studies/${article.slug}.md`, article.content));
      }
    }
    continue;
  }

  const importPath = importMap.get(entry.componentName);
  if (!importPath) continue;

  const component = readComponentSource(importPath);
  if (!component) continue;

  let meta = extractComponentMeta(entry.path, component.source, path.relative(repoRoot, component.filePath));
  if (entry.path.includes('/cities/') || /\/services\/[^/]+\/(sydney|melbourne|brisbane|perth|adelaide|gold-coast)$/.test(entry.path)) {
    meta = inferServiceCityMeta(entry.path, meta);
  }

  generatedRoutes.set(entry.path, meta);
}

const jsonOutputPath = path.join(repoRoot, 'scripts', 'seo-route-data.generated.json');
const routeData = Object.fromEntries([...generatedRoutes.entries()].map(([route, meta]) => {
  const { staticHtml, ...publicMeta } = meta;
  return [route, publicMeta];
}));
fs.writeFileSync(jsonOutputPath, JSON.stringify(routeData, null, 2));

for (const [route, meta] of generatedRoutes.entries()) {
  const html = renderHtml(meta);
  const routeDir = route === '/' ? distDir : path.join(distDir, route.replace(/^\//, ''));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
}

console.log(`Generated static SEO HTML for ${generatedRoutes.size} routes.`);
