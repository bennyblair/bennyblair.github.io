import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";

const repoRoot = process.cwd();
const outputPath = process.env.GITHUB_OUTPUT;

function changedMarkdownFiles() {
  const modified = execFileSync(
    "git",
    [
      "diff",
      "--name-only",
      "--diff-filter=AM",
      "--",
      "src/content/guides",
      "src/content/insights",
      "src/content/case-studies",
    ],
    { cwd: repoRoot, encoding: "utf8" },
  );

  const untracked = execFileSync(
    "git",
    [
      "ls-files",
      "--others",
      "--exclude-standard",
      "--",
      "src/content/guides",
      "src/content/insights",
      "src/content/case-studies",
    ],
    { cwd: repoRoot, encoding: "utf8" },
  );

  return [...new Set(`${modified}\n${untracked}`
    .split(/\r?\n/)
    .filter((file) => file.endsWith(".md") && fs.existsSync(path.join(repoRoot, file))))];
}

const files = changedMarkdownFiles();
const results = files.map((file) => {
  const parsed = matter(fs.readFileSync(path.join(repoRoot, file), "utf8"));
  return { file, risk: parsed.data.contentRisk };
});
const invalid = results.filter(({ risk }) => !["low", "high"].includes(risk));
const risk = results.some((item) => item.risk === "high") ? "high" : "low";

if (invalid.length) {
  for (const item of invalid) {
    console.error(`${item.file}: missing valid contentRisk frontmatter`);
  }
  process.exit(1);
}

console.log(
  results.length
    ? results.map((item) => `${item.risk.toUpperCase()} ${item.file}`).join("\n")
    : "No new or modified Markdown content.",
);

if (outputPath) {
  fs.appendFileSync(outputPath, `risk=${risk}\ncount=${results.length}\n`, "utf8");
}
