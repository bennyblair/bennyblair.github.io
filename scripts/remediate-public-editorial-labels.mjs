import fs from "node:fs";
import path from "node:path";
import { remediatePublicEditorialLanguage } from "./lib/public-editorial-remediation.mjs";

const repoRoot = process.cwd();
const roots = [path.join(repoRoot, "src", "content", "guides"), path.join(repoRoot, "src", "content", "case-studies")];
const files = roots.flatMap((directory) =>
  fs.existsSync(directory)
    ? fs.readdirSync(directory).filter((file) => file.endsWith(".md")).map((file) => path.join(directory, file))
    : [],
);

let changed = 0;
for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const updated = remediatePublicEditorialLanguage(original);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changed += 1;
    console.log(path.relative(repoRoot, file).replaceAll("\\", "/"));
  }
}

console.log(`Remediated public production language in ${changed} content file(s).`);
