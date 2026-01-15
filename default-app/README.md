# Next.js + PostgreSQL + BetterAuth Template

A production-ready template with Next.js, PostgreSQL database, and BetterAuth authentication, all running in Docker containers.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Database**: PostgreSQL 16
- **ORM**: Prisma 5
- **Authentication**: BetterAuth
- **Styling**: Tailwind CSS + shadcn/ui
- **Containerization**: Docker & Docker Compose

## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm

### Setup

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Update the `BETTER_AUTH_SECRET` with a secure random string (minimum 32 characters).

3. **Start the database**:
   ```bash
   npm run docker:up
   ```
   This starts only the PostgreSQL container.

4. **Push the database schema**:
   ```bash
   npm run db:push
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:generate` | Generate Prisma client |
| `npm run docker:up` | Start Docker containers |
| `npm run docker:down` | Stop Docker containers |
| `npm run docker:build` | Build Docker images |

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...all]/    # BetterAuth API routes
│   │   └── todos/            # Todo CRUD API
│   ├── auth/
│   │   ├── sign-in/          # Sign in page
│   │   └── sign-up/          # Sign up page
│   └── dashboard/            # Protected dashboard
├── components/
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── auth.ts               # BetterAuth server config
│   ├── auth-client.ts        # BetterAuth client config
│   ├── db.ts                 # Prisma client
│   └── utils.ts              # Utility functions
├── prisma/
│   └── schema.prisma         # Database schema
├── docker-compose.yml        # Docker services
├── Dockerfile                # App container config
└── .env.example              # Environment template
```

## Docker Deployment

To run the entire application in Docker:

```bash
# Build and start all containers
docker compose up --build

# Or run in detached mode
docker compose up -d --build
```

The app will be available at `http://localhost:3000`.

## Database Schema

The template includes the following models:

- **User**: User accounts
- **Session**: User sessions (managed by BetterAuth)
- **Account**: OAuth provider accounts (managed by BetterAuth)
- **Verification**: Email verification tokens (managed by BetterAuth)
- **Todo**: Example todo items

## Customization

### Adding New Models

1. Edit `prisma/schema.prisma`
2. Run `npm run db:push` to update the database
3. Run `npm run db:generate` to update the Prisma client

### Adding New shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [BetterAuth Documentation](https://www.better-auth.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
