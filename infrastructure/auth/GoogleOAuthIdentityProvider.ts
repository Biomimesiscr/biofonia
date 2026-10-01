import { createHash } from "node:crypto";
import {
  GoogleIdentity,
  IGoogleIdentityProvider,
} from "@/domain/auth/services/IGoogleIdentityProvider";

const AUTHORIZATION_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const USERINFO_ENDPOINT = "https://openidconnect.googleapis.com/v1/userinfo";

interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

/**
 * Google sign-in via the OAuth 2.0 authorization-code flow with PKCE.
 * The identity is read from the OpenID userinfo endpoint using the access
 * token just obtained server-to-server over TLS, so no ID-token signature
 * verification is needed.
 */
export class GoogleOAuthIdentityProvider implements IGoogleIdentityProvider {
  constructor(private readonly config: () => GoogleOAuthConfig) {}

  createAuthorizationUrl(state: string, codeVerifier: string): URL {
    const { clientId, redirectUri } = this.config();
    const url = new URL(AUTHORIZATION_ENDPOINT);
    url.search = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "openid email profile",
      state,
      code_challenge: createHash("sha256").update(codeVerifier).digest("base64url"),
      code_challenge_method: "S256",
      prompt: "select_account",
    }).toString();
    return url;
  }

  async exchangeCode(code: string, codeVerifier: string): Promise<GoogleIdentity> {
    const { clientId, clientSecret, redirectUri } = this.config();

    const tokenResponse = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        code_verifier: codeVerifier,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    });
    if (!tokenResponse.ok) {
      throw new Error(`Google token exchange failed (${tokenResponse.status})`);
    }
    const { access_token: accessToken } = (await tokenResponse.json()) as { access_token?: string };
    if (!accessToken) throw new Error("Google token response had no access_token");

    const userinfoResponse = await fetch(USERINFO_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!userinfoResponse.ok) {
      throw new Error(`Google userinfo request failed (${userinfoResponse.status})`);
    }
    const info = (await userinfoResponse.json()) as {
      sub?: string;
      email?: string;
      email_verified?: boolean;
      name?: string;
    };
    if (!info.sub || !info.email) throw new Error("Google userinfo had no sub/email");

    return {
      sub: info.sub,
      email: info.email,
      emailVerified: info.email_verified === true,
      name: info.name ?? null,
    };
  }
}

/** Reads Google settings from the environment, failing loudly when missing. */
export function googleOAuthConfigFromEnv(): GoogleOAuthConfig {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const appUrl = process.env.APP_URL;
  if (!clientId || !clientSecret || !appUrl) {
    throw new Error("GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and APP_URL must be set");
  }
  return {
    clientId,
    clientSecret,
    redirectUri: new URL("/api/auth/google/callback", appUrl).toString(),
  };
}
