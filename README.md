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
- **Firebase** (Firestore + Authentication) — carte du menu en temps réel + dashboard admin

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

## Dashboard admin & Firebase

Un dashboard accessible sur `/admin` permet de gérer toute la carte en temps
réel : prix, images, descriptions, catégories, tags, **promotions** (prix
promo → prix barré + badge « -X % »), masquer/afficher un plat, ajouter,
supprimer. Toute modification est immédiatement visible sur le site (et
réciproquement) grâce aux écouteurs temps réel Firestore.

Tant que Firebase n'est pas configuré, le site affiche le menu statique
(`lib/menu.ts`) et `/admin` affiche un message d'aide — rien ne casse.

### Mise en place (une seule fois)

1. Créer un projet sur [console.firebase.google.com](https://console.firebase.google.com).
2. **Ajouter une application Web** → recopier les 6 valeurs de configuration.
3. Copier `.env.local.example` en `.env.local` et coller les valeurs
   `NEXT_PUBLIC_FIREBASE_*`.
4. **Activer Firestore Database** (mode production) puis déployer les règles :
   - Console → Firestore → Règles → coller le contenu de `firestore.rules`,
     **ou** via la CLI : `firebase deploy --only firestore:rules`.
5. **Activer Authentication** → Sign-in method → **Email/Mot de passe**.
6. Créer le compte admin : Authentication → Users → *Add user*
   (email + mot de passe).
   ⚠️ Désactiver la création publique de comptes (garder uniquement Email/Mot
   de passe, sans « Enable create » si vous voulez verrouiller) — tout
   utilisateur authentifié est considéré comme admin.
7. Lancer `npm run dev`, aller sur `/admin`, se connecter, puis cliquer
   **« Importer le menu »** pour pousser les 12 plats de base dans Firestore.

Le site public consomme alors Firestore en direct. Éditer un prix dans
`/admin` le met à jour instantanément partout.

> Les images sont gérées par **URL** (champ « Image (URL) » dans le formulaire).
> Pour envoyer des fichiers vers Firebase Storage, il faudrait ajouter l'upload
> — extension possible.

## Structure

```
app/
  layout.tsx        # fonts, metadata, providers, particules
  page.tsx          # composition de la page
  admin/page.tsx    # dashboard admin (/admin)
  globals.css       # tout le style (variables de polices next/font)
components/
  Nav, Hero, Marquee, Story, Menu, Reviews, Footer
  CartPanel, CartFloating, Toast
  ParticleField, SmoothScrollProvider
  Reveal, StarRating, AddToCartButton
  admin/            # AdminApp (auth + table), ProductForm (création/édition)
context/
  CartContext.tsx   # état panier (add/remove/qty), persistance localStorage
lib/
  menu.ts           # modèle Product + 12 produits seed (catégories, promos…)
  products.ts       # data layer Firestore (temps réel, CRUD, seed)
  useProducts.ts    # hook React temps réel (fallback seed si pas de Firebase)
  firebase.ts       # init Firebase (Firestore + Auth) depuis les variables d'env
  reviews.ts        # 6 avis
  format.ts         # formatage prix € fr-FR
next.config.mjs     # remotePatterns images (tous hosts https pour l'admin)
.env.local.example  # variables Firebase à remplir
firestore.rules     # règles : lecture publique, écriture authentifiée
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
