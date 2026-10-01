import DomainError from "./DomainError";

/** The requested aggregate does not exist. */
export default class NotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
