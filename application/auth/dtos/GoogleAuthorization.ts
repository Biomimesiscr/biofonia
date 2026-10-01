export interface GoogleAuthorization {
  url: URL;
  /** Must come back unchanged on the callback (CSRF protection). */
  state: string;
  /** PKCE secret, sent only with the code exchange. */
  codeVerifier: string;
}
