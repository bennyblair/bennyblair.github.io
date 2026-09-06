import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildProgramme, nextPages, recordReview, programmeReport, recordRelease, recordPerformanceReview } from '../content-programme.mjs';

test('portfolio reconciles every route and never treats a missing GSC row as zero', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'emet-programme-'));
  try {
    fs.writeFileSync(path.join(root, 'guide.md'), '---\ntitle: A useful guide\n---\n## Ready to apply\n');
    const base = { sourcePath: 'guide.md', pageType: 'guide', metadataStatus: 'needs_review', governance: { contentRisk: 'high' }, lifecycle: {} };
    const registry = { checksum: 'example', pages: [
      { ...base, pageId: 'a', path: '/guide', indexability: 'indexable' },
      { ...base, pageId: 'b', path: '/old', indexability: 'redirected' },
      { ...base, pageId: 'c', path: '/excluded', indexability: 'noindex', lifecycle: { protectedUntil: '9999-12-31T23:59:59.000Z' } },
    ] };
    const config = { programmeId: 'test', version: '1', priorityPaths: ['/guide'] };
    const state = buildProgramme(registry, config, null, root);
    assert.equal(state.counts.total, 3);
    assert.equal(state.counts.indexability.redirected, 1);
    assert.equal(state.pages[0].gsc, null);
    assert.equal(state.pages.find(row => row.path === '/excluded')?.protectedNow, true);
    assert.equal(programmeReport(state).unfinished, 3);
    assert.equal(buildProgramme(registry, config, state, root).pages[0].reviewedSourceHash, null);
    assert.throws(() => recordReview(state, { url: '/guide', decision: 'repair', stage: 'verified', reviewer: 'Codex', note: 'checked', evidencePath: '/evidence' }), /passed receipt/);
    const page = state.pages[0];
    recordReview(state, { url: '/guide', decision: 'retain', stage: 'verified', reviewer: 'Codex', note: 'rendered page checked', evidencePath: '/evidence', root, receipt: { path: '/guide', sourceHash: page.sourceHash, status: 'passed', checkedAt: '2026-09-01T00:00:00Z', checks: [{ kind: 'live_render', status: 'passed' }] }, now: '2026-09-06T00:00:00Z' });
    assert.equal(programmeReport(state, '2026-09-06T00:00:00Z').lastSevenDays.pagesVerified, 1);
    assert.equal(buildProgramme(registry, config, state, root).pages[0].stage, 'verified');
    fs.appendFileSync(path.join(root, 'guide.md'), '\nA changed factual sentence.\n');
    assert.throws(() => recordReview(state, { url: '/guide', decision: 'retain', stage: 'verified', reviewer: 'Codex', note: 'stale receipt', evidencePath: '/evidence', root, receipt: { path: '/guide', sourceHash: page.sourceHash, status: 'passed', checkedAt: '2026-09-01', checks: [{ kind: 'live_render', status: 'passed' }] } }), /Source changed after inventory/);
    const changed = buildProgramme(registry, config, state, root);
    assert.equal(changed.pages[0].stage, 'queued');
    assert.equal(changed.pages[0].verifiedAt, null);
    assert.equal(changed.pages[0].history.length, 1);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test('verification refuses mismatched source evidence and failed live checks', () => {
  const state = { pages: [{ path: '/guide', sourceHash: 'current', history: [] }], counts: {} };
  const request = { url: '/guide', decision: 'repair', stage: 'verified', reviewer: 'Codex', note: 'review', evidencePath: '/evidence' };
  assert.throws(() => recordReview(state, { ...request, receipt: { path: '/guide', sourceHash: 'old', status: 'passed', checkedAt: '2026-09-01', checks: [] } }), /exact source hash/);
  assert.throws(() => recordReview(state, { ...request, receipt: { path: '/guide', sourceHash: 'current', status: 'passed', checkedAt: '2026-09-01', checks: [{ kind: 'live_render', status: 'failed' }] } }), /live rendering/);
  assert.equal(state.pages[0].history.length, 0);
});

import { containsInternalEditorialLanguage } from '../lib/article-publication-contract.mjs';
test('legacy LLM-Ready headings are identified without flagging borrower summaries', () => {
  assert.equal(containsInternalEditorialLanguage('## LLM-Ready Summary'), true);
  assert.equal(containsInternalEditorialLanguage('## LLM-Readiness Summary'), true);
  assert.equal(containsInternalEditorialLanguage('## What to prepare before applying'), false);
});


test('release credit requires exact source evidence and completed performance observations do not repeat', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'emet-release-'));
  try {
    fs.writeFileSync(path.join(root, 'guide.md'), 'A preserved guide');
    const state = buildProgramme({ checksum: 'test', pages: [{ pageId: 'one', path: '/guide', sourcePath: 'guide.md', pageType: 'guide', indexability: 'indexable', governance: {}, lifecycle: {} }] }, { programmeId: 'test', priorityPaths: [] }, null, root);
    const receipt = { kind: 'substantive', status: 'passed', liveRender: 'passed', expectedSha: 'a'.repeat(40), deployedSha: 'a'.repeat(40), urls: ['https://emetcapital.com.au/guide'], checkedAt: '2026-01-01T00:00:00Z', pages: [{ path: '/guide', sourceHash: state.pages[0].sourceHash, deployedSha: 'a'.repeat(40), checks: ['live_render', 'http_status', 'canonical', 'robots', 'content'].map(kind => ({ kind, status: 'passed' })) }] };
    assert.throws(() => recordRelease(state, { ...receipt, pages: [] }, root), /page receipt/);
    assert.throws(() => recordRelease(state, { ...receipt, urls: [...receipt.urls, ...receipt.urls] }, root), /Duplicate/);
    fs.appendFileSync(path.join(root, 'guide.md'), ' changed');
    assert.throws(() => recordRelease(state, receipt, root), /stale/);
    fs.writeFileSync(path.join(root, 'guide.md'), 'A preserved guide');
    recordRelease(state, receipt, root);
    assert.throws(() => recordRelease(state, receipt, root), /already recorded/);
    assert.equal(programmeReport(state, '2026-02-01T00:00:00Z').performanceReviewsDue.length, 1);
    const report = path.join(root, 'observation.json'); fs.writeFileSync(report, '{}');
    recordPerformanceReview(state, { releaseSha: receipt.deployedSha, days: 28, checkedAt: '2026-01-30T00:00:00Z', evidenceStatus: 'unavailable', note: 'Complete GSC window unavailable; no fabricated lead result', reportPath: report });
    assert.equal(programmeReport(state, '2026-02-01T00:00:00Z').performanceReviewsDue.length, 0);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});


