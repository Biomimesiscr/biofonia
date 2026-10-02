import { IPostLikeRepository } from "@/domain/postLike/repositories/IPostLikeRepository";
import DatabaseError from "@/infrastructure/core/errors/DatabaseError";
import { prisma } from "@/infrastructure/prisma/client";

export class PrismaPostLikeRepository implements IPostLikeRepository {
  async exists(postId: string, userId: string): Promise<boolean> {
    try {
      const row = await prisma.postLike.findFirst({ where: { postId, userId }, select: { id: true } });
      return row !== null;
    } catch (error) {
      throw new DatabaseError("Could not find PostLike", { cause: error });
    }
  }

  async create(postId: string, userId: string): Promise<void> {
    try {
      await prisma.postLike.create({ data: { postId, userId } });
    } catch (error) {
      throw new DatabaseError("Could not create PostLike", { cause: error });
    }
  }

  async delete(postId: string, userId: string): Promise<void> {
    try {
      // No unique (postId, userId) in the schema: remove any duplicates too.
      await prisma.postLike.deleteMany({ where: { postId, userId } });
    } catch (error) {
      throw new DatabaseError("Could not delete PostLike", { cause: error });
    }
  }
}
