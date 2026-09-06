/** Targeted homepage photo delivery, hover, keyboard and touch acceptance. */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base = process.argv[2] || 'http://127.0.0.1:4173';
assert.ok(['127.0.0.1', 'localhost'].includes(new URL(base).hostname));
const browser = await chromium.launch({ headless: true });
const results = [];
const photos = ['.hero-image img', '.service-portrait img', '.scenario-media img'];
await fs.mkdir('reports/photography', { recursive: true });
try {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 2, reducedMotion: 'reduce', hasTouch: width < 700, isMobile: width < 700 });
    const page = await context.newPage();
    const errors = [], writes = [], analytics = [];
    page.on('pageerror', error => errors.push(error.message));
    await context.route('**/*', route => {
      const request = route.request();
      if (!['GET','HEAD'].includes(request.method())) writes.push(request.url());
      if (/googletagmanager|google-analytics|doubleclick/.test(request.url())) analytics.push(request.url());
      return new URL(request.url()).origin === new URL(base).origin && ['GET','HEAD'].includes(request.method()) ? route.continue() : route.abort();
    });
    await page.goto(base);
    await page.waitForFunction(() => document.documentElement.dataset.prerenderReady === 'true');
    const imagery = [];
    for (const selector of photos) {
      for (const img of await page.locator(selector).all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(image => image.decode());
        const details = await img.evaluate(async image => {
          const original = new Image(); original.src = image.currentSrc; await original.decode();
          const box = image.getBoundingClientRect();
          return { source: new URL(image.currentSrc).pathname, width: original.naturalWidth, height: original.naturalHeight, density: Math.min(original.naturalWidth / box.width, original.naturalHeight / box.height), filter: getComputedStyle(image).filter, alt: image.alt };
        });
        assert.ok(details.density >= 1.5, `Insufficient source pixels: ${JSON.stringify(details)}`);
        assert.ok(details.alt && !/representative/i.test(details.alt));
        imagery.push(details);
      }
    }
    assert.equal(await page.locator('.homepage-page figcaption').count(), 0);
    assert.equal(await page.locator('.homepage-page').getByText(/illustrative scenario/i).count(), 0);
    assert.equal(await page.getByRole('heading', { name: 'Finance in practice', exact: true }).count(), 1);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2));
    const touch = await page.evaluate(() => matchMedia('(hover:none)').matches);
    if (touch) assert.ok(imagery.every(image => image.filter.includes('grayscale(0)')));
    else {
      for (const selector of ['.home-hero', '.service-portrait', '.scenario-media']) {
        const region = page.locator(selector).first(), img = region.locator('img');
        await region.scrollIntoViewIfNeeded(); await page.mouse.move(0, 0);
        assert.ok((await img.evaluate(image => getComputedStyle(image).filter)).includes('grayscale(1)'));
        await region.hover();
        assert.ok((await img.evaluate(image => getComputedStyle(image).filter)).includes('grayscale(0)'));
        await page.mouse.move(0, 0);
        await region.locator('a').first().focus();
        assert.ok((await img.evaluate(image => getComputedStyle(image).filter)).includes('grayscale(0)'));
        await page.locator('.brand').first().focus();
      }
    }
    if (width === 390 || width === 1440) {
      const violations = (await new AxeBuilder({ page }).include('.homepage-page').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations;
      assert.deepEqual(violations.map(v => v.id), []);
      await page.locator('.home-services').screenshot({ path: `reports/photography/services-${width}.png` });
      await page.locator('.home-stories').screenshot({ path: `reports/photography/stories-${width}.png` });
    }
    assert.deepEqual(errors, []); assert.deepEqual(writes, []); assert.deepEqual(analytics, []);
    results.push({ width, touch, imagery, passed: true });
    console.log(`PASS ${width}px: sharp sources, colour access, clean captions, no overflow`);
    await context.close();
  }
} finally {
  await browser.close();
  await fs.writeFile('reports/photography/results.json', JSON.stringify({ date: new Date().toISOString(), base, results }, null, 2));
}
