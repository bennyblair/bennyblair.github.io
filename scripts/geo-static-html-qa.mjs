import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, 'dist');

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

if (failures) {
  console.error(`GEO static HTML QA failed: ${failures} route(s)`);
  process.exit(1);
}

console.log('GEO static HTML QA passed.');
