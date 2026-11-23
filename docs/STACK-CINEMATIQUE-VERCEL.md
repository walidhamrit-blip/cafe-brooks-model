# BROOKS Café — rendu cinématique sans Webflow / sans Wix

**Réponse courte :** oui, c'est faisable, gratuit, et tu gardes 100 % du contrôle. Ce dossier contient une **preuve qui tourne** : un site one-page cinématique (smooth-scroll + animations pilotées par le scroll) écrit à la main, sans page-builder, sans abonnement.

| Élément | Coût | Rôle |
|---|---|---|
| Next.js (App Router) | 0 € | Framework + routes API (formulaire, e-mails) |
| GSAP 3 + ScrollTrigger | 0 € (licence standard gratuite) | Animations timeline, `pin`, `scrub` |
| Lenis | 0 € (MIT) | Smooth scroll inertiel (le « toucher Webflow ») |
| Vercel Hobby | 0 € | Hébergement + HTTPS + domaine perso + CI/CD Git |
| Total | **0 € / mois** | Webflow ≈ 23–29 $/mois, Wix ≈ 17–29 $/mois |

> ⚠️ Une seule nuance honnête : si tu veux le **CMS** (le client qui édite ses plats sans code) et l'**éditeur visuel**, tu devras le remplacer par *Sanity / Contentful (gratuit en tier perso)* ou Markdown/JSON dans le repo. Si tu veux littéralement le « drag & drop » de Webflow, garde Webflow. Pour un rendu cinéma **sur mesure**, le code gagne.

---

## 1. Ce que contient la démo (et pourquoi c'est « pareil » que Webflow)

Ouvre `public/scroll-cinematique/index.html` (ou l'URL `/scroll-cinematique/`). Elle démontre les 5 patterns que 90 % des sites Webflow « cinématiques » utilisent :

1. **Smooth scroll Lenis** — inertie au trackpad, `scrollTo` animé sur les ancres.
2. **Hero parallaxe** — l'image recule (`yPercent`) pendant que le titre monte en lignes masquées (`overflow:hidden` + `yPercent:115`).
3. **Section épinglée horizontale** (`pin: true` + `scrub`) — le scroll vertical fait défiler des cartes latéralement, y compris une parallaxe interne par carte avec `containerAnimation`.
4. **Titre révélé ligne par ligne** — le classique « line mask reveal ».
5. **Scale-scroll + compteurs animés + parallaxe de citation** — les détails qui donnent l'impression « cinéma ».

**Points techniques importants (ce qui casse chez les débutants) :**

- **Un seul ticker.** GSAP pilote Lenis (`gsap.ticker.add(t => lenis.raf(t*1000))` + `lenis.on('scroll', ScrollTrigger.update)`). Deux boucles `requestAnimationFrame` séparées = saccades et `ScrollTrigger` désynchronisé.
- **`scroll-behavior: smooth` est interdit** quand Lenis est actif → il faut `html.lenis .lenis-smooth { scroll-behavior: auto !important; }`.
- **`ScrollTrigger.refresh()`** après `window.load` et `document.fonts.ready` (les images/polices changent la hauteur → le `pin` se décale).
- **`prefers-reduced-motion`** respecté : Lenis et les timelines sont désactivés, tout reste lisible.
- **Fallback sans JS/GSAP** : le contenu n'est jamais invisible (la classe `html.anim` n'est posée que par le JS).

### La démo tourne localement

```bash
# depuis la racine du repo : sert public/ comme Vercel le fait
python3 -m http.server 4321 --directory public
# → http://localhost:4321/scroll-cinematique/
```

Les libs sont dans `public/scroll-cinematique/vendor/` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.11) : aucun CDN requis, aucune dépendance à installer pour voir le rendu.

---

## 2. Le workflow IA → code → Vercel (le pipeline réel)

C'est le cœur de ta question : « comment l'IA génère le même rendu ».

```
1. Brief / contenu (toi + IA)
        │   couleurs, ton, sections, vraies infos (horaires, prix, adresse)
        ▼
2. Agent IA → code (Next.js + Tailwind + GSAP)
        │   génère des composants, pas des pages dans un éditeur
        ▼
3. Tu review sur une Preview Vercel (URL unique par branche/PR)
        │   « plus lent ici », « change ce prix » → l'IA modifie le code
        ▼
4. Merge sur main → Production Vercel (HTTPS, CDN mondial, domaine perso)
```

**Ce que tu dis à l'agent (prompt qui marche) :**

