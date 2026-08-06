# O'Snack Torcy — Next.js

Site one-page pour O'Snack Torcy (sandwichs au four & burgers gourmands), porté
depuis un fichier HTML unique vers **Next.js (App Router) + TypeScript**.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **GSAP / ScrollTrigger** — hero tile-flip, scrub-blur du manifeste, reveals
- **Lenis** — smooth scroll (synchronisé au ticker GSAP)
- **three.js** — champ de particules WebGL en fond
- **next/font** — Montserrat, Inter, IBM Plex Mono (self-hosted, plus de CDN)
- **next/image** — images optimisées (menu, story, panier)

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de production :

```bash
npm run build
npm run start
```

## Structure

```
app/
  layout.tsx        # fonts, metadata, providers, curseur, particules
  page.tsx          # composition de la page
  globals.css       # tout le style (variables de polices next/font)
components/
  Nav, Hero, Marquee, Story, Menu, Reviews, Footer
  CartPanel, CartFloating, Toast
  CustomCursor, ParticleField, SmoothScrollProvider
  Reveal, StarRating, AddToCartButton
context/
  CartContext.tsx   # état panier (add/remove/qty), persistance localStorage
lib/
  menu.ts           # 12 produits (catégories + tags + images)
  reviews.ts        # 6 avis
  format.ts         # formatage prix € fr-FR
next.config.mjs     # remotePatterns pour images.unsplash.com
```

## Ce qui a été adapté depuis le HTML d'origine

- Chaque bloc `<section>` est devenu un composant client (`'use client'`) là où
  il y a de l'interactivité/animation ; le reste reste serveur.
- Les polices passent du CDN Google Fonts à **next/font** (CSS variables
  `--font-montserrat`, `--font-inter`, `--font-ibm`).
- Les scripts globaux (curseur, Lenis, Three.js, GSAP) sont répartis dans des
  composants dédiés avec nettoyage dans `useEffect`.
- L'état du panier (qui était en variables globales) passe dans un
  `CartContext` React persisté dans `localStorage`.
- **Données reconstruites** : le `<script>` d'origine étant tronqué, les 12
  produits, les avis et la logique panier/filtres ont été recréés fidèlement à
  la structure visible (filtres 12 / 4 catégories, note 4.5/5).

## Notes

- Les images viennent d'Unsplash ; si une URL 404, remplacez-la dans
  `lib/menu.ts` ou `components/Story.tsx`.
- Le champ de particules est chargé côté client uniquement (`ssr: false`).
- `prefers-reduced-motion` désactive Lenis, les particules et ramène les
  animations à l'état final.
