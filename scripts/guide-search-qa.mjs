import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base=process.argv[2]||'http://127.0.0.1:4173';
assert.ok(['127.0.0.1','localhost'].includes(new URL(base).hostname));
const dev=process.argv.includes('--dev');
const browser=await chromium.launch({headless:true});const results=[];
const output='reports/guide-search';await fs.mkdir(output,{recursive:true});
async function context(options={}){
 const ctx=await browser.newContext({viewport:{width:390,height:1000},reducedMotion:'reduce',...options});
 await ctx.route('**/*',r=>new URL(r.request().url()).origin===base&&['GET','HEAD'].includes(r.request().method())?r.continue():r.abort());return ctx;
}
async function ready(page,path){assert.equal((await page.goto(base+path)).status(),200);await page.waitForFunction(()=>document.documentElement.dataset.prerenderReady==='true');}
try{
 for(const width of [320,390,768,1440]){
  const ctx=await context({viewport:{width,height:1000}});const page=await ctx.newPage();await ready(page,'/resources/guides');
  const field=page.getByRole('searchbox',{name:'Search guides'});const count=page.locator('.directory-count');
  const latestTitle=await page.locator('.editorial-pick h2').first().innerText();
  const allLinks=await page.locator('main a').evaluateAll(nodes=>[...new Set(nodes.map(n=>new URL(n.href).pathname).filter(p=>p.startsWith('/resources/guides/')))]);
  assert.equal(allLinks.length,245);await field.fill(latestTitle);assert.ok(await page.locator('.guide-directory-entry').count()>=1);assert.equal(await page.locator('.editorial-pick').count(),0);assert.equal(await page.locator('.guide-entry-copy h3').first().innerText(),latestTitle);
  await page.getByRole('button',{name:'Clear search',exact:true}).click();assert.equal(await field.inputValue(),'');assert.match(await count.innerText(),/^245 guides/);assert.ok(await field.evaluate(el=>el===document.activeElement));
  await field.fill('bridging finance');await page.locator('.guide-directory-entry').first().waitFor();
  await page.locator('#guide-category').selectOption('Bridging Finance');await page.waitForFunction(()=>[...document.querySelectorAll('.guide-entry-meta>span:first-child')].length>0&&[...document.querySelectorAll('.guide-entry-meta>span:first-child')].every(n=>n.textContent==='Bridging Finance'));
  await field.fill('no-such-finance-topic-zzzz');await page.getByRole('heading',{name:'No guides found',exact:true}).waitFor();assert.match(await count.innerText(),/^0 guides/);
  await page.getByRole('button',{name:'Reset search and topic'}).click();assert.equal(await field.inputValue(),'');assert.equal(await page.locator('#guide-category').inputValue(),'All');assert.match(await count.innerText(),/^245 guides/);
  await field.fill('PROPERTY–BACKED');await page.locator('.guide-directory-entry').first().waitFor();
  assert.deepEqual((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  if(width===390||width===1440){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${output}/search-${width}.png`});}
  results.push({width,latestGuideSearch:true,combinedTopicSearch:true,emptyAndReset:true,keyboardFocus:true,accessible:true});await ctx.close();
 }
 const ctx=await context();const page=await ctx.newPage();await ready(page,'/services');
 assert.equal(await page.locator('.service-category[open]').count(),1);assert.equal(await page.locator('.service-depth[open]').count(),0);
 for(const depth of await page.locator('.service-depth').all()){
  await depth.locator(':scope>summary').click();assert.ok(await depth.evaluate(n=>n.open));
  assert.deepEqual((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await depth.locator(':scope>summary').press('Enter');assert.ok(!await depth.evaluate(n=>n.open));
 }
 results.push({route:'/services',allSixDisclosuresOpenClose:true,accessible:true});await ctx.close();
 if(!dev){
  const native=await context({javaScriptEnabled:false});const p=await native.newPage();await p.goto(base+'/resources/guides');
  const links=await p.locator('main a').evaluateAll(nodes=>[...new Set(nodes.map(n=>new URL(n.href).pathname).filter(path=>path.startsWith('/resources/guides/')))]);assert.equal(links.length,245);
  await p.goto(base+'/services');assert.equal(await p.locator('.service-option h4 a').count(),16);
  for(const details of await p.locator('.service-category,.service-depth').all()){const before=await details.evaluate(n=>n.open);await details.locator(':scope>summary').click();assert.notEqual(await details.evaluate(n=>n.open),before);}
  results.push({noJavaScript:true,crawlableGuides:245,crawlableServices:16,nativeDisclosures:true});await native.close();
  const delayed=await context();let release;const gate=new Promise(resolve=>{release=resolve;});
  await delayed.route('**/*.js',async r=>{await gate;await r.continue();});
  try{const p=await delayed.newPage();await p.goto(base+'/resources/guides',{waitUntil:'commit'});await p.locator('#guide-search').fill('bridging');await p.locator('#guide-category').selectOption('Bridging Finance');release();await p.waitForFunction(()=>document.documentElement.dataset.prerenderReady==='true');assert.equal(await p.locator('#guide-search').inputValue(),'bridging');assert.equal(await p.locator('#guide-category').inputValue(),'Bridging Finance');assert.ok(await p.locator('.guide-directory-entry').count()>0);results.push({delayedJavaScript:true,typedQueryAndTopicRetained:true});}finally{release();await delayed.close();}
 }
}finally{await browser.close();await fs.writeFile(`${output}/results.json`,JSON.stringify(results,null,2));}
console.log(JSON.stringify({passed:results.length,results}));
