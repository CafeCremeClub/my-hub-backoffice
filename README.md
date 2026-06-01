# MyHub Back-Office

Back-office d'administration de **MyHub** (Café Crème). Application **frontend uniquement**
(Next.js) qui consomme la **même API REST externe** que MyHub, via ses endpoints **admin**.
Pas de base de données ni de serveur applicatif dans ce dépôt.

> ℹ️ Ce README a été reconstruit à partir d'une exploration directe du code. Les points non
> vérifiables dans le dépôt sont marqués **⚠️ INCERTAIN**.

---

## 1. Présentation fonctionnelle

Outil interne réservé aux **administrateurs** pour piloter MyHub. Un admin peut :

1. **Se connecter** via un flux **sans mot de passe** (email + code OTP à 4 chiffres).
   ⚠️ Seuls les comptes de rôle **`ADMIN`** sont autorisés ; tout autre rôle est refusé à la
   connexion (`src/components/auth/signin/SignInForm.tsx`).
2. **Tableau de bord / KPIs** : statistiques de missions (`/dashboard`).
3. **Membres** : lister les profils (paginés, triables), consulter le détail d'un membre.
4. **Missions** : créer une offre, modifier le statut, supprimer une mission, et consulter les
   **candidatures** reçues par mission.
5. **Utilisateurs autorisés (whitelist)** : ajouter un email, ou **importer en masse via CSV**
   (import batch).

**Public visé** : administrateurs internes uniquement.

> ℹ️ Contrairement à l'app MyHub (front freelance), il n'y a **ni onboarding, ni paiement
> Stripe** dans ce back-office.

---

## 2. Stack technique

| Domaine            | Technologie                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| Framework          | **Next.js 15.5.9** (App Router, dev **et build** avec `--turbopack`)         |
| UI                 | **React 19.1.0**                                                            |
| Langage            | **TypeScript 5** (`strict`), alias `@/*` → `./src/*`                         |
| Styling            | **Tailwind CSS v4** (`@tailwindcss/postcss`), `tw-animate-css`             |
| Composants UI      | **shadcn/ui** (style « new-york »), **Radix UI**, `lucide-react`, `react-icons` |
| Data fetching      | **TanStack React Query v5** + **Axios**                                      |
| Formulaires        | **Formik** + **Yup**                                                         |
| Notifications      | **Sonner** (toasts)                                                          |
| Divers             | `input-otp`, `react-phone-number-input`, `next-themes`                       |
| Polices            | `next/font` — Geist, Geist Mono, Bricolage Grotesque                         |

- **Base(s) de données** : aucune dans ce dépôt (frontend pur).
- **Lint** : ESLint 9 + `eslint-config-next` (script `lint` = `eslint`).
- ⚠️ INCERTAIN : aucun framework de **test** n'est installé ni configuré.

---

## 3. Architecture

### 3.1 Vue d'ensemble

```
Navigateur (React 19 / Next.js App Router)
        │
        │  Server Actions (cookie httpOnly : token)
        │
        ▼
  Middleware (src/middleware.ts) ── garde de routes (token requis hors /auth/signin)
        │
        ▼
  Composants ──► Hooks (React Query) ──► Services (Axios) ──► API REST externe (endpoints admin)
```

### 3.2 Découpage en couches (sous `src/`)

