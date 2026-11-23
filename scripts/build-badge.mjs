/**
 * Génère le badge Brooks Café en SVG (texte courbé calculé lettre par lettre,
 * pour un rendu identique partout — pas de textPath capricieux en librsvg/ImageMagick).
 *
 *   node scripts/build-badge.mjs
 *
 * Sorties : public/assets/brand/brooks-badge.svg + PNG (favicons / OG).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const C = 200;              // centre
const R_OUT = 196;          // cercle extérieur
const R_RING_IN = 136;      // disque crème
const R_RING_OUT = 186;     // anneau vert intérieur

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Texte sur arc : chaque lettre = rotation autour du centre. */
function arcText(text, { radius, from, to, size, weight = 800, family, flip = false, fill }) {
  const chars = [...text];
  const step = chars.length > 1 ? (to - from) / (chars.length - 1) : 0;
  const out = [];
  chars.forEach((ch, i) => {
    if (ch === " ") return;
    const a = from + step * i;
    const rad = (a * Math.PI) / 180;
    const x = C + radius * Math.sin(rad);
    const y = C - radius * Math.cos(rad);
    const rot = flip ? a - 180 : a;
    out.push(
      `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" transform="rotate(${rot.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)})" ` +
        `text-anchor="middle" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(ch)}</text>`
    );
  });
  return out.join("\n    ");
}

const SANS = "'Plus Jakarta Sans','Helvetica Neue',Arial,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-labelledby="t d">
  <title id="t">Brooks Café — Nabeul</title>
  <desc id="d">Badge rond Brooks Café : Pizza, Pasta, Food, Fruits.</desc>
  <defs>
    <linearGradient id="ribbon" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#C8242F"/>
      <stop offset="0.55" stop-color="#A3151F"/>
      <stop offset="1" stop-color="#78101A"/>
    </linearGradient>
    <radialGradient id="sheen" cx="0.32" cy="0.24" r="0.85">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.10"/>
    </radialGradient>
  </defs>

  <!-- Anneau vert -->
  <circle cx="${C}" cy="${C}" r="${R_OUT}" fill="#0E3B2B"/>
  <circle cx="${C}" cy="${C}" r="186" fill="#14624A"/>
  <circle cx="${C}" cy="${C}" r="186" fill="url(#sheen)"/>
  <circle cx="${C}" cy="${C}" r="184" fill="none" stroke="#F6EFDF" stroke-width="2.2"/>
  <circle cx="${C}" cy="${C}" r="${R_RING_IN}" fill="none" stroke="#F6EFDF" stroke-width="1.8" opacity="0.9"/>

  <!-- Disque central -->
  <circle cx="${C}" cy="${C}" r="${R_RING_IN}" fill="#F6EFDF"/>
  <circle cx="${C}" cy="${C}" r="${R_RING_IN}" fill="url(#sheen)" opacity="0.6"/>

  <!-- Texte circulaire haut -->
  <g>
    ${arcText("PIZZA • PASTA", { radius: 157, from: -64, to: 64, size: 23, family: SANS, fill: "#F6EFDF" })}
  </g>

  <!-- Texte circulaire bas (sens inversé pour rester lisible) -->
  <g>
    ${arcText("FOOD • FRUITS", { radius: 178, from: 244, to: 116, size: 22, family: SANS, fill: "#F6EFDF", flip: true })}
  </g>

  <!-- Trois étoiles -->
  <g fill="#123F2E">
    <path d="M200 108.5 l4.4 8.9 9.8 1.4 -7.1 6.9 1.7 9.7 -8.8 -4.6 -8.8 4.6 1.7 -9.7 -7.1 -6.9 9.8 -1.4z"/>
    <path d="M146 120 l3.6 7.3 8.1 1.2 -5.9 5.7 1.4 8 -7.2 -3.8 -7.2 3.8 1.4 -8 -5.9 -5.7 8.1 -1.2z" opacity="0.9"/>
    <path d="M254 120 l3.6 7.3 8.1 1.2 -5.9 5.7 1.4 8 -7.2 -3.8 -7.2 3.8 1.4 -8 -5.9 -5.7 8.1 -1.2z" opacity="0.9"/>
  </g>

  <!-- Bannière rouge -->
  <g transform="translate(${C} ${C}) rotate(-6) translate(${-C} ${-C})">
    <path d="M80 186 l-22 5 22 5 v28 h240 v-28 l22 -5 -22 -5z" fill="#000" opacity="0.13" transform="translate(0 4)"/>
    <path d="M80 180 l-22 5 22 5 v28 h240 v-28 l22 -5 -22 -5z" fill="url(#ribbon)"/>
    <path d="M58 185 l-20 5 20 5z" fill="#78101A"/>
    <path d="M342 185 l20 5 -20 5z" fill="#78101A"/>
    <text x="${C}" y="210" text-anchor="middle" font-family="${SERIF}" font-size="40" font-weight="700"
          letter-spacing="1" fill="#FFFFFF">BROOKS</text>
    <path d="M96 196 h18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
    <path d="M286 196 h18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
  </g>

  <!-- CAFE -->
  <text x="${C}" y="278" text-anchor="middle" font-family="${SERIF}" font-size="36"
        letter-spacing="6" fill="#123F2E">CAFE</text>
</svg>
`;

mkdirSync("public/assets/brand", { recursive: true });
writeFileSync("public/assets/brand/brooks-badge.svg", svg);

const png = (size, out, opts = {}) =>
  sharp(Buffer.from(svg), { density: 600 })
    .resize(size, size)
    .png(opts)
    .toFile(out)
    .then((i) => console.log("✓", out, i.width + "x" + i.height));

await png(700, "/tmp/badge.png");
await png(512, "public/assets/brand/brooks-badge-512.png");
await png(192, "public/assets/brand/brooks-badge-192.png");
await png(64, "public/assets/brand/favicon-64.png", { compressionLevel: 9 });
console.log("SVG:", svg.length, "octets");
