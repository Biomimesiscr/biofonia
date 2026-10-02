import { cookies } from "next/headers";
import { IAuthService } from "@/application/auth/services/interfaces/IAuthService";
import { SessionHelpers } from "../session";

const STATE_COOKIE = "google_oauth_state";
const VERIFIER_COOKIE = "google_oauth_verifier";

const flowCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/api/auth/google",
  maxAge: 10 * 60,
} as const;

/**
 * Browser redirect (not JSON): this flow is navigated to, never fetched.
 * Relative Location on purpose: behind a proxy `request.url` carries the
 * server's bind address (e.g. 0.0.0.0), not the public origin.
 */
function redirectTo(path: string): Response {
  return new Response(null, {
    status: 303,
    headers: { Location: path },
  });
}

export default class GoogleAuthController {
  constructor(
    private readonly authService: IAuthService,
    private readonly session: SessionHelpers,
  ) {}

  /** POST /api/auth/google — sends the browser to Google's consent screen. */
  async start(request: Request): Promise<Response> {
    let authorization;
    try {
      authorization = this.authService.startGoogleLogin();
    } catch (error) {
      console.error(error);
      return redirectTo("/acceso?error=google");
    }

    const store = await cookies();
    store.set(STATE_COOKIE, authorization.state, flowCookieOptions);
    store.set(VERIFIER_COOKIE, authorization.codeVerifier, flowCookieOptions);
    return new Response(null, {
      status: 303,
      headers: { Location: authorization.url.toString() },
    });
  }

  /**
   * GET /api/auth/google/callback — Google redirects back here. Unlike JSON
   * controllers this one catches errors: a failed sign-in must land the
   * person back on the login page, not on an error body.
   */
  async callback(request: Request): Promise<Response> {
    const params = new URL(request.url).searchParams;
    const store = await cookies();
    const expectedState = store.get(STATE_COOKIE)?.value;
    const codeVerifier = store.get(VERIFIER_COOKIE)?.value;
    store.delete({ name: STATE_COOKIE, path: flowCookieOptions.path });
    store.delete({ name: VERIFIER_COOKIE, path: flowCookieOptions.path });

    const code = params.get("code");
    const state = params.get("state");
    if (!code || !state || !expectedState || !codeVerifier || state !== expectedState) {
      return redirectTo("/acceso?error=google");
    }

    try {
      const { user, token, expiresAt } = await this.authService.loginWithGoogle(code, codeVerifier);
      await this.session.setSessionCookie(token, expiresAt);
      return redirectTo(user.isOnboarded ? "/" : "/bienvenida");
    } catch (error) {
      console.error(error);
      return redirectTo("/acceso?error=google");
    }
  }
}
