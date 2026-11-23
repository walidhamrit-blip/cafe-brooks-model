# BROOKS Café — Nabeul

Deux versions du site, une seule source d'images.

| Version | URL locale | URL Vercel | Rôle |
|---|---|---|---|
| **Cinématique trilingue** (finale) | `/scroll-cinematique/` | `https://<projet>.vercel.app/scroll-cinematique/` | One-page GSAP + Lenis, FR/EN/**AR (RTL)**, menu à prix réels, vraies photos, logo vectoriel |
| Application React | `/` | `https://<projet>.vercel.app/` | Version React/Vite existante (trilingue, réservation, menu) |

## Lancer en local

```bash
npm install
npm run dev               # serveur dev (même routage que la prod) → http://localhost:5173
npm run preview:cinematic # statique, dossier public/ → http://localhost:4321/scroll-cinematique/
```

Depuis le routage mis en place dans `vite.config.ts`, `npm run dev` se comporte comme Vercel :

| URL locale | Rendu |
|---|---|
| `/` | redirection → `/scroll-cinematique/` (page d'accueil finale) |
| `/scroll-cinematique/` | version cinématique trilingue |
| `/app/` | application React |
| `/menu`, `/reserver` | ancres de la version cinématique |

`preview:cinematic` sert le dossier `public/` exactement comme Vercel : les chemins d'images
(`../assets/...`) sont donc identiques en local et en production.

## Construire

```bash
npm run build     # → dist/index.html (application React, fichier unique)
```

## Contenu du dépôt

```
public/
  scroll-cinematique/index.html   ← la version cinématique trilingue (HTML + CSS + JS autonome)
  scroll-cinematique/i18n.js      ← dictionnaire FR / EN / AR
  scroll-cinematique/vendor/      ← GSAP 3.13, ScrollTrigger, Lenis 1.3 (servis localement)
  assets/brand/                   ← logo vectoriel + favicons + image Open Graph
  assets/venue/                   ← vraies photos du lieu et des pizzas
  assets/menu/                    ← visuels éditoriaux pasta & cheesecake Lotus
scripts/
  build-badge.mjs                 ← régénère le logo SVG + les PNG
  sync-menu.mjs                   ← synchronise la carte trilingue depuis src/App.tsx
  test-i18n.mjs                   ← 32 tests (3 langues, RTL, menu, onglets, SEO, JSON-LD, anti-flash)
  preview-langs.mjs               ← aperçus statiques des 3 langues
  build-og.mjs                    ← régénère l'image Open Graph
docs/
  STACK-CINEMATIQUE-VERCEL.md     ← le playbook IA → code → Vercel (coûts, DNS, SEO)
  ASSETS.md                       ← provenance exacte de chaque image + quoi remplacer
  preview/planche-assets.jpg      ← planche de contact des 8 assets
src/                              ← application React (App.tsx, index.css)
```

## Déploiement Vercel

`vercel.json` est déjà prêt (`framework: vite`, `output: dist`, en-têtes de sécurité).
Import du repo sur <https://vercel.com/new> → Deploy. Les fichiers de `public/` sont servis
automatiquement à la racine du domaine.

## Remplacer les images

Garde **les mêmes noms de fichiers** dans `public/assets/…` et remplace le contenu :
aucun code à modifier. Détails et points juridiques dans [`docs/ASSETS.md`](docs/ASSETS.md).

```bash
npm run badge          # régénère le logo (si tu reçois le vrai fichier vectoriel, adapte le script)
```
