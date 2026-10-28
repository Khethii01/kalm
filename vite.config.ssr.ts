import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * SSR build config — compiles src/entry-prerender.tsx (and its imports) into a
 * Node-loadable bundle in dist-ssr/, used by scripts/prerender.mjs to generate
 * static HTML for each route. Kept separate from the client build.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: "src/entry-prerender.tsx",
    outDir: "dist-ssr",
    emptyOutDir: true,
    rollupOptions: {
      output: { entryFileNames: "entry-prerender.js" },
    },
  },
});
