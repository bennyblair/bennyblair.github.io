import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { Launcher } from "chrome-launcher";
import lighthouse from "lighthouse";
import { chromium } from "playwright";

const repoRoot = process.cwd();
const port = Number(process.env.LIGHTHOUSE_PREVIEW_PORT || 43175);
const baseUrl = `http://127.0.0.1:${port}`;
const viteBin = path.join(repoRoot, "node_modules", "vite", "bin", "vite.js");
const preview = spawn(
  process.execPath,
  [viteBin, "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
  { cwd: repoRoot, stdio: ["ignore", "pipe", "pipe"] },
);
let previewOutput = "";
preview.stdout.on("data", (chunk) => {
  previewOutput += chunk.toString();
});
preview.stderr.on("data", (chunk) => {
  previewOutput += chunk.toString();
});

async function waitForPreview() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (preview.exitCode !== null) throw new Error(`Preview exited early.\n${previewOutput}`);
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // Preview is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview did not become ready.\n${previewOutput}`);
}

let chrome;
const lighthouseTempRoot = process.platform === "linux" ? "/tmp" : os.tmpdir();
const lighthouseTempDir = fs.mkdtempSync(path.join(lighthouseTempRoot, "emet-lighthouse-"));
const chromeProfileDir = path.join(lighthouseTempDir, "profile");
const chromeLauncherStateDir = path.join(lighthouseTempDir, "launcher");
fs.mkdirSync(chromeProfileDir, { recursive: true });
fs.mkdirSync(chromeLauncherStateDir, { recursive: true });
// chrome-launcher's WSL temp-directory fallback depends on Windows environment
// variables that may be absent in unattended shells. Keep all launcher state in
// an explicit Linux temp root so no `undefined:/` path can leak into the repo.
process.env.TEMP = lighthouseTempDir;
process.env.TMP = lighthouseTempDir;
try {
  await waitForPreview();
  chrome = new Launcher({
    chromePath: chromium.executablePath(),
    // chrome-launcher rewrites its managed profile path to Windows syntax when it
    // detects WSL, even when chromePath points to Playwright's Linux Chromium.
    // Manage the temporary profile explicitly so local and CI runs behave alike.
    userDataDir: false,
    chromeFlags: [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      `--user-data-dir=${chromeProfileDir}`,
    ],
  });
  // Avoid chrome-launcher's WSL-specific makeWin32TmpDir fallback, which can
  // resolve missing Windows variables into a literal `undefined:/` directory.
  chrome.makeTmpDir = () => chromeLauncherStateDir;
  await chrome.launch();
  const result = await lighthouse(baseUrl, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "seo"],
    formFactor: "mobile",
    screenEmulation: {
      mobile: true,
      width: 390,
      height: 844,
      deviceScaleFactor: 2.75,
      disabled: false,
    },
    throttlingMethod: "simulate",
  });
  if (!result) throw new Error("Lighthouse returned no result.");

  const { lhr } = result;
  const resourceItems = lhr.audits["resource-summary"]?.details?.items ?? [];
  const scriptTransferBytes = resourceItems
    .filter((item) => String(item.resourceType).toLowerCase() === "script")
    .reduce((sum, item) => sum + Number(item.transferSize || 0), 0);
  const observed = {
    lcpMs: Number(lhr.audits["largest-contentful-paint"]?.numericValue ?? Infinity),
    cls: Number(lhr.audits["cumulative-layout-shift"]?.numericValue ?? Infinity),
    tbtMs: Number(lhr.audits["total-blocking-time"]?.numericValue ?? Infinity),
    accessibility: Number(lhr.categories.accessibility?.score ?? 0),
    seo: Number(lhr.categories.seo?.score ?? 0),
    initialJavaScriptTransferBytes: scriptTransferBytes,
  };
  const thresholds = {
    lcpMs: 2500,
    cls: 0.1,
    tbtMs: 200,
    accessibility: 0.95,
    seo: 0.95,
    initialJavaScriptTransferBytes: 300 * 1024,
  };
  const failures = [
    ...(observed.lcpMs > thresholds.lcpMs
      ? [`LCP ${observed.lcpMs.toFixed(0)}ms > ${thresholds.lcpMs}ms`]
      : []),
    ...(observed.cls > thresholds.cls ? [`CLS ${observed.cls.toFixed(3)} > ${thresholds.cls}`] : []),
    ...(observed.tbtMs > thresholds.tbtMs
      ? [`TBT ${observed.tbtMs.toFixed(0)}ms > ${thresholds.tbtMs}ms`]
      : []),
    ...(observed.accessibility < thresholds.accessibility
      ? [`accessibility ${(observed.accessibility * 100).toFixed(0)} < 95`]
      : []),
    ...(observed.seo < thresholds.seo ? [`SEO ${(observed.seo * 100).toFixed(0)} < 95`] : []),
    ...(observed.initialJavaScriptTransferBytes > thresholds.initialJavaScriptTransferBytes
      ? [
          `initial JavaScript ${(observed.initialJavaScriptTransferBytes / 1024).toFixed(1)}KB > 300KB`,
        ]
      : []),
  ];

  const reportsDir = path.join(repoRoot, "reports", "lighthouse");
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(
    path.join(reportsDir, "homepage.json"),
    `${JSON.stringify({ observed, thresholds, lighthouse: lhr }, null, 2)}\n`,
    "utf8",
  );
  console.log(JSON.stringify({ observed, thresholds }, null, 2));
  if (failures.length) {
    failures.forEach((failure) => console.error(`ERROR ${failure}`));
    process.exitCode = 1;
  } else {
    console.log("Mobile Lighthouse budgets passed.");
  }
} finally {
  if (chrome) {
    try {
      await chrome.kill();
    } catch (error) {
      console.warn(`Chrome cleanup warning: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  preview.kill();
  fs.rmSync(lighthouseTempDir, { recursive: true, force: true });
}
