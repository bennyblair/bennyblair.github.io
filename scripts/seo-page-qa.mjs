import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import matter from 'gray-matter';

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, 'dist');
const guidesDir = path.join(repoRoot, 'src/content/guides');
const caseStudiesDir = path.join(repoRoot, 'src/content/case-studies');
const appPath = path.join(repoRoot, 'src/App.tsx');
const siteOrigin = 'https://emetcapital.com.au';

const args = process.argv.slice(2);
const fileArg = valueAfter('--file');
const routeArg = valueAfter('--route');

if ((fileArg && routeArg) || (!fileArg && !routeArg)) {
  console.error('Usage: node scripts/seo-page-qa.mjs --file <content.md>');
  console.error('   or: node scripts/seo-page-qa.mjs --route <path>');
  process.exit(1);
}

const validRoutes = loadValidRoutes();
const contentSlugs = loadContentSlugs();
const failures = [];
const warnings = [];

if (fileArg) {
  checkContentFile(fileArg);
} else {
  checkRoute(routeArg);
}

if (warnings.length) {
  console.warn('\nWarnings:');
  for (const warning of warnings) console.warn(`WARN: ${warning}`);
}

if (failures.length) {
  console.error('\nSEO page QA failed:');
  for (const failure of failures) console.error(`ERROR: ${failure}`);
  process.exit(1);
}

console.log('\nSEO page QA passed.');

function valueAfter(flag) {
  const index = args.indexOf(flag);
  if (index === -1) return '';
  return args[index + 1] || '';
}

function checkContentFile(inputPath) {
  const filePath = path.resolve(repoRoot, inputPath);
  const relPath = path.relative(repoRoot, filePath).replace(/\\/g, '/');
  const kind = contentKindForPath(filePath);

  console.log(`Checking content file: ${relPath}`);

  if (!kind) {
    failures.push('content file must be under src/content/guides or src/content/case-studies');
    return;
  }
  if (!fs.existsSync(filePath)) {
    failures.push(`file not found: ${relPath}`);
    return;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  const data = parsed.data || {};
  const body = parsed.content || '';
  const slug = path.basename(filePath, '.md');
  const route = kind === 'case-study'
    ? `/resources/case-studies/${slug}`
    : `/resources/guides/${slug}`;

  runArticleQa(relPath);
  checkRequiredFrontmatter(data, kind);
  checkLength('frontmatter title', data.title, 30, 60);
  checkLength('frontmatter description', data.description, 70, 160);
  checkUniqueContentField('title', data.title, filePath);
  checkUniqueContentField('description', data.description, filePath);
  checkMarkdownHeadingOrder(body);
  checkMarkdownImages(body);
  checkMarkdownInternalLinks(body, relPath);
  checkAnswerFirstBody(body);
  checkContentInternalExpectations(body, kind);

  console.log(`Route for file: ${route}`);
}

function runArticleQa(relPath) {
  const result = spawnSync(
    process.execPath,
    ['scripts/article-qa.mjs', relPath, '--fail-on-warnings'],
    { cwd: repoRoot, encoding: 'utf8' }
  );
  if (result.stdout.trim()) console.log(result.stdout.trim());
  if (result.stderr.trim()) console.error(result.stderr.trim());
  if (result.status !== 0) {
    failures.push(`existing article QA failed for ${relPath}`);
  } else {
    console.log('OK: existing article QA passed');
  }
}

function checkRequiredFrontmatter(data, kind) {
  const required = ['title', 'description', 'date', 'author', 'category'];
  for (const key of required) {
    if (!data[key]) failures.push(`missing frontmatter field: ${key}`);
  }
  if (!Array.isArray(data.tags) && !Array.isArray(data.keywords)) {
    failures.push('missing frontmatter tags or keywords array');
  }
  if (kind === 'case-study') {
    for (const key of ['loanAmount', 'loanType', 'industry', 'outcome']) {
      if (!data[key]) warnings.push(`case study is missing recommended field: ${key}`);
    }
  }
}

function checkRoute(routeInput) {
  const route = normalizeRoute(routeInput);
  const htmlPath = htmlPathForRoute(route);
  console.log(`Checking built route: ${route}`);

  if (!fs.existsSync(htmlPath)) {
    failures.push(`route HTML not found; run npm run build first: ${htmlPath}`);
    return;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const text = textFromHtml(html);
  const title = extractTitle(html);
  const description = extractMetaContent(html, 'description');
  const canonical = extractCanonical(html);
  const robots = extractMetaContent(html, 'robots');
  const viewport = extractMetaContent(html, 'viewport');
  const lang = extractHtmlLang(html);
  const headings = extractHeadings(html);
  const schemas = extractJsonLd(html);

  checkLength('rendered title', title, 30, 60);
  checkLength('rendered meta description', description, 70, 160);
  if (!canonical) failures.push('missing rendered canonical');
  if (canonical && canonical !== `${siteOrigin}${route === '/' ? '/' : route}`) {
    failures.push(`canonical is not self-referential: ${canonical}`);
  }
  if (!robots) failures.push('missing rendered robots meta');
  if (robots && /\bnoindex\b|\bnofollow\b/i.test(robots)) failures.push(`restrictive robots meta: ${robots}`);
  if (lang !== 'en') failures.push(`html lang must be "en"; got "${lang || 'missing'}"`);
  if (!viewport) failures.push('missing viewport meta');
  if ((headings.filter((heading) => heading.level === 1)).length !== 1) {
    failures.push(`expected exactly one h1; got ${headings.filter((heading) => heading.level === 1).length}`);
  }
  checkHeadingJumps(headings);
  checkJsonLd(schemas, route, text);
  checkRenderedImages(html);
  checkRenderedInternalLinks(html, route);
}

function checkLength(label, value, min, max) {
  const length = String(value || '').trim().length;
  if (!length) {
    failures.push(`missing ${label}`);
  } else if (length < min || length > max) {
    failures.push(`${label} length ${length} outside ${min}-${max}`);
  }
}

function checkUniqueContentField(field, value, currentFile) {
  if (!value) return;
  const matches = [];
  for (const file of contentFiles()) {
    if (file === currentFile) continue;
    const parsed = matter(fs.readFileSync(file, 'utf8'));
    if (String(parsed.data?.[field] || '').trim() === String(value).trim()) {
      matches.push(path.relative(repoRoot, file).replace(/\\/g, '/'));
    }
  }
  if (matches.length) failures.push(`duplicate ${field} also used by ${matches.join(', ')}`);
}

function checkMarkdownHeadingOrder(body) {
  let previous = 1;
  let inFence = false;
  for (const [index, line] of body.split('\n').entries()) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{1,6})\s+(.+)$/.exec(line);
    if (!match) continue;
    const level = match[1].length;
    if (level === 1) failures.push(`Markdown body must not contain h1 at line ${index + 1}`);
    if (level > previous + 1) failures.push(`heading level jumps from h${previous} to h${level} at line ${index + 1}: ${match[2]}`);
    previous = level;
  }
}

