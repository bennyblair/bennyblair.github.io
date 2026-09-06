/** Targeted cylinder acceptance. Loopback, blocked writes/external traffic, no screenshots.
 * node cylinder-qa.mjs http://127.0.0.1:4173 [--dev] [--site <checkout>] [--output <json>]
 * --dev explicitly skips the two prerender/hydration checks.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
const args = process.argv.slice(2);
const option = (key, fallback) => args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const base = new URL(args.find(value => /^https?:\/\//.test(value)) || 'http://127.0.0.1:4173');
assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(base.hostname), 'Loopback preview only');
assert.equal(base.pathname, '/', 'Supply origin without a route');
const site = path.resolve(option('--site', process.cwd()));
const output = path.resolve(option('--output', path.join(site, 'reports', 'cylinder-qa-results.json')));
const { chromium } = createRequire(path.join(site, 'package.json'))('playwright');
const expectedSteps = [
  ['Enquiry', 'Tell us about your funding requirements'],
  ['Assessment', 'We evaluate your proposal and present options'],
  ['Approval', 'Fast-track approval with our lender network'],
  ['Settlement', 'Quick settlement and funding deployment'],
];
const results = [], startedAt = new Date().toISOString();
const browser = await chromium.launch({ headless: true });
async function test(name, fn) {
  try { const details = await fn(); results.push({ name, status: 'pass', details }); console.log(`PASS ${name}`); }
  catch (error) { results.push({ name, status: 'fail', error: error.message }); console.log(`FAIL ${name}: ${error.message}`); }
}
async function setup(width = 1440, { reducedMotion = 'no-preference', noJS = false, delayed = false } = {}) {
  const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion, javaScriptEnabled: !noJS, serviceWorkers: 'block' });
  const network = { writes: [], analytics: [], delayed: 0 };
  let release;
  const gate = delayed ? new Promise(resolve => { release = resolve; }) : null;
  await context.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    if (/googletagmanager|google-analytics|doubleclick|\/g\/collect/.test(url.href)) network.analytics.push(url.href);
    if (!['GET', 'HEAD'].includes(request.method())) network.writes.push(request.method() + ' ' + url.href);
    if (url.origin !== base.origin || !['GET', 'HEAD'].includes(request.method())) return route.abort();
    if (gate && request.resourceType() === 'script') { network.delayed++; await gate; }
    return route.continue();
  });
  const page = await context.newPage(), errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (['warning', 'error'].includes(message.type()) && /hydrat|did not match|server.*html|replaced with client|Minified React error #(418|423|425)/i.test(message.text())) errors.push(message.text());
  });
  return { context, page, network, errors, release: () => release?.() };
}
async function ready(page) {
  assert.equal((await page.goto(base.href, { waitUntil: 'domcontentloaded' }))?.status(), 200);
  await page.locator('.process-journey svg.process-cylinder .process-ball').waitFor({ state: 'attached' });
  await page.waitForFunction(() => document.documentElement.dataset.prerenderReady === 'true', undefined, { timeout: 20000 });
  await page.evaluate(() => document.fonts.ready);
}
async function stateOf(page) {
  return page.evaluate(() => {
    const journey = document.querySelector('.process-journey'), visual = journey?.querySelector('.process-visual'), svg = visual?.querySelector('svg.process-cylinder'), ball = svg?.querySelector('.process-ball');
    if (!journey || !visual || !svg || !ball) throw new Error('Missing cylinder selectors');
    const bounds = node => { const b = node.getBoundingClientRect(); return { left: b.left, right: b.right, top: b.top, bottom: b.bottom, width: b.width, height: b.height }; };
    const box = bounds(journey), visualBox = bounds(visual), transform = getComputedStyle(ball).transform;
    const animations = document.getAnimations().filter(animation => animation.effect?.target?.closest?.('svg.process-cylinder')).map(animation => ({
      target: animation.effect.target.getAttribute('class'), state: animation.playState, currentTime: animation.currentTime,
      properties: [...new Set(animation.effect.getKeyframes().flatMap(frame => Object.keys(frame)))].filter(key => !['offset', 'computedOffset', 'easing', 'composite'].includes(key)),
    }));
    const steps = [...document.querySelectorAll('.home-process .process-step')].map(node => [node.querySelector('h3')?.textContent.trim(), node.querySelector('p')?.textContent.trim()]);
    const invisible = [...document.querySelectorAll('.home-process .process-step h3,.home-process .process-step p')].filter(node => {
      for (let ancestor = node; ancestor; ancestor = ancestor.parentElement) { const style = getComputedStyle(ancestor); if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) < .85) return true; }
      const b = node.getBoundingClientRect(); return !b.width || !b.height;
    }).map(node => node.textContent.trim());
    const screenMatrix = svg.getScreenCTM();
    return { journey: box, visual: visualBox, progressTop: visualBox.top + scrollY, absoluteTop: box.top + scrollY, scrollY, viewportHeight: innerHeight, viewportWidth: innerWidth, documentWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), svg: bounds(svg), viewBox: svg.getAttribute('viewBox'), screenScale: { x: screenMatrix.a, y: screenMatrix.d }, ball: bounds(ball), transform, y: transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m42, animations, steps, invisible, decorative: svg.getAttribute('aria-hidden'), keyboardTargets: svg.querySelectorAll('a,button,input,[tabindex]:not([tabindex="-1"])').length, ringCount: svg.querySelectorAll('.process-ring-glow').length };
  });
}
async function readAssert(page) {
  const state = await stateOf(page);
  assert.deepEqual(state.steps, expectedSteps, 'Four original process headings/descriptions retained');
  assert.deepEqual(state.invisible, [], 'All process text remains visible');
  assert.equal(state.decorative, 'true', 'SVG is decorative alongside HTML process text');
  assert.equal(state.keyboardTargets, 0, 'Decorative SVG adds no keyboard stops');
  assert.ok(state.svg.width > 0 && state.svg.height > 0 && state.ball.width > 0 && state.ball.height > 0, 'Static cylinder and ball have visible geometry');
  assert.equal(state.viewBox, '0 0 500 660', 'Cylinder retains intended viewBox');
  assert.ok(Math.abs(state.screenScale.x - state.screenScale.y) < .001, 'Responsive SVG preserves shape proportions');
  assert.ok(state.svg.width <= 500.5 && state.svg.left >= -1 && state.svg.right <= state.viewportWidth + 1, 'Cylinder fits the viewport and its 500px desktop cap');
  if (state.viewportWidth <= 700) assert.ok(Math.abs(state.svg.height - 430) < 1, 'Mobile cylinder keeps its 430px visual height');
  assert.ok(state.documentWidth <= state.viewportWidth + 2, `Horizontal overflow ${state.documentWidth}/${state.viewportWidth}`);
  return state;
}
async function scroll(page, y) {
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
  await page.waitForTimeout(100);
  return stateOf(page);
}
async function sweep(page) {
  const initial = await stateOf(page);
  const start = Math.max(0, initial.progressTop - initial.viewportHeight);
  const end = initial.progressTop + initial.visual.height;
  const samples = [];
  for (let i = 0; i <= 6; i++) samples.push(await scroll(page, start + (end - start) * i / 6));
  return samples;
}
function networkAssert(state) { assert.deepEqual(state.errors, []); assert.deepEqual(state.network.writes, []); assert.deepEqual(state.network.analytics, []); }
async function withPage(width, fn, options) {
  const state = await setup(width, options);
  try { await ready(state.page); const details = await fn(state.page); networkAssert(state); return details; }
  finally { state.release(); await state.context.close(); }
}
async function progressCase(page) {
  const initial = await readAssert(page);
  const down = await sweep(page);
  const values = down.map(state => state.y);
  assert.ok(Math.max(...values) - Math.min(...values) > 300, `Ball must visibly traverse cylinder: ${values}`);
  const completed = down.find(state => state.y >= 419);
  assert.ok(completed, 'Ball completes its full 420px descent');
  assert.ok(completed.svg.bottom > 0 && completed.svg.top < completed.viewportHeight, 'Full descent occurs while the cylinder is still partly in view');
  assert.ok(completed.ball.bottom > 0 && completed.ball.top < completed.viewportHeight, 'The ball remains visible when its descent completes');
  for (let i = 1; i < values.length; i++) assert.ok(values[i] >= values[i - 1] - .2, `Downward progress regressed: ${values}`);
  const middle = down.find(state => state.y > 30 && state.y < 390);
  assert.ok(middle, 'A partial scroll position produces an intermediate ball position');
  const back = await scroll(page, middle.scrollY);
  assert.ok(Math.abs(back.y - middle.y) < 1, 'Reverse scroll returns to the same ball position');
  const top = await scroll(page, down[0].scrollY);
  assert.ok(Math.abs(top.y - down[0].y) < 1, 'Reverse scroll returns to the start');
  assert.ok(initial.ringCount > 0, 'Stage ring accents present');
  assert.ok(down.some(state => state.animations.some(animation => /process-ring-glow/.test(animation.target) && animation.properties.includes('opacity'))), 'Ring accents use opacity effects');
  await readAssert(page);
  return { width: initial.viewportWidth, values, reverseY: back.y, ringCount: initial.ringCount, completed: { svg: completed.svg, ball: completed.ball, viewportHeight: completed.viewportHeight }, fit: { svg: initial.svg, scale: initial.screenScale } };
}
async function pauseCase(page) {
  const button = page.locator('.motion-toggle').first();
  await button.focus(); await button.press('Space');
  await page.waitForFunction(() => document.querySelector('.motion-toggle')?.getAttribute('aria-pressed') === 'true');
  const paused = await sweep(page);
  assert.ok(paused.every(state => state.animations.length === 0), 'Pause removes ball/ring timelines, including paused WAAPI timelines');
  assert.ok(paused.every(state => state.transform === paused[0].transform), 'Ball ignores scroll while paused');
  await button.focus(); await button.press('Enter');
  await page.waitForFunction(() => document.querySelector('.motion-toggle')?.getAttribute('aria-pressed') === 'false');
  const resumed = await progressCase(page);
  return { pausedY: paused.map(state => state.y), resumed };
}
async function reducedCase(page, dynamic = false) {
  if (dynamic) { await sweep(page); await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(100); }
  const samples = await sweep(page);
  assert.ok(samples.every(state => state.animations.length === 0), 'Reduced motion has no active or paused cylinder timelines');
  assert.ok(samples.every(state => state.transform === samples[0].transform), 'Reduced-motion ball does not respond to scrolling');
  await readAssert(page);
  if (dynamic) { await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.waitForTimeout(100); await progressCase(page); }
  return { dynamic, y: samples.map(state => state.y), effects: samples.map(state => state.animations.length) };
}
async function resizeCase(page) {
  const samples = await sweep(page);
  await scroll(page, samples[3].scrollY);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(120);
  await readAssert(page);
  return progressCase(page);
}
async function disclosureCase(page) {
  const samples = await sweep(page);
  const middle = samples.find(state => state.y > 30 && state.y < 390);
  assert.ok(middle, 'Need intermediate progress for disclosure comparison');
  const before = await scroll(page, middle.scrollY);
  await page.locator('.expertise-disclosure > summary').click();
  assert.equal(await page.locator('.expertise-disclosure').getAttribute('open'), '');
  const after = await scroll(page, middle.scrollY);
  assert.ok(Math.abs(before.journey.height - after.journey.height) < 1, 'Disclosure changes cylinder wrapper height');
  assert.ok(Math.abs(before.absoluteTop - after.absoluteTop) < 1, 'Disclosure moves cylinder wrapper');
  assert.ok(Math.abs(before.progressTop - after.progressTop) < 1 && Math.abs(before.visual.height - after.visual.height) < 1, 'Disclosure changes the visual scroll bounds');
  assert.ok(Math.abs(before.y - after.y) < 1, 'Disclosure alters ball progress at identical scroll position');
  return { before: { top: before.progressTop, height: before.visual.height, y: before.y }, after: { top: after.progressTop, height: after.visual.height, y: after.y } };
}
async function enlargeCase(page) {
  await page.evaluate(() => {
    const sizes = [...document.querySelectorAll('body,body *')].map(node => { const s = getComputedStyle(node); return [node, parseFloat(s.fontSize), s.lineHeight === 'normal' ? null : parseFloat(s.lineHeight)]; });
    for (const [node, font, line] of sizes) { node.style.setProperty('font-size', `${font * 2}px`, 'important'); if (line !== null) node.style.setProperty('line-height', `${line * 2}px`, 'important'); }
  });
  await page.locator('.process-journey').scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  const state = await readAssert(page);
  const clippedText = await page.evaluate(() => {
    const errors = [];
    for (const element of document.querySelectorAll('.process-step h3,.process-step p')) {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT); let node;
      while ((node = walker.nextNode())) { const range = document.createRange(); range.selectNodeContents(node);
        for (const r of range.getClientRects()) if (r.width > 0 && (r.left < -1 || r.right > innerWidth + 1)) errors.push(node.textContent.trim());
      }
    }
    return errors;
  });
  assert.deepEqual(clippedText, [], 'Enlarged process text exceeds viewport');
  return { viewport: state.viewportWidth, documentWidth: state.documentWidth, cylinder: state.svg };
}
async function staticCase(delayed) {
  const state = await setup(390, { noJS: !delayed, delayed });
  try {
    await state.page.goto(base.href, { waitUntil: delayed ? 'commit' : 'domcontentloaded' });
    await state.page.locator('.process-cylinder .process-ball').waitFor({ state: 'attached' });
    const before = await readAssert(state.page);
    if (delayed) {
      await state.page.evaluate(() => { window.__cylinderOriginals = [...document.querySelectorAll('.process-cylinder,.process-ball,.process-step')]; });
      state.release();
      await state.page.waitForFunction(() => document.documentElement.dataset.prerenderReady === 'true');
      assert.ok(await state.page.evaluate(() => window.__cylinderOriginals.every((node, index) => node === document.querySelectorAll('.process-cylinder,.process-ball,.process-step')[index])), 'Hydration replaces original process/cylinder nodes');
      await readAssert(state.page);
    }
    networkAssert(state);
    return { delayed, originalBall: before.transform, delayedScripts: state.network.delayed, steps: before.steps };
  } finally { state.release(); await state.context.close(); }
}
try {
  if (!args.includes('--dev')) {
    await test('No-JS cylinder and four process steps', () => staticCase(false));
    await test('Delayed-JS preserves original cylinder/process nodes', () => staticCase(true));
  }
  for (const width of [390, 768, 1440]) await test(`Downward/reverse scroll ${width}px`, () => withPage(width, progressCase));
  await test('Keyboard pause/resume stops/restores cylinder', () => withPage(1440, pauseCase));
  await test('Reduced motion ignores scroll', () => withPage(390, page => reducedCase(page), { reducedMotion: 'reduce' }));
  await test('Dynamic reduced preference cancels/restores effects', () => withPage(1440, page => reducedCase(page, true)));
  await test('Resize updates cylinder scroll range', () => withPage(1440, resizeCase));
  await test('Expertise disclosure leaves cylinder progress unchanged', () => withPage(1440, disclosureCase));
  await test('200% text at 320px retains readable process', () => withPage(320, enlargeCase));
} finally {
  await browser.close();
  const summary = { total: results.length, passed: results.filter(item => item.status === 'pass').length, failed: results.filter(item => item.status === 'fail').length, skipped: args.includes('--dev') ? 2 : 0 };
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, JSON.stringify({ startedAt, finishedAt: new Date().toISOString(), base: base.href, summary, limitations: ['DOM/animation acceptance; no screenshot or visual design review', 'Not a field or Lighthouse performance measurement', '200% text synthetically doubles computed font/line-height', 'No private hosting access-control assessment'], results }, null, 2));
  console.log(JSON.stringify(summary)); if (summary.failed) process.exitCode = 1;
}
