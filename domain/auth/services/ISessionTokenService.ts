export interface ISessionTokenService {
  /** A new random, URL-safe token for the session cookie. */
  generate(): string;
  /** Deterministic hash of a token; this is what gets stored as the session id. */
  hash(token: string): string;
}
