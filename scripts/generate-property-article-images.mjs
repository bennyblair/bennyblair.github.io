import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

// Original vector illustrations; no stock photographs or purported customer transactions.
const illustrations = [
  { slug: 'urgent-caveat-loans', tag: 'SETTLEMENT READINESS', lines: ['A deadline needs', 'a complete picture.'], type: 'checklist', labels: ['Property & title', 'Business purpose', 'Repayment exit'], alt: 'Illustrated property and document checklist for an urgent business-purpose finance application.' },
  { slug: 'find-caveat-loan-brokers-australia', tag: 'CHOOSING A BROKER', lines: ['Ask the questions', 'that matter.'], type: 'checklist', labels: ['Identity & role', 'Fees & process', 'Risks & alternatives'], alt: 'Three illustrated checks for comparing a caveat loan broker: identity, fees and risks.' },
  { slug: 'private-credit-refinance-commercial-property-australia', tag: 'COMMERCIAL REFINANCING', lines: ['Plan the refinance.', 'Check the whole cost.'], type: 'timeline', labels: ['Existing facility', 'Replacement options', 'Repayment plan'], alt: 'Illustrated commercial property refinance journey from the existing facility to a repayment plan.' },
  { slug: 'commercial-property-finance-sydney-local-expert-hub', tag: 'SYDNEY PROPERTY FINANCE', lines: ['The right questions', 'for your property.'], type: 'building', labels: ['Property use', 'Income evidence', 'Funding purpose'], alt: 'Illustrated commercial building with property use, income evidence and funding purpose checks.' },
  { slug: 'mixed-use-commercial-property-purchase-finance-australia', tag: 'MIXED-USE PURCHASE', lines: ['One property.', 'Different uses.'], type: 'mixed', labels: ['Residential use', 'Commercial use', 'Application evidence'], alt: 'Illustrated mixed-use building with residential upper floors and a commercial ground floor.' },
  { slug: 'commercial-interest-only-period-ending-refinance-australia', tag: 'INTEREST-ONLY EXPIRY', lines: ['Know what changes', 'before repayments do.'], type: 'timeline', labels: ['Review the contract', 'Compare the options', 'Prepare early'], alt: 'Illustrated timeline for reviewing a commercial interest-only period before repayments change.' },
  { slug: 'business-loan-against-outright-owned-property-australia', tag: 'PROPERTY FOR BUSINESS', lines: ['Property ownership.', 'Business funding.'], type: 'building', labels: ['Ownership & title', 'Business purpose', 'Repayment evidence'], alt: 'Illustrated outright-owned property beside business-purpose and repayment evidence checks.' },
];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function svg(item) {
  const windows = Array.from({ length: 9 }, (_, n) => `<rect x="${780 + (n % 3) * 55}" y="${192 + Math.floor(n / 3) * 58}" width="32" height="33" rx="4" fill="${n % 2 ? '#87cfff' : '#d7efff'}" opacity="${n % 2 ? '.7' : '.9'}"/>`).join('');
  const building = `<path d="M750 155H970V423H750Z" fill="#203954" stroke="#78bfff" stroke-width="3"/>${windows}<path d="M750 372H970V423H750Z" fill="${item.type === 'mixed' ? '#7ad8c1' : '#4778a5'}"/><path d="M794 423V388H849V423M870 423V388H925V423" fill="none" stroke="#0d1b2b" stroke-width="6"/><path d="M719 426H1000" stroke="#9dd7ff" stroke-width="4" stroke-linecap="round"/>`;
  const checklist = `<rect x="735" y="145" width="280" height="292" rx="25" fill="#203954" stroke="#78bfff" stroke-width="2"/><path d="M790 145V124H960V145" fill="none" stroke="#9dd7ff" stroke-width="10" stroke-linecap="round"/>${[0,1,2].map(n => `<circle cx="783" cy="${214+n*80}" r="18" fill="#7ad8c1"/><path d="M775 ${214+n*80}l6 6 10-12" fill="none" stroke="#112333" stroke-width="3"/><path d="M825 ${207+n*80}h139m-139 17h100" stroke="#9eb7ce" stroke-width="6" stroke-linecap="round"/>`).join('')}`;
  const timeline = `<path d="M739 365H1040" stroke="#78bfff" stroke-width="4"/>${[0,1,2].map(n => `<rect x="${721+n*115}" y="${275-n*55}" width="62" height="${90+n*55}" rx="7" fill="${n===2 ? '#7ad8c1' : '#4778a5'}"/><circle cx="${752+n*115}" cy="407" r="17" fill="#203954" stroke="#78bfff" stroke-width="2"/><text x="${752+n*115}" y="413" fill="#d7efff" font-size="18" text-anchor="middle">${n+1}</text>`).join('')}<path d="M745 203Q820 136 954 143" stroke="#7ad8c1" stroke-width="4" fill="none"/><path d="M941 132l19 12-20 11" stroke="#7ad8c1" stroke-width="4" fill="none"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#101b2b"/><stop offset="1" stop-color="#162d44"/></linearGradient><radialGradient id="glow"><stop stop-color="#3179bb" stop-opacity=".2"/><stop offset="1" stop-color="#3179bb" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><circle cx="880" cy="260" r="335" fill="url(#glow)"/><g font-family="Arial, Helvetica, sans-serif"><text x="70" y="83" fill="#d7efff" font-size="23" font-weight="700" letter-spacing="5">EMET CAPITAL</text><rect x="70" y="135" width="44" height="4" rx="2" fill="#7ad8c1"/><text x="70" y="185" fill="#83c7ff" font-size="16" font-weight="700" letter-spacing="2">${escape(item.tag)}</text><text x="67" y="269" fill="#f3f7fb" font-size="46" font-weight="700">${escape(item.lines[0])}</text><text x="67" y="328" fill="#f3f7fb" font-size="46" font-weight="700">${escape(item.lines[1])}</text><text x="70" y="393" fill="#adc1d3" font-size="20">Business-purpose property finance</text>${item.type === 'checklist' ? checklist : item.type === 'timeline' ? timeline : building}<path d="M70 481H1130" stroke="#34516b" stroke-width="1"/>${item.labels.map((label,n) => `<circle cx="${82+n*370}" cy="536" r="5" fill="#7ad8c1"/><text x="${101+n*370}" y="542" fill="#d7e4ed" font-size="19">${escape(label)}</text>`).join('')}</g></svg>`;
}
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const item of illustrations) {
    const source = svg(item);
    const encoded = await page.evaluate(async value => {
      const blob = new Blob([value], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      try {
        const img = new Image(); img.src = url; await img.decode();
        const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 630;
        canvas.getContext('2d').drawImage(img, 0, 0);
        return canvas.toDataURL('image/webp', 0.92).split(',')[1];
      } finally { URL.revokeObjectURL(url); }
    }, source);
    const output = path.join('public/images/articles', `${item.slug}.webp`);
    const buffer = Buffer.from(encoded, 'base64');
    if (buffer.length > 250 * 1024) throw new Error(`${item.slug} exceeds image budget`);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, buffer);
    const sourcePath = path.join('reports/content-programme/illustrations', `${item.slug}.svg`);
    fs.mkdirSync(path.dirname(sourcePath), { recursive: true }); fs.writeFileSync(sourcePath, source);
    console.log(JSON.stringify({ path: output, bytes: buffer.length, width: 1200, height: 630, alt: item.alt }));
  }
} finally { await browser.close(); }
