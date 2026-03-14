const fs = require('fs');
const path = require('path');

const baseUrl = 'https://emetcapital.com.au';
const distDir = path.join(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');

const routes = {
  '/': {
    title: 'Commercial Lending Solutions Australia | Emet Capital',
    description: 'Commercial lending solutions for Australian businesses, investors, and developers, including private lending, bridging finance, and property-backed funding.',
    canonical: `${baseUrl}/`,
    h1: 'Commercial Lending Solutions Australia',
    noscript: 'Commercial lending solutions for businesses, investors, and developers across Australia.'
  },
  '/about': {
    title: 'About Emet Capital | Commercial Finance Specialists',
    description: 'Learn about Emet Capital, our commercial finance background, lender network, and how we help Australian businesses and property borrowers structure funding.',
    canonical: `${baseUrl}/about`,
    h1: 'About Emet Capital',
    noscript: 'Learn about Emet Capital and our commercial finance approach for Australian borrowers.'
  },
  '/contact': {
    title: 'Contact Emet Capital | Commercial Finance Quote',
    description: 'Contact Emet Capital to discuss commercial finance, private lending, bridging finance, or property-backed business funding in Australia.',
    canonical: `${baseUrl}/contact`,
    h1: 'Contact Emet Capital',
    noscript: 'Contact Emet Capital to discuss commercial finance and property-backed funding.'
  },
  '/services': {
    title: 'Commercial Lending Services Australia | Emet Capital',
    description: 'Explore commercial lending services in Australia, including property finance, business funding, private lending, and specialist loan solutions.',
    canonical: `${baseUrl}/services`,
    h1: 'Commercial Lending Services Australia',
    noscript: 'Explore commercial lending services in Australia, including property finance, business funding, private lending, and specialist loan solutions.'
  },
  '/tools': {
    title: 'Commercial Finance Tools Australia | Emet Capital',
    description: 'Explore commercial finance calculators and tools for property loans, bridging finance, working capital, and second mortgages.',
    canonical: `${baseUrl}/tools`,
    h1: 'Commercial Finance Tools Australia',
    noscript: 'Commercial finance calculators and tools for Australian business and property borrowers.'
  },
  '/tools/second-mortgage-calculator': {
    title: 'Second Mortgage Calculator Australia | Emet Capital Tool',
    description: 'Use our second mortgage calculator to estimate payments, combined LVR, equity access, and indicative costs for business-use property-backed lending.',
    canonical: `${baseUrl}/tools/second-mortgage-calculator`,
    h1: 'Second Mortgage Calculator Australia',
    noscript: 'Estimate second mortgage payments, combined LVR, equity access, and indicative costs for business-use property-backed lending.'
  },
  '/services/private-lending': {
    title: 'Private Lending Australia | Commercial Finance | Emet Capital',
    description: 'Explore private lending solutions in Australia for business borrowers, investors, and time-sensitive property-backed transactions.',
    canonical: `${baseUrl}/services/private-lending`,
    h1: 'Private Lending Australia',
    noscript: 'Private lending solutions for business borrowers, investors, and property-backed transactions.'
  },
  '/services/bridging-finance': {
    title: 'Bridging Finance Australia | Emet Capital',
    description: 'Short-term bridging finance solutions for Australian property and business borrowers needing speed, flexibility, and a clear exit path.',
    canonical: `${baseUrl}/services/bridging-finance`,
    h1: 'Bridging Finance Australia',
    noscript: 'Short-term bridging finance for Australian property and business borrowers.'
  },
  '/services/first-second-mortgages': {
    title: 'First & Second Mortgages Australia | Emet Capital',
    description: 'Compare first and second mortgage solutions for Australian business and property borrowers using equity-backed funding structures.',
    canonical: `${baseUrl}/services/first-second-mortgages`,
    h1: 'First and Second Mortgages Australia',
    noscript: 'First and second mortgage solutions for Australian business and property borrowers.'
  },
  '/services/commercial-property-development': {
    title: 'Commercial Property Development Finance | Emet Capital',
    description: 'Commercial property development finance solutions for Australian developers, investors, and project-led property borrowers.',
    canonical: `${baseUrl}/services/commercial-property-development`,
    h1: 'Commercial Property Development Finance',
    noscript: 'Commercial property development finance for Australian developers and investors.'
  },
  '/services/working-capital': {
    title: 'Working Capital Finance Australia | Emet Capital',
    description: 'Working capital finance solutions for Australian businesses needing short-term liquidity, restructuring support, or growth funding.',
    canonical: `${baseUrl}/services/working-capital`,
    h1: 'Working Capital Finance Australia',
    noscript: 'Working capital finance for Australian businesses needing liquidity and growth support.'
  },
  '/services/refinancing-solutions': {
    title: 'Commercial Refinancing Solutions | Emet Capital',
    description: 'Commercial refinancing solutions for Australian borrowers managing maturities, debt restructuring, or property-backed refinance scenarios.',
    canonical: `${baseUrl}/services/refinancing-solutions`,
    h1: 'Commercial Refinancing Solutions',
    noscript: 'Commercial refinancing solutions for Australian property and business borrowers.'
  }
};

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
