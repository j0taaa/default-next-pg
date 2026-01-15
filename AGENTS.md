# AGENTS.md - DEVELOPMENT RULES **(MUST READ)**

## Non-Negotiable Core Rules

### 1. Testing & Linting - **ALWAYS EXECUTE**
**You MUST run these commands on EVERY code change before considering work complete:**

```bash
# ALWAYS run these - NO EXCEPTIONS
npm run lint              # ESLint - must pass with zero errors
npm run test              # Vitest - all tests must pass (including new ones)
```

**IMPORTANT**: If the commands fail, **DO NOT** proceed with commit/PR. Fix all issues first. (Unless asked to do so)

### 2. Test Coverage Requirements - **MANDATORY FOR ALL FEATURES**

For **EVERY** new feature, bug fix, or modification:

#### Unit Tests
- **MUST** create/update unit tests for all new functions, components, and utilities
- Test file naming: `*.test.ts` or `*.test.tsx` alongside source files
- Coverage threshold: **100% coverage for new code paths**
- Use Vitest with React Testing Library for components

#### Integration Tests
- **MUST** create integration tests for:
  - API endpoints (Prisma operations)
  - Database schema changes
  - Complex user workflows
  - Cross-component data flow

#### Test-First Development (TDD)
1. **Write failing test** that describes expected behavior
2. **Implement** the feature
3. **Verify** test passes
4. **Refactor** if needed, ensure tests still pass

**Example test structure:**
```typescript
// Good: Comprehensive test
describe('UserRegistration', () => {
  it('should validate email format', () => {
    // Test implementation
  });
  
  it('should hash password before saving', () => {
    // Test implementation
  });
});

// Bad: No tests or incomplete tests
```

### 3. Compose Files - **PERFECT SYNC REQUIRED**

**FAILURE TO SYNC = BROKEN DEPLOYMENT**

When changing ANY runtime configuration (ports, env vars, services, volumes, networks):
- **MUST** edit **BOTH** `compose.yml` AND `lab-compose.yml` simultaneously
- Verify changes are identical in functionality
- Only `lab-compose.yml` includes Traefik labels and proxy network
- `compose.yml` is for a normal setup and `lab-compose.yml` is for the environment setup when running on a VPS lab, which includes Traefik labels and specific configurations. 

**Checklist for compose changes:**
- [ ] `compose.yml` updated
- [ ] `lab-compose.yml` updated
- [ ] Traefik labels verified in lab version
- [ ] Port mappings match (dev: 3000, 5432)
- [ ] Environment variables synced
- [ ] Service dependencies aligned

## Environment-Specific Context

### VPS Lab Runtime (Production)
- **Domain**: `*.jaypussy.site` (wildcard DNS)
- **Proxy**: Traefik (DO NOT bypass)
- **Network**: All containers **MUST** attach to Traefik proxy network
- **Base**: `jaypussy.site`
- **Apps**: `appname.jaypussy.site`
- **Dev**: `dev.jaypussy.site` (port 3000)

### Compose File Differences

**compose.yml** (Local/Testing):
- Direct port binding: 3000, 5432
- No Traefik labels
- For local development only

**lab-compose.yml** (Production):
- **REQUIRED**: Traefik labels for routing
- **REQUIRED**: Attached to external proxy network

## Architecture Stack - **DO NOT DEVIATE**

**Use this stack unless explicitly directed otherwise:**

- **Framework**: Next.js 14+ (App Router only - NO pages directory)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS + shadcn/ui + Radix UI
- **Database**: PostgreSQL via Prisma ORM
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint (strict config)
- **Deployment**: Docker Compose + Traefik reverse proxy

**Version pinning**:
- Specify exact versions in package.json
- Do not use `^` or `~` for core dependencies

## Code Quality & Workflow

### Before You Commit - **MANDATORY CHECKLIST**

```bash
# 1. Linting
npm run lint
# MUST result in: ✔ No ESLint errors or warnings

# 2. Type checking
npm run type-check  # or npm run tsc --noEmit

# 3. Tests
npm run test
# MUST result in: ✔ All tests passed

# 4. Build verification (for major changes)
npm run build
# MUST complete successfully
```

**If any step fails, DO NOT COMMIT. Fix issues first. (unless asked to do so)**


## Project Structure Guidance

```
/nextjs-app
  ├── app/                      # App Router pages
  │   ├── components/          # Reusable UI components
  │   ├── lib/                 # Utilities, helpers
  │   └── api/                 # API routes
  ├── prisma/                   # Database schema
  ├── tests/                    # Integration tests
  ├── compose.yml              # Local compose (MUST SYNC)
  ├── lab-compose.yml          # Lab compose (MUST SYNC)
  └── AGENTS.md               # This file
```

### Key Files to Reference
- `prisma/schema.prisma` - Database schema
- `app/lib/prisma.ts` - Prisma client setup
- `app/components/ui/` - shadcn/ui components (DO NOT modify directly)
- `tailwind.config.ts` - Tailwind configuration

## Common Pitfalls - **AVOID AT ALL COSTS**

❌ **NEVER** commit `.env` files (use `.env.example` instead)
❌ **NEVER** bypass TypeScript with `any` (use proper types)
❌ **NEVER** expose PostgreSQL port directly in lab-compose.yml

## When Stuck or Unsure

1. **Propose a plan** in comments first
2. **Ask clarifying questions** before writing code
3. For major refactors (>5 files), **get confirmation**
4. Reference existing patterns - "follow the pattern in [specific-file].tsx"

---

## When issue is solved

- When an issue is resolved after trying multiple fixes, retain only the change(s) that solved the problem. This rule aims to reduce code bloat and unnecessary modifications.

## Context

- For informations about the context where this code runs, check CONTEXT.md


**REMEMBER**: These rules exist to prevent deployment failures, maintain code quality, and ensure consistency. When in doubt, ask rather than assume. Always apply the rules from this file unless you are asked to do something different (in this case, follow what you are asked to do)
