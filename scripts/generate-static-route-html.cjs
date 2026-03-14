const fs = require('fs');
const path = require('path');

const distDir = path.join(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');
const routes = require('./seo-route-data.json');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf8');

function replaceOrInsertMeta(html, attrs, content, selfClose = true) {
  const attrPattern = Object.entries(attrs)
    .map(([k, v]) => `${k}=["']${v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`)
    .join('(?=[^>]*?)');
  const tagRegex = new RegExp(`<meta(?=[^>]*${attrPattern})[^>]*>`, 'i');
  const tag = `<meta ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')} content="${content}">${selfClose ? '' : ''}`;
  if (tagRegex.test(html)) return html.replace(tagRegex, tag);
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function replaceOrInsertLink(html, rel, href) {
  const tagRegex = new RegExp(`<link(?=[^>]*rel=["']${rel}["'])[^>]*>`, 'i');
  const tag = `<link rel="${rel}" href="${href}">`;
  if (tagRegex.test(html)) return html.replace(tagRegex, tag);
  return html.replace('</head>', `  ${tag}\n</head>`);
}

for (const [route, meta] of Object.entries(routes)) {
  let html = baseHtml;
  html = html.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);
  html = replaceOrInsertMeta(html, { name: 'description' }, meta.description);
  html = replaceOrInsertMeta(html, { property: 'og:title' }, meta.title);
  html = replaceOrInsertMeta(html, { property: 'og:description' }, meta.description);
  html = replaceOrInsertMeta(html, { property: 'og:url' }, meta.canonical);
  html = replaceOrInsertMeta(html, { name: 'twitter:title' }, meta.title);
  html = replaceOrInsertMeta(html, { name: 'twitter:description' }, meta.description);
  html = replaceOrInsertLink(html, 'canonical', meta.canonical);

  const noscriptBlock = `<noscript><main style="padding:24px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:960px;margin:0 auto;color:#111"><h1>${meta.h1}</h1><p>${meta.noscript}</p></main></noscript>`;
  html = html.replace(/<body([^>]*)>/i, `<body$1>${noscriptBlock}`);

  const routeDir = route === '/' ? distDir : path.join(distDir, route.replace(/^\//, ''));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
}

console.log(`Generated static SEO HTML for ${Object.keys(routes).length} routes.`);
