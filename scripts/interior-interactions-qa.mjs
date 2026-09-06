/** Regression checks for directory completeness, native disclosure and calculator result states. */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base = process.argv[2] || 'http://127.0.0.1:4173';
assert.ok(['127.0.0.1', 'localhost'].includes(new URL(base).hostname));
const browser = await chromium.launch({ headless: true });
const results = [];
async function context(options = {}) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 1000 }, reducedMotion: 'reduce', ...options });
  await ctx.route('**/*', route => {
    const request = route.request();
    assert.ok(['GET', 'HEAD'].includes(request.method()), 'Preview must not send writes');
    return new URL(request.url()).origin === new URL(base).origin ? route.continue() : route.abort();
  });
  return ctx;
}
async function ready(page, route) {
  assert.equal((await page.goto(base + route)).status(), 200);
  await page.waitForFunction(() => document.documentElement.dataset.prerenderReady === 'true');
}
try {
  for (const [route, filter, entry, expectedAll] of [
    ['/resources/guides', '#guide-category', '.guide-directory-entry', 245],
    ['/resources/case-studies', '#case-industry', '.case-directory-entry', 11],
  ]) {
    const ctx = await context(); const page = await ctx.newPage(); await ready(page, route);
    const options = await page.locator(filter + ' option').evaluateAll(nodes => nodes.map(node => ({ value: node.value, count: Number(node.textContent.match(/\((\d+)\)$/)[1]) })));
    assert.equal(options[0].count, expectedAll);
    assert.equal(options.slice(1).reduce((sum, option) => sum + option.count, 0), expectedAll);
    for (const option of options.slice(1)) {
      await page.locator(filter).selectOption(option.value);
      assert.equal(await page.locator(entry).count(), option.count, `First or sole result missing for ${option.value}`);
      if (route.endsWith('/guides')) for (const label of await page.locator('.guide-entry-meta > span:first-child').allTextContents()) assert.equal(label, option.value);
      assert.ok(await page.locator(entry).first().isVisible());
    }
    await page.getByRole('button', { name: 'View all', exact: true }).click();
    assert.equal(await page.locator(filter).inputValue(), 'All');
    assert.ok(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1));
    results.push({ route, passed: true, categoryChecks: options.length - 1 });
    await ctx.close();
    const native = await context({ javaScriptEnabled: false }); const nojs = await native.newPage();
    await nojs.goto(base + route);
    const links = await nojs.locator('main a').evaluateAll(nodes => [...new Set(nodes.map(node => new URL(node.href).pathname))]);
    assert.ok(links.filter(path => path.startsWith(route + '/')).length >= expectedAll, 'Prerendered directory lost crawlable article links');
    await native.close();
  }
  const native = await context({ javaScriptEnabled: false }); const page = await native.newPage(); await page.goto(base + '/services');
  const firstGroup = page.locator('.service-category').first();
  const serviceLinks = await page.locator('.service-option h4 a').count(); assert.ok(serviceLinks >= 15);
  await firstGroup.locator('summary').click(); assert.equal(await firstGroup.evaluate(node => node.open), false);
  await firstGroup.locator('summary').press('Enter'); assert.equal(await firstGroup.evaluate(node => node.open), true);
  results.push({ route: '/services', passed: true, serviceLinks, noJavaScriptDisclosure: true }); await native.close();

  for (const slug of ['commercial-property-loan-calculator', 'second-mortgage-calculator', 'commercial-real-estate-calculator', 'asset-finance-roi-calculator', 'working-capital-calculator', 'loan-comparison-tool', 'bridging-loan-calculator']) {
    const ctx = await context(); const page = await ctx.newPage(); await ready(page, '/resources/tools/' + slug);
    for (const input of await page.locator('main input[type="number"]').all()) {
      const id = (await input.getAttribute('id') || '').toLowerCase();
      const value = /rate|yield/.test(id) ? '8' : /term|years|life/.test(id) ? '5' : /deposit|ltv|lvr|tax/.test(id) ? '30' : /fees/.test(id) ? '1000' : /liabilit|mortgage/.test(id) ? '200000' : /savings|income|rent/.test(id) ? '25000' : '500000';
      await input.fill(value); await input.blur();
    }
    const body = await page.locator('main').innerText(); assert.ok(!/\bNaN\b|\bInfinity\b/.test(body));
    const violations = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations;
    assert.deepEqual(violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })), [], slug);
    results.push({ route: '/resources/tools/' + slug, passed: true, populatedResultAccessibility: true });
    await ctx.close();
  }
} finally {
  await browser.close();
  await fs.mkdir('reports/interiors', { recursive: true });
  await fs.writeFile('reports/interiors/interactions.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results));
}
