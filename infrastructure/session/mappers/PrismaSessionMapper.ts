import type { Prisma, Session as PrismaSession } from "@/generated/prisma/client";
import { Session } from "@/domain/session/entities/Session";

export class PrismaSessionMapper {
  static toDomain(row: PrismaSession): Session {
    return Session.restore({
      id: row.id,
      userId: row.userId,
      expiresAt: row.expiresAt,
      createdAt: row.createdAt,
    });
  }

  static toPersistence(entity: Session): Prisma.SessionUncheckedCreateInput {
    return {
      id: entity.id,
      userId: entity.userId,
      expiresAt: entity.expiresAt,
      createdAt: entity.createdAt,
    };
  }
}
