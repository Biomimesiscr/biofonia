import DomainError from "./DomainError";

/** The caller could not be authenticated (bad credentials, no session…). */
export default class UnauthorizedError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