> « Tu es développeur front-end senior. Crée une landing Next.js 15 (App Router, TypeScript) + Tailwind v4 pour BROOKS Café Nabeul. Style : ivoire/travertin, vert olive, or ; serif Cormorant Garamond + sans Plus Jakarta. Ajoute Lenis en smooth scroll et GSAP ScrollTrigger pour : (1) hero parallaxe avec titre en reveal ligne par ligne, (2) section de visite épinglée horizontale avec 4 cartes, (3) scale-scroll sur le cheesecake signature, (4) compteurs animés, (5) formulaire de réservation → route API qui envoie un e-mail + ouvre WhatsApp. Respecte `prefers-reduced-motion`, ajoute des métadonnées SEO + JSON-LD Restaurant, et ne mets jamais `scroll-behavior: smooth` sur `html` car Lenis le gère. »

Puis tu itères **par diff** : « la section 2 est trop rapide, mets `scrub: 1.5` », etc. C'est là que tu gagnes : une IA modifie un fichier, elle ne te fait pas cliquer 40 fois dans un panneau.

---

## 3. Mise en production sur Vercel (pas à pas)

### 3.1 Pousser le repo sur GitHub

Le repo `cafe-brooks-model` est déjà sur GitHub. Vercel se branche dessus.

### 3.2 Importer sur Vercel

1. <https://vercel.com/new> → **Import Git Repository** → choisis `walidhamrit-blip/cafe-brooks-model`.
2. **Framework Preset** : `Next.js` (ou `Vite` pour ce repo actuel).
3. **Build Command** : `next build` ; **Output** : `.next` (auto-détecté).
4. **Deploy**. Tu obtiens `cafe-brooks-model.vercel.app` en ~1 minute.

### 3.3 Le repo actuel est un projet **Vite** — deux options

| Option | Ce que tu fais | Quand la choisir |
|---|---|---|
| **A. Rester Vite** (le plus rapide) | `vercel.json` minimal, output `dist`. Preview instantanée. | Tu veux le site maintenant, pas de route API. |
| **B. Passer à Next.js** (recommandé) | `npx create-next-app@latest`, on migre les composants, on ajoute `app/api/reserve/route.ts`. | Tu veux le formulaire e-mail, le SEO dynamique, un futur blog/CMS. |

Le `vercel.json` fourni à la racine couvre l'option A telle quelle.

### 3.4 Domaine personnalisé (gratuit)

1. Vercel → **Settings → Domains → Add** → `brookscafe.tn` (ou ce que tu possèdes).
2. Chez ton registrar : `A 76.76.21.21` pour `@`, `CNAME cname.vercel-dns.com` pour `www`.
3. HTTPS + renouvellement : automatiques, 0 €.

### 3.5 Variables d'environnement (si formulaire e-mail)

| Clé | Où l'obtenir |
|---|---|
| `RESEND_API_KEY` | resend.com (3 000 e-mails/mois gratuits) |
| `RESERVATION_TO` | l'adresse du café |
| `NEXT_PUBLIC_WHATSAPP` | `21693301771` |

Vercel → **Settings → Environment Variables** → `Preview` + `Production`.

### 3.6 Le « workflow IA » en continu

- Chaque branche poussée = **Preview Deployment** (URL unique, commentée dans la PR).
- Chaque merge sur `main` = **Production**.
- L'agent peut lancer `vercel` ou simplement `git push` ; l'intégration Git de Vercel fait le reste.
- Rollback en 1 clic depuis l'onglet *Deployments*.

---

## 4. Checklist « rendu cinématique pro »

- [ ] Lighthouse mobile ≥ 90 (images `next/image` + `avif/webp` + `sizes` corrects).
- [ ] `prefers-reduced-motion` respecté (accessibilité + bon signal qualité).
- [ ] Texte lisible sans animation : rien n'est caché en `opacity:0` sans fallback.
- [ ] `ScrollTrigger.refresh()` après fonts/images ; `invalidateOnRefresh: true` sur le pin.
- [ ] Pas de `pin` sur plus d'1–2 sections par page (coût CPU + mal de mer).
- [ ] Vidéo hero : `poster` + `muted playsinline` + fallback image sur mobile 3G.
- [ ] Métadonnées : `title`, `description`, OpenGraph 1200×630, JSON-LD `Restaurant` (adresse, horaires, téléphone, `aggregateRating`).
- [ ] Formulaires : validation côté serveur **et** côté client ; jamais de clé secrète dans le client.
- [ ] Analytics léger (Vercel Analytics ou Umami) plutôt qu'un pixel lourd.
- [ ] Domaine `.tn` : enregistre-le chez un registrar tunisien, DNS pointés vers Vercel.

---

## 5. Limites à connaître (pour ne pas se mentir)

