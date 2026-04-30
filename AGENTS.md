<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Guidelines

## Code Style

- Use TypeScript with strict types (`strict: true`).
- Use path aliases (`@/*`) for imports from `src/*`.
- Keep App Router files in `src/app/**` and shared data in `src/data/**`.
- Follow existing ESLint flat config in `eslint.config.mjs` (do not introduce legacy `.eslintrc*`).

## Architecture

- Framework: Next.js App Router (`src/app`).
- Main routes:
	- `/` in `src/app/page.tsx`
	- `/parfums` in `src/app/parfums/page.tsx`
	- `/parfums/[slug]` in `src/app/parfums/[slug]/page.tsx`
	- `/nous-trouver` in `src/app/nous-trouver/page.tsx`
- Shared UI components live in `src/app/components/*`.
- Domain data and types are centralized in `src/data/perfumes.ts`.
- There is no backend/API layer in this repo; data is local TypeScript constants.

## Build and Test

- Install deps: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Production start: `npm run start`
- Lint: `npm run lint`

No test runner is configured yet. Do not assume Jest/Vitest exists.

## Conventions

- Most route files are client components (`"use client"`) and rely on browser APIs.
- Language is handled client-side via `localStorage` (`fr`/`en`), not URL-based i18n routing.
- Keep dynamic route details sourced from `src/data/perfumes.ts`.
- Keep styling consistent with the current Tailwind CSS setup (`tailwindcss` v4 + `@tailwindcss/postcss`).

## Pitfalls

- For map code in `src/app/nous-trouver/page.tsx`, keep `react-leaflet` imports dynamic with `ssr: false` to avoid SSR/hydration issues.
- Do not migrate Leaflet map rendering to a Server Component.
- Because Next.js is on v16.2.2, confirm new APIs against `node_modules/next/dist/docs/` before making framework-level changes.

## Key Files

- `package.json` for scripts and dependency versions
- `tsconfig.json` for strict typing and path aliases
- `eslint.config.mjs` for lint rules
- `src/data/perfumes.ts` for perfume domain types/data
