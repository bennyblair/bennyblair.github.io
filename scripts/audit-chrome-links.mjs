import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";

const repoRoot = process.cwd();
const auditDir = path.join(repoRoot, "audits");
const preworkPath = path.join(auditDir, "stage-2-prework.md");
const outputPath = path.join(auditDir, "stage-2-chrome-links.json");

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function extractHrefsFromHtml(html) {
  const hrefs = [];
  const hrefPattern = /\bhref=(["'])(.*?)\1/g;
  let match;

  while ((match = hrefPattern.exec(html))) {
    hrefs.push(match[2].replace(/&amp;/g, "&"));
  }

  return uniqueSorted(hrefs);
}

function extractRequiredRouteHrefs(markdown) {
  const hrefs = new Set();
  const patterns = [
    /`(\/[^`\s)]*)`/g,
    /\]\((\/[^)\s]*)\)/g,
    /(^|\s)(\/[A-Za-z0-9/_-]+)(?=\s|$)/gm,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(markdown))) {
      const candidate = match[2] || match[1];
      if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//")) {
        continue;
      }
      hrefs.add(candidate.replace(/[.,;:]+$/, ""));
    }
  }

  return uniqueSorted([...hrefs]);
}

async function renderChrome() {
  const vite = await createServer({
    appType: "custom",
    logLevel: "error",
    server: { middlewareMode: true },
  });
  const originalConsoleError = console.error;

  console.error = (...args) => {
    const firstArg = String(args[0] || "");
    if (firstArg.includes("useLayoutEffect does nothing on the server")) {
      return;
    }
    originalConsoleError(...args);
  };

  try {
    const [{ default: Navbar }, { default: Footer }] = await Promise.all([
      vite.ssrLoadModule("/src/components/Navbar.tsx"),
      vite.ssrLoadModule("/src/components/Footer.tsx"),
    ]);

    return renderToString(
      React.createElement(
        MemoryRouter,
        { initialEntries: ["/"] },
        React.createElement(
          React.Fragment,
          null,
          React.createElement(Navbar),
          React.createElement(Footer),
        ),
      ),
    );
  } finally {
    console.error = originalConsoleError;
    await vite.close();
  }
}

fs.mkdirSync(auditDir, { recursive: true });

const renderedHtml = await renderChrome();
const renderedHrefs = extractHrefsFromHtml(renderedHtml);
const preworkMarkdown = fs.existsSync(preworkPath)
  ? fs.readFileSync(preworkPath, "utf8")
  : "";
const requiredRouteHrefs = extractRequiredRouteHrefs(preworkMarkdown);
const missingRequiredRouteHrefs = requiredRouteHrefs.filter(
  (href) => !renderedHrefs.includes(href),
);

const result = {
  generatedAt: new Date().toISOString(),
  renderedHrefCount: renderedHrefs.length,
  renderedHrefs,
  preworkPath: path.relative(repoRoot, preworkPath),
  requiredRouteHrefs,
  missingRequiredRouteHrefs,
  status: missingRequiredRouteHrefs.length === 0 ? "PASS" : "FAIL",
};

fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);

if (missingRequiredRouteHrefs.length > 0) {
  console.error(
    `Chrome link audit failed. Missing route hrefs: ${missingRequiredRouteHrefs.join(", ")}`,
  );
  process.exit(1);
}

console.log(
  `Chrome link audit passed: ${renderedHrefs.length} hrefs rendered; ${requiredRouteHrefs.length} required route hrefs present.`,
);
console.log(path.relative(repoRoot, outputPath));
