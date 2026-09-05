/**
 * Homepage motion acceptance. Run on a built, loopback review preview.
 * npm run qa:motion -- http://127.0.0.1:4173
 * Reads the preview; blocks external requests and all writes. No screenshots.
 * Reports laboratory observations, not field performance or a Lighthouse replacement.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
const option = (key, fallback) => args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const base = new URL(args.find(value => /^https?:\/\//.test(value)) || 'http://127.0.0.1:4173');
assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(base.hostname), 'Loopback preview only');
assert.equal(base.pathname, '/', 'Supply the origin, without a path');
const site = path.resolve(option('--site', process.cwd()));
const audit = path.join(site, 'reports');
const output = path.resolve(option('--output', path.join(audit, 'motion-qa-results.json')));
const { chromium } = createRequire(path.join(site, 'package.json'))('playwright');
const browser = await chromium.launch({ headless: true });
const results = [];
const startedAt = new Date().toISOString();

async function check(name, fn) {
  try { const details = await fn(); results.push({ name, status: 'pass', details }); console.log(`PASS ${name}`); }
  catch (error) { results.push({ name, status: 'fail', error: error.message }); console.log(`FAIL ${name}: ${error.message}`); }
}

async function setup(width, { reducedMotion = 'no-preference', javaScriptEnabled = true, delayed = false } = {}) {
  const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion, javaScriptEnabled, serviceWorkers: 'block' });
  let release;
  const gate = delayed ? new Promise(resolve => { release = resolve; }) : undefined;
  const network = { writes: [], analytics: [], delayed: 0 };
  await context.route('**/*', async route => {
    const request = route.request();
    const url = new URL(request.url());
    const analytics = /googletagmanager|google-analytics|doubleclick|\/g\/collect/.test(url.href);
    if (analytics) network.analytics.push(url.href);
    if (!['GET', 'HEAD'].includes(request.method())) network.writes.push(request.method() + ' ' + url.href);
    if (analytics || !['GET', 'HEAD'].includes(request.method()) || url.origin !== base.origin) return route.abort();
    if (gate && request.resourceType() === 'script') { network.delayed++; await gate; }
    return route.continue();
  });
  await context.addInitScript(() => {
    window.__motionQA = { shifts: [], lcp: [], longTasks: [] };
    for (const [type, key] of [['layout-shift', 'shifts'], ['largest-contentful-paint', 'lcp'], ['longtask', 'longTasks']]) {
      try { new PerformanceObserver(list => {
        for (const item of list.getEntries()) window.__motionQA[key].push({ startTime: item.startTime, duration: item.duration, value: item.value, recentInput: item.hadRecentInput });
      }).observe({ type, buffered: true }); } catch { /* Browser capability reported by missing entries. */ }
    }
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (['warning', 'error'].includes(message.type()) && /hydrat|did not match|server.*html|replaced with client|Minified React error #(418|423|425)/i.test(message.text())) errors.push(message.text());
  });
  return { context, page, network, errors, release: () => release?.() };
}

async function snapshot(page, selector = '.home-hero') {
  return page.evaluate(selector => {
    const root = document.querySelector(selector);
    const heading = root?.querySelector('h1,h2');
    const targets = root ? [...root.querySelectorAll('h1,h2,h3,p,a,button,label,summary')].filter(node => {
      const closedDisclosure = node.closest('details:not([open])');
      if (closedDisclosure && !node.closest('summary')) return false;
      // These are exact, intentional alternatives; never blanket-exclude hidden text.
      if (node.closest('.hero-scroll') && matchMedia('(max-width: 700px)').matches) return false;
      if (node.closest('.motion-toggle') && matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      const hiddenAncestor = node.closest('[hidden]');
      if (hiddenAncestor?.querySelector('input[name="bot-field"]')) return false;
      return true;
    }) : [];
    const problems = [];
    const bounds = node => { const r = node.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }; };
    for (const node of targets) {
      let opacity = 1;
      for (let ancestor = node; ancestor; ancestor = ancestor.parentElement) {
        const style = getComputedStyle(ancestor);
        opacity *= Number(style.opacity);
        if (style.display === 'none' || style.visibility === 'hidden' || ancestor.hidden || ancestor.inert) { problems.push(`Hidden: ${node.textContent.trim().slice(0, 90)}`); break; }
      }
      if (opacity < .85) problems.push(`Low opacity ${opacity}: ${node.textContent.trim().slice(0, 90)}`);
      const r = bounds(node);
      if (!r.width || !r.height) problems.push(`Zero size: ${node.textContent.trim().slice(0, 90)}`);
    }
    if (!root || !heading) problems.push(`Missing section/heading: ${selector}`);
    if (Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > innerWidth + 2) problems.push('Document overflows horizontally');
    const animations = document.getAnimations().filter(animation => animation.effect?.target?.closest?.('main')).map(animation => ({
      target: animation.effect.target.tagName + '.' + animation.effect.target.className,
      state: animation.playState,
      duration: animation.effect.getTiming().duration,
      iterations: animation.effect.getTiming().iterations,
      properties: [...new Set(animation.effect.getKeyframes().flatMap(frame => Object.keys(frame)))].filter(key => !['offset', 'computedOffset', 'easing', 'composite'].includes(key)),
    }));
    return { problems: [...new Set(problems)], heading: heading?.textContent.trim(), bounds: heading ? bounds(heading) : null, animations, mainText: document.querySelector('main')?.textContent.replace(/\s+/g, ' ').trim() };
  }, selector);
}

