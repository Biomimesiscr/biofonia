import ConflictError from "@/domain/core/errors/ConflictError";

export class PostCategoryAlreadyExistsError extends ConflictError {
  constructor(name: string) {
    super(`A PostCategory named "${name}" already exists`);
  }
}
