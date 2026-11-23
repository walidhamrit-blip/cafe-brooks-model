/**
 * Test d'intégration de la page cinématique multilingue (jsdom).
 * Vérifie : traduction des 3 langues, direction RTL, rendu du menu, onglets.
 *
 *   node scripts/test-i18n.mjs
 */
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

const PAGE = "public/scroll-cinematique/index.html";
const I18N = "public/scroll-cinematique/i18n.js";
// i18n.js est inliné (jsdom ne charge pas les ressources externes) et les libs vendor retirées :
// GSAP/Lenis absents → on teste le chemin "sans GSAP", le plus fragile.
const html = readFileSync(PAGE, "utf8")
  .replace(/<script src="\.\/vendor\/[^"]+"><\/script>/g, "")
  .replace('<script src="./i18n.js"></script>', `<script>${readFileSync(I18N, "utf8")}</script>`);

const errors = [];
const dom = new JSDOM(html, {
  runScripts: "dangerously",
  pretendToBeVisual: true,
  url: "http://localhost/",
  beforeParse(win) {
    // jsdom n'implémente pas matchMedia : on le fournit avant l'exécution des scripts
    win.matchMedia = (q) => ({
      matches: false, media: q, onchange: null,
      addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent() { return false; },
    });
    win.addEventListener("error", (e) => errors.push(e.message));
  },
});
const { window } = dom;
const { document } = window;

await new Promise((r) => setTimeout(r, 400));

const results = [];
const ok = (name, cond, extra = "") => results.push({ name, cond, extra });

const LANG_BTN = (l) => document.querySelector(`[data-lang="${l}"]`);

/* ---- état initial (FR par défaut, pas de localStorage) ---- */
ok("langue initiale = fr", document.documentElement.lang === "fr", document.documentElement.lang);
ok("dir initial = ltr", document.documentElement.dir === "ltr");
ok("onglet actif = À la une", document.querySelector(".menu-tab.on")?.dataset.cat === "galerie");
ok("6 cartes dans la galerie", document.querySelectorAll("#menuGrid .dish").length === 6,
   document.querySelectorAll("#menuGrid .dish").length + " cartes");

/* ---- passage en arabe ---- */
LANG_BTN("ar").dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
await new Promise((r) => setTimeout(r, 120));

ok("lang = ar", document.documentElement.lang === "ar");
ok("dir = rtl", document.documentElement.dir === "rtl");
ok("h1 traduit", document.querySelector('[data-i18n="hero.l1"]').textContent.includes("قهوة"),
   document.querySelector('[data-i18n="hero.l1"]').textContent);
ok("bouton nav ar", document.querySelector('[data-i18n="nav.reserve"]').textContent === "احجز طاولة",
   document.querySelector('[data-i18n="nav.reserve"]').textContent);
ok("titre du menu ar", document.querySelector('[data-i18n="menu.title"]').textContent.includes("قائمتنا"));
ok("cartes du menu ar", document.querySelector("#menuGrid .dish h3")?.textContent.includes("برجر"),
   document.querySelector("#menuGrid .dish h3")?.textContent);
ok("prix affichés", !!document.querySelector("#menuGrid .dish .p")?.textContent.trim());
ok("footer ar", document.querySelector('[data-i18n="foot.hours"]').textContent === "أوقات العمل");

/* ---- onglet "desserts" en arabe ---- */
document.querySelector('.menu-tab[data-cat="dessert"]').dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
await new Promise((r) => setTimeout(r, 80));
ok("onglet desserts actif", document.querySelector(".menu-tab.on")?.dataset.cat === "dessert");
ok("4 desserts", document.querySelectorAll("#menuGrid .dish").length === 4,
   document.querySelectorAll("#menuGrid .dish").length + " cartes");
ok("cheesecake en ar", [...document.querySelectorAll("#menuGrid .dish h3")].some((h) => h.textContent.includes("تشيز كيك")));

/* ---- passage en anglais ---- */
LANG_BTN("en").dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
await new Promise((r) => setTimeout(r, 80));
ok("lang = en", document.documentElement.lang === "en");
ok("dir = ltr", document.documentElement.dir === "ltr");
ok("h1 en", document.querySelector('[data-i18n="hero.l1"]').textContent === "Specialty coffee,",
   document.querySelector('[data-i18n="hero.l1"]').textContent);
ok("cta en", document.querySelector('[data-i18n="res.submit"]').textContent === "Confirm on WhatsApp");
ok("footer en", document.querySelector('[data-i18n="foot.hours"]').textContent === "Opening hours");

