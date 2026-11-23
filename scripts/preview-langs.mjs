/**
 * Génère des aperçus statiques de la page dans les 3 langues (sans GSAP),
 * pour vérifier le rendu AR/RTL sans navigateur.
 *
 *   node scripts/preview-langs.mjs
 *   → docs/preview/apercu-{fr,en,ar}.html
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { JSDOM } from "jsdom";

const PAGE = "public/scroll-cinematique/index.html";
const I18N = "public/scroll-cinematique/i18n.js";
const OUT = "docs/preview";

mkdirSync(OUT, { recursive: true });

const base = readFileSync(PAGE, "utf8")
  .replace(/<script src="\.\/vendor\/[^"]+"><\/script>/g, "")
  .replace(/<script src="\.\/i18n\.js"><\/script>/, "")
  .replace(/<script>\s*\(function \(\)[\s\S]*?<\/script>/, ""); // retire le moteur GSAP

for (const lang of ["fr", "en", "ar"]) {
  const dom = new JSDOM(base, {
    runScripts: "dangerously",
    pretendToBeVisual: true,
    url: "http://localhost/",
    beforeParse(win) {
      win.matchMedia = (q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} });
    },
  });
  const { window } = dom;
  const { document } = window;

  // i18n + rendu du menu, en version minimale
  const sandbox = { window: {} };
  new Function("window", readFileSync(I18N, "utf8"))(sandbox.window);
  const dict = sandbox.window.BROOKS_I18N;
  const data = JSON.parse(document.getElementById("menu-data").textContent);
  const d = dict[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = d.dir;
  document.documentElement.classList.remove("anim"); // tout visible, sans animation

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = d[el.dataset.i18n] ?? dict.fr[el.dataset.i18n];
    if (v == null) return;
    if (v.includes("<")) el.innerHTML = v;
    else el.textContent = v;
  });
  document.querySelectorAll("[data-lang]").forEach((b) => b.classList.toggle("on", b.dataset.lang === lang));

  const grid = document.getElementById("menuGrid");
  grid.classList.add("is-gallery");
  grid.innerHTML = data.galerie.map((x) => `
    <article class="dish">
      <img src="../assets/${x.img.replace("/assets/", "")}" alt="${x.fr}" />
      <div><h3>${x[lang] || x.fr}</h3><p>${x["d" + lang] || x.dfr}</p>
      <div class="ing">${x["i" + lang] || x.ifr}</div><span class="tag">${x["tag" + lang] || x.tagfr}</span></div>
      <div class="p">${x.price}</div>
    </article>`).join("");

  const out = `<!doctype html>\n${dom.serialize().replace(/^<!doctype html>\s*/i, "")}`;
  writeFileSync(`${OUT}/apercu-${lang}.html`, out);
  console.log(`✓ ${OUT}/apercu-${lang}.html  (${lang.toUpperCase()}, dir=${d.dir})`);
}
