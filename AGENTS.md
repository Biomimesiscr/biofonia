<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Backend architecture (DDD)

Backend code follows a layered DDD architecture. **Read [`docs/architecture.md`](docs/architecture.md) before writing backend code**, then the guide for the layer you're touching:

| Layer | Folder | Guide |
| --- | --- | --- |
| Domain: entities, value objects, repository interfaces | `domain/` | [ddd-domain-layer](.github/instructions/ddd-domain-layer.instructions.md) |
| Application: services (use cases), DTOs, errors | `application/` | [ddd-application-layer](.github/instructions/ddd-application-layer.instructions.md) |
| Infrastructure: Prisma repositories, mappers, external services | `infrastructure/` | [ddd-infrastructure-layer](.github/instructions/ddd-infrastructure-layer.instructions.md) |
| Presentation: controllers, Zod validators, route handlers, DI | `presentation/`, `app/api/`, `di/` | [ddd-presentation-layer](.github/instructions/ddd-presentation-layer.instructions.md) |

Rules to follow:

- **Dependencies point inward**: presentation → application → domain; infrastructure → domain. `domain/` imports no framework (Next, Prisma, Zod, React). `pnpm lint` enforces this with `no-restricted-imports`.
- **Only `di/container.ts` instantiates concrete classes.** Route handlers use controllers from it; pages, Server Components and Server Actions use services from it. Nothing outside `infrastructure/` imports Prisma or `@/generated/prisma`.
- **Copy the reference slice** when adding a CRUD: `PostCategory` (`domain/postCategory`, `application/postCategory`, `infrastructure/postCategory`, `presentation/postCategory`, `app/api/post-categories`). Follow the "Adding a new CRUD" checklist in `docs/architecture.md`.
- **Errors**: throw `DataError` (422), `NotFoundError` (404) or `ConflictError` (409) subclasses; `handleRoute` turns them into JSON. Don't try/catch in controllers.
- **Verify** with `pnpm next typegen && pnpm exec tsc --noEmit && pnpm lint`.
