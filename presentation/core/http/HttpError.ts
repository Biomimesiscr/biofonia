/** Error thrown by the presentation layer itself (bad JSON, missing params…). */
export default class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = "HttpError";
  }
}