async function settle(page) {
  await page.waitForFunction(() => document.documentElement.dataset.prerenderReady === 'true', undefined, { timeout: 20000 });
  await page.evaluate(async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); });
}

async function motionCase(width, reducedMotion, dynamicPreference = false) {
  const state = await setup(width, { reducedMotion });
  try {
    const { page } = state;
    assert.equal((await page.goto(base.href, { waitUntil: 'domcontentloaded' }))?.status(), 200);
    await page.locator('main h1').waitFor();
    const early = await snapshot(page);
    assert.deepEqual(early.problems, [], 'Essential hero content must be readable immediately');
    await settle(page);
    if (dynamicPreference) { await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(150); }
    const settled = await snapshot(page);
    assert.deepEqual(settled.problems, []);
    const sections = await page.locator('main .homepage-page > section').count();
    const sectionObservations = [];
    for (let index = 1; index < sections; index++) {
      const selector = `main .homepage-page > section:nth-of-type(${index + 1})`;
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(120);
      const current = await snapshot(page, selector);
      assert.deepEqual(current.problems, [], `${selector}: content should stay visible during motion`);
      sectionObservations.push({ selector, animations: current.animations });
    }
    if (reducedMotion === 'reduce' || dynamicPreference) {
      const running = (await snapshot(page)).animations.filter(animation => animation.state === 'running');
      assert.deepEqual(running, [], 'Reduced motion must suppress/cancel active homepage animation');
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.locator('.home-hero a[href="/contact"]').first().focus();
    assert.ok(await page.locator('.home-hero a[href="/contact"]').first().evaluate(node => document.activeElement === node), 'Hero enquiry action remains keyboard-focusable');
    const observations = await page.evaluate(() => window.__motionQA);
    // Calculate CLS using the standard 1s gap / 5s session-window convention.
    let cls = 0, current = 0, sessionStart = 0, previous = 0;
    for (const shift of observations.shifts.filter(item => !item.recentInput)) {
      if (!sessionStart || shift.startTime - previous > 1000 || shift.startTime - sessionStart > 5000) { current = 0; sessionStart = shift.startTime; }
      current += shift.value; cls = Math.max(cls, current); previous = shift.startTime;
    }
    assert.ok(cls <= .1, `Observed CLS ${cls} exceeds 0.1`);
    assert.deepEqual(state.errors, [], 'Hydration/runtime errors');
    assert.deepEqual(state.network.analytics, [], 'Analytics isolation');
    assert.deepEqual(state.network.writes, [], 'No write requests');
    assert.equal((await snapshot(page)).mainText, early.mainText, 'Animation must not replace substantive text');
    return { width, reducedMotion, dynamicPreference, earlyAnimations: early.animations, sectionObservations, observedCLS: cls, observations };
  } finally { await state.context.close(); }
}

async function staticCase(delayed) {
  const state = await setup(390, { javaScriptEnabled: delayed, delayed });
  try {
    const { page } = state;
    await page.goto(base.href, { waitUntil: delayed ? 'commit' : 'domcontentloaded' });
    await page.locator('main h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
    const before = await snapshot(page);
    assert.deepEqual(before.problems, [], 'Saved HTML must be visible without JavaScript');
    if (delayed) {
      await page.evaluate(() => { window.__savedHeroNode = document.querySelector('main h1'); });
      state.release();
      await settle(page);
      assert.ok(await page.evaluate(() => window.__savedHeroNode === document.querySelector('main h1')), 'Hydration replaced the prerendered heading');
      assert.equal((await snapshot(page)).mainText, before.mainText, 'Hydration changed substantive text');
      assert.deepEqual(state.errors, [], 'Hydration/runtime errors');
    }
    return { delayed, blockedScripts: state.network.delayed, heading: before.heading, bounds: before.bounds };
  } finally { state.release(); await state.context.close(); }
}

async function pauseCase() {
  const state = await setup(1440);
  try {
    const { page } = state;
    await page.goto(base.href, { waitUntil: 'domcontentloaded' });
    await settle(page);
    const effectState = () => page.evaluate(() => {
      const picture = document.querySelector('.hero-image picture');
      const animations = document.getAnimations().filter(animation => animation.effect?.target?.closest?.('main') && !(animation instanceof CSSAnimation) && !(animation instanceof CSSTransition));
      return { transform: getComputedStyle(picture).transform, effects: animations.length, camera: animations.filter(animation => animation.effect.target === picture).map(animation => ({ currentTime: animation.currentTime, state: animation.playState })) };
    });
    const initial = await effectState();
    assert.ok(initial.camera.length > 0, 'Camera scroll effect is installed');
    await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
    await page.waitForTimeout(100);
    const scrolled = await effectState();
    assert.notEqual(scrolled.transform, initial.transform, 'Scrolling drives the camera transform');
    assert.ok(scrolled.camera[0].currentTime > initial.camera[0].currentTime, 'Camera progress follows document scroll');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    const button = page.locator('.motion-toggle');
    await button.click();
    await page.waitForFunction(() => document.querySelector('.motion-toggle')?.getAttribute('aria-pressed') === 'true');
    await page.waitForTimeout(80);
    const paused = await effectState();
    assert.equal(paused.effects, 0, 'Pause cancels all homepage WAAPI effects, including paused scroll timelines');
    assert.match(await button.textContent(), /Play motion/i);
    await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
    await page.waitForTimeout(100);
    assert.equal((await effectState()).transform, paused.transform, 'Scrolling while paused leaves camera unchanged');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await button.click();
    await page.waitForFunction(() => document.querySelector('.motion-toggle')?.getAttribute('aria-pressed') === 'false');
    await page.waitForTimeout(80);
    const resumed = await effectState();
    assert.ok(resumed.effects > 0 && resumed.camera.length > 0, 'Play restores homepage and scroll effects');
    assert.match(await button.textContent(), /Pause motion/i);
    await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
    await page.waitForTimeout(100);
    assert.notEqual((await effectState()).transform, resumed.transform, 'Restored camera responds to scroll');
    assert.deepEqual(state.errors, []);
    assert.deepEqual(state.network.analytics, []);
    assert.deepEqual(state.network.writes, []);
    return { initial, scrolled, paused, resumed };
  } finally { await state.context.close(); }
}

async function enlargedCaptionCase() {
  const state = await setup(320);
  try {
    const { page } = state;
    await page.goto(base.href, { waitUntil: 'domcontentloaded' });
    await settle(page);
    // Snapshot sizes first to avoid compounded text enlargement through ancestors.
    await page.evaluate(() => {
      const sizes = [...document.querySelectorAll('body,body *')].map(node => {
        const style = getComputedStyle(node);
        return [node, parseFloat(style.fontSize), style.lineHeight === 'normal' ? null : parseFloat(style.lineHeight)];
      });
      for (const [node, size, line] of sizes) {
        node.style.setProperty('font-size', `${size * 2}px`, 'important');
        if (line !== null) node.style.setProperty('line-height', `${line * 2}px`, 'important');
      }
    });
    await page.waitForTimeout(100);
    const geometry = await page.evaluate(() => {
      const rect = node => { const r = node.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }; };
      const captionNode = document.querySelector('.hero-image figcaption');
      const controlNode = document.querySelector('.motion-toggle');
      const caption = rect(captionNode), control = rect(controlNode);
      const overlap = caption.left < control.right && caption.right > control.left && caption.top < control.bottom && caption.bottom > control.top;
      const textOutsideViewport = [];
      for (const node of [captionNode, controlNode]) {
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        let text;
        while ((text = walker.nextNode())) {
          const range = document.createRange(); range.selectNodeContents(text);
          for (const r of range.getClientRects()) if (r.width > 0 && (r.left < -1 || r.right > innerWidth + 1)) textOutsideViewport.push(text.textContent.trim());
        }
      }
      return { caption, control, overlap, textOutsideViewport, viewport: innerWidth, documentWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) };
    });
    assert.equal(geometry.overlap, false, '200% caption and motion control overlap');
    assert.deepEqual(geometry.textOutsideViewport, [], '200% caption/control text exceeds viewport');
    assert.ok(geometry.documentWidth <= geometry.viewport + 2, '200% document overflows');
    assert.deepEqual((await snapshot(page)).problems, []);
    return geometry;
  } finally { await state.context.close(); }
}

