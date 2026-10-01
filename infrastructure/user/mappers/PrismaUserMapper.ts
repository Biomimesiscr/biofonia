import type { Prisma, User as PrismaUser } from "@/generated/prisma/client";
import { User } from "@/domain/user/entities/User";

export class PrismaUserMapper {
  static toDomain(row: PrismaUser): User {
    return User.restore({
      id: row.id,
      email: row.email,
      name: row.name,
      biography: row.biography,
      passwordHash: row.passwordHash,
      googleId: row.googleId,
      userType: row.userType,
      onboardedAt: row.onboardedAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toPersistence(entity: User): Prisma.UserCreateInput {
    return {
      ...(entity.id ? { id: entity.id } : {}),
      email: entity.email,
      name: entity.name,
      biography: entity.biography,
      passwordHash: entity.passwordHash,
      googleId: entity.googleId,
      userType: entity.userType,
      onboardedAt: entity.onboardedAt,
    };
  }
}
