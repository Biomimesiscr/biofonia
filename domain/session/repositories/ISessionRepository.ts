import { Session } from "@/domain/session/entities/Session";

export interface ISessionRepository {
  findById(id: string): Promise<Session | null>;
  create(session: Session): Promise<Session>;
  /** Persists a new `expiresAt`. */
  update(session: Session): Promise<Session>;
  /** No-op when the session does not exist. */
  delete(id: string): Promise<void>;
}
