# Runtime Context

## Where this runs

- **Host**: a VPS lab environment with open ports.
- **Runtime**: everything runs inside containers.
- **Ingress / routing**: Traefik handles inbound HTTP/S routing for all services.

## Domains & routing

- Base domain: **jaypussy.site** (wildcard DNS is configured).
- Each app gets its own subdomain: `appname.jaypussy.site`.
- Development uses the shared subdomain: **dev.jaypussy.site**.
- The dev container listens on **port 3000** and is exposed through **Traefik**.

## Compose files

This repo should always include two compose files:

- **compose.yml** — for simple local/testing runs (binds `3000` and `5432`).
- **lab-compose.yml** — for VPS/lab deployment where the app container connects
  directly to the Traefik proxy network and is routed via labels.

These files document the expected container wiring and are part of the operational
context for the project.

## Deployment expectations

- Services are container-first and configured via environment variables.
- Traefik is the public entrypoint; containers talk over Docker networks.
- Database access is via PostgreSQL and exposed internally to the app.