try {
  await check('No-JS immediate homepage content', () => staticCase(false));
  await check('Delayed-JS content and preserved hydration node', () => staticCase(true));
  for (const width of [320, 390, 768, 1440]) await check(`Ordinary motion ${width}px`, () => motionCase(width, 'no-preference'));
  for (const width of [390, 1440]) await check(`Reduced motion ${width}px`, () => motionCase(width, 'reduce'));
  await check('Preference switches to reduced motion', () => motionCase(390, 'no-preference', true));
  await check('Pause/resume cancels and restores scroll effects', () => pauseCase());
  await check('200% text at 320px keeps caption/control separate', () => enlargedCaptionCase());
} finally {
  await browser.close();
  const summary = { total: results.length, passed: results.filter(item => item.status === 'pass').length, failed: results.filter(item => item.status === 'fail').length };
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, JSON.stringify({ startedAt, finishedAt: new Date().toISOString(), base: base.href, summary, limitations: ['No screenshot or visual design judgment', 'Unthrottled laboratory observations; run the existing production Lighthouse budgets separately', 'Readability checks target open section headings, paragraphs and controls; native closed disclosures are excluded', 'Does not assess private hosting access control'], results }, null, 2));
  console.log(JSON.stringify(summary));
  if (summary.failed) process.exitCode = 1;
}
