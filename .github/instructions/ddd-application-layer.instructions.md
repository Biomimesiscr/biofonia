---
name: Application Layer Generator
description: Rules and templates for the application layer (services / use cases, DTOs, application errors).
applyTo: "application/**"
---

# Application Layer Code Generator

You are an expert in **Clean Architecture** and **Domain-Driven Design (DDD)**.

Generate the **application layer** for a given model following these conventions.
Overview of all layers: [`docs/architecture.md`](../../docs/architecture.md).
Canonical example: `application/postCategory/`.

---

## Folder Structure

```
application/{model}/
  dtos/Create{Model}Input.ts
  dtos/Update{Model}Input.ts
  errors/{Model}NotFoundError.ts
  errors/{Model}AlreadyExistsError.ts          # only if the model has a uniqueness rule
  services/interfaces/I{Model}Service.ts
  services/implementations/{Model}Service.ts
```

---

## DTO Rules

Plain TypeScript interfaces with primitives. They describe what a use case needs,
independent of HTTP or Zod (the presentation layer's Zod types must be assignable to them).

```ts
export interface Create{Model}Input {
  {attribute}: {dataType};
}

export interface Update{Model}Input {
  {attribute}?: {dataType};
}
```

---

## Service Interface Rules

```ts
import { {Model} } from "@/domain/{model}/entities/{Model}";
import { Create{Model}Input } from "../../dtos/Create{Model}Input";
import { Update{Model}Input } from "../../dtos/Update{Model}Input";

export interface I{Model}Service {
  list(): Promise<{Model}[]>;
  get(id: string): Promise<{Model}>;
  create(input: Create{Model}Input): Promise<{Model}>;
  update(id: string, input: Update{Model}Input): Promise<{Model}>;
  delete(id: string): Promise<void>;
}
```

---

## Service Implementation Rules

```ts
import { {Model} } from "@/domain/{model}/entities/{Model}";
import { I{Model}Repository } from "@/domain/{model}/repositories/I{Model}Repository";
import { Create{Model}Input } from "../../dtos/Create{Model}Input";
import { Update{Model}Input } from "../../dtos/Update{Model}Input";
import { {Model}NotFoundError } from "../../errors/{Model}NotFoundError";
import { I{Model}Service } from "../interfaces/I{Model}Service";

export class {Model}Service implements I{Model}Service {
  constructor(
    private readonly {model}Repository: I{Model}Repository,
  ) {}

  async list(): Promise<{Model}[]> {
    return this.{model}Repository.all();
  }

  async get(id: string): Promise<{Model}> {
    const {model} = await this.{model}Repository.findOne(id, "id");
    if (!{model}) throw new {Model}NotFoundError(id);
    return {model};
  }

  async create(input: Create{Model}Input): Promise<{Model}> {
    const {model} = {Model}.create(input);
    return this.{model}Repository.create({model});
  }

  async update(id: string, input: Update{Model}Input): Promise<{Model}> {
    const {model} = await this.get(id);
    if (input.{attribute} !== undefined) {model}.change{Attribute}(input.{attribute});
    return this.{model}Repository.update({model});
  }

  async delete(id: string): Promise<void> {
    await this.get(id);
    await this.{model}Repository.delete(id);
  }
}
```

### ✅ Rules
- Depend on **interfaces** from the domain (`I{Model}Repository`), injected through
  the constructor. Never import `@/infrastructure/**`, `@/generated/**`, Prisma or Next.
- Services receive **DTOs**, build/modify **entities** through their methods, and
  always return **domain entities** (never response objects or Prisma rows).
- `get` throws `{Model}NotFoundError`; `update`/`delete` reuse `get` so missing ids
  are a 404, not a database error.
- Rules that need other data (uniqueness, ownership, "category must exist") live
  here. Single-field invariants live in domain value objects.
- A use case that touches several aggregates may inject several repositories or
  other services' interfaces.
- The current user (once auth exists) is passed as an explicit argument
  (`create(input, actorId)`), never read from cookies/headers here.

---

## Application Error Rules

Extend the domain base errors so `handleRoute` maps them without changes.

```ts
import NotFoundError from "@/domain/core/errors/NotFoundError";

export class {Model}NotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`{Model} "${id}" was not found`);
  }
}
```

```ts
import ConflictError from "@/domain/core/errors/ConflictError";

export class {Model}AlreadyExistsError extends ConflictError {
  constructor(value: string) {
    super(`A {Model} with "${value}" already exists`);
  }
}
```

| Base | HTTP |
| --- | --- |
| `DataError` | 422 |
| `NotFoundError` | 404 |
| `ConflictError` | 409 |

---

## Input Format

```json
{ "model": "PostReportReason" }
```

## Output Requirements

- Generate ALL files (DTOs, errors, interface, implementation), each under a heading with its path.
- Remember to register the service in `di/container.ts` (see the presentation guide).
