import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
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

    // A later branch can regenerate or merge the registry from an older base and
    // silently restore an already-reviewed page's prior review date. Keep future
    // source-level observation holds authoritative and fail CI on registry drift.
    if (String(page.sourcePath || "").startsWith("src/content/")) {
      const sourcePath = path.join(process.cwd(), page.sourcePath);
      if (!fs.existsSync(sourcePath)) {
        errors.push(`${page.path}: content source is missing: ${page.sourcePath}`);
        continue;
      }
      const source = matter(fs.readFileSync(sourcePath, "utf8")).data;
      const sourceProtectedUntil = source.protectedUntil || source.protected_until;
      if (sourceProtectedUntil) {
        const parsedProtectedUntil = Date.parse(String(sourceProtectedUntil));
        if (!Number.isFinite(parsedProtectedUntil)) {
          errors.push(`${page.path}: content source protectedUntil is invalid`);
        } else {
          if (page.lifecycle?.protectedUntil !== String(sourceProtectedUntil)) {
            errors.push(`${page.path}: registry protectedUntil differs from content source; run npm run seo:registry:generate`);
          }
          if (page.lifecycle?.reviewAt !== String(sourceProtectedUntil)) {
            errors.push(`${page.path}: registry reviewAt differs from content source protection; run npm run seo:registry:generate`);
          }
        }
      }
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
