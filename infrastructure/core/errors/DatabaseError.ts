/** A persistence call failed. Wraps the original error as `cause` for logging. */
export default class DatabaseError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "DatabaseError";
  }
}
