/**
 * Après `vite build` : la page d'accueil du site est la version cinématique
 * (public/scroll-cinematique), et l'application React est publiée sur /app/.
 *
 *   1. dist/index.html        -> dist/app/index.html
 *   2. dist/scroll-cinematique/ est déjà copié depuis public/ par Vite
 *   3. vercel.json redirige  /  ->  /scroll-cinematique/
 */
import { copyFileSync, mkdirSync, existsSync, statSync } from "node:fs";

const SRC = "dist/index.html";
const APP_DIR = "dist/app";

if (!existsSync(SRC)) {
  console.error("✖ dist/index.html introuvable — lance `vite build` d'abord.");
  process.exit(1);
}

mkdirSync(APP_DIR, { recursive: true });
copyFileSync(SRC, `${APP_DIR}/index.html`);

const ko = (p) => (statSync(p).size / 1024).toFixed(0) + " kB";
console.log("✓ dist/app/index.html      ", ko(`${APP_DIR}/index.html`), "(application React)");
console.log("✓ dist/scroll-cinematique/  (page d'accueil cinématique)");
