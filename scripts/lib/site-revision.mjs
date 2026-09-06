export const SITE_REVISION_PATH = "/.well-known/site-revision.json";

export function siteRevisionManifest(value) {
  const revision = String(value || "").trim();
  if (!/^[a-f0-9]{40}$/i.test(revision)) throw new Error("A full Git revision is required for the deployment marker");
  return { schemaVersion: 1, revision: revision.toLowerCase() };
}

export function revisionIsDeployed({ expectedRevision, status, body }) {
  if (status !== 200 || !/^[a-f0-9]{40}$/i.test(expectedRevision || "")) return false;
  try {
    const value = typeof body === "string" ? JSON.parse(body) : body;
    return value?.schemaVersion === 1 && value.revision === expectedRevision.toLowerCase();
  } catch { return false; }
}
