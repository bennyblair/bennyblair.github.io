import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import { isRedirectSource } from "./src/config/site-route-manifest";
// @ts-expect-error JavaScript build helper has no generated declaration.
import { buildContentIndex, parseArticleModule } from "./scripts/lib/content-index.mjs";

const VIRTUAL_CONTENT_INDEX = "virtual:content-index";
const RESOLVED_CONTENT_INDEX = `\0${VIRTUAL_CONTENT_INDEX}`;

function emetContentPlugin() {
  return {
    name: "emet-content",
    resolveId(id: string) {
      if (id === VIRTUAL_CONTENT_INDEX) return RESOLVED_CONTENT_INDEX;
      if (id === "virtual:homepage-content") return "\0virtual:homepage-content";
      return null;
    },
    load(id: string) {
      if (id === "\0virtual:homepage-content") {
        const index = buildContentIndex(process.cwd());
        const guides = index.guides.filter(article => !article.noindex && !isRedirectSource(article.route));
        const cases = index["case-studies"].filter(article => !article.noindex && !isRedirectSource(article.route));
        const latestArticles = [...guides, ...cases].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);
        return `export default ${JSON.stringify({ latestArticles, featuredCaseStudies: cases.slice(0, 8) })};`;
      }
      if (id === RESOLVED_CONTENT_INDEX) {
        return `export default ${JSON.stringify(buildContentIndex(process.cwd()))};`;
      }
      if (id.includes(".md?emet-article")) {
        return `export default ${JSON.stringify(parseArticleModule(id))};`;
      }
      return null;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: mode === "review" ? { "import.meta.env.VITE_DESIGN_PREVIEW": '"true"' } : {},
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replaceAll("\\", "/");
          if (normalized.includes("/node_modules/")) {
            if (
              normalized.includes("/node_modules/react/") ||
              normalized.includes("/node_modules/react-dom/") ||
              normalized.includes("/node_modules/scheduler/")
            ) {
              return "framework";
            }
            if (normalized.includes("/node_modules/marked/")) return "markdown";
          }
        },
      },
    },
  },
  plugins: [
    {
      name: "prerendered-preview-routes",
      configurePreviewServer(server) {
        server.middlewares.use((request, _response, next) => {
          const url = new URL(request.url || "/", "http://preview.local");
          const root = path.resolve(process.cwd(), "dist");
          const candidate = path.resolve(root, `.${decodeURIComponent(url.pathname)}`, "index.html");
          // Match production clean URLs when testing the prerendered output.
          // Vite's default SPA fallback otherwise serves the home HTML here.
          if (url.pathname !== "/" && candidate.startsWith(`${root}${path.sep}`) && fs.existsSync(candidate)) {
            request.url = `${url.pathname.replace(/\/$/, "")}/index.html${url.search}`;
          }
          next();
        });
      },
    },
    {
      name: "private-review-isolation",
      transformIndexHtml(html: string) {
        if (mode !== "review") return html;
        return html
          .replace(/<script\b[^>]*src="https:\/\/www\.googletagmanager\.com[^>]*><\/script>/g, "")
          .replace(/<script>\s*window\.dataLayer[\s\S]*?<\/script>/g, "")
          .replace(/<meta\s+name="google-site-verification"[\s\S]*?\/>/, "");
      },
    },
    emetContentPlugin(),
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react-router-dom": path.resolve(__dirname, "./src/lib/router.tsx"),
    },
  },
  base: '/' 
}));
