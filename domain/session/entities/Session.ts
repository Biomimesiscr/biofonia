const DAY_MS = 24 * 60 * 60 * 1000;

export class Session {
  /** How long a session lives without activity. */
  static readonly LIFETIME_MS = 30 * DAY_MS;
  /** Active sessions are extended once less than this much time is left. */
  static readonly RENEW_THRESHOLD_MS = 15 * DAY_MS;

  private props: SessionProps;

  private constructor(props: SessionProps) {
    this.props = props;
  }

  /** `id` is the hash of the session token, never the token itself. */
  static create(props: { id: string; userId: string }): Session {
    const now = new Date();
    return new Session({
      ...props,
      expiresAt: new Date(now.getTime() + Session.LIFETIME_MS),
      createdAt: now,
    });
  }

  static restore(props: SessionProps): Session {
    return new Session({ ...props });
  }

  isExpired(now = new Date()): boolean {
    return now.getTime() >= this.props.expiresAt.getTime();
  }

  shouldRenew(now = new Date()): boolean {
    return this.props.expiresAt.getTime() - now.getTime() < Session.RENEW_THRESHOLD_MS;
  }

  renew(now = new Date()): void {
    this.props.expiresAt = new Date(now.getTime() + Session.LIFETIME_MS);
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

export interface SessionProps {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
}
