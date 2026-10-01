export interface GoogleIdentity {
  /** Google's stable account id (`sub`). */
  sub: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
}

export interface IGoogleIdentityProvider {
  /** URL of Google's consent screen for this state and PKCE verifier. */
  createAuthorizationUrl(state: string, codeVerifier: string): URL;
  /** Exchanges the callback `code` and returns who signed in. */
  exchangeCode(code: string, codeVerifier: string): Promise<GoogleIdentity>;
}
