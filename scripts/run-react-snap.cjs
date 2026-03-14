const { spawnSync } = require("child_process");

const isNetlify = process.env.NETLIFY === "true";
const isCI = process.env.CI === "true" || isNetlify;

const result = spawnSync(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["react-snap"],
  { stdio: "inherit", env: process.env }
);

if (result.status === 0) {
  process.exit(0);
}

if (isCI) {
  process.exit(result.status || 1);
}

console.warn("[react-snap] Skipping local prerender because the headless browser is unavailable in this environment.");
console.warn("[react-snap] Netlify preview/production builds should still run the prerender step.");
process.exit(0);
