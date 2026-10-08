import fs from "node:fs";
import path from "node:path";
import domino from "@mixmark-io/domino";
import TurndownService from "turndown";

export function extractPublicPage(html, expectedUrl) {
  const document = domino.createDocument(html);
  const main = document.querySelector("main");
  const title = main?.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim();
  const description = document.querySelector('meta[name="description"]')?.getAttribute("content")?.trim();
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href");
  if (!main || !title || !description || canonical !== expectedUrl) throw new Error(`Agent assets require a prerendered canonical page: ${expectedUrl}`);
  for (const node of main.querySelectorAll("script, style, form, button, nav, [aria-hidden='true']")) node.remove();
  for (const anchor of main.querySelectorAll("a[href]")) {
    const href = anchor.getAttribute("href");
    const resolved = new URL(href, expectedUrl);
    if (["http:", "https:", "mailto:", "tel:"].includes(resolved.protocol)) anchor.setAttribute("href", resolved.href);
    else anchor.removeAttribute("href");
  }
  for (const image of main.querySelectorAll("img[src]")) image.setAttribute("src", new URL(image.getAttribute("src"), expectedUrl).href);
  const converter = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });
  // Cards wrap entire headings/paragraphs in links. Keep valid block Markdown
  // instead of generating multiline inline links that swallow headings.
  converter.addRule("linkedCards", {
    filter: (node) => node.nodeName === "A" && Boolean(node.querySelector("h1, h2, h3, h4, h5, h6, p")),
    replacement: (content, node) => {
      const label = (node.querySelector("h1, h2, h3, h4, h5, h6")?.textContent || "Learn more").replace(/\s+/g, " ").trim().replace(/([\\[\]])/g, "\\$1");
      return `\n\n${content.trim()}\n\n[${label}](${node.getAttribute("href")})\n\n`;
    },
  });
  const markdown = converter.turndown(main.innerHTML);
  if (markdown.length < 100) throw new Error(`Agent Markdown is empty or incomplete: ${expectedUrl}`);
  return { title, description, markdown: `${markdown}\n` };
}

export function generateAgentContent(repoRoot, routes, domain) {
  const dist = path.join(repoRoot, "dist");
  const readPage = (route) => extractPublicPage(fs.readFileSync(path.join(dist, route === "/" ? "index.html" : `${route.slice(1)}/index.html`), "utf8"), `${domain}${route}`);
  const markdown = {};
  for (const route of ["/", "/docs"]) markdown[route] = `${readPage(route).markdown}\n- [API and agent documentation](${domain}/docs)\n- [OpenAPI specification](${domain}/openapi.json)\n- [Agent instructions](${domain}/llms.txt)\n`;
  const services = routes.filter((route) => route.pageType === "service" && /^\/services\/[^/]+$/.test(route.path)).map((route) => {
    const { title, description } = readPage(route.path);
    return { slug: route.path.split("/").at(-1), title, description, url: `${domain}${route.path}` };
  }).sort((a, b) => a.slug.localeCompare(b.slug));
  if (!services.length || new Set(services.map((service) => service.slug)).size !== services.length) throw new Error("Missing or duplicate public API services");
  const content = { markdown, services };
  const generated = path.join(repoRoot, "netlify", "generated");
  fs.mkdirSync(generated, { recursive: true });
  fs.writeFileSync(path.join(generated, "agent-content.ts"), `// Generated from this deploy's prerendered public pages.\nexport default ${JSON.stringify(content, null, 2)};\n`);
  return content;
}
