import { Biography } from "../valueobjects/Biography.vo";
import { Email } from "../valueobjects/Email.vo";
import { UserName } from "../valueobjects/UserName.vo";
import { UserType } from "../valueobjects/UserType";

export class User {
  private props: UserProps;

  private constructor(props: UserProps) {
    this.props = props;
  }

  /** Builds a new user that has not been persisted yet (no id). */
  static create(props: NewUserProps): User {
    const now = new Date();
    return new User({
      id: null,
      email: Email.create(props.email),
      name: UserName.create(props.name),
      biography: null,
      passwordHash: props.passwordHash ?? null,
      googleId: props.googleId ?? null,
      userType: "IN_LABORATORY",
      onboardedAt: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  /** Rebuilds a persisted user (used by infrastructure mappers). */
  static restore(props: UserConstructorProps): User {
    return new User({
      ...props,
      email: Email.create(props.email),
      name: props.name ? UserName.create(props.name) : null,
      biography: props.biography ? Biography.create(props.biography) : null,
    });
  }

  linkGoogle(googleId: string): void {
    this.props.googleId = googleId;
    this.props.updatedAt = new Date();
  }

  completeOnboarding(input: { userType: UserType; biography: string }): void {
    this.props.userType = input.userType;
    this.props.biography = Biography.create(input.biography);
    this.props.onboardedAt = new Date();
    this.props.updatedAt = this.props.onboardedAt;
  }

  get id(): string | null {
    return this.props.id;
  }

  get email(): string {
    return this.props.email.value;
  }

  get name(): string | null {
    return this.props.name?.value ?? null;
  }

  get biography(): string | null {
    return this.props.biography?.value ?? null;
  }

  get passwordHash(): string | null {
    return this.props.passwordHash;
  }

  get hasPassword(): boolean {
    return this.props.passwordHash !== null;
  }

  get googleId(): string | null {
    return this.props.googleId;
  }

  get userType(): UserType {
    return this.props.userType;
  }

  get onboardedAt(): Date | null {
    return this.props.onboardedAt;
  }

  get isOnboarded(): boolean {
    return this.props.onboardedAt !== null;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export interface UserProps {
  id: string | null;
  email: Email;
  name: UserName | null;
  biography: Biography | null;
  passwordHash: string | null;
  googleId: string | null;
  userType: UserType;
  onboardedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserConstructorProps {
  id: string;
  email: string;
  name: string | null;
  biography: string | null;
  passwordHash: string | null;
  googleId: string | null;
  userType: UserType;
  onboardedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewUserProps {
  email: string;
  name: string;
  passwordHash?: string;
  googleId?: string;
}
