# AI Handover Context & Critical Instructions

**Project Name**: Emet Capital (bennyblair.github.io)
**Last Updated**: 27 January 2026
**Tech Stack**: Vite, React, TypeScript, Tailwind CSS, Shadcn UI

## 1. Project Overview
This is a static site generated using Vite and React, serving content for "Emet Capital". The site relies heavily on Markdown files for content (Guides, Case Studies, etc.) and uses a custom content loading system.

## 2. Deployment Strategy
**PRIMARY DEPLOYMENT: Netlify** - This is the active deployment mechanism.

*   **Netlify (ACTIVE)**:
    *   **Trigger**: Automatically deploys on push to `main` branch.
    *   **Configuration**: `public/_redirects` handles URL redirects.
    *   **Build Command**: `npm run build` (Vite build)
    *   **Publish Directory**: `dist/`

*   **GitHub Pages (DISABLED)**:
    *   **Status**: Workflow disabled as of January 2026 (renamed to `workflow.yml.disabled`)
    *   **Reason**: Was causing failed runner notifications; Netlify is the actual deployment target.
    *   **Note**: Do NOT re-enable unless explicitly switching away from Netlify.

*   **Manual Deployment** (not typically needed):
    *   **Command**: `npm run deploy`
    *   **Mechanism**: Uses `gh-pages` package to push `dist` folder.

**Critical Instruction**: To deploy, simply push to `main`. Netlify auto-deploys within ~1-2 minutes.

## 3. Content Management System
Content is stored as Markdown (`.md`) files in `src/content/`.

*   **Structure**:
    *   `src/content/guides/`: Educational articles.
    *   `src/content/case-studies/`: Project examples.
    *   `src/content/insights/`: Market analysis.
*   **Formatting**:
    *   **Strict Rules**: Refer to `FORMATTING_STYLE_GUIDE.md`.
    *   **Common Issues**: Do not use HTML tags (`<h1>`, `<p>`) inside Markdown. Ensure proper sentence casing.
*   **Frontmatter**: All markdown files require YAML frontmatter (title, date, description, tags, etc.).

## 4. Automation & Scripts
*   **Scripts Directory**: `scripts/` contains Python and Node.js scripts for content processing, validation, and sitemap generation.
    *   `validate_content.js`: Checks for broken links and missing metadata.
    *   `process_word_content.py`: Converts Word docs to Markdown.
*   **Disabled Automation**:
    *   See `AUTOMATION_DISABLED.md`.
    *   Daily automated publishing (`publish-daily-content.yml`) has been **disabled** by user request. Do not re-enable unless explicitly asked.

## 5. Git Workflow & Troubleshooting
*   **Branch**: `main` is the default branch.
*   **Divergence**: The local `main` branch may diverge from `origin/main` due to automated commits (from GitHub Actions) or separate deployment pushes.
*   **Resolution**: If `git rebase` gets stuck, abort it (`git rebase --abort`) and use `git pull --no-rebase origin main` to merge remote changes safely.

## 6. Key Files to Reference
*   `package.json`: Dependencies and scripts.
*   `vite.config.ts`: Build configuration.
*   `public/_redirects`: URL redirection rules (critical for SEO migration).
*   `src/lib/content.ts`: Logic for loading and parsing Markdown content.
