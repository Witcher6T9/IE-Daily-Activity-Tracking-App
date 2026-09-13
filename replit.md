# IE Daily Activity Tracking

An industrial engineering control-room app for garment manufacturing teams to track daily activity, line data, manpower, bottlenecks, and factory KPIs.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/ie-daily-activity-tracking/` — the runnable React/Vite app.
- `artifacts/ie-daily-activity-tracking/src/App.tsx` — application state, navigation, and local persistence.
- `artifacts/ie-daily-activity-tracking/src/components/` — dashboard, checklist, reports, settings, line data, and role-management screens.
- `artifacts/ie-daily-activity-tracking/src/data/initialData.ts` — sample factory data used for the first load.
- `artifacts/ie-daily-activity-tracking/src/index.css` — shared visual theme and responsive styling.
- `lib/api-spec/openapi.yaml` — shared API contract for the separate API service; this app currently uses local browser storage.

## Architecture decisions

- The imported app remains frontend-first and stores its operational state in browser `localStorage` for now.
- The app is registered at the root preview path so the dashboard opens directly.
- The shared API service remains separate until a server-backed sync requirement is defined.

## Product

The app provides a daily IE dashboard, checklist workflow, line data collection, monthly tracking, KPI reporting, role and tier controls, scheduled tasks, notifications, and local data management for garment manufacturing operations.

## User preferences

The user wants to open this imported app for ongoing additions and fixes.

## Gotchas

- Preview uses the managed artifact workflow and supplies `PORT` and `BASE_PATH` to Vite.
- Vite dependency optimization targets `esnext` because several chart and icon dependencies use syntax that fails under the default older optimize target.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
