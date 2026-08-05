import path from "node:path";

const SITE_ORIGIN = "https://emetcapital.com.au";

export function normaliseRoute(value) {
  if (!value) return undefined;
  try {
    const url = new URL(value, SITE_ORIGIN);
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    return undefined;
  }
}
export function routeFromSource(relativePath, source = "") {
  const normalised = relativePath.replaceAll("\\", "/");
  const contentMatch = normalised.match(/^src\/content\/(guides|case-studies|insights)\/([^/]+)\.md$/);
  if (contentMatch) return `/resources/${contentMatch[1]}/${contentMatch[2]}`;

  if (!normalised.startsWith("src/pages/")) return undefined;
  const componentCanonical = source.match(/\bcanonical\s*=\s*["']([^"']+)["']/i)?.[1];
  if (componentCanonical) return normaliseRoute(componentCanonical);

  const linkCanonical = source.match(
    /<link\s+[^>]*rel\s*=\s*["']canonical["'][^>]*href\s*=\s*["']([^"']+)["'][^>]*>/i,
  )?.[1] || source.match(
    /<link\s+[^>]*href\s*=\s*["']([^"']+)["'][^>]*rel\s*=\s*["']canonical["'][^>]*>/i,
  )?.[1];
  return normaliseRoute(linkCanonical);
}

export function buildProtectedRouteMap(registry) {
  const protectedRoutes = new Map();
  for (const item of registry.remediations || []) {
    for (const candidate of [item.url, item.canonicalUrl]) {
      const route = normaliseRoute(candidate);
      if (!route) continue;
      const current = protectedRoutes.get(route);
      if (!current || Date.parse(item.reviewAfter) > Date.parse(current.reviewAfter)) {
        protectedRoutes.set(route, {
          route,
          reviewAfter: item.reviewAfter,
          action: item.action,
          priority: item.priority,
        });
      }
    }
  }
  return protectedRoutes;
}

export function findActiveProtectedChanges(changes, registry, now = new Date()) {
  const protectedRoutes = buildProtectedRouteMap(registry);
  return changes.flatMap(({ relativePath, source }) => {
    const route = routeFromSource(relativePath, source);
    const protectedEntry = route ? protectedRoutes.get(route) : undefined;
    if (!protectedEntry || Date.parse(protectedEntry.reviewAfter) <= now.getTime()) return [];
    return [{ relativePath, ...protectedEntry }];
  });
}
