import { User } from "@/domain/user/entities/User";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  /** `email` must already be normalized (see the Email value object). */
  findByEmail(email: string): Promise<User | null>;
  findByGoogleId(googleId: string): Promise<User | null>;
  /** Persists a new user and returns it with its generated id. */
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
}