| Dossier        | Rôle                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| `app/`         | Routes (App Router). Pages, layouts, et **Server Actions** (`app/actions/`). |
| `components/`  | UI par domaine : `auth/`, `dashboard/` (members, mission, applications, white-list, kpis), `custom/`, `ui/` (shadcn), `icons/`. |
| `hooks/`       | Wrappers **React Query** (`useQuery` / `useMutation`) par domaine + `useDebounce`. |
| `services/`    | Appels **Axios** bruts vers l'API (une fonction = un endpoint). *(Note : dossier au pluriel.)* |
| `config/`      | `axiosInstance.ts` — instance Axios + intercepteur d'authentification.     |
| `context/`     | `ReactQueryContext.tsx` (provider React Query).                            |
| `types/`       | Interfaces / enums TypeScript par domaine.                                 |
| `utils/`       | Helpers (mapping d'erreurs OTP / sign-in).                                 |
| `lib/utils.ts` | `cn()` (clsx + tailwind-merge), utilitaire shadcn.                         |

### 3.3 Authentification & contrôle d'accès

- **Connexion par OTP** : `POST /users/otp` (envoi du code) puis `POST /users/signin`
  (email + code) → renvoie `accessToken`, `user`.
- **Seul le rôle `ADMIN`** passe ; sinon connexion refusée côté UI.
- Le token est stocké dans un **cookie `token` httpOnly** par la Server Action `saveCookies`.
- `src/config/axiosInstance.ts` lit ce cookie et ajoute `Authorization: Bearer <token>` à chaque
  requête.
- `src/middleware.ts` : redirige vers `/auth/signin` sans token ; `/` → `/dashboard`.
  *(Pas de gestion d'onboarding, contrairement à MyHub.)*

### 3.4 Endpoints API consommés (vérifiés dans `src/services/`)

| Domaine        | Endpoint(s)                                                              |
| -------------- | ----------------------------------------------------------------------- |
| Auth           | `POST /users/otp`, `POST /users/signin`, `GET /profiles/me`             |
| Membres        | `GET /profiles/admin`, `GET /profiles/admin/:id`                         |
| Missions       | `GET /missions/admin`, `POST /missions`, `PATCH /missions/update/:id`, `DELETE /missions/:id` |
| Candidatures   | `GET /applications/missions/:id`                                         |
| Whitelist      | `GET /whitelists`, `POST /whitelists`, `POST /whitelists/batch`          |
| Stats / KPIs   | `GET /missions/admin/stats`                                             |

⚠️ Le contrat exact de l'API backend n'est pas dans ce dépôt (seuls les types côté client existent).

---

## 4. Setup local

### Prérequis
- **Node.js** (compatible Next 15 / React 19 — Node 18.18+ ou 20+ recommandé).
  ⚠️ INCERTAIN : aucune version Node n'est épinglée dans le dépôt (pas de `engines` ni `.nvmrc`).
- **npm** (un `package-lock.json` est présent → projet géré avec npm).

### Variables d'environnement
Un template **`.env.example`** est versionné à la racine (sans valeur). Variable consommée par
le code (par **nom uniquement**, jamais de valeur) :

| Variable               | Usage                                                                |
| ---------------------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_BASE_URL` | URL de base de l'API REST (`src/config/axiosInstance.ts`). **Requise.** |

Pour configurer l'environnement local :

```bash
cp .env.example .env.local   # puis renseigner la valeur
```

`.env.local` est ignoré par Git ; seul `.env.example` (sans secret) est versionné — voir le
`.gitignore` (`.env*` ignoré, `!.env.example` ré-inclus).

> ⚠️ INCERTAIN : l'URL exacte du backend du back-office n'est pas dans le dépôt. Récupérer la
> valeur dans les variables d'environnement du projet sur la plateforme de déploiement.

### Étapes

```bash
npm install     # installer les dépendances
npm run dev     # serveur de développement (Turbopack)
```

Ouvrir http://localhost:3000 — `/` redirige vers `/dashboard` (puis `/auth/signin` si non connecté).

### Scripts disponibles (vérifiés dans `package.json`)

| Script           | Commande                | Description                         |
| ---------------- | ----------------------- | ----------------------------------- |
| `npm run dev`    | `next dev --turbopack`  | Serveur de développement.           |
| `npm run build`  | `next build --turbopack`| Build de production.                |
| `npm run start`  | `next start`            | Sert le build de production.        |
| `npm run lint`   | `eslint`                | Lint ESLint.                        |

> ⚠️ INCERTAIN : aucun script de test (`npm test`) n'existe.

---

## 5. Déploiement

> ⚠️ INCERTAIN : **aucune configuration de déploiement ni de CI/CD n'est présente dans le dépôt.**
> Absences confirmées : pas de dossier `.github/`, pas de `vercel.json`, pas de `Dockerfile`,
> pas de `docker-compose`, ni aucun fichier YAML.

Éléments factuels :
- Dépôt distant : `https://github.com/CafeCremeClub/my-hub-backoffice.git`.
- Le `.gitignore` contient une entrée `.vercel`, et le README original était le boilerplate
  `create-next-app` orienté Vercel — ce qui **suggère** un déploiement Vercel, sans le **prouver**.

➡️ **À compléter** par l'équipe avec les informations réelles de la plateforme de déploiement.

---

## 6. Dépendances externes

| Dépendance              | Type           | Détail                                                                 |
| ----------------------- | -------------- | ---------------------------------------------------------------------- |
| **API REST MyHub (admin)** | Backend     | Source de toutes les données via ses endpoints admin. Base : `NEXT_PUBLIC_BASE_URL`. |

**Fournisseur d'authentification** : pas de provider tiers (OAuth, Auth0, etc.). L'auth est gérée
par l'API MyHub via OTP email (admin uniquement) ; le jeton est conservé en cookie httpOnly côté
Next.js.

> ℹ️ Aucune intégration tierce supplémentaire (pas de Stripe, pas d'API externe type data.gouv.fr)
> dans ce back-office, contrairement à l'app MyHub front.
