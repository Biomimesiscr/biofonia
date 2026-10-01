import DomainError from "./DomainError";

/** Input broke a domain invariant (empty value, too long, bad format…). */
export default class DataError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
