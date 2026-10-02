import { IPostCommentLikeRepository } from "@/domain/postCommentLike/repositories/IPostCommentLikeRepository";
import DatabaseError from "@/infrastructure/core/errors/DatabaseError";
import { prisma } from "@/infrastructure/prisma/client";

export class PrismaPostCommentLikeRepository implements IPostCommentLikeRepository {
  async exists(postCommentId: string, userId: string): Promise<boolean> {
    try {
      const row = await prisma.postCommentLike.findFirst({
        where: { postCommentId, userId },
        select: { id: true },
      });
      return row !== null;
    } catch (error) {
      throw new DatabaseError("Could not find PostCommentLike", { cause: error });
    }
  }

  async create(postCommentId: string, userId: string): Promise<void> {
    try {
      await prisma.postCommentLike.create({ data: { postCommentId, userId } });
    } catch (error) {
      throw new DatabaseError("Could not create PostCommentLike", { cause: error });
    }
  }

  async delete(postCommentId: string, userId: string): Promise<void> {
    try {
      // No unique (postCommentId, userId) in the schema: remove any duplicates too.
      await prisma.postCommentLike.deleteMany({ where: { postCommentId, userId } });
    } catch (error) {
      throw new DatabaseError("Could not delete PostCommentLike", { cause: error });
    }
  }
}
