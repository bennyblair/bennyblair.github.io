export interface Service {
  slug: string;
  title: string;
  description: string;
  url: string;
}

export interface AgentContent {
  markdown: Record<string, string>;
  services: Service[];
}

export interface EdgeContext {
  next(): Promise<Response>;
}

// Media ranges use their most specific matching entry, including explicit q=0.
export function quality(accept: string, type: string) {
  const [major] = type.split("/");
  let best = { specificity: -1, quality: 0, order: Infinity };
  accept.split(",").forEach((entry, order) => {
    const [range, ...parameters] = entry.trim().toLowerCase().split(";").map((part) => part.trim());
    const specificity = range === type ? 2 : range === `${major}/*` ? 1 : range === "*/*" ? 0 : -1;
    if (specificity < 0) return;
    const q = parameters.find((part) => part.startsWith("q="))?.slice(2);
    const value = q === undefined ? 1 : /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(q) ? Number(q) : 0;
    if (specificity > best.specificity) best = { specificity, quality: value, order };
  });
  return best;
}

export function representation(accept: string | null): "html" | "markdown" | "unacceptable" {
  if (!accept) return "html";
  const html = quality(accept, "text/html");
  const markdown = quality(accept, "text/markdown");
  if (html.quality === 0 && markdown.quality === 0) return "unacceptable";
  if (markdown.quality > html.quality) return "markdown";
  if (markdown.quality < html.quality) return "html";
  if (markdown.specificity > html.specificity) return "markdown";
  if (markdown.specificity === html.specificity && markdown.specificity === 2 && markdown.order < html.order) return "markdown";
  return "html";
}

function varyAccept(headers: Headers) {
  const values = (headers.get("Vary") ?? "").split(",").map((value) => value.trim()).filter(Boolean);
  if (!values.some((value) => value.toLowerCase() === "accept") && !values.includes("*")) values.push("Accept");
  headers.set("Vary", values.join(", "));
}

function transformedHeaders(original?: Headers) {
  const headers = new Headers(original);
  for (const header of ["Content-Length", "Content-Encoding", "ETag", "Last-Modified", "Accept-Ranges", "Content-Range", "Content-MD5", "Digest"]) headers.delete(header);
  headers.set("Cache-Control", "no-store");
  headers.set("CDN-Cache-Control", "no-store");
  headers.set("Netlify-CDN-Cache-Control", "no-store");
  headers.set("X-Content-Type-Options", "nosniff");
  varyAccept(headers);
  return headers;
}

function jsonResponse(request: Request, body: unknown, status = 200, extra?: Record<string, string>) {
  const headers = transformedHeaders();
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  for (const [key, value] of Object.entries(extra ?? {})) headers.set(key, value);
  return new Response(request.method === "HEAD" ? null : `${JSON.stringify(body)}\n`, { status, headers });
}

function apiError(request: Request, status: number, code: string, message: string, hint: string, headers?: Record<string, string>) {
  return jsonResponse(request, { error: { code, message, hint } }, status, headers);
}

export function createAgentHandler(content: AgentContent) {
  return async (request: Request, context: EdgeContext): Promise<Response | undefined> => {
    const pathname = new URL(request.url).pathname;
    if (pathname === "/api" || pathname.startsWith("/api/")) {
      try {
        if (!["GET", "HEAD"].includes(request.method)) return apiError(request, 405, "METHOD_NOT_ALLOWED", "This public API is read-only.", "Use GET or HEAD. Enquiries must use the contact form at /contact. See /docs.", { Allow: "GET, HEAD" });
        const accept = request.headers.get("Accept");
        if (accept && quality(accept, "application/json").quality === 0) return apiError(request, 406, "NOT_ACCEPTABLE", "This API provides JSON responses.", "Send Accept: application/json. See /docs.");
        if (pathname === "/api/services" || pathname === "/api/services/") return jsonResponse(request, { services: content.services });
        const match = pathname.match(/^\/api\/services\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/);
        if (match) {
          const service = content.services.find((item) => item.slug === match[1]);
          if (service) return jsonResponse(request, service);
          return apiError(request, 404, "SERVICE_NOT_FOUND", "The requested service was not found.", "Use GET /api/services to find a valid slug. See /docs.");
        }
        return apiError(request, 404, "NOT_FOUND", "The requested API endpoint was not found.", "Use GET /api/services or consult /docs and /openapi.json.");
      } catch {
        return apiError(request, 500, "INTERNAL_ERROR", "The service directory is temporarily unavailable.", "Retry later or use /services and /contact.");
      }
    }

    // Leave form submissions, platform endpoints and assets on their existing path.
    if (!["GET", "HEAD"].includes(request.method) || pathname.startsWith("/assets/") || pathname.startsWith("/.netlify/") || pathname.startsWith("/.well-known/")) return;
    const isNegotiatedPage = Object.hasOwn(content.markdown, pathname);
    const preference = representation(request.headers.get("Accept"));
    const downstream = await context.next();
    // Canonical redirects must remain redirects, even for Markdown clients.
    if (downstream.status >= 300 && downstream.status < 400) return downstream;
    const isNotFound = downstream.status === 404;
    if (!isNegotiatedPage && !isNotFound) return downstream;
    if (preference === "html") {
      const headers = new Headers(downstream.headers);
      varyAccept(headers);
      return new Response(request.method === "HEAD" ? null : downstream.body, { status: downstream.status, headers });
    }
    if (preference === "unacceptable") {
      const headers = transformedHeaders(downstream.headers);
      headers.set("Content-Type", "text/plain; charset=utf-8");
      return new Response(request.method === "HEAD" ? null : "Available representations: text/html and text/markdown.\n", { status: 406, headers });
    }
    if (downstream.status !== 200 && !isNotFound) return downstream;
    const headers = transformedHeaders(downstream.headers);
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    if (isNotFound) headers.set("X-Robots-Tag", "noindex");
    const markdown = isNotFound
      ? "# Page not found\n\nThe requested page does not exist or has moved. Find public services and agent guidance using the links below.\n\n- [API and agent documentation](https://emetcapital.com.au/docs)\n- [Sitemap](https://emetcapital.com.au/sitemap.xml)\n- [Agent instructions](https://emetcapital.com.au/llms.txt)\n"
      : content.markdown[pathname];
    return new Response(request.method === "HEAD" ? null : markdown, { status: downstream.status, headers });
  };
}
