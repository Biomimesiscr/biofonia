import { User } from "@/domain/user/entities/User";
import { IUserRepository } from "@/domain/user/repositories/IUserRepository";
import DatabaseError from "@/infrastructure/core/errors/DatabaseError";
import { prisma } from "@/infrastructure/prisma/client";
import { PrismaUserMapper } from "../mappers/PrismaUserMapper";

export class PrismaUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    try {
      const row = await prisma.user.findUnique({ where: { id } });
      return row ? PrismaUserMapper.toDomain(row) : null;
    } catch (error) {
      throw new DatabaseError("Could not find User", { cause: error });
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const row = await prisma.user.findUnique({ where: { email } });
      return row ? PrismaUserMapper.toDomain(row) : null;
    } catch (error) {
      throw new DatabaseError("Could not find User", { cause: error });
    }
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    try {
      const row = await prisma.user.findUnique({ where: { googleId } });
      return row ? PrismaUserMapper.toDomain(row) : null;
    } catch (error) {
      throw new DatabaseError("Could not find User", { cause: error });
    }
  }

  async create(entity: User): Promise<User> {
    try {
      const row = await prisma.user.create({
        data: PrismaUserMapper.toPersistence(entity),
      });
      return PrismaUserMapper.toDomain(row);
    } catch (error) {
      throw new DatabaseError("Could not create User", { cause: error });
    }
  }

  async update(entity: User): Promise<User> {
    if (!entity.id) {
      throw new DatabaseError("Cannot update a User without an id");
    }

    try {
      const row = await prisma.user.update({
        where: { id: entity.id },
        data: PrismaUserMapper.toPersistence(entity),
      });
      return PrismaUserMapper.toDomain(row);
    } catch (error) {
      throw new DatabaseError("Could not update User", { cause: error });
    }
  }
}
