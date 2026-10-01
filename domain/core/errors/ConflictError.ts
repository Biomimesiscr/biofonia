import DomainError from "./DomainError";

/** The operation clashes with the current state (duplicate, still referenced…). */
export default class ConflictError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
