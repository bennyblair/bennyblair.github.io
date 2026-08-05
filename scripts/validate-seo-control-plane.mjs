import fs from "node:fs";
import path from "node:path";
import { checksum, validateRegistry } from "./lib/seo-control-plane.mjs";

const registryPath = path.join(process.cwd(), "data", "seo-page-registry.json");
const schemaPath = path.join(process.cwd(), "data", "seo-control-plane.schema.json");
const observationSchemaPath = path.join(process.cwd(), "data", "seo-observation.schema.json");
const programsPath = path.join(process.cwd(), "data", "seo-programs", "index.json");
const errors = [];

for (const requiredPath of [registryPath, schemaPath, observationSchemaPath, programsPath]) {
  if (!fs.existsSync(requiredPath)) errors.push(`missing required control-plane file: ${path.relative(process.cwd(), requiredPath)}`);
}

if (!errors.length) {
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const result = validateRegistry(registry, { allowOverdue: process.env.SEO_FAIL_OVERDUE_REVIEWS !== "1" });
  errors.push(...result.errors);
  for (const warning of result.warnings) console.warn(`WARN ${warning}`);

  const programs = JSON.parse(fs.readFileSync(programsPath, "utf8"));
  const programIds = new Set(programs.programs?.map((program) => program.programId));
  for (const program of programs.programs || []) {
    const definitionPath = path.join(process.cwd(), program.definitionPath || "");
    if (!fs.existsSync(definitionPath)) {
      errors.push(`${program.programId}: missing definition ${program.definitionPath}`);
      continue;
    }
    const definition = JSON.parse(fs.readFileSync(definitionPath, "utf8"));
    const actual = checksum(definition);
    if (actual !== program.contentChecksum) {
      errors.push(`${program.programId}: definition checksum mismatch; run npm run seo:registry:generate`);
    }
  }
  for (const page of registry.pages || []) {
    for (const programId of page.programIds || []) {
      if (!programIds.has(programId)) errors.push(`${page.path}: unknown programId ${programId}`);
    }
  }
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const counts = Object.groupBy(registry.pages, (page) => page.indexability);
console.log(
  `SEO control-plane validation passed (${registry.pages.length} records; ${Object.entries(counts)
    .map(([key, value]) => `${key}=${value.length}`)
    .join(", ")}; checksum=${registry.checksum}).`,
);
