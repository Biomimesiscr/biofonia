import { Session } from "@/domain/session/entities/Session";
import { ISessionRepository } from "@/domain/session/repositories/ISessionRepository";
import DatabaseError from "@/infrastructure/core/errors/DatabaseError";
import { prisma } from "@/infrastructure/prisma/client";
import { PrismaSessionMapper } from "../mappers/PrismaSessionMapper";

export class PrismaSessionRepository implements ISessionRepository {
  async findById(id: string): Promise<Session | null> {
    try {
      const row = await prisma.session.findUnique({ where: { id } });
      return row ? PrismaSessionMapper.toDomain(row) : null;
    } catch (error) {
      throw new DatabaseError("Could not find Session", { cause: error });
    }
  }

  async create(entity: Session): Promise<Session> {
    try {
      const row = await prisma.session.create({
        data: PrismaSessionMapper.toPersistence(entity),
      });
      return PrismaSessionMapper.toDomain(row);
    } catch (error) {
      throw new DatabaseError("Could not create Session", { cause: error });
    }
  }

  async update(entity: Session): Promise<Session> {
    try {
      const row = await prisma.session.update({
        where: { id: entity.id },
        data: { expiresAt: entity.expiresAt },
      });
      return PrismaSessionMapper.toDomain(row);
    } catch (error) {
      throw new DatabaseError("Could not update Session", { cause: error });
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.session.deleteMany({ where: { id } });
    } catch (error) {
      throw new DatabaseError("Could not delete Session", { cause: error });
    }
  }
}
