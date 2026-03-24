import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const repoRoot = process.cwd();
const guidesDir = path.join(repoRoot, 'src/content/guides');
const seoRouteDataPath = path.join(repoRoot, 'scripts/seo-route-data.generated.json');
const sitemapPath = path.join(repoRoot, 'public/sitemap.xml');

const args = process.argv.slice(2);
const fileArgs = [];
let previewBase = '';
let failOnWarnings = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--preview-base') {
    previewBase = args[i + 1] || '';
    i++;
    continue;
  }
  if (arg === '--fail-on-warnings') {
    failOnWarnings = true;
    continue;
  }
  fileArgs.push(arg);
}

if (fileArgs.length === 0) {
  console.error('Usage: node scripts/article-qa.mjs <article.md...> [--preview-base <url>] [--fail-on-warnings]');
  process.exit(1);
}

const allGuideSlugs = new Set(
  fs.readdirSync(guidesDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
);
const seoRouteData = fs.existsSync(seoRouteDataPath)
  ? JSON.parse(fs.readFileSync(seoRouteDataPath, 'utf8'))
  : {};
const sitemapXml = fs.existsSync(sitemapPath)
  ? fs.readFileSync(sitemapPath, 'utf8')
  : '';

function extractGuideLinks(content) {
  return [...content.matchAll(/\]\((\/resources\/guides\/[^)]+)\)/g)].map((match) => match[1]);
}

function getArticleRoute(filePath) {
  const slug = path.basename(filePath, '.md');
  return `/resources/guides/${slug}`;
}

function extractSection(content, heading) {
  const lines = content.split('\n');
  const startIndex = lines.findIndex((line) => {
    const trimmed = line.trim();
    return trimmed === `### ${heading}` || trimmed === `## ${heading}`;
  });

  if (startIndex === -1) return '';

  const collected = [];
  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^##\s+/.test(line) || /^###\s+/.test(line)) break;
    collected.push(line);
  }
  return collected.join('\n').trim();
}

function extractSectionGuideSlugs(section) {
  return [...section.matchAll(/\]\((\/resources\/guides\/[^)]+)\)/g)]
    .map((match) => match[1].split('/resources/guides/')[1]);
}

async function checkUrl(url) {
  const response = await fetch(url, { redirect: 'follow' });
  return { ok: response.ok, status: response.status, finalUrl: response.url };
}

let errorCount = 0;
let warningCount = 0;

for (const fileArg of fileArgs) {
  const filePath = path.isAbsolute(fileArg) ? fileArg : path.join(repoRoot, fileArg);
  const relPath = path.relative(repoRoot, filePath);
  console.log(`\n=== ${relPath} ===`);

  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: file not found: ${relPath}`);
    errorCount++;
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  matter(raw);

  const articleRoute = getArticleRoute(filePath);
  const canonicalUrl = `https://emetcapital.com.au${articleRoute}`;

  const guideLinks = extractGuideLinks(raw);
  const missingSlugs = [];
  for (const url of guideLinks) {
    const slug = url.split('/resources/guides/')[1];
    if (!allGuideSlugs.has(slug)) {
      missingSlugs.push(url);
    }
  }

  if (missingSlugs.length) {
    console.error('ERROR: missing guide slugs:');
    for (const slug of missingSlugs) console.error(`  - ${slug}`);
    errorCount += missingSlugs.length;
  } else {
    console.log(`OK: ${guideLinks.length} internal guide links resolved`);
  }

  const topSection = extractSection(raw, 'Related In-Depth Guides');
  const bottomSection = extractSection(raw, 'Related Guides');
  const topSlugs = extractSectionGuideSlugs(topSection);
  const bottomSlugs = extractSectionGuideSlugs(bottomSection);

  if (!topSection) {
    console.warn('WARN: missing top Related In-Depth Guides section');
    warningCount++;
  }
  if (!bottomSection) {
    console.warn('WARN: missing bottom Related Guides section');
    warningCount++;
  }

  if (topSlugs.length && bottomSlugs.length) {
    const identical = topSlugs.length === bottomSlugs.length && topSlugs.every((slug, i) => slug === bottomSlugs[i]);
    if (identical) {
      console.warn('WARN: top and bottom related-guide lists are identical');
      warningCount++;
    } else {
      console.log(`OK: top/bottom related-guide blocks are distinct (${topSlugs.length} top, ${bottomSlugs.length} bottom)`);
    }
  }

  const routeMeta = seoRouteData[articleRoute];
  if (!routeMeta) {
    console.error(`ERROR: generated SEO route data is missing ${articleRoute}`);
    errorCount++;
  } else {
    console.log(`OK: generated SEO route data includes ${articleRoute}`);
  }

  if (!sitemapXml.includes(`<loc>${canonicalUrl}</loc>`)) {
    console.error(`ERROR: sitemap.xml is missing ${canonicalUrl}`);
    errorCount++;
  } else {
    console.log(`OK: sitemap.xml includes ${canonicalUrl}`);
  }

  if (previewBase) {
    const slug = path.basename(filePath, '.md');
    const previewUrl = `${previewBase.replace(/\/$/, '')}/resources/guides/${slug}`;
    try {
      const result = await checkUrl(previewUrl);
      if (!result.ok) {
        console.error(`ERROR: preview URL returned ${result.status}: ${previewUrl}`);
        errorCount++;
      } else {
        console.log(`OK: preview URL ${result.status} ${previewUrl}`);
      }
    } catch (error) {
      console.error(`ERROR: preview URL check failed for ${previewUrl}`);
      console.error(`  ${error.message}`);
      errorCount++;
    }
  }
}

if (errorCount > 0) {
  console.error(`\nFAIL: ${errorCount} error(s), ${warningCount} warning(s)`);
  process.exit(1);
}

if (failOnWarnings && warningCount > 0) {
  console.error(`\nFAIL: 0 errors, ${warningCount} warning(s) treated as failure`);
  process.exit(1);
}

console.log(`\nPASS: 0 errors, ${warningCount} warning(s)`);
