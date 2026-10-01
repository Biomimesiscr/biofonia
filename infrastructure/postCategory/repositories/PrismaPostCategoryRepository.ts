import { PostCategory } from "@/domain/postCategory/entities/PostCategory";
import {
  IPostCategoryRepository,
  PostCategoryField,
} from "@/domain/postCategory/repositories/IPostCategoryRepository";
import DatabaseError from "@/infrastructure/core/errors/DatabaseError";
import { prisma } from "@/infrastructure/prisma/client";
import { PrismaPostCategoryMapper } from "../mappers/PrismaPostCategoryMapper";

export class PrismaPostCategoryRepository implements IPostCategoryRepository {
  async all(): Promise<PostCategory[]> {
    try {
      const rows = await prisma.postCategory.findMany({
        orderBy: { name: "asc" },
      });
      return rows.map(PrismaPostCategoryMapper.toDomain);
    } catch (error) {
      throw new DatabaseError("Could not fetch PostCategory records", { cause: error });
    }
  }

  async findOne(
    value: string,
    field: PostCategoryField = "id",
  ): Promise<PostCategory | null> {
    try {
      const row = await prisma.postCategory.findFirst({
        where: { [field]: value },
      });
      return row ? PrismaPostCategoryMapper.toDomain(row) : null;
    } catch (error) {
      throw new DatabaseError("Could not find PostCategory", { cause: error });
    }
  }

  async create(entity: PostCategory): Promise<PostCategory> {
    try {
      const row = await prisma.postCategory.create({
        data: PrismaPostCategoryMapper.toPersistence(entity),
      });
      return PrismaPostCategoryMapper.toDomain(row);
    } catch (error) {
      throw new DatabaseError("Could not create PostCategory", { cause: error });
    }
  }

  async update(entity: PostCategory): Promise<PostCategory> {
    if (!entity.id) {
      throw new DatabaseError("Cannot update a PostCategory without an id");
    }

    try {
      const row = await prisma.postCategory.update({
        where: { id: entity.id },
        data: PrismaPostCategoryMapper.toPersistence(entity),
      });
      return PrismaPostCategoryMapper.toDomain(row);
    } catch (error) {
      throw new DatabaseError("Could not update PostCategory", { cause: error });
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.postCategory.delete({ where: { id } });
    } catch (error) {
      throw new DatabaseError("Could not delete PostCategory", { cause: error });
    }
  }
}
