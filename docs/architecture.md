# Backend architecture (DDD)

Biofonía's backend follows **Domain-Driven Design / Clean Architecture** inside a
single Next.js 16 app. The UI (`app/**/page.tsx`, `components/`) and the API
(`app/api/**/route.ts`) both reach business logic through the same layers.

The canonical, working example of every rule below is the **PostCategory** CRUD.
Copy it when adding a new model.

## Layers

| Layer | Folder | Owns | May import |
| --- | --- | --- | --- |
| Domain | `domain/` | Entities, value objects, repository **interfaces**, base errors | nothing outside `domain/` (no Next, Prisma, Zod, React) |
| Application | `application/` | Services (use cases), input DTOs, application errors | `domain/` |
| Infrastructure | `infrastructure/` | Prisma client, repository **implementations**, mappers, external services | `domain/`, `@/generated/prisma` |
| Presentation | `presentation/` + `app/api/**/route.ts` | Controllers, Zod validators, response mappers/types, HTTP helpers | `application/`, `domain/` |
| Composition root | `di/container.ts` | Instantiates repositories → services → controllers | everything |

```
 app/api/**/route.ts ──► presentation (controller) ──► application (service) ──► domain (entity, I…Repository)
                                                                                         ▲
 di/container.ts ── wires ──► infrastructure (Prisma…Repository implements I…Repository) ┘
```

**Dependency rule:** arrows only point inward (toward `domain/`). It is enforced by
`no-restricted-imports` in `eslint.config.mjs` — `pnpm lint` fails on a violation.

- Pages, Server Components and Server Actions call **services** from
  `@/di/container`. They never import Prisma, `@/infrastructure/**` or repositories.
- Only `di/container.ts` knows concrete classes. It imports `server-only`, so it can
  never end up in a client bundle.

## Request flow

1. `app/api/post-categories/[id]/route.ts` — exports `GET/PATCH/DELETE`, each wrapped
   in `handleRoute(...)`, delegating to the controller from `@/di/container`.
2. `presentation/postCategory/controllers/postCategory.controller.ts` — awaits
   `params`, validates the body with Zod (`parseBody`), calls the service, maps the
   entity to a response DTO.
3. `application/postCategory/services/implementations/PostCategoryService.ts` —
   orchestrates the use case: loads entities, calls entity methods, checks
   cross-entity rules (e.g. unique name), throws application errors.
4. `domain/postCategory/entities/PostCategory.ts` — enforces invariants via value
   objects (`PostCategoryName.vo.ts`).
5. `infrastructure/postCategory/repositories/PrismaPostCategoryRepository.ts` —
   persists through Prisma and maps rows with `PrismaPostCategoryMapper`.

## Errors → HTTP

`presentation/core/http/handleRoute.ts` turns every thrown error into
`{ "error": { "message", "details?" } }`:

| Thrown | Defined in | Status |
| --- | --- | --- |
| `HttpError(status, …)` | `presentation/core/http/HttpError.ts` | its `status` (e.g. 400 bad JSON) |
| `ZodError` (request shape) | zod | 400, `details` = `z.flattenError` |
| `DataError` (invariant broken) | `domain/core/errors/DataError.ts` | 422 |
| `NotFoundError` and subclasses | `domain/core/errors/NotFoundError.ts` | 404 |
| `ConflictError` and subclasses | `domain/core/errors/ConflictError.ts` | 409 |
| anything else (incl. `DatabaseError`) | — | 500, logged |

Model-specific errors **extend** these bases (e.g. `PostCategoryNotFoundError
extends NotFoundError`) so the mapping needs no changes per model.

## Validation: where does each rule go?

- **Zod (presentation)** checks the request *shape*: types, required fields.
- **Value objects (domain)** check business invariants: trimming, length, format.
- **Services (application)** check rules that need other data: uniqueness,
  ownership, existence.

## Naming conventions

- Model folders are **camelCase** (`postCategory`), class files **PascalCase**
  (`PostCategory.ts`), presentation files **dot-suffixed** (`postCategory.controller.ts`).
