# Assets — provenance & remplacement

Tout ce qui est servi par le site est dans `public/assets/` (donc accessible en `/assets/...`
en local **et** sur Vercel, sans configuration).

## 1. Logo — `public/assets/brand/`

| Fichier | Usage |
|---|---|
| `brooks-badge.svg` | Logo principal (vectoriel, net à toutes les tailles) : navbar, footer, splash, favicon |
| `brooks-badge-512.png` | Open Graph / partage social |
| `brooks-badge-192.png` | Favicon / apple-touch-icon |
| `favicon-64.png` | Favicon compact |

**Source :** photo du logo imprimé sur les sets de table Brooks (crop de
`image-search/reference/logo-photo-source.jpg`). Le crop Instagram ne faisait que ~120 px :
**je l'ai donc redessiné en SVG** (`scripts/build-badge.mjs`), en respectant le badge réel —
anneau vert, texte courbé « PIZZA • PASTA » / « FOOD • FRUITS », bannière rouge « BROOKS »,
« CAFE » en dessous, trois étoiles.

```bash
node scripts/build-badge.mjs   # régénère le SVG + tous les PNG
```

> ⚠️ Demande le **fichier vectoriel d'origine** (`.ai` / `.eps` / `.pdf`) à Brooks : le SVG
> actuel est une reconstruction fidèle, pas le fichier officiel. En attendant, il est
> utilisable — mais le vrai logo doit remplacer `brooks-badge.svg` un jour.

## 2. Photos réelles du lieu — `public/assets/venue/`

| Fichier | Contenu | Source |
|---|---|---|
| `brooks-salon-columns.jpg` | Salle, colonnes organiques, banquettes capitonnées | Photos du lieu (Instagram / fiches publiques) |
| `brooks-salon-lumiere.jpg` | Salon, suspensions rotin, mur végétal | idem |
| `brooks-salle-rouge.jpg` | Salle historique, fauteuils rouges, palmiers | idem |
| `brooks-pizza-fruits-de-mer.jpg` | Pizza fruits de mer (photo client) | idem |
| `brooks-pizza-table.jpg` | Pizza fromages servie en salle | idem |

**Le compte Instagram n'est pas scrapable** depuis cet environnement (Instagram bloque le
téléchargement direct des médias). Ces photos ont été récupérées via la recherche d'images
sur des pages publiques référencant le restaurant. Elles sont **suffisantes pour la maquette**,
mais pour la mise en production :

1. Récupère depuis **ton propre compte Instagram** → « Paramètres → Votre activité →
   Télécharger vos informations » (export officiel Meta, avec les `reels` et photos).
2. Ou demande les photos originales au gérant (haute résolution, sans compression Instagram).
3. Remplace simplement les fichiers en gardant **les mêmes noms** : aucun code à toucher.

**Droit à l'image :** les pizzas ci-dessus sont des photos *clients* (TripAdvisor/Foursquare).
OK pour une démo, **pas** pour un site en production sans accord — remplace-les par les photos
de Brooks.

## 3. Visuels éditoriaux — `public/assets/menu/`

| Fichier | Contenu |
|---|---|
| `pasta-fruits-de-mer.jpg` | Pasta fruits de mer (crevettes, moules, tomates cerises) |
| `cheesecake-lotus.jpg` | Cheesecake Lotus (cœur crémeux, coulis, speculoos) |

**Source :** générés (IA) pour illustrer les deux posts réels de Brooks —
« 𝐏𝐚𝐬𝐭𝐚 𝐅𝐫𝐮𝐢𝐭𝐬 𝐝𝐞 𝐦𝐞𝐫 » (fév. 2026) et « cheesecake 𝐋𝐨𝐭𝐮𝐬 » (fév. 2026) — parce que les
photos Instagram correspondantes ne sont pas récupérables en haute résolution.

**Règle simple :** dès que Brooks te donne les vraies photos de ces deux plats, tu écrases
ces deux fichiers et le site est 100 % authentique.

## 4. Où ces images apparaissent

| Emplacement | Fichier utilisé |
|---|---|
| Hero (plein écran) | `venue/brooks-salon-columns.jpg` |
| Tour horizontal épinglé (4 cartes) | salon-lumiere • salle-rouge • pizza-fruits-de-mer • pizza-table |
| Signature (scale-scroll) | `menu/cheesecake-lotus.jpg` |
| Section « Pasta Fruits de mer » | `menu/pasta-fruits-de-mer.jpg` |
| Citation parallaxe | `venue/brooks-salon-lumiere.jpg` |
| Navbar / footer / splash / favicon | `brand/brooks-badge.svg` |

Côté application React (`src/App.tsx`), les constantes `IMAGES.hero`, `IMAGES.salon`,
`IMAGES.lounge`, `IMAGES.pizza`, `IMAGES.pasta`, `IMAGES.cheesecake` et `IMAGES.badge`
pointent déjà vers ces fichiers.

## 5. Optimisation (à faire avant prod)

Les JPG livrés sont en qualité 82–86, 1600 px max (~200–400 ko). Pour la prod :

```bash
# WebP + AVIF en plus du JPEG
for f in public/assets/**/*.jpg; do
  cwebp -q 78 "$f" -o "${f%.jpg}.webp"
done
```

Ou, en Next.js, `next/image` s'en charge automatiquement (AVIF/WebP + `srcset` + lazy-load).
Cible : **< 120 ko par image** au-dessus de la ligne de flottaison.
