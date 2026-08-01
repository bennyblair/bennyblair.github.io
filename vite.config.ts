import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// @ts-expect-error JavaScript build helper has no generated declaration.
import { buildContentIndex, parseArticleModule } from "./scripts/lib/content-index.mjs";

const VIRTUAL_CONTENT_INDEX = "virtual:content-index";
const RESOLVED_CONTENT_INDEX = `\0${VIRTUAL_CONTENT_INDEX}`;

function emetContentPlugin() {
  return {
    name: "emet-content",
    resolveId(id: string) {
      if (id === VIRTUAL_CONTENT_INDEX) return RESOLVED_CONTENT_INDEX;
      return null;
    },
    load(id: string) {
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
export default defineConfig(() => ({
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
