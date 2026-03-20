import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'framework';
            if (id.includes('@tanstack/react-query') || id.includes('react-helmet-async')) return 'app-vendors';
            if (id.includes('gray-matter') || id.includes('remark') || id.includes('rehype') || id.includes('marked')) return 'markdown';
          }
        },
      },
    },
  },
  plugins: [
    react(),
    nodePolyfills({
      // Enable Buffer global for browser compatibility
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/' 
}));
