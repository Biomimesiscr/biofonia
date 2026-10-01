import { IGoogleIdentityProvider } from "@/domain/auth/services/IGoogleIdentityProvider";
import { IPasswordHasher } from "@/domain/auth/services/IPasswordHasher";
import { ISessionTokenService } from "@/domain/auth/services/ISessionTokenService";
import { Session } from "@/domain/session/entities/Session";
import { ISessionRepository } from "@/domain/session/repositories/ISessionRepository";
import { User } from "@/domain/user/entities/User";
import { IUserRepository } from "@/domain/user/repositories/IUserRepository";
import { Email } from "@/domain/user/valueobjects/Email.vo";
import { Password } from "@/domain/user/valueobjects/Password.vo";
import { UserName } from "@/domain/user/valueobjects/UserName.vo";
import { AuthResult } from "../../dtos/AuthResult";
import { GoogleAuthorization } from "../../dtos/GoogleAuthorization";
import { LoginInput } from "../../dtos/LoginInput";
import { RegisterInput } from "../../dtos/RegisterInput";
import { EmailAlreadyRegisteredError } from "../../errors/EmailAlreadyRegisteredError";
import { GoogleEmailNotVerifiedError } from "../../errors/GoogleEmailNotVerifiedError";
import { InvalidCredentialsError } from "../../errors/InvalidCredentialsError";
import { IAuthService } from "../interfaces/IAuthService";

export class AuthService implements IAuthService {
  /** Hash verified when the email is unknown, so both paths take the same time. */
  private dummyHash: Promise<string> | null = null;

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ISessionTokenService,
    private readonly googleIdentityProvider: IGoogleIdentityProvider,
  ) {}

  async register(input: RegisterInput): Promise<AuthResult> {
    // Validate everything before paying for the hash.
    const email = Email.create(input.email);
    const password = Password.create(input.password);
    UserName.create(input.name);

    if (await this.userRepository.findByEmail(email.value)) {
      throw new EmailAlreadyRegisteredError();
    }

    const user = await this.userRepository.create(
      User.create({
        email: email.value,
        name: input.name,
        passwordHash: await this.passwordHasher.hash(password.value),
      }),
    );
    return this.startSession(user);
  }

  async login(input: LoginInput): Promise<AuthResult> {
    let email: Email;
    try {
      email = Email.create(input.email);
    } catch {
      throw new InvalidCredentialsError();
    }

    const user = await this.userRepository.findByEmail(email.value);
    const hash = user?.passwordHash ?? (await this.getDummyHash());
    const valid = await this.passwordHasher.verify(input.password, hash);

    if (!user || !user.hasPassword || !valid) {
      throw new InvalidCredentialsError();
    }
    return this.startSession(user);
  }

  startGoogleLogin(): GoogleAuthorization {
    const state = this.tokenService.generate();
    const codeVerifier = this.tokenService.generate();
    return {
      url: this.googleIdentityProvider.createAuthorizationUrl(state, codeVerifier),
      state,
      codeVerifier,
    };
  }

  async loginWithGoogle(code: string, codeVerifier: string): Promise<AuthResult> {
    const identity = await this.googleIdentityProvider.exchangeCode(code, codeVerifier);

    const linked = await this.userRepository.findByGoogleId(identity.sub);
    if (linked) return this.startSession(linked);

    // Only trust Google's email to match or create an account once Google verified it.
    if (!identity.emailVerified) throw new GoogleEmailNotVerifiedError();

    const email = Email.create(identity.email);
    const existing = await this.userRepository.findByEmail(email.value);
    if (existing) {
      existing.linkGoogle(identity.sub);
      return this.startSession(await this.userRepository.update(existing));
    }

    const user = await this.userRepository.create(
      User.create({
        email: email.value,
        name: displayNameFor(identity.name, email.value),
        googleId: identity.sub,
      }),
    );
    return this.startSession(user);
  }

  async getSessionUser(token: string): Promise<User | null> {
    const session = await this.sessionRepository.findById(this.tokenService.hash(token));
    if (!session) return null;

    if (session.isExpired()) {
      await this.sessionRepository.delete(session.id);
      return null;
    }

    // Sliding expiration: active users stay signed in.
    if (session.shouldRenew()) {
      session.renew();
      await this.sessionRepository.update(session);
    }
    return this.userRepository.findById(session.userId);
  }

  async logout(token: string): Promise<void> {
    await this.sessionRepository.delete(this.tokenService.hash(token));
  }

  private async startSession(user: User): Promise<AuthResult> {
    const token = this.tokenService.generate();
    const session = await this.sessionRepository.create(
      Session.create({ id: this.tokenService.hash(token), userId: user.id! }),
    );
    return { user, token, expiresAt: session.expiresAt };
  }

  private getDummyHash(): Promise<string> {
    this.dummyHash ??= this.passwordHasher.hash("biofonia-timing-placeholder");
    return this.dummyHash;
  }
}

/** Google's display name when it is a valid UserName, else the email's local part. */
function displayNameFor(googleName: string | null, email: string): string {
  const candidates = [googleName, email.split("@")[0], "Persona de Biofonía"];
  const name = candidates
    .map((candidate) => candidate?.trim().slice(0, UserName.MAX_LENGTH) ?? "")
    .find((candidate) => candidate.length >= UserName.MIN_LENGTH);
  return name!;
}
