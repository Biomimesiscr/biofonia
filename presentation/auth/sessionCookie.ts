export const SESSION_COOKIE = "biofonia_session";

/** Browser-side lifetime (30 days); `proxy.ts` refreshes it while the user is active. */
export const SESSION_COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
} as const;