/* ---- clés manquantes ? ---- */
const missing = [];
document.querySelectorAll("[data-i18n]").forEach((el) => {
  const key = el.dataset.i18n;
  for (const lang of ["fr", "en", "ar"]) {
    if (!window.BROOKS_I18N[lang][key]) missing.push(`${lang}:${key}`);
  }
});
ok("aucune clé i18n manquante", missing.length === 0, missing.slice(0, 6).join(", "));
ok("aucune erreur JS", errors.length === 0, errors.slice(0, 3).join(" | "));


/* ================= SEO / partage / no-flash ================= */

// a) métadonnées absolues
const meta = (sel, attr = "content") => document.querySelector(sel)?.getAttribute(attr);
const ogImage = meta('meta[property="og:image"]');
ok("og:image absolue", /^https:\/\//.test(ogImage || ""), ogImage);
ok("og:url absolue", /^https:\/\//.test(meta('meta[property="og:url"]') || ""));
ok("twitter:image absolue", /^https:\/\//.test(meta('meta[name="twitter:image"]') || ""));
ok("canonical présent", /^https:\/\//.test(document.querySelector('link[rel="canonical"]')?.href || ""));
ok("hreflang fr/en/ar", ["fr", "en", "ar"].every((l) =>
  document.querySelector(`link[hreflang="${l}"]`)));

// b) JSON-LD valide
const ldBlocks = [...document.querySelectorAll('script[type="application/ld+json"]')];
let ldOk = ldBlocks.length === 2, ldTypes = [];
for (const b of ldBlocks) {
  try {
    const d = JSON.parse(b.textContent);
    ldTypes.push(d["@type"]);
    if (d["@type"] === "Restaurant") {
      if (d.address?.addressCountry !== "TN") ldOk = false;
      if (!d.telephone || !d.openingHoursSpecification?.length) ldOk = false;
      if (!d.hasMenu?.hasMenuSection?.length) ldOk = false;
      if (d.aggregateRating?.ratingValue !== "4.6") ldOk = false;
      // chaque prix du JSON-LD doit exister dans la VRAIE carte (source de vérité)
      const menuJson = JSON.parse(document.getElementById("menu-data").textContent);
      const prixCarte = {};
      for (const cat of Object.keys(menuJson)) for (const d2 of menuJson[cat]) prixCarte[d2.fr] = d2.price.split(" ")[0];
      let n = 0;
      for (const sec of d.hasMenu.hasMenuSection) {
        for (const it of sec.hasMenuItem) {
          n++;
          if (prixCarte[it.name] !== it.offers.price) ldOk = false;
        }
      }
      if (n < 12) ldOk = false; // la carte complète doit être exposée
    }
  } catch (e) { ldOk = false; }
}
ok("JSON-LD Restaurant + FAQ valides (12 prix conformes)", ldOk, ldTypes.join(", "));

// c) les chiffres existent sans JavaScript (avant animation)
const stats = [...document.querySelectorAll("[data-count]")].map((el) => el.textContent.trim());
ok("stats non vides en HTML", stats.every((t) => t && t !== "0" && t !== "0.0"), stats.join(" | "));

// d) contenu du <noscript> pour la carte
ok("noscript carte présent", !!document.querySelector("noscript"));

/* ---- e) direction avant le premier paint (navigateur arabophone) ---- */
{
  const raw = readFileSync(PAGE, "utf8");
  const headOnly = raw.slice(0, raw.indexOf("</head>") + 7);
  const arDom = new JSDOM(headOnly, {
    runScripts: "dangerously",
    url: "http://localhost/",
    beforeParse(win) {
      Object.defineProperty(win.navigator, "language", { value: "ar-TN", configurable: true });
      win.matchMedia = (q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} });
    },
  });
  const d = arDom.window.document.documentElement;
  ok("navigateur ar → dir=rtl dès le <head>", d.dir === "rtl" && d.lang === "ar", `${d.lang}/${d.dir}`);
}
{
  const raw = readFileSync(PAGE, "utf8");
  const headOnly = raw.slice(0, raw.indexOf("</head>") + 7);
  const enDom = new JSDOM(headOnly, {
    runScripts: "dangerously",
    url: "http://localhost/?lang=en",
    beforeParse(win) {
      Object.defineProperty(win.navigator, "language", { value: "en-US", configurable: true });
      win.matchMedia = (q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} });
    },
  });
  const d = enDom.window.document.documentElement;
  ok("?lang=en → EN dès le <head>", d.lang === "en" && d.dir === "ltr", `${d.lang}/${d.dir}`);
}

/* ---- rapport ---- */
let fail = 0;
for (const r of results) {
  if (!r.cond) fail++;
  console.log(`${r.cond ? "✓" : "✗"} ${r.name}${r.extra && !r.cond ? `  → ${r.extra}` : ""}`);
}
console.log(`\n${results.length - fail}/${results.length} tests OK`);
process.exit(fail ? 1 : 0);