test('default queue advances past reviewed priorities and separates review, repair and verification work', () => {
  const state = { pages: [
    { path: '/priority-repair', stage: 'reviewed', decision: 'repair', history: [] },
    { path: '/priority-rewrite', stage: 'reviewed', decision: 'rewrite', history: [] },
    { path: '/retained', stage: 'reviewed', decision: 'retain', history: [] },
    { path: '/held', stage: 'held', decision: 'repair', history: [] },
    { path: '/verified', stage: 'verified', decision: 'retain', history: [] },
    { path: '/draft', stage: 'draft_ready', decision: 'repair', history: [] },
    { path: '/consolidation', stage: 'reviewed', decision: 'investigate_consolidation', history: [] },
    { path: '/next', stage: 'queued', decision: null, sourceHash: 'current', history: [] },
    { path: '/later', stage: 'queued', decision: null, history: [] },
  ], counts: {} };
  const paths = rows => rows.map(row => row.path);
  assert.deepEqual(paths(nextPages(state, { limit: 1 })), ['/next']);
  recordReview(state, { url: '/next', decision: 'retain', stage: 'reviewed', reviewer: 'Codex', note: 'Actual rendered review complete', evidencePath: '/evidence', now: '2026-09-06T00:00:00Z' });
  assert.deepEqual(paths(nextPages(state)), ['/later']);
  assert.deepEqual(paths(nextPages(state, { purpose: 'repair' })), ['/priority-repair', '/priority-rewrite']);
  assert.deepEqual(paths(nextPages(state, { purpose: 'verify' })), ['/retained', '/next']);
  assert.throws(() => nextPages(state, { purpose: 'publish' }), /purpose/);
  assert.throws(() => nextPages(state, { limit: 51 }), /limit/);
  assert.throws(() => nextPages(state, { limit: 1.5 }), /limit/);
  assert.equal(state.pages[3].stage, 'held');
});

