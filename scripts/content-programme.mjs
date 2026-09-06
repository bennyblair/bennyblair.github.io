import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import { containsInternalEditorialLanguage } from './lib/article-publication-contract.mjs';

const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const read = filename => JSON.parse(fs.readFileSync(filename, 'utf8'));
const metricNumber = value => value === null || value === undefined || value === '' || !Number.isFinite(Number(value)) ? null : Number(value);
const decisions = new Set(['retain', 'repair', 'rewrite', 'investigate_consolidation']);
const stages = new Set(['queued', 'reviewed', 'draft_ready', 'held', 'verified']);
const countBy = (rows, field) => rows.reduce((counts, row) => {
  counts[row[field]] = (counts[row[field]] || 0) + 1;
  return counts;
}, {});

export function auditPage(page, root) {
  const filename = page.sourcePath ? path.resolve(root, page.sourcePath) : null;
  const inside = filename && filename.startsWith(path.resolve(root) + path.sep);
  const exists = inside && fs.existsSync(filename) && fs.statSync(filename).isFile();
  const raw = exists ? fs.readFileSync(filename, 'utf8') : '';
  const flags = [];
  let data = {};
  let body = raw;
  if (exists && filename.endsWith('.md')) {
    try { ({ data, content: body } = matter(raw)); }
    catch { flags.push('invalid_frontmatter'); }
    if (/^#\s+/m.test(body)) flags.push('body_h1_needs_render_check');
    if (containsInternalEditorialLanguage(body) || /^#{1,6}\s+.*\bLLM\b/im.test(body)) flags.push('public_production_language');
    if (!(data.metaTitle || data.meta_title)) flags.push('verify_rendered_title_fallback');
    if (!(data.metaDescription || data.meta_description)) flags.push('verify_rendered_description_fallback');
    if (!Array.isArray(data.sources) || !data.sources.length) flags.push('verify_claim_sources_not_recorded_in_frontmatter');
    const image = data.featuredImage || data.featured_image;
    if (!image) flags.push('verify_article_image_fallback');
    else if (image.startsWith('/') && !fs.existsSync(path.join(root, 'public', image))) flags.push('missing_referenced_image');
    const relatedCount = (body.match(/^##\s+(?:Related Guides|Related Resources|Related Content|Further Reading)\s*$/gim) || []).length;
    if (relatedCount !== 1) flags.push('review_related_sections');
  }
  if (!exists && page.indexability === 'indexable') flags.push('verify_generated_source_mapping');
  if (page.metadataStatus === 'needs_review') flags.push('registry_metadata_review');
  return { sourceHash: hash(raw || JSON.stringify({ path: page.path, sourcePath: page.sourcePath })), flags };
}

export function buildProgramme(registry, config, previous, root, gsc = null, now = new Date().toISOString()) {
  const old = new Map((previous?.pages || []).map(row => [row.path, row]));
  const observations = new Map((gsc?.topPages || []).map(row => [row.path, row]));
  const priorities = new Map(config.priorityPaths.map((url, index) => [url, index]));
  const pages = registry.pages.map(page => {
    const audit = auditPage(page, root);
    const prior = old.get(page.path);
    const sameSource = prior?.sourceHash === audit.sourceHash;
    // A source edit does not resolve a financial or other outstanding review hold.
    const keepReview = sameSource || prior?.stage === 'held';
    const metric = observations.get(page.path);
    const protectedUntil = page.lifecycle?.protectedUntil || null;
    const protectedNow = protectedUntil && Number.isFinite(Date.parse(protectedUntil)) && Date.parse(protectedUntil) > Date.parse(now);
    const commercial = /commercial-property|refinanc|bridg|caveat|mortgage|property-equity|against-property/.test(page.path);
    const score = priorities.has(page.path) ? 100000 - priorities.get(page.path) :
      (commercial ? 5000 : 0) + (page.pageType === 'service' ? 1000 : 0) +
      (Number(metric?.impressions) || 0) * (metric?.position > 0 && metric.position <= 20 ? 1.5 : 1) +
      (audit.flags.includes('public_production_language') ? 100 : 0);
    return {
      pageId: page.pageId, path: page.path, sourcePath: page.sourcePath, pageType: page.pageType,
      indexability: page.indexability, primaryQuery: page.targeting?.primaryQuery || null,
      serviceOwner: page.targeting?.designatedServicePagePath || null,
      risk: page.governance?.contentRisk, protectedUntil, protectedNow: Boolean(protectedNow),
      sourceHash: audit.sourceHash, flags: audit.flags, priorityScore: score,
      proposedDecision: audit.flags.length ? 'repair' : 'retain',
      decision: keepReview ? prior.decision : null,
      stage: keepReview ? prior.stage : 'queued',
      reviewedAt: keepReview ? prior.reviewedAt : null,
      reviewedSourceHash: keepReview && prior.reviewedAt ? prior.reviewedSourceHash || prior.sourceHash : null,
      verifiedAt: sameSource ? prior.verifiedAt : null,
      evidencePath: keepReview ? prior.evidencePath : null,
      reviewer: keepReview ? prior.reviewer : null,
      note: keepReview ? prior.note : null,
      gsc: metric ? { clicks: metricNumber(metric.clicks), impressions: metricNumber(metric.impressions), position: metricNumber(metric.position) } : null,
      history: prior?.history || [],
    };
  }).sort((a, b) => b.priorityScore - a.priorityScore || a.path.localeCompare(b.path));
  return {
    schemaVersion: 1, programmeId: config.programmeId, generatedAt: now,
    registryChecksum: registry.checksum, configVersion: config.version,
    evidence: { gscWindow: gsc?.performanceWindow || null, gscAvailable: Boolean(gsc?.performanceWindow?.currentStart && gsc?.performanceWindow?.currentEnd && Array.isArray(gsc?.topPages) && gsc.topPages.some(row => typeof row.path === 'string' && metricNumber(row.impressions) !== null)), qualifiedLeads: null,
      note: 'Static triage is not a completed editorial review. Missing page rows are unavailable, not zero. Redirect and noindex states remain unchanged.' },
    counts: { total: pages.length, indexability: countBy(pages, 'indexability'), pageTypes: countBy(pages, 'pageType'), stages: countBy(pages, 'stage') },
    pages,
    releases: previous?.releases || [],
  };
}

export function nextPages(state, { purpose = 'review', limit = 10 } = {}) {
  if (!['review', 'repair', 'verify'].includes(purpose)) throw new Error('purpose must be review, repair or verify');
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) throw new Error('limit must be 1–50');
  return state.pages.filter(page => {
    if (purpose === 'review') return page.stage === 'queued';
    if (page.stage !== 'reviewed') return false;
    return purpose === 'repair' ? ['repair', 'rewrite'].includes(page.decision) : page.decision === 'retain';
  }).slice(0, limit);
}

export function recordReview(state, { url, decision, stage, reviewer, note, evidencePath, receipt, root, now = new Date().toISOString() }) {
  const page = state.pages.find(row => row.path === url);
  if (!page) throw new Error('URL is not in the current registry inventory');
  if (!decisions.has(decision) || !stages.has(stage) || stage === 'queued') throw new Error('Choose a valid reviewed decision and stage');
  if (!reviewer || !note || !evidencePath) throw new Error('Reviewer, review note and evidence path are required');
  if (stage === 'verified') {
    if (!receipt || receipt.status !== 'passed' || receipt.path !== url || receipt.sourceHash !== page.sourceHash || !receipt.checkedAt || !Array.isArray(receipt.checks)) {
      throw new Error('Completion requires a passed receipt for this URL and exact source hash');
    }
    if (!receipt.checks.some(check => check.kind === 'live_render' && check.status === 'passed') || receipt.checks.some(check => check.status !== 'passed')) {
      throw new Error('All receipt checks, including live rendering, must pass');
    }
    if (!root || auditPage(page, root).sourceHash !== page.sourceHash) throw new Error('Source changed after inventory scan; rescan and verify the current source before completion');
    if (Date.parse(receipt.checkedAt) > Date.parse(now) || !Number.isFinite(Date.parse(receipt.checkedAt))) throw new Error('Invalid verification timestamp');
  }
  Object.assign(page, { decision, stage, reviewer, note, evidencePath, reviewedAt: now, reviewedSourceHash: page.sourceHash, verifiedAt: stage === 'verified' ? now : null });
  page.history.push({ at: now, decision, stage, reviewer, note, evidencePath, sourceHash: page.sourceHash, verificationReceipt: stage === 'verified' ? receipt : null });
  state.counts.stages = countBy(state.pages, 'stage');
  state.updatedAt = now;
  return page;
}

export function recordRelease(state, receipt, root) {
  if (!receipt || receipt.status !== 'passed' || receipt.liveRender !== 'passed' ||
      !/^[a-f0-9]{40}$/.test(receipt.deployedSha || '') || receipt.expectedSha !== receipt.deployedSha ||
      !['new', 'substantive', 'mechanical', 'infrastructure'].includes(receipt.kind) ||
      !Array.isArray(receipt.urls) || !receipt.urls.length || !Number.isFinite(Date.parse(receipt.checkedAt)) ||
      Date.parse(receipt.checkedAt) > Date.now()) throw new Error('Passed exact-revision, live-URL release receipt required');
  const paths = receipt.urls.map(url => {
    const parsed = new URL(url);
    if (parsed.origin !== 'https://emetcapital.com.au' || parsed.search || parsed.hash) throw new Error('Canonical Emet URLs required');
    if (!state.pages.some(page => page.path === parsed.pathname)) throw new Error('Rescan registry before recording an unregistered release URL');
    return parsed.pathname;
  });
  if (new Set(paths).size !== paths.length) throw new Error('Duplicate release URLs are not permitted');
  if (!root || !Array.isArray(receipt.pages) || receipt.pages.length !== paths.length) throw new Error('One exact-source page receipt required per URL');
  for (const url of paths) {
    const page = state.pages.find(row => row.path === url);
    const proof = receipt.pages.find(row => row.path === url);
    const required = ['live_render', 'http_status', 'canonical', 'robots', 'content'];
    if (!proof || proof.sourceHash !== page.sourceHash || auditPage(page, root).sourceHash !== page.sourceHash ||
        proof.deployedSha !== receipt.deployedSha || !Array.isArray(proof.checks) ||
        required.some(kind => !proof.checks.some(check => check.kind === kind && check.status === 'passed')) ||
        proof.checks.some(check => check.status !== 'passed')) throw new Error('Missing or stale exact-source/live evidence for ' + url);
  }
  state.releases ||= [];
  if (state.releases.some(row => row.deployedSha === receipt.deployedSha)) throw new Error('Release revision already recorded');
  const releasedAt = receipt.checkedAt;
  const release = { ...receipt, paths, releasedAt,
    performanceReviews: receipt.kind === 'infrastructure' ? [] : [28, 56, 90].map(days => ({
      days, dueAt: new Date(Date.parse(releasedAt) + days * 86400000).toISOString(), status: 'pending', observation: null,
    })) };
  state.releases.push(release);
  return release;
}

export function recordPerformanceReview(state, evidence) {
  const release = state.releases?.find(row => row.deployedSha === evidence.releaseSha);
  const review = release?.performanceReviews?.find(row => row.days === evidence.days);
  if (!review || !['available', 'unavailable'].includes(evidence.evidenceStatus) ||
      !evidence.note || !evidence.reportPath || !fs.existsSync(evidence.reportPath) ||
      !Number.isFinite(Date.parse(evidence.checkedAt)) || Date.parse(evidence.checkedAt) > Date.now() ||
      Date.parse(evidence.checkedAt) < Date.parse(review.dueAt)) throw new Error('Due performance review with real report evidence required');
  Object.assign(review, { status: 'observed', observation: evidence });
  return review;
}

export function programmeReport(state, now = new Date().toISOString()) {
  const since = Date.parse(now) - 7 * 86400000;
  const reviewed = new Set(); const verified = new Set();
  for (const page of state.pages) for (const event of page.history || []) {
    if (Date.parse(event.at) >= since && Date.parse(event.at) <= Date.parse(now)) {
      reviewed.add(page.path);
      if (event.stage === 'verified') verified.add(page.path);
    }
  }
  const releases = (state.releases || []).filter(row => Date.parse(row.releasedAt) >= since && Date.parse(row.releasedAt) <= Date.parse(now));
  const countUrls = kind => new Set(releases.filter(row => row.kind === kind).flatMap(row => row.paths)).size;
  return {
    publications: { newArticles: countUrls('new'), substantivePagesRepaired: countUrls('substantive'), mechanicalPagesRepaired: countUrls('mechanical'), verifiedReleases: releases.length },
    performanceReviewsDue: (state.releases || []).flatMap(row => (row.performanceReviews || []).filter(review => review.status === 'pending' && Date.parse(review.dueAt) <= Date.parse(now)).map(review => ({ sha: row.deployedSha, paths: row.paths, ...review }))),
    generatedAt: now, inventory: state.counts, lastSevenDays: { pagesReviewed: reviewed.size, pagesVerified: verified.size },
    unfinished: state.pages.filter(page => page.stage !== 'verified').length,
    held: state.pages.filter(page => page.stage === 'held').map(({ path: url, note }) => ({ path: url, reason: note })),
    qualifiedEnquiries: null, settlements: null, revenue: null,
    measurementNote: 'Join private enquiry outcomes when available. Phone/email clicks are not qualified leads. Do not sum page-level GSC rows into site totals.',
  };
}

function atomicWrite(filename, value) {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  const temporary = `${filename}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
  fs.renameSync(temporary, filename);
}

async function main() {
  const args = process.argv.slice(2);
  const arg = name => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : undefined; };
  const root = path.resolve(arg('--repo') || process.cwd());
  const filename = path.resolve(arg('--state') || process.env.CONTENT_PROGRAMME_STATE || path.join(root, '..', 'seo', 'content-programme.json'));
  const command = args[0] || 'scan';
  if (!['scan', 'next', 'record-review', 'record-release', 'record-performance-review', 'report'].includes(command)) throw new Error('Commands: scan, next, record-review, record-release, record-performance-review, report');
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  const lock = `${filename}.lock`;
  let fd;
  try { fd = fs.openSync(lock, 'wx'); fs.writeSync(fd, JSON.stringify({ pid: process.pid, startedAt: new Date().toISOString() })); }
  catch { throw new Error(`Programme state is locked; verify its owner before recovery: ${lock}`); }
  try {
    let state = fs.existsSync(filename) ? read(filename) : null;
    if (command === 'scan') {
      const gscFilename = arg('--gsc');
      state = buildProgramme(read(path.join(root, 'data/seo-page-registry.json')), read(path.join(root, 'data/seo-content-programme.json')), state, root, gscFilename ? read(gscFilename) : null);
      atomicWrite(filename, state);
      console.log(JSON.stringify({ state: filename, counts: state.counts, evidence: state.evidence }, null, 2));
    } else {
      if (!state) throw new Error('Run scan first');
      if (command === 'next') {
        const limit = Number(arg('--limit') || 10);
        const purpose = arg('--purpose') || 'review';
        console.log(JSON.stringify(nextPages(state, { purpose, limit }), null, 2));
      }
      if (command === 'record-review') {
        const evidencePath = arg('--evidence');
        if (!evidencePath || !fs.existsSync(evidencePath)) throw new Error('Evidence file must exist');
        const stage = arg('--stage');
        const page = recordReview(state, { url: arg('--path'), decision: arg('--decision'), stage, reviewer: arg('--reviewer'), note: arg('--note'), evidencePath, root, receipt: stage === 'verified' ? read(evidencePath) : null });
        atomicWrite(filename, state);
        console.log(JSON.stringify(page, null, 2));
      }
      if (command === 'record-release') {
        const receiptPath = arg('--receipt');
        if (!receiptPath || !fs.existsSync(receiptPath)) throw new Error('Existing release receipt required');
        const release = recordRelease(state, read(receiptPath), root);
        atomicWrite(filename, state);
        console.log(JSON.stringify(release, null, 2));
      }
      if (command === 'record-performance-review') {
        const evidencePath = arg('--evidence');
        if (!evidencePath || !fs.existsSync(evidencePath)) throw new Error('Existing performance observation required');
        const review = recordPerformanceReview(state, read(evidencePath));
        atomicWrite(filename, state);
        console.log(JSON.stringify(review, null, 2));
      }
      if (command === 'report') {
        const report = programmeReport(state);
        const output = arg('--output');
        if (output) atomicWrite(path.resolve(output), report);
        console.log(JSON.stringify(report, null, 2));
      }
    }
  } finally { fs.closeSync(fd); fs.unlinkSync(lock); }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
