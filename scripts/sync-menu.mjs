/**
 * Extrait le MENU trilingue (noms, descriptions, ingrédients, prix, tags)
 * depuis src/App.tsx et l'injecte dans public/scroll-cinematique/index.html
 * entre les marqueurs <!-- MENU_DATA_START --> et <!-- MENU_DATA_END -->.
 *
 *   node scripts/sync-menu.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const APP = "src/App.tsx";
const PAGE = "public/scroll-cinematique/index.html";

const app = readFileSync(APP, "utf8");

/* 1. Le bloc MENU (objet TS) → on l'évalue en JS après un nettoyage minimal. */
const startIdx = app.indexOf('const MENU: Record<');
const endIdx = app.indexOf("\n};", app.indexOf("dessert: [")) + 3;
if (startIdx < 0 || endIdx < 3) throw new Error("Bloc MENU introuvable dans src/App.tsx");

let block = app.slice(startIdx, endIdx);
block = block.replace(/^const MENU: Record<[^>]+> =/, "const MENU =");

// IMAGES.x → chemin d'asset réel
const imagesBlock = app.slice(app.indexOf("const IMAGES = {"), app.indexOf("};", app.indexOf("const IMAGES = {")) + 2);
const imageMap = {};
for (const m of imagesBlock.matchAll(/^\s*(\w+):\s*"([^"]+)"/gm)) imageMap[m[1]] = m[2];
block = block.replace(/img:\s*IMAGES\.(\w+)/g, (_m, k) => `img: ${JSON.stringify(imageMap[k] || "")}`);

const MENU = new Function(`${block}; return MENU;`)();

/* 2. Série de plats : 4 par catégorie, avec une image quand on en a une. */
const FALLBACK = {
  mains: "/assets/venue/brooks-pizza-fruits-de-mer.jpg",
  coffee: "/assets/venue/brooks-salon-lumiere.jpg",
  dessert: "/assets/menu/cheesecake-lotus.jpg",
};
// images réelles dont on dispose
const REAL = {
  "San Sebastián Cheesecake": "/assets/menu/cheesecake-lotus.jpg",
  "Margherita di Nabeul": "/assets/venue/brooks-pizza-fruits-de-mer.jpg",
  "Creamy Garden Linguine": "/assets/menu/pasta-fruits-de-mer.jpg",
};

/**
 * Catégorie « galerie » : on pioche 2 plats de chaque catégorie, pour varier les photos
 * (un visuel unique par plat quand on l'a, sinon une autre carte du site).
 */
const GAL = { mains: 2, coffee: 2, dessert: 2 };
const GAL_IMGS = {
  mains: ["/assets/venue/brooks-pizza-fruits-de-mer.jpg", "/assets/menu/pasta-fruits-de-mer.jpg"],
  coffee: ["/assets/venue/brooks-salon-lumiere.jpg", "/assets/venue/brooks-salon-columns.jpg"],
  dessert: ["/assets/menu/cheesecake-lotus.jpg", "/assets/venue/brooks-salle-rouge.jpg"],
};

const pick = (cat, n = 4) =>
  MENU[cat].slice(0, n).map((d) => ({
    fr: d.name.fr, en: d.name.en, ar: d.name.ar,
    dfr: d.desc.fr, den: d.desc.en, dar: d.desc.ar,
    ifr: d.ing.fr, ien: d.ing.en, iar: d.ing.ar,
    price: d.price,
    tagfr: d.tag.fr, tagen: d.tag.en, tagar: d.tag.ar,
    img: REAL[d.name.en] || FALLBACK[cat],
  }));

const data = { mains: pick("mains"), coffee: pick("coffee"), dessert: pick("dessert") };

// galerie : 2 plats de chaque univers, avec des photos distinctes
const galerie = ["mains", "coffee", "dessert"].flatMap((cat, ci) =>
  MENU[cat].slice(0, GAL[cat]).map((d, i) => ({
    fr: d.name.fr, en: d.name.en, ar: d.name.ar,
    dfr: d.desc.fr, den: d.desc.en, dar: d.desc.ar,
    ifr: d.ing.fr, ien: d.ing.en, iar: d.ing.ar,
    price: d.price,
    tagfr: d.tag.fr, tagen: d.tag.en, tagar: d.tag.ar,
    img: REAL[d.name.en] || GAL_IMGS[cat][(ci + i) % GAL_IMGS[cat].length],
  }))
);
data.galerie = galerie;

/* 3. Injection dans la page. */
const page = readFileSync(PAGE, "utf8");
const A = "<!-- MENU_DATA_START -->";
const B = "<!-- MENU_DATA_END -->";
const a = page.indexOf(A);
const b = page.indexOf(B);
if (a < 0 || b < 0) throw new Error(`Marqueurs ${A} / ${B} absents de ${PAGE}`);

const json = JSON.stringify(data, null, 2)
  .replace(/</g, "\\u003c")
  .replace(/\u2028/g, "\\u2028");

const injected = `${A}\n<script id="menu-data" type="application/json">\n${json}\n</script>\n`;
const out = page.slice(0, a) + injected + page.slice(b);
writeFileSync(PAGE, out);

const count = (c) => data[c].length;
console.log(`✓ carte synchronisée : ${count("mains")} plats · ${count("coffee")} boissons · ${count("dessert")} desserts · ${count("galerie")} à la une`);
console.log(`  ${(json.length / 1024).toFixed(1)} kB de JSON trilingue injectés dans ${PAGE}`);
