import { User } from "@/domain/user/entities/User";
import { AuthResult } from "../../dtos/AuthResult";
import { GoogleAuthorization } from "../../dtos/GoogleAuthorization";
import { LoginInput } from "../../dtos/LoginInput";
import { RegisterInput } from "../../dtos/RegisterInput";

export interface IAuthService {
  register(input: RegisterInput): Promise<AuthResult>;
  login(input: LoginInput): Promise<AuthResult>;
  /** Where to send the browser, plus the values to keep until the callback. */
  startGoogleLogin(): GoogleAuthorization;
  /** Finishes the Google callback: finds, links or creates the user. */
  loginWithGoogle(code: string, codeVerifier: string): Promise<AuthResult>;
  /** The user behind a session token, or null if it is unknown or expired. */
  getSessionUser(token: string): Promise<User | null>;
  logout(token: string): Promise<void>;
}
