import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_COOKIE_MAX_AGE,
  sessionCookieOptions,
} from "@/presentation/auth/sessionCookie";

/**
 * Keeps the session cookie alive while the person is active. Server
 * Components cannot set cookies, so the sliding refresh happens here; the
 * database session (checked on every request) remains the source of truth.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (token && request.method === "GET") {
    response.cookies.set(SESSION_COOKIE, token, {
      ...sessionCookieOptions,
      maxAge: SESSION_COOKIE_MAX_AGE,
    });
  }
  return response;
}

export const config = {
  // Pages only: skip API routes, Next internals and static files.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.[\\w]+$).*)"],
};
