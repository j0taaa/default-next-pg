# Agent Guidelines

These rules apply to the entire repository.

## Runtime context

- The app runs in a **VPS lab** with **containers** and **Traefik** as the reverse proxy.
- Base domain: **jaypussy.site** with wildcard DNS; apps use `appname.jaypussy.site`.
- Development uses **dev.jaypussy.site** and **port 3000** exposed through Traefik.
- Keep the Traefik labels and Docker networks accurate for this environment.

## Compose files (always keep in sync)

- **compose.yml** — local/testing with bound ports (`3000`, `5432`).
- **lab-compose.yml** — lab deployment, attached to the Traefik proxy network.
- If you change runtime configuration (ports, env vars, services), update **both** files.

## Architecture expectations (default stack)

Use the existing stack unless explicitly asked to change it:

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui + Radix UI**
- **Prisma ORM**
- **PostgreSQL**
- **Vitest** for tests
- **ESLint** for linting
- **Docker/Compose + Traefik** for deployment

## Testing & linting requirements

- Add or update **Vitest** tests for new features and bug fixes.
- After code changes, always run:
  - `npm run lint`
  - `npm run test`

## General expectations

- Prefer environment variables for runtime configuration.
- Keep changes consistent with the container-first deployment model.
- Document operational changes in relevant files when needed.
