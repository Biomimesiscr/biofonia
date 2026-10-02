import NotFoundError from "@/domain/core/errors/NotFoundError";

export class PostCommentNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`PostComment "${id}" was not found`);
  }
}
