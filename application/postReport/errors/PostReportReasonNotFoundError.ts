import NotFoundError from "@/domain/core/errors/NotFoundError";

export class PostReportReasonNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`PostReportReason "${id}" was not found`);
  }
}
