import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const repoRoot = process.cwd();
const fixturePath = path.join(repoRoot, 'src/content/guides/__seo-page-qa-failing-fixture.md');

const fixture = `---
title: "Bad"
description: "Too short."
date: "2026-06-03"
category: "Test"
author: "Ben"
keywords:
  - "test"
---

### Skipped Heading

This fixture intentionally violates the SEO page standard.
`;

try {
  fs.writeFileSync(fixturePath, fixture);
  const result = spawnSync(
    process.execPath,
    ['scripts/seo-page-qa.mjs', '--file', 'src/content/guides/__seo-page-qa-failing-fixture.md'],
    { cwd: repoRoot, encoding: 'utf8' }
  );

  if (result.status === 0) {
    console.error('Expected qa:seo-page to fail for the deliberate bad fixture, but it passed.');
    process.exit(1);
  }

  const output = `${result.stdout}\n${result.stderr}`;
  if (!/SEO page QA failed|existing article QA failed|heading level jumps|length/.test(output)) {
    console.error('qa:seo-page failed, but the output did not include a readable violation report.');
    console.error(output);
    process.exit(1);
  }

  console.log('PASS: deliberate failing SEO page fixture exits non-zero with readable violations.');
} finally {
  fs.rmSync(fixturePath, { force: true });
}
