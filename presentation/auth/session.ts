import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { IAuthService } from "@/application/auth/services/interfaces/IAuthService";
import { User } from "@/domain/user/entities/User";
import { SESSION_COOKIE, sessionCookieOptions } from "./sessionCookie";

/**
 * Cookie-backed session helpers for Server Components, Server Actions and
 * Route Handlers. Built once in `di/container.ts` with the auth service.
 * The database session is the source of truth; the cookie only carries its token.
 */
export function createSessionHelpers(authService: IAuthService) {
  /** The signed-in user, or null. Memoized per request. */
  const getCurrentUser = cache(async (): Promise<User | null> => {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!token) return null;
    return authService.getSessionUser(token);
  });

  /** The signed-in user; redirects to the login page otherwise. */
  async function requireUser(): Promise<User> {
    const user = await getCurrentUser();
    if (!user) redirect("/acceso");
    return user;
  }

  /** Only callable from Server Actions and Route Handlers. */
  async function setSessionCookie(token: string, expiresAt: Date): Promise<void> {
    (await cookies()).set(SESSION_COOKIE, token, { ...sessionCookieOptions, expires: expiresAt });
  }

  /** Ends the database session and removes the cookie. */
  async function endSession(): Promise<void> {
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;
    if (token) await authService.logout(token);
    store.delete(SESSION_COOKIE);
  }

  return { getCurrentUser, requireUser, setSessionCookie, endSession };
}

export type SessionHelpers = ReturnType<typeof createSessionHelpers>;
