/**
 * Base class for every error raised by the domain or application layers.
 * The presentation layer maps each subclass to an HTTP status.
 */
export default abstract class DomainError extends Error {
  protected constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}
