import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const API_PORT = process.env.ENQUIRY_API_PORT || "8787";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy enquiry submissions to the local API during development.
      "/api": {
        target: `http://localhost:${API_PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
