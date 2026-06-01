# CLAUDE.md — contexte agent pour MyHub Back-Office

## Ce qu'est ce repo
**Back-office d'administration de MyHub** (Café Crème). **Frontend seul** : Next.js 15 (App
Router) + React 19 + TypeScript, qui consomme la **même API REST externe que MyHub** via ses
endpoints **admin**. **Pas de base de données ni de backend dans ce dépôt.** Architecture en
couches : `services/` (Axios brut) → `hooks/` (wrappers React Query) → `components/` (UI). Auth
**sans mot de passe par OTP email, réservée au rôle `ADMIN`** ; le token est gardé en cookie
httpOnly via Server Actions, lu par `src/middleware.ts` (garde de routes) et injecté en `Bearer`
par l'intercepteur Axios. Voir le [README](README.md) pour le détail fonctionnel.

## Différences clés avec le repo `my-hub` (front freelance)
- Dossier services au **pluriel** : `services/` (et non `service/`).
- `UserRole` n'a que `USER=1, ADMIN=2` ; **seul `ADMIN` est autorisé** à se connecter.
- Middleware **simplifié** : juste présence du token, **pas de flags d'onboarding**.
- **Pas d'onboarding, pas de Stripe, pas d'API data.gouv.fr.** Une seule var d'env.
- `build` utilise `--turbopack` ; `lint` = `eslint` (et non `next lint`).
- Domaines : membres, whitelist (+ import CSV batch), missions admin (CRUD + statut),
  candidatures par mission, KPIs/stats. Endpoints admin (`/missions/admin`, `/profiles/admin`,
  `/whitelists`, `/applications/missions/:id`, `/missions/admin/stats`).

## Commandes essentielles (vérifiées dans `package.json`)
- `npm run dev` — dev (`next dev --turbopack`)
- `npm run build` — build prod (`next build --turbopack`)
- `npm run start` — sert le build
- `npm run lint` — ESLint (`eslint`)
- **Pas de tests** : aucun script ni framework de test dans le dépôt.

## Conventions de code observées
- **Alias** `@/*` → `src/*` (toujours utiliser les imports absolus `@/...`).
- **Une couche = une responsabilité** :
  - `services/*Service.ts` → une fonction par endpoint, `try/catch` qui **re-`throw`** l'erreur ;
    query params construits via `URLSearchParams`.
  - `hooks/<domaine>/use*.ts` → `useQuery`/`useMutation` (React Query).
  - `components/<domaine>/...` → UI ; `components/ui/` = shadcn (ne pas réinventer).
  - `types/<domaine>/...` → une interface/enum par fichier.
- **Formulaires** : Formik + Yup ; saisies réutilisables dans `components/custom/`.
- **Notifications** : `sonner` (`toast.success` / `toast.error`), souvent `position: 'bottom-right'`.
- **Styling** : Tailwind v4 + helper `cn()` (`src/lib/utils.ts`). Nombreuses **couleurs en dur**
  (hex) dans les `className` — rester cohérent. Police d'accent : `bricolage-grotesque`.
- **Langue UI** : textes en **français**.
- Composants client marqués `'use client'` ; Server Actions marquées `'use server'`.

## Où vivent les choses importantes
- **Config API / auth Axios** : `src/config/axiosInstance.ts` (base `NEXT_PUBLIC_BASE_URL` + intercepteur Bearer).
- **Garde de routes** : `src/middleware.ts` (token requis hors `/auth/signin` ; `/` → `/dashboard`).
- **Gestion des cookies (token)** : `src/app/actions/` (`saveCookies`, `getTokenFromCookies`, `logout`, …) — Server Actions.
- **Providers globaux** : `src/app/layout.tsx` (React Query uniquement — **pas de Stripe**).
- **Garde de rôle ADMIN** : dans `src/components/auth/signin/SignInForm.tsx` (refus si `role !== ADMIN`).
- **Jobs / crons / notifications push** : **aucun** dans le dépôt (frontend pur).

## Garde-fous (RÈGLE PERMANENTE de ce dépôt)
- **Compréhension et documentation AVANT tout dev.** Produire de la doc réutilisable comme
  sous-produit naturel du travail.
- **Ne jamais inventer une architecture** non confirmée par le code. En cas de doute, lire le
  fichier concerné plutôt que supposer.
- **Modifications minimales et sûres** ; respecter les conventions ci-dessus.
- **Jamais de secrets/credentials réels** en clair ni en commit — variables d'env par **nom seul**.
- Marquer toute incertitude par **`⚠️ INCERTAIN : …`** plutôt que de combler par hypothèse.
- Les fichiers `.env*` sont gitignored **sauf `.env.example`** (template sans secret, versionné).
  Ne jamais committer `.env.local` ni mettre de vraie valeur dans `.env.example`.

## Variables d'environnement (noms uniquement)
- Setup local : `cp .env.example .env.local` puis renseigner la valeur.
- `NEXT_PUBLIC_BASE_URL` — base de l'API REST (auth, OTP, missions, membres, whitelist, stats).
  **Requise.**

## Zones d'incertitude connues à lever
- ⚠️ **URL backend du back-office** : non présente dans le dépôt ; à récupérer dans les variables
  d'env du projet sur la plateforme de déploiement (probablement le même backend que `my-hub`,
  **non confirmé**).
- ⚠️ **Déploiement / CI-CD** : aucune config dans le dépôt (`.github/`, `vercel.json`, Docker,
  YAML absents). Plateforme et environnements **non confirmés** — `.vercel` gitignored *suggère*
  Vercel sans le prouver.
- ⚠️ **Contrat d'API backend** : non présent ; seuls les types côté client existent (`src/types/`).
  Vérifier les payloads/réponses réels avant de modifier un appel.
- ⚠️ **Version de Node** non épinglée (`engines`/`.nvmrc` absents).
- ⚠️ **Aucun test** : pas de filet de sécurité automatisé — valider manuellement les changements.
