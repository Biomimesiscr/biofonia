import { User } from "@/domain/user/entities/User";

/** A signed-in user plus the session token to put in the cookie. */
export interface AuthResult {
  user: User;
  token: string;
  expiresAt: Date;
}
