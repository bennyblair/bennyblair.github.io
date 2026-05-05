import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, 'dist');
const sitemapPath = path.join(distDir, 'sitemap.xml');

const routes = [
  '/',
  '/services/commercial-property-finance',
  '/resources/guides/caveat-loans-australia-complete-guide',
  '/resources/guides/second-mortgages-for-business-guide',
  '/resources/guides/bridging-finance-australia-complete-property-guide',
  '/resources/guides/what-is-private-lending-australia',
  '/resources/case-studies/case-study-second-mortgage-saved-this-business-50k',
];

function htmlPathForRoute(route) {
  return route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

function textFromHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeHtmlEntities(value) {
  return String(value || '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function wordCount(text) {
  return (text.match(/\b[\w'-]+\b/g) || []).length;
}

function schemaTypesFromHtml(html) {
  const types = [];
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed['@type']) types.push(parsed['@type']);
    } catch {
      types.push('INVALID_JSON_LD');
    }
  }
  return types;
}

function routeFromHtmlFile(file) {
  const dir = path.dirname(file);
  const relative = path.relative(distDir, dir).replace(/\\/g, '/');
  return relative ? `/${relative}` : '/';
}

function sitemapRoutes() {
  if (!fs.existsSync(sitemapPath)) return new Set();
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  return new Set([...xml.matchAll(/<loc>https:\/\/emetcapital\.com\.au([^<]*)<\/loc>/g)].map((match) => {
    const route = match[1] || '/';
    return route === '' ? '/' : route;
  }));
}

function minWordsForRoute(route) {
  if (route.startsWith('/resources/guides/')) return 1000;
  if (route.startsWith('/resources/case-studies/')) return 500;
  if (route.startsWith('/services/') && route.includes('/cities/')) return 300;
  if (/^\/services\/[^/]+\/(sydney|melbourne|brisbane|perth|adelaide|gold-coast)$/.test(route)) return 300;
  if (route.startsWith('/services/')) return 500;
  return 80;
}

function walkHtmlFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtmlFiles(file, out);
    } else if (entry.isFile() && entry.name === 'index.html') {
      out.push(file);
    }
  }
  return out;
}

let failures = 0;
for (const route of routes) {
  const file = htmlPathForRoute(route);
  if (!fs.existsSync(file)) {
    console.error(`FAIL ${route}: missing ${file}`);
    failures += 1;
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const text = textFromHtml(html);
  const h1 = /<h1[\s>]/i.test(html);
  const canonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  const minChars = route === '/' ? 600 : 2000;
  const ok = text.length >= minChars && h1 && canonical;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${route}: textChars=${text.length} h1=${h1} canonical=${canonical}`);
  if (!ok) failures += 1;
}

const canonicalRoutes = sitemapRoutes();
const htmlFiles = walkHtmlFiles(distDir);

for (const file of htmlFiles) {
  const route = routeFromHtmlFile(file);
  if (!canonicalRoutes.has(route)) continue;

  const html = fs.readFileSync(file, 'utf8');
  const text = textFromHtml(html);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const canonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  const title = decodeHtmlEntities(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
  const description = decodeHtmlEntities(html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)?.[1] || '');
  const words = wordCount(text);
  const minWords = minWordsForRoute(route);
  const schemaTypes = schemaTypesFromHtml(html);

  const errors = [];
  if (h1Count !== 1) errors.push(`h1Count=${h1Count}`);
  if (!canonical) errors.push('canonical=false');
  if (title.length > 60) errors.push(`titleLength=${title.length}`);
  if (description.length > 155) errors.push(`descriptionLength=${description.length}`);
  if (words < minWords) errors.push(`rawWords=${words}<${minWords}`);
  if (!html.includes('50 682 228 182')) errors.push('abnMissing');
  if (!/<a href="\/editorial-standards"/i.test(html)) errors.push('staticEditorialLinkMissing');
  if (!/<a href="\/complaints-process"/i.test(html)) errors.push('staticComplaintsLinkMissing');
  if (route !== '/' && !schemaTypes.includes('BreadcrumbList')) errors.push('breadcrumbSchemaMissing');
  if (route.startsWith('/resources/guides/')) {
    if (!schemaTypes.includes('Article')) errors.push('articleSchemaMissing');
    if (/Frequently Asked Questions/i.test(text) && !schemaTypes.includes('FAQPage')) errors.push('faqSchemaMissing');
    if (!/Written by/i.test(html) || !/Published:/i.test(html) || !/Updated:/i.test(html)) errors.push('articleMetaMissing');
  }
  if (route.startsWith('/resources/case-studies/')) {
    if (!schemaTypes.includes('Article')) errors.push('caseStudyArticleSchemaMissing');
    if (!/Written by/i.test(html) || !/Published:/i.test(html) || !/Updated:/i.test(html)) errors.push('caseStudyMetaMissing');
  }

  if (errors.length) {
    console.error(`FAIL ${route}: ${errors.join(' ')}`);
    failures += 1;
  }
}

if (failures) {
  console.error(`GEO static HTML QA failed: ${failures} route(s)`);
  process.exit(1);
}

console.log('GEO static HTML QA passed.');
