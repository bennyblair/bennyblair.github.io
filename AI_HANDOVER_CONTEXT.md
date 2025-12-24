# AI Handover Context & Critical Instructions

**Project Name**: Emet Capital (bennyblair.github.io)
**Last Updated**: 8 December 2025
**Tech Stack**: Vite, React, TypeScript, Tailwind CSS, Shadcn UI

## 1. Project Overview
This is a static site generated using Vite and React, serving content for "Emet Capital". The site relies heavily on Markdown files for content (Guides, Case Studies, etc.) and uses a custom content loading system.

## 2. Deployment Strategy
There are multiple deployment mechanisms visible in the project. **Always verify which one is the active target for the user's request.**

*   **GitHub Pages (Automated)**:
    *   **Workflow**: `.github/workflows/workflow.yml`
    *   **Trigger**: Push to `main` branch.
    *   **Mechanism**: Uses `vite-github-pages-deployer` to build and deploy to the `gh-pages` branch.
*   **Netlify (Implicit)**:
    *   **Configuration**: `public/_redirects` exists, handling 301 redirects.
    *   **Trigger**: Typically connected to the GitHub repo, triggering a build on push to `main`.
*   **Manual Deployment**:
    *   **Command**: `npm run deploy`
    *   **Mechanism**: Runs `vite build` and uses the `gh-pages` package to push the `dist` folder to the `gh-pages` branch.

**Critical Instruction**: When asked to "deploy", pushing to `main` is usually sufficient to trigger the CI/CD pipelines. If manual intervention is needed, use `npm run deploy`.

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
