import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Même routage que la production (vercel.json) en dev et en preview :
 *   /            → /scroll-cinematique/   (page d'accueil cinématique)
 *   /scroll-cinematique/ → le vrai index.html (pas le fallback SPA)
 *   /app/…       → l'application React (publiée sur /app/ en prod)
 *   /menu, /reserver → ancres de la version cinématique
 */
function brooksRoutes(): Plugin {
  const handle = (req: { url?: string }, res: { statusCode: number; setHeader: (k: string, v: string) => void; end: () => void }, next: () => void) => {
    const raw = req.url || "/";
    const qi = raw.indexOf("?");
    const pathname = qi === -1 ? raw : raw.slice(0, qi);
    const query = qi === -1 ? "" : raw.slice(qi);

    const redirect = (to: string) => {
      res.statusCode = 302;
      res.setHeader("Location", to + query);
      res.end();
    };

    if (pathname === "/") return redirect("/scroll-cinematique/");
    if (pathname === "/menu") return redirect("/scroll-cinematique/#pasta");
    if (pathname === "/reserver") return redirect("/scroll-cinematique/#reserve");
    if (pathname === "/scroll-cinematique" || pathname === "/scroll-cinematique/") {
      req.url = "/scroll-cinematique/index.html" + query;
    } else if (pathname === "/app" || pathname === "/app/" || pathname.startsWith("/app/")) {
      req.url = "/index.html" + query;
    }
    next();
  };
  return {
    name: "brooks-routes",
    configureServer(server) {
      server.middlewares.use(handle);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile(), brooksRoutes()],
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
