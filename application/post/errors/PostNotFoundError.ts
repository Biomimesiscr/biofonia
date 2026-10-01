import NotFoundError from "@/domain/core/errors/NotFoundError";

export class PostNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Post "${id}" was not found`);
  }
}