- Interfaces are prefixed with `I` (`IPostCategoryRepository`, `IPostCategoryService`).
- API URLs are **kebab-case plural** (`/api/post-categories`, `/api/post-categories/[id]`).
- Prisma types come from `@/generated/prisma/client` (Prisma 7 custom output), not `@prisma/client`.

## Adding a new CRUD — checklist

Using `{Model}` = `PostReportReason`, `{model}` = `postReportReason` as an example:

1. **Schema** — the model exists in `prisma/schema.prisma`; run `pnpm db:generate`
   (and `pnpm db:migrate` / `db:push` if the schema changed).
2. **Domain** — `domain/{model}/entities/{Model}.ts`, value objects for attributes
   with rules, `repositories/I{Model}Repository.ts`.
   → [ddd-domain-layer](../.github/instructions/ddd-domain-layer.instructions.md)
3. **Infrastructure** — `infrastructure/{model}/mappers/Prisma{Model}Mapper.ts`,
   `repositories/Prisma{Model}Repository.ts`.
   → [ddd-infrastructure-layer](../.github/instructions/ddd-infrastructure-layer.instructions.md)
4. **Application** — `application/{model}/dtos/`, `errors/`,
   `services/interfaces/I{Model}Service.ts`, `services/implementations/{Model}Service.ts`.
   → [ddd-application-layer](../.github/instructions/ddd-application-layer.instructions.md)
5. **Wire** — add repository, service and controller to `di/container.ts`.
6. **Presentation** — `presentation/{model}/validators/`, `responses/`, `mappers/`,
   `controllers/`; then `app/api/{kebab-plural}/route.ts` and `[id]/route.ts`.
   → [ddd-presentation-layer](../.github/instructions/ddd-presentation-layer.instructions.md)
7. **Verify** — `pnpm next typegen && pnpm exec tsc --noEmit && pnpm lint`, then
   curl each endpoint (happy path, 400, 422, 404).

## Authentication

Email/password and Google sign-in with **database sessions** (no auth library).

- **Domain**: `User` and `Session` entities; value objects `Email`, `UserName`,
  `Password`, `Biography`. Ports in `domain/auth/services/`: `IPasswordHasher`,
  `ISessionTokenService`, `IGoogleIdentityProvider` (they live in domain because
  infrastructure may not import `application/`).
- **Application**: `AuthService` (register, login, Google login, session lookup,
  logout) and `UserService.completeOnboarding`. Login failures always throw the
  same `InvalidCredentialsError` (401 via `UnauthorizedError`).
- **Infrastructure**: `ScryptPasswordHasher` (Node scrypt, `scrypt$N$r$p$salt$key`),
  `CryptoSessionTokenService` (random token; sha256 stored as `Session.id`),
  `GoogleOAuthIdentityProvider` (authorization code + PKCE via `fetch`, identity from
  the OpenID userinfo endpoint).
- **Presentation**: `presentation/auth/session.ts` builds `session.getCurrentUser()`,
  `session.requireUser()`, `setSessionCookie`, `endSession` (wired in `di/container.ts`).
  Cookie `biofonia_session`: httpOnly, `SameSite=Lax`, `Secure` in production.
  `proxy.ts` refreshes the cookie on page GETs; the DB session (30 days, sliding) is
  the source of truth.
- **Flows**: Server Actions in `app/actions/auth.ts` (`login`, `register`, `logout`)
  and `app/actions/onboarding.ts`; Google via `POST /api/auth/google` →
  `GET /api/auth/google/callback`. Pages: `/acceso`, `/bienvenida` (onboarding).
- Pages/actions needing a user call `session.requireUser()` and pass `user.id` to
  services explicitly.
- **Env**: `APP_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (see `.example.env`).
  Google redirect URI: `${APP_URL}/api/auth/google/callback`.

## Not decided yet

- **Transactions** spanning several repositories: add a unit-of-work interface in
  `domain/core/` and a Prisma `$transaction` implementation in `infrastructure/`
  when the first use case needs it.
