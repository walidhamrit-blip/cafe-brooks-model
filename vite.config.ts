import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // Dev/preview server: bind on all interfaces and accept proxied preview hosts
  // (e.g. https://<port>-<sandbox>.e2b.app) plus Vercel preview deployments.
  server: {
    host: "0.0.0.0",
    allowedHosts: [".e2b.app", ".vercel.app", "localhost"],
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