1. **Contenu éditable** : sans CMS, chaque changement de prix = un commit. Solution : `content/menu.json` (l'IA le met à jour) ou Sanity gratuit.
2. **Pas d'éditeur visuel** : le « je déplace un bloc à la souris » disparaît. En échange : zéro lock-in, zéro abonnement, performance meilleure.
3. **Courbe d'apprentissage** : tu ne codes pas, mais tu dois savoir *demander* (prompts précis, itérations par diff). C'est une compétence qui s'acquiert vite.
4. **GSAP licence** : le cœur (gsap + ScrollTrigger) est gratuit, y compris en usage commercial. Les plugins *Club* (SplitText, MorphSVG, etc.) sont payants — inutiles ici.
5. **Images** : Unsplash = parfait pour la maquette, **pas** pour la prod (droits + poids). Fais shooter le café, compresse en WebP/AVIF.

---

## 6. Ce que je ferais ensuite, concrètement

1. **Semaine 1** — Valider la démo sur mobile (le pin est le point sensible) et remplacer les 2 visuels éditoriaux (pasta, cheesecake) + les photos clients par les vraies photos Brooks — mêmes noms de fichiers, zéro code à toucher.
2. **Semaine 2** — Migrer en Next.js, brancher Resend + WhatsApp, déployer sur Vercel avec le domaine.
3. **Semaine 3** — SEO local : Google Business Profile, JSON-LD, pages « brunch Nabeul », « café terrasse Nabeul ».
4. **Semaine 4** — Menu JSON + petite page admin protégée, ou Sanity si le client veut éditer seul.

Le repo contient déjà `vercel.json` (option Vite) et ce document. La démo est dans `public/scroll-cinematique/`, les images et le logo dans `public/assets/` (voir `docs/ASSETS.md` pour la provenance exacte de chaque fichier).

---

## 7. Structure publiée sur Vercel

La page cinématique est la **page d'accueil**, l'application React est conservée sur `/app/`.

| URL | Contenu | Fichier source |
|---|---|---|
| `/` | redirection 302 → `/scroll-cinematique/` | `vercel.json` |
| `/scroll-cinematique/` | **site cinématique (page d'accueil)** | `public/scroll-cinematique/index.html` |
| `/app/` | application React (menu, réservation, trilingue) | `src/App.tsx` (build → `dist/app/index.html`) |
| `/assets/…` | images, logo, favicons, OG | `public/assets/` |
| `/menu`, `/reserver` | raccourcis vers les ancres `#pasta`, `#reserve` | `vercel.json` |

`npm run build` = `vite build` puis `scripts/after-build.mjs`, qui copie `dist/index.html`
vers `dist/app/index.html`. Vite copie déjà `public/` dans `dist/`, donc les chemins
`../assets/…` de la page cinématique restent valides.

**Nom du projet Vercel :** `brooks-cafe-scrooling` → `https://brooks-cafe-scrooling.vercel.app`


---

## 8. Multilingue FR / EN / AR (version combinée)

La page cinématique est **trilingue** et **RTL-aware**. Elle réunit :
les effets de scroll (GSAP + Lenis) de la version cinématique, **et**
le menu à prix réels + le multilingue de l'application React.

### Comment ça marche

| Fichier | Rôle |
|---|---|
| `public/scroll-cinematique/i18n.js` | dictionnaire FR / EN / AR + `dir` (ltr / rtl) |
| `public/scroll-cinematique/index.html` | 107 attributs `data-i18n` + moteur de traduction |
| `scripts/sync-menu.mjs` | extrait le MENU trilingue de `src/App.tsx` → JSON dans la page |

- **Sélecteur** en haut à droite : `FR · EN · AR` ; le choix est mémorisé (`localStorage`)
  et reflété dans l'URL (`?lang=ar`), donc partageable.
- **Détection initiale** : `?lang=` → choix mémorisé → sinon **fr**, ou **ar** si le
  navigateur est arabophone. L'anglais reste un choix explicite (marché local).
- **RTL** : `dir="rtl"` sur `<html>`, grilles et listes miroir, polices arabes
  **Cairo / Amiri**, interligne et `letter-spacing` ajustés (l'arabe n'a pas de capitales).
- **Menu** : onglet « À la une » (6 plats, photos variées) + 3 onglets de catégorie
  (Plats / Cafés / Desserts). Prix en DT, noms, descriptions et ingrédients dans les 3 langues.

### Vérifier / régénérer

```bash
node scripts/test-i18n.mjs      # 22 tests : 3 langues, RTL, menu, onglets, clés manquantes
node scripts/sync-menu.mjs      # après toute modification de MENU dans src/App.tsx
node scripts/preview-langs.mjs  # docs/preview/apercu-{fr,en,ar}.html
```

### Ajouter une langue

1. Copier le bloc `fr` dans `i18n.js`, changer les valeurs.
2. Ajouter la clé au tableau `SUPPORTED` (implicite : les clés de `BROOKS_I18N`).
3. Ajouter un bouton `<button data-lang="xx">` dans `.lang`.
4. Pour une langue RTL, mettre `dir: "rtl"` dans son bloc.
