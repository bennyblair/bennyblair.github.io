# Existing-content repair releases

OpenClaw is the only publisher. Codex prepares repairs and an independent editor reviews each exact batch. Repairs run independently of the Monday/Wednesday/Friday new-article slots.

Use branch `ai/content-repair-<batch>` with labels `seo-risk:R2` and `automation-policy:content-repair-v1`. A PR may contain one added `data/seo-repairs/repair_<batch>.json` manifest and only the existing Markdown files named in it. No registry, policy, new URL, routing, service component or financial-review metadata changes belong in this path.

The trusted policy is `data/seo-content-repair-policy.json`. Copy its actual ID, version, checksum and authorization reference into the manifest. Use the current main SHA as `baseSha`; after any preceding publication, rebase and refresh evidence before retrying. SHA-256 values cover exact UTF-8 file bytes before and after the repair.

Manifest shape:

```json
{
  "schemaVersion": 1,
  "repairId": "repair_example",
  "policyId": "property-content-repair",
  "policyVersion": "COPY_CURRENT_POLICY",
  "policyChecksum": "COPY_CURRENT_CHECKSUM",
  "authorizationRef": "COPY_CURRENT_AUTHORIZATION_REFERENCE",
  "baseSha": "EXACT_MAIN_SHA",
  "editor": "Codex",
  "review": {
    "reviewer": "ACTUAL_INDEPENDENT_REVIEWER",
    "reviewedAt": "ACTUAL_REVIEW_TIMESTAMP",
    "score": 90,
    "blockingFindings": []
  },
  "kind": "mechanical",
  "transform": "public-headings-v1",
  "pages": [{
    "sourcePath": "src/content/guides/example.md",
    "pageId": "COPY_REGISTERED_PAGE_ID",
    "path": "/resources/guides/example",
    "beforeSha256": "EXACT_BEFORE_SHA256",
    "afterSha256": "EXACT_AFTER_SHA256",
    "reason": "Remove an internal editorial heading from reader-facing copy.",
    "evidence": [{"reference": "ACTUAL_SOURCE_OR_REVIEW_EVIDENCE"}],
    "verification": [
      {"kind": "text-added", "value": "Practical Summary"},
      {"kind": "text-removed", "value": "LLM-Ready Summary"}
    ]
  }]
}
```

The example is a template, not completed review evidence. Proofs must identify changes absent/present in the correct before/after source and visible in production. Supported kinds are `text-added`, `text-removed`, `link-added`, `link-removed`; use exact Markdown link destinations for link proofs.

Substantive batches contain 1–2 URLs, use `kind: substantive`, omit `transform`, and require each row's `metadataReview` with the actual independent reviewer, timestamp and trusted registry content risk. This is scoped programme authority for routine low/medium-risk repairs; it does not alter global registry ceilings or attest to financial review.

Mechanical batches contain 1–20 URLs, all using the same exact transform:
- `public-headings-v1`: remove LLM/AI production labels from headings, preserving body claims and frontmatter.
- `nonfinancial-editorial-v1`: the fixed heading/typo cleanup exported by the verifier.
- `internal-link-destinations-v1`: substitute only existing internal link destinations; no anchor or prose changes.
- `public-editorial-v1`: the pre-existing exact public-editorial migration, only on low/medium-risk pages.

Active registry and indexing-cohort holds block all routine release kinds. High-risk and case-study pages can receive the first three exact mechanical transformations without invented financial sign-off; substantive financial edits require the existing genuine review path. Risk, reviewer, author identity, publication/review dates, expiry and canonical metadata must remain unchanged.

Run `node scripts/verify-content-repair-scope.mjs` against a committed candidate with `CONTENT_QA_BASE` pointing to exact current main, then the normal complete website quality gate. The release workflow independently reads trusted-base code and policy, validates the exact PR blobs, checks the latest successful CI revision, serializes merge and deployment audit, and retains an audit artifact.

The publisher must stop queue consumption whenever the production audit is failed or indeterminate. Every build emits only its full Git SHA at `/.well-known/site-revision.json`, outside the sitemap. Every release audit must confirm that marker equals the exact merged revision before declaring success or authorizing rollback. A passed homepage or removal-only text assertion cannot prove deployment. Never clear that condition by falsifying a receipt or retrying publication blindly.
