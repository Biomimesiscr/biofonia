---
name: Infrastructure Layer Generator
description: Rules and templates for the infrastructure layer with Prisma 7 (repositories, mappers, external services).
applyTo: "infrastructure/**"
---

# Infrastructure Layer Code Generator

You are an expert in **Clean Architecture** and **Prisma ORM 7**.

Generate the **infrastructure layer** for a given model following these conventions.
Overview of all layers: [`docs/architecture.md`](../../docs/architecture.md).
Canonical example: `infrastructure/postCategory/`.

---

## Folder Structure

```
infrastructure/
  prisma/client.ts                              # shared PrismaClient singleton (PrismaPg adapter)
  core/errors/DatabaseError.ts
  {model}/mappers/Prisma{Model}Mapper.ts
  {model}/repositories/Prisma{Model}Repository.ts
```

External connections (file storage, email, etc.) follow the same idea: the
**interface** lives in `domain/{context}/…` (e.g. `domain/file/storage/IFileStorage.ts`)
and the implementation lives in `infrastructure/{context}/…` (e.g.
`infrastructure/file/storage/S3FileStorage.ts`).

---

## Prisma specifics (this repo)

- Prisma 7 with a custom output: import types from **`@/generated/prisma/client`**,
  never from `@prisma/client`.
- Use the singleton `prisma` from `@/infrastructure/prisma/client`. Never `new PrismaClient()` elsewhere.
- After changing `prisma/schema.prisma` run `pnpm db:generate` (types) and
  `pnpm db:migrate` (or `db:push` for prototyping).
- The Prisma delegate is the camelCased model name: `PostCategory` → `prisma.postCategory`.

---

## Mapper Rules

```ts
import type { Prisma, {Model} as Prisma{Model} } from "@/generated/prisma/client";
import { {Model} } from "@/domain/{model}/entities/{Model}";

export class Prisma{Model}Mapper {
  static toDomain(row: Prisma{Model}): {Model} {
    return {Model}.restore({
      id: row.id,
      {attribute}: row.{attribute},
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toPersistence(entity: {Model}): Prisma.{Model}UncheckedCreateInput {
    return {
      ...(entity.id ? { id: entity.id } : {}),
      {attribute}: entity.{attribute},
      // foreign keys as scalar ids, e.g. authorId: entity.authorId
    };
  }
}
```

### ✅ Rules
- `static` methods only. `toDomain` always goes through `{Model}.restore(...)`.
- `toPersistence` returns a typed Prisma input — `{Model}CreateInput` when there are
  no foreign keys, `{Model}UncheckedCreateInput` when you set scalar FKs (`authorId`).
- Omit `id` when it is `null` (let Prisma generate the `cuid()`); never send
  `createdAt`/`updatedAt` — Prisma manages them.
- Many-to-many relations (`Post.files`) are mapped with `connect`/`set` in the
  repository, not in `toPersistence`.

---

## Repository Implementation Rules

```ts
import { {Model} } from "@/domain/{model}/entities/{Model}";
import { I{Model}Repository, {Model}Field } from "@/domain/{model}/repositories/I{Model}Repository";
import DatabaseError from "@/infrastructure/core/errors/DatabaseError";
import { prisma } from "@/infrastructure/prisma/client";
import { Prisma{Model}Mapper } from "../mappers/Prisma{Model}Mapper";

export class Prisma{Model}Repository implements I{Model}Repository {
  async all(): Promise<{Model}[]> {
    try {
      const rows = await prisma.{model}.findMany({ orderBy: { createdAt: "desc" } });
      return rows.map(Prisma{Model}Mapper.toDomain);
    } catch (error) {
      throw new DatabaseError("Could not fetch {Model} records", { cause: error });
    }
  }

  async findOne(value: string, field: {Model}Field = "id"): Promise<{Model} | null> {
    try {
      const row = await prisma.{model}.findFirst({ where: { [field]: value } });
      return row ? Prisma{Model}Mapper.toDomain(row) : null;
    } catch (error) {
      throw new DatabaseError("Could not find {Model}", { cause: error });
    }
  }

  async create(entity: {Model}): Promise<{Model}> {
    try {
      const row = await prisma.{model}.create({ data: Prisma{Model}Mapper.toPersistence(entity) });
      return Prisma{Model}Mapper.toDomain(row);
    } catch (error) {
      throw new DatabaseError("Could not create {Model}", { cause: error });
    }
  }

  async update(entity: {Model}): Promise<{Model}> {
    if (!entity.id) throw new DatabaseError("Cannot update a {Model} without an id");
    try {
      const row = await prisma.{model}.update({
        where: { id: entity.id },
        data: Prisma{Model}Mapper.toPersistence(entity),
      });
      return Prisma{Model}Mapper.toDomain(row);
    } catch (error) {
      throw new DatabaseError("Could not update {Model}", { cause: error });
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.{model}.delete({ where: { id } });
    } catch (error) {
      throw new DatabaseError("Could not delete {Model}", { cause: error });
    }
  }
}
```

### ✅ Rules
- Always `implements` the domain interface; named export `Prisma{Model}Repository`.
- Every Prisma call is inside `try/catch` and rethrows `DatabaseError` with the
  original error as `cause` (→ HTTP 500, logged). Don't leak Prisma errors upward.
- All row ↔ entity conversion goes through `Prisma{Model}Mapper`.
- Existence/uniqueness checks that should be 404/409 belong in the service, not
  here. If you rely on a DB unique constraint, catch Prisma `P2002` and throw the
  application's `ConflictError` subclass instead.
- No business rules here — only persistence.

---

## Input Format

```json
{
  "model": "PostReportReason",
  "attributes": [
    { "name": "id", "type": "string" },
    { "name": "reason", "type": "string" }
  ]
}
```

## Output Requirements

- Generate the mapper and the repository, each under a heading with its path.
- Remember to instantiate the repository in `di/container.ts`.
