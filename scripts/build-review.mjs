import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const steps = [
  ['node_modules/vite/bin/vite.js', 'build', '--mode', 'review'],
  ['node_modules/tsx/dist/cli.mjs', 'scripts/prerender-site.ts'],
  ['node_modules/tsx/dist/cli.mjs', 'scripts/generate-site-files.ts'],
  ['node_modules/tsx/dist/cli.mjs', 'scripts/verify-built-site.ts'],
];
for (const args of steps) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit', env: { ...process.env, VITE_DESIGN_PREVIEW: 'true' } });
  if (result.status !== 0) process.exit(result.status || 1);
}
let count = 0;
function protect(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { protect(file); continue; }
    if (!file.endsWith('.html')) continue;
    let html = fs.readFileSync(file, 'utf8');
    if (/googletagmanager\.com|gtag\("config"/.test(html)) throw new Error(`Production analytics in ${file}`);
    html = html.replace(/<meta\b(?=[^>]*name="robots")[^>]*>/gi, '');
    html = html.replace('</head>', '<meta name="robots" content="noindex, nofollow, noarchive" /><meta http-equiv="Content-Security-Policy" content="form-action \'none\'" /></head>');
    // Native links remain on this review copy; canonical and schema URLs stay production.
    html = html.replace(/href="https:\/\/(?:www\.)?emetcapital\.com\.au(\/[^"\s]*)?"/g, (match, route, offset, source) => {
      const start = source.lastIndexOf('<', offset);
      return /^<a\b/i.test(source.slice(start, offset)) ? `href="${route || '/'}"` : match;
    });
    fs.writeFileSync(file, html);
    count++;
  }
}
protect('dist');
if (fs.existsSync('dist/admin/index.html')) {
  fs.writeFileSync('dist/admin/index.html', '<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Private design review</title></head><body><main><h1>Private design review</h1><p>Content administration is unavailable in this review copy.</p><a href="/">Return to Emet Capital</a></main></body></html>');
}
fs.writeFileSync('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
fs.appendFileSync('dist/_headers', '\n/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n  Content-Security-Policy: form-action \'none\'\n');
console.log(`Private review protections applied to ${count} HTML documents. Production build is unchanged.`);
