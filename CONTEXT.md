### Context

This repository is a **starter/template project** intended to be **forked** whenever I want to create a new service to run in my homelab. Each fork becomes an independent, containerized app that plugs into my existing infrastructure.

### Where it runs

- **Host**: an **Ubuntu VM** running in the **cloud**
- **Runtime**: everything runs in **containers** (Docker/Compose)
- **Ingress / routing**: **Traefik** is the reverse proxy in front of all services

### How services communicate (Traefik + containers)

All projects spawned from this template are expected to:

- Run as one (or more) containers on the same Docker network as **Traefik**
- Expose HTTP internally (container-to-container)
- Be routed externally through **Traefik** via labels (host rules, TLS, middlewares, etc.)
- Avoid hard-coded ports and direct host exposure unless explicitly needed (Traefik should be the public entrypoint)

In short: **Traefik handles inbound traffic and service discovery; containers talk over Docker networking**.

### What the initial template contains

The initial template is a minimal, production-shaped app stack:

- **Next.js**: a default Next.js application (web UI + server routes)
- **PostgreSQL**: database container for persistence
- **Prisma**: ORM + migrations, with the Next.js app connecting to Postgres through `DATABASE_URL`

### What forks are used for

Forked projects created from this template are **not general-purpose apps**. They exist specifically to:

- **Generate images** that will be consumed/used back in the homelab ecosystem (e.g., assets for other services/sites)

So the expected lifecycle is: **deploy fork → generate/export images → those images get referenced elsewhere**.

### Operational expectations / conventions

- **Container-first**: assume the service runs via Compose and is deployable without manual host configuration beyond secrets and Traefik routing.
- **Config via env vars**: runtime configuration should be done through environment variables (especially database connection strings and app settings).
- **DB schema via Prisma**: schema changes should be tracked through Prisma migrations.
- **Ingress via Traefik**: if it needs to be reachable, it should be reachable through Traefik (host-based routing, TLS termination).

### Notes

This file documents the **intended deployment context** so that future forks stay consistent with the homelab setup: **cloud Ubuntu VM + containerized services + Traefik as the communication/routing layer**, starting from a **Next.js + Postgres + Prisma** baseline and focused on **image generation workloads**.
