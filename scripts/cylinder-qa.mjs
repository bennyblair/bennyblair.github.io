/** Finite staged-cylinder acceptance. Only loopback reads; all writes/external traffic blocked.
 * node staged-cylinder-qa.mjs http://127.0.0.1:4173 [--dev] [--output <json>]
 * --dev skips static/hydration checks. Includes two responsive screenshots; no field-performance claims.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
const args = process.argv.slice(2);
const option = (key, fallback) => args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const base = new URL(args.find(value => /^https?:\/\//.test(value)) || 'http://127.0.0.1:4173');
assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(base.hostname), 'Loopback only');
assert.equal(base.pathname, '/');
const site = option('--site', process.cwd());
const output = option('--output', path.join(site, 'reports', 'cylinder-qa-results.json'));
const { chromium } = createRequire(path.join(site, 'package.json'))('playwright');
const browser = await chromium.launch({ headless: true });
const results = [], startedAt = new Date().toISOString();
const selectors = { stage: 'button.process-stage-button,.process-stage-button button', replay: 'button.process-replay,.process-replay button', pause: 'button.process-motion-toggle,.process-motion-toggle button', global: 'button.motion-toggle,.motion-toggle button' };
const expected = [['Enquiry','Tell us about your funding requirements'],['Assessment','We evaluate your proposal and present options'],['Approval','Fast-track approval with our lender network'],['Settlement','Quick settlement and funding deployment']];
async function test(name, fn) {
  if (args.includes('--only') && !new RegExp(option('--only', '')).test(name)) return;
  try { const details = await fn(); results.push({ name, status: 'pass', details }); console.log(`PASS ${name}`); }
  catch (error) { results.push({ name, status: 'fail', error: error.message }); console.log(`FAIL ${name}: ${error.message}`); }
}
async function setup(width = 1440, { reduce = false, noJS = false, delayed = false } = {}) {
  const context = await browser.newContext({ viewport: { width, height: 1000 }, javaScriptEnabled: !noJS, reducedMotion: reduce ? 'reduce' : 'no-preference', serviceWorkers: 'block' });
  const network = { writes: [], analytics: [], delayed: 0 }; let release;
  const gate = delayed ? new Promise(resolve => { release = resolve; }) : null;
  await context.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    if (/googletagmanager|google-analytics|doubleclick|\/g\/collect/.test(url.href)) network.analytics.push(url.href);
    if (!['GET','HEAD'].includes(request.method())) network.writes.push(request.method() + ' ' + url.href);
    if (url.origin !== base.origin || !['GET','HEAD'].includes(request.method())) return route.abort();
    if (gate && request.resourceType() === 'script') { network.delayed++; await gate; }
    return route.continue();
  });
  const page = await context.newPage(), errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (['warning','error'].includes(message.type()) && /hydrat|did not match|server.*html|Minified React error #(418|423|425)/i.test(message.text())) errors.push(message.text()); });
  return { context, page, network, errors, release: () => release?.() };
}
async function snapshot(page) {
  return page.evaluate(selectors => {
    const journey = document.querySelector('.process-journey'), visual = journey?.querySelector('.process-visual'), svg = visual?.querySelector('svg.process-cylinder'), ball = svg?.querySelector('.process-ball');
    if (!journey || !visual || !svg || !ball) throw new Error('Cylinder selectors missing');
    const rect = node => { const b = node.getBoundingClientRect(); return { left:b.left, right:b.right, top:b.top, bottom:b.bottom, width:b.width, height:b.height }; };
    const invisible = node => { for(let a=node;a;a=a.parentElement) { const s=getComputedStyle(a); if(s.display==='none'||s.visibility==='hidden'||Number(s.opacity)<.85||a.hidden) return true; } const b=node.getBoundingClientRect(); return !b.width||!b.height; };
    const transform = getComputedStyle(ball).transform, shape = svg.getScreenCTM();
    const controls = [...journey.querySelectorAll('button')];
    const textNodes = [...journey.querySelectorAll('.process-step h3,.process-step p')];
    const times = ball.getAnimations().map(a=>({time:a.currentTime,state:a.playState}));
    return { compact:innerWidth<=700&&document.documentElement.dataset.prerenderReady==='true', now:performance.now(), y:transform==='none'?0:new DOMMatrixReadOnly(transform).m42, times, stage:journey.dataset.stage, active:[...journey.querySelectorAll('.process-step')].map(node=>node.dataset.active==='true'), rings:[...svg.querySelectorAll('.process-ring-glow')].map(node=>Number(getComputedStyle(node).opacity)), steps:[...journey.querySelectorAll('.process-step')].map(node=>[node.querySelector('h3')?.textContent.trim(),node.querySelector('p')?.textContent.trim()]), invisible:textNodes.filter(invisible).map(node=>node.textContent.trim()), controlCount:controls.length, hiddenControls:controls.filter(node=>node.closest('[aria-hidden="true"]')).map(node=>node.textContent.trim()), pressed:[...journey.querySelectorAll(selectors.stage)].map(node=>node.getAttribute('aria-pressed')), svg:rect(svg), visual:rect(visual), absoluteTop:rect(visual).top+scrollY, ball:rect(ball), viewBox:svg.getAttribute('viewBox'), scale:{x:shape.a,y:shape.d}, decorative:svg.getAttribute('aria-hidden'), width:innerWidth,height:innerHeight,scrollY,documentWidth:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth) };
  },selectors);
}
async function readable(page) {
  const s=await snapshot(page);
  assert.deepEqual(s.steps,expected,'Original four descriptions retained');
  assert.deepEqual(s.invisible,s.compact?expected.filter((_,index)=>String(index)!==s.stage).flat():[],'Active mobile copy is visible; every desktop/static stage remains visible');
  assert.deepEqual(s.hiddenControls,[],'Controls must be outside aria-hidden SVG wrapper');
  assert.equal(s.decorative,'true'); assert.ok(s.controlCount>=6,'Four stage controls plus replay and pause');
  assert.equal(s.viewBox,'0 0 500 660');
  assert.ok(Math.abs(s.scale.x-s.scale.y)<.001,'SVG scales proportionally');
  assert.ok(s.svg.width>0&&s.svg.width<=500.5&&s.svg.left>=-1&&s.svg.right<=s.width+1,'Cylinder fits viewport');
  if(s.compact) {
    const pair=await page.evaluate(()=>{const v=document.querySelector('.process-visual').getBoundingClientRect(),c=document.querySelector('.process-step[data-active="true"] .process-step-copy').getBoundingClientRect();return {overlap:Math.min(v.bottom,c.bottom)-Math.max(v.top,c.top),gap:c.left-v.right};});
    assert.ok(pair.overlap>0&&pair.gap>=0,'Active title and cylinder remain beside each other');
  }
  assert.ok(s.documentWidth<=s.width+2,`Horizontal overflow ${s.documentWidth}/${s.width}`);
  return s;
}
async function ready(page) {
  assert.equal((await page.goto(base.href,{waitUntil:'domcontentloaded'}))?.status(),200);
  await page.locator('.process-cylinder .process-ball').waitFor({state:'attached'});
  await page.waitForFunction(()=>document.documentElement.dataset.prerenderReady==='true',undefined,{timeout:20000});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>document.documentElement.dataset.prerenderReady==='true');
  await readable(page);
}
async function show(page) {
  const s=await snapshot(page);
  await page.evaluate(top=>window.scrollTo({top,behavior:'instant'}),s.absoluteTop-Math.max(100,(s.height-s.visual.height)/2));
  await page.waitForTimeout(60);
  return snapshot(page);
}
async function withPage(width,fn,options) {
  const state=await setup(width,options);
  try { await ready(state.page);const details=await fn(state.page);assert.deepEqual(state.errors,[]);assert.deepEqual(state.network.writes,[]);assert.deepEqual(state.network.analytics,[]);return details; }
  finally { state.release();await state.context.close(); }
}
async function press(page,selector,index=0,key='Enter') { const b=page.locator(selector).nth(index);assert.equal(await b.isDisabled(),false,'Keyboard control must be enabled');await b.focus();assert.ok(await b.evaluate(node=>document.activeElement===node),'Keyboard focus reaches control');await b.press(key); }
async function assertStage(page,index,tolerance=1) {
  const s=await snapshot(page);
  assert.ok(Math.abs(s.y-index*140)<=tolerance,`Stage${index} sphere Y is${s.y}`);
  assert.equal(s.stage,String(index),'Current stage matches sphere');
  assert.deepEqual(s.active,[0,1,2,3].map(value=>value===index),'One active HTML stage');
  assert.equal(s.pressed[index],'true','Selected button exposes aria-pressed');
  assert.ok(s.rings[index]>=.75&&s.rings.every((value,i)=>i===index||value<=.25),`Ring/text alignment: ${s.rings}`);
  return s;
}
async function waitStage(page,index,timeout=8000) {
  await page.waitForFunction(({index})=>{const b=document.querySelector('.process-ball');const t=getComputedStyle(b).transform;const y=t==='none'?0:new DOMMatrixReadOnly(t).m42;return Math.abs(y-index*140)<1&&document.querySelector('.process-journey').dataset.stage===String(index);},{index},{timeout});
  return assertStage(page,index);
}
async function frozen(page,delay=450) {
  const before=await snapshot(page);await page.waitForTimeout(delay);const after=await snapshot(page);
  assert.ok(Math.abs(before.y-after.y)<.1,'Paused sphere moved');
  for(let i=0;i<Math.min(before.times.length,after.times.length);i++) assert.ok(Math.abs((before.times[i].time??0)-(after.times[i].time??0))<2,'Paused animation clock advanced');
  return {beforeY:before.y,afterY:after.y,beforeTimes:before.times,afterTimes:after.times};
}
async function timedStops(page) {
  await show(page);
  const samples=[];
  for(let i=0;i<85;i++){samples.push(await snapshot(page));await page.waitForTimeout(100);}
  const rests=[];
  for(let stage=0;stage<4;stage++) {
    const at=samples.filter(s=>Math.abs(s.y-stage*140)<1&&s.stage===String(stage));
    assert.ok(at.length>=8,`Stage${stage} has a discernible rest (${at.length} samples)`);
    const duration=at.at(-1).now-at[0].now;assert.ok(duration>=750,`Stage${stage} rest too short: ${duration}ms`);
    assert.ok(at.every(s=>s.active[stage]&&s.rings[stage]>=.75),`Stage${stage} ring/text misalignment during rest`);
    rests.push({stage,durationMs:Math.round(duration),firstAt:at[0].now-samples[0].now});
  }
  for(let i=1;i<samples.length;i++) assert.ok(samples[i].y>=samples[i-1].y-.2,'Sequence reverses unexpectedly');
  assert.ok(samples.some(s=>s.y>10&&s.y<130)&&samples.some(s=>s.y>150&&s.y<270)&&samples.some(s=>s.y>290&&s.y<410),'Three visible journeys between stops');
  await assertStage(page,3);await frozen(page,350);await readable(page);
  return {rests,firstY:samples[0].y,lastY:samples.at(-1).y};
}
async function noScrollSkip(page) {
  await show(page);const before=await snapshot(page);
  await page.evaluate(()=>window.scrollTo({top:document.body.scrollHeight,behavior:'instant'}));
  await page.waitForTimeout(200);const jumped=await snapshot(page);
  assert.ok(jumped.y<5&&jumped.stage==='0','Fast scroll skips the initial stop');
  await frozen(page);await show(page);const returned=await snapshot(page);
  assert.ok(returned.y<5,'Re-entry resumes instead of scrubbing to a later stage');
  return {beforeY:before.y,afterJumpY:jumped.y,returnedY:returned.y};
}
async function localPause(page) {
  await show(page);await page.waitForFunction(()=>{const t=getComputedStyle(document.querySelector('.process-ball')).transform;const y=t==='none'?0:new DOMMatrixReadOnly(t).m42;return y>15&&y<125;});
  await press(page,selectors.pause,0,'Space');await show(page);
  assert.equal(await page.locator(selectors.pause).first().getAttribute('aria-pressed'),'true');
  const stopped=await frozen(page);
  assert.ok(stopped.beforeY>0&&stopped.beforeY<140,'Pause preserves intermediate position');
  await press(page,selectors.pause);await show(page);await waitStage(page,1);
  return {stopped,resumedStage:1};
}
async function globalPause(page) {
  await show(page);await waitStage(page,1);await press(page,selectors.global,0,'Space');await show(page);
  assert.equal(await page.locator(selectors.global).first().getAttribute('aria-pressed'),'true');const stopped=await frozen(page);
  assert.ok(Math.abs(stopped.beforeY-140)<1,'Global pause retains current stage');
  await press(page,selectors.global);await show(page);await waitStage(page,2);
  return {stopped,resumedStage:2};
}
async function stageSelection(page,reduce=false) {
  await show(page);
  for(const index of [2,0,3,1]) {await press(page,selectors.stage,index,index%2?'Space':'Enter');await show(page);await waitStage(page,index,reduce?500:8000);await page.waitForFunction(selector=>document.querySelector(selector)?.getAttribute('aria-pressed')==='true',selectors.pause,{timeout:8000});await assertStage(page,index);await frozen(page,300);}
  if(!reduce) {await press(page,selectors.pause);await show(page);await waitStage(page,2,4000);}
  await readable(page);return {order:[2,0,3,1],reduce,playAfterReverseAdvancesForward:!reduce};
}
async function replay(page) {
  await show(page);await press(page,selectors.stage,3);await show(page);await waitStage(page,3);
  await press(page,selectors.replay);await show(page);const reset=await snapshot(page);
  assert.ok(reset.y<1&&reset.stage==='0','Replay resets the clock and first stage');await waitStage(page,1,4000);
  return {resetY:reset.y,replayedStage:1};
}
async function offscreen(page) {
  await show(page);await waitStage(page,1);await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(100);const stopped=await frozen(page,700);
  await show(page);await waitStage(page,2);return {stopped,resumedStage:2};
}
async function reduced(page,dynamic=false) {
  if(dynamic) {await show(page);await waitStage(page,1);await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);}
  await show(page);const stopped=await frozen(page,1400);await stageSelection(page,true);
  return {dynamic,stopped};
}
async function resizeAndEnlarge(page) {
  await show(page);await press(page,selectors.stage,2);await show(page);await waitStage(page,2);
  await page.setViewportSize({width:320,height:844});await show(page);await assertStage(page,2);
  await page.evaluate(()=>{const sizes=[...document.querySelectorAll('body,body *')].map(n=>{const s=getComputedStyle(n);return[n,parseFloat(s.fontSize),s.lineHeight==='normal'?null:parseFloat(s.lineHeight)];});for(const[n,f,l]of sizes){n.style.setProperty('font-size',`${f*2}px`,'important');if(l!==null)n.style.setProperty('line-height',`${l*2}px`,'important');}});
  await show(page);const s=await readable(page);
  const clipped=await page.evaluate(()=>{const out=[];for(const e of document.querySelectorAll('.process-step h3,.process-step p,.process-journey button')){const walker=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let n;while((n=walker.nextNode())){const r=document.createRange();r.selectNodeContents(n);for(const b of r.getClientRects())if(b.width&&(b.left< -1||b.right>innerWidth+1))out.push(n.textContent.trim());}}return out;});
  assert.deepEqual(clipped,[],'Enlarged labels/text exceed viewport');return {width:s.width,documentWidth:s.documentWidth,svg:s.svg};
}
async function staticCase(delayed) {
  const s=await setup(390,{noJS:!delayed,delayed});
  try {await s.page.goto(base.href,{waitUntil:delayed?'commit':'domcontentloaded'});await s.page.locator('.process-cylinder .process-ball').waitFor({state:'attached'});const before=await readable(s.page);assert.equal(await s.page.locator(selectors.pause).first().isDisabled(),false,'Saved pause control must not inherit prerender reduced-motion disabled state');assert.ok(before.y<1,'Static pose begins at Enquiry');
    if(delayed){await s.page.evaluate(()=>{window.__processNodes=[...document.querySelectorAll('.process-cylinder,.process-ball,.process-step')];});s.release();await s.page.waitForFunction(()=>document.documentElement.dataset.prerenderReady==='true');assert.ok(await s.page.evaluate(()=>window.__processNodes.every((n,i)=>n===document.querySelectorAll('.process-cylinder,.process-ball,.process-step')[i])),'Hydration replaces original process nodes');await readable(s.page);}
    assert.deepEqual(s.errors,[]);assert.deepEqual(s.network.writes,[]);assert.deepEqual(s.network.analytics,[]);return {delayed,stage:before.stage,y:before.y};
  }finally{s.release();await s.context.close();}
}
async function responsiveCapture(page,width) {
  await show(page);await press(page,selectors.stage,1);await show(page);await waitStage(page,1);
  await page.waitForFunction(selector=>document.querySelector(selector)?.getAttribute('aria-pressed')==='true',selectors.pause);
  await assertStage(page,1);await readable(page);await page.waitForTimeout(750);
  const folder=path.join(path.dirname(output),'output','playwright');await fs.mkdir(folder,{recursive:true});
  const screenshot=path.join(folder,`staged-cylinder-${width}.png`);
  await page.locator('.home-process').screenshot({path:screenshot,animations:'allow'});
  return {width,stage:1,screenshot,scope:'Responsive process section with synchronized copy and persistent controls'};
}

async function compactMobile(page) {
  await show(page);
  const heights=[];
  for(const index of [0,1,2,3]) {
    await press(page,selectors.stage,index);
    await assertStage(page,index);await readable(page);
    const frame=await page.evaluate(()=>{
      const r=s=>document.querySelector(s).getBoundingClientRect();
      const v=r('.process-visual'),copy=r('.process-step[data-active="true"] .process-step-copy'),player=r('.process-player'),journey=r('.process-journey');
      return {height:journey.height,coreHeight:player.bottom-Math.min(v.top,copy.top),width:innerWidth,copyBottom:copy.bottom,controlsTop:r('.process-stage-button').top};
    });
    assert.ok(frame.coreHeight<480,'Mobile cylinder, copy and playback fit one compact frame');
    assert.ok(frame.copyBottom<=frame.controlsTop,'Copy does not overlap selectors');
    heights.push(frame.height);
  }
  assert.ok(Math.max(...heights)-Math.min(...heights)<1,'Selecting stages does not move the page');
  return {heights};
}

try {
  for(const width of [320,390,600]) await test('Compact paired mobile stages '+width+'px',()=>withPage(width,compactMobile,{reduce:true}));
  if(!args.includes('--dev')){await test('No-JS static pose and readable stages',()=>staticCase(false));await test('Delayed-JS preserves cylinder/process nodes',()=>staticCase(true));}
  await test('All four actual timed rests and aligned rings/text',()=>withPage(1440,timedStops));
  await test('Fast mobile scroll cannot skip every stop',()=>withPage(390,noScrollSkip));
  await test('Local keyboard pause freezes exact progress',()=>withPage(1440,localPause));
  await test('Global keyboard pause retains cylinder progress',()=>withPage(1440,globalPause));
  await test('Keyboard stage selection holds requested stage',()=>withPage(390,stageSelection));
  await test('Replay restarts the staged journey',()=>withPage(1440,replay));
  await test('Offscreen freezes and re-entry resumes',()=>withPage(1440,offscreen));
  await test('Reduced motion is static with instant manual selection',()=>withPage(390,p=>reduced(p),{reduce:true}));
  await test('Dynamic reduced motion stops autoplay',()=>withPage(1440,p=>reduced(p,true)));
  await test('Resize and320px200% text preserve controls and stages',()=>withPage(1440,resizeAndEnlarge));
  for(const width of [1440,390]) await test(`Responsive process capture ${width}px`,()=>withPage(width,p=>responsiveCapture(p,width)));
}finally{
  await browser.close();const summary={total:results.length,passed:results.filter(r=>r.status==='pass').length,failed:results.filter(r=>r.status==='fail').length,skipped:args.includes('--dev')?2:0};
  await fs.mkdir(path.dirname(output),{recursive:true});await fs.writeFile(output,JSON.stringify({startedAt,finishedAt:new Date().toISOString(),base:base.href,summary,limitations:['Responsive screenshots require human visual review','No real-user/performance-budget assessment','200% text is synthetic font and line-height enlargement','Document-hidden behavior needs a separate trusted browser lifecycle test; this suite covers offscreen lifecycle'],results},null,2));console.log(JSON.stringify(summary));if(summary.failed)process.exitCode=1;
}
