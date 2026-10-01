import NotFoundError from "@/domain/core/errors/NotFoundError";

export class PostCategoryNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`PostCategory "${id}" was not found`);
  }
}
