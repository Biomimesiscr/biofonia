import ConflictError from "@/domain/core/errors/ConflictError";

export class PostAlreadyReportedError extends ConflictError {
  constructor(postId: string) {
    super(`Post "${postId}" was already reported by this user`);
  }
}