function checkMarkdownImages(body) {
  for (const match of body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    if (!match[1].trim()) failures.push(`image is missing alt text: ${match[2]}`);
  }
}

function checkMarkdownInternalLinks(body, relPath) {
  for (const match of body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    const url = match[2].trim();
    if (!url || url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) continue;
    if (url.startsWith('/')) {
      const cleanUrl = normalizeRoute(url.split('#')[0].split('?')[0]);
      if (!isKnownInternalRoute(cleanUrl)) {
        failures.push(`${relPath} links to unknown internal route: ${url}`);
      }
    }
  }
}

function checkAnswerFirstBody(body) {
  const firstParagraph = body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('---') && !block.startsWith('>') && !block.startsWith('#'));
  if (!firstParagraph) {
    failures.push('body needs an answer-first opening paragraph before section lists');
  } else if (wordCount(firstParagraph) < 25) {
    warnings.push('opening paragraph is short; confirm it answers the page intent directly');
  }
}

function checkContentInternalExpectations(body, kind) {
  const links = [...body.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
  const hasServiceLink = links.some((url) => url.startsWith('/services/'));
  const hasResourceLink = links.some((url) => url.startsWith('/resources/guides/') || url.startsWith('/resources/case-studies/'));
  if (kind === 'guide' && !hasServiceLink) failures.push('guide must include at least one relevant service-page link');
  if (!hasResourceLink) failures.push(`${kind} must include at least one relevant guide or case-study link`);
}

function checkHeadingJumps(headings) {
  for (let i = 1; i < headings.length; i++) {
    const previous = headings[i - 1];
    const current = headings[i];
    if (current.level > previous.level + 1) {
      failures.push(`heading level jumps from h${previous.level} to h${current.level}: ${current.text}`);
    }
  }
}

function checkJsonLd(schemas, route, text) {
  const invalid = schemas.filter((schema) => !schema.valid);
  for (const schema of invalid) failures.push(`invalid JSON-LD block ${schema.index}: ${schema.error}`);
  const types = new Set(schemas.flatMap((schema) => schema.types));
  if (route !== '/' && !types.has('BreadcrumbList')) failures.push('missing BreadcrumbList JSON-LD');
  if (route.startsWith('/resources/guides/') && !types.has('Article')) failures.push('guide route missing Article JSON-LD');
  if (route.startsWith('/resources/case-studies/') && !types.has('Article')) failures.push('case-study route missing Article JSON-LD');
  if (/frequently asked questions/i.test(text) && !types.has('FAQPage')) warnings.push('visible FAQ wording found without FAQPage JSON-LD');
  if (route === '/' && !types.has('Organization') && !types.has('FinancialService')) {
    failures.push('homepage missing Organization or FinancialService JSON-LD');
  }
}

function checkRenderedImages(html) {
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt\s*=/.test(match[0])) failures.push(`rendered image missing alt attribute: ${match[0].slice(0, 120)}`);
  }
}

