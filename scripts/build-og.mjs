/**
 * Open Graph image 1200×630 : photo réelle du salon + badge Brooks.
 *   node scripts/build-og.mjs
 */
import sharp from "sharp";

const W = 1200, H = 630;
const BADGE = "public/assets/brand/brooks-badge.svg";
const BG = "public/assets/venue/brooks-salon-lumiere.jpg";

const photo = await sharp(BG).resize(W, H, { fit: "cover", position: "centre" }).toBuffer();

// dégradé olive → transparent (lisibilité du badge)
const grad = Buffer.from(`<svg width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0E3B2B" stop-opacity="0.94"/>
      <stop offset="0.42" stop-color="#0E3B2B" stop-opacity="0.55"/>
      <stop offset="0.75" stop-color="#0E3B2B" stop-opacity="0.12"/>
      <stop offset="1" stop-color="#0E3B2B" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect y="${H - 6}" width="${W}" height="6" fill="#F5C26B"/>
</svg>`);

const badge = await sharp(BADGE, { density: 900 }).resize(300, 300).png().toBuffer();

await sharp(photo)
  .composite([
    { input: grad, left: 0, top: 0 },
    { input: badge, left: 74, top: Math.round((H - 300) / 2) },
  ])
  .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
  .toFile("public/assets/brand/og-brooks.jpg");

console.log("✓ public/assets/brand/og-brooks.jpg 1200×630");
