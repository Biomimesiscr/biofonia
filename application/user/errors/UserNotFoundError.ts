import NotFoundError from "@/domain/core/errors/NotFoundError";

export class UserNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`User "${id}" not found`);
  }
}