function checkRenderedInternalLinks(html, route) {
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
    const href = match[1];
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (!href.startsWith('/')) continue;
    const clean = normalizeRoute(href.split('#')[0].split('?')[0]);
    if (clean === route || clean.startsWith('/assets/')) continue;
    if (!isKnownInternalRoute(clean) && !htmlPathExists(clean)) failures.push(`rendered link points to unknown route: ${href}`);
  }
}

function contentKindForPath(filePath) {
  const rel = path.relative(repoRoot, filePath).replace(/\\/g, '/');
  if (rel.startsWith('src/content/guides/') && rel.endsWith('.md')) return 'guide';
  if (rel.startsWith('src/content/case-studies/') && rel.endsWith('.md')) return 'case-study';
  return '';
}

function contentFiles() {
  return [guidesDir, caseStudiesDir].flatMap((dir) => {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => path.join(dir, file));
  });
}

function loadContentSlugs() {
  return {
    guides: new Set(fs.existsSync(guidesDir) ? fs.readdirSync(guidesDir).filter((file) => file.endsWith('.md')).map((file) => path.basename(file, '.md')) : []),
    caseStudies: new Set(fs.existsSync(caseStudiesDir) ? fs.readdirSync(caseStudiesDir).filter((file) => file.endsWith('.md')).map((file) => path.basename(file, '.md')) : []),
  };
}

function loadValidRoutes() {
  const routes = new Set(['/']);
  if (!fs.existsSync(appPath)) return routes;
  const app = fs.readFileSync(appPath, 'utf8');
  for (const match of app.matchAll(/<Route path=["']([^"']+)["']/g)) {
    if (!match[1].includes(':') && !match[1].includes('*')) routes.add(normalizeRoute(match[1]));
  }
  return routes;
}

function isKnownInternalRoute(route) {
  if (validRoutes.has(route)) return true;
  if (route.startsWith('/resources/guides/')) return contentSlugs.guides.has(route.replace('/resources/guides/', ''));
  if (route.startsWith('/resources/case-studies/')) return contentSlugs.caseStudies.has(route.replace('/resources/case-studies/', ''));
  return false;
}

function normalizeRoute(route) {
  if (!route) return '/';
  const normalized = `/${String(route).replace(/^\/+/, '').replace(/\/+$/, '')}`;
  return normalized === '/' ? '/' : normalized;
}

function htmlPathForRoute(route) {
  return route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

function htmlPathExists(route) {
  return fs.existsSync(htmlPathForRoute(route));
}

function extractTitle(html) {
  return decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
}

function extractMetaContent(html, name) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    const tagName = attr(tag, 'name') || attr(tag, 'property');
    if (String(tagName).toLowerCase() === name.toLowerCase()) return decodeHtml(attr(tag, 'content') || '');
  }
  return '';
}

function extractCanonical(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    if (String(attr(tag, 'rel')).toLowerCase() === 'canonical') return decodeHtml(attr(tag, 'href') || '');
  }
  return '';
}

function extractHtmlLang(html) {
  const tag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  return decodeHtml(attr(tag, 'lang') || '');
}

function attr(tag, name) {
  const pattern = new RegExp(`\\b${name}\\s*=\\s*([\"'])(.*?)\\1`, 'i');
  return tag.match(pattern)?.[2] || '';
}

function extractHeadings(html) {
  return [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: textFromHtml(match[2]).slice(0, 100),
  }));
}

function extractJsonLd(html) {
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match, index) => {
    try {
      const parsed = JSON.parse(match[1].trim());
      return { index, valid: true, types: schemaTypes(parsed) };
    } catch (error) {
      return { index, valid: false, error: error.message, types: [] };
    }
  });
}

function schemaTypes(value) {
  if (Array.isArray(value)) return value.flatMap(schemaTypes);
  if (!value || typeof value !== 'object') return [];
  const ownType = value['@type'] ? [value['@type']] : [];
  const graphTypes = Array.isArray(value['@graph']) ? value['@graph'].flatMap(schemaTypes) : [];
  return [...ownType, ...graphTypes];
}

function textFromHtml(html) {
  return decodeHtml(String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim());
}

function decodeHtml(value) {
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
  return (String(text || '').match(/\b[\w'-]+\b/g) || []).length;
}