test('changed source preserves an unresolved hold and scoped mechanical release never completes the portfolio review', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'emet-held-programme-'));
  try {
    const filename = path.join(root, 'guide.md');
    fs.writeFileSync(filename, '## LLM-Ready Summary\nPreserved financial content.\n');
    const registry = { checksum: 'test', pages: [{ pageId: 'held', path: '/guide', sourcePath: 'guide.md', pageType: 'guide', indexability: 'indexable', governance: { contentRisk: 'high' }, lifecycle: {} }] };
    const config = { programmeId: 'test', priorityPaths: [] };
    const state = buildProgramme(registry, config, null, root);
    const originalHash = state.pages[0].sourceHash;
    const reviewedAt = '2026-09-05T00:00:00Z';
    const note = 'Financial rewrite requires a genuine financial review; heading cleanup does not resolve it';
    recordReview(state, { url: '/guide', decision: 'rewrite', stage: 'held', reviewer: 'Codex automated review', note, evidencePath: '/external/financial-review/independent-review.json', now: reviewedAt });
    // Existing state predates reviewedSourceHash; a rescan must still preserve its provenance.
    delete state.pages[0].reviewedSourceHash;
    fs.writeFileSync(filename, '## Practical Summary\nPreserved financial content.\n');
    const changed = buildProgramme(registry, config, state, root, null, '2026-09-06T00:00:00Z');
    const page = changed.pages[0];
    assert.notEqual(page.sourceHash, originalHash);
    assert.equal(page.stage, 'held');
    assert.equal(page.decision, 'rewrite');
    assert.equal(page.note, note);
    assert.equal(page.evidencePath, '/external/financial-review/independent-review.json');
    assert.equal(page.reviewer, 'Codex automated review');
    assert.equal(page.reviewedAt, reviewedAt);
    assert.equal(page.reviewedSourceHash, originalHash);
    assert.equal(page.verifiedAt, null);
    assert.equal(page.history.length, 1);
    assert.equal(changed.counts.stages.held, 1);
    for (const purpose of ['review', 'repair', 'verify']) assert.deepEqual(nextPages(changed, { purpose }), []);
    fs.appendFileSync(filename, '\nAnother source update.\n');
    const changedAgain = buildProgramme(registry, config, changed, root);
    assert.equal(changedAgain.pages[0].reviewedSourceHash, originalHash);
    assert.equal(changedAgain.pages[0].stage, 'held');
    const receipt = { kind: 'mechanical', status: 'passed', liveRender: 'passed', expectedSha: 'b'.repeat(40), deployedSha: 'b'.repeat(40), urls: ['https://emetcapital.com.au/guide'], checkedAt: '2026-09-06T00:00:00Z', pages: [{ path: '/guide', sourceHash: changedAgain.pages[0].sourceHash, deployedSha: 'b'.repeat(40), checks: ['live_render', 'http_status', 'canonical', 'robots', 'content'].map(kind => ({ kind, status: 'passed' })) }] };
    recordRelease(changedAgain, receipt, root);
    const report = programmeReport(changedAgain, '2026-09-06T00:00:00Z');
    assert.equal(report.publications.mechanicalPagesRepaired, 1);
    assert.equal(report.publications.substantivePagesRepaired, 0);
    assert.equal(report.lastSevenDays.pagesVerified, 0);
    assert.equal(report.unfinished, 1);
    assert.deepEqual(report.held, [{ path: '/guide', reason: note }]);
    assert.equal(changedAgain.pages[0].stage, 'held');
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
