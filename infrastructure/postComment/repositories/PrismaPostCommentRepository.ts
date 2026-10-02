import { PostComment } from "@/domain/postComment/entities/PostComment";
import { ThreadComment } from "@/domain/postComment/readmodels/ThreadComment";
import { IPostCommentRepository } from "@/domain/postComment/repositories/IPostCommentRepository";
import DatabaseError from "@/infrastructure/core/errors/DatabaseError";
import { prisma } from "@/infrastructure/prisma/client";
import { PrismaPostCommentMapper } from "../mappers/PrismaPostCommentMapper";

export class PrismaPostCommentRepository implements IPostCommentRepository {
  async listByPost(postId: string, viewerId?: string | null): Promise<ThreadComment[]> {
    try {
      const rows = await prisma.postComment.findMany({
        where: { postId },
        include: {
          user: { select: { id: true, name: true, email: true, userType: true } },
          _count: { select: { postCommentLikes: true } },
          ...(viewerId
            ? { postCommentLikes: { where: { userId: viewerId }, select: { id: true } } }
            : {}),
        },
        orderBy: { createdAt: "asc" },
      });
      return rows.map(PrismaPostCommentMapper.toThreadComment);
    } catch (error) {
      throw new DatabaseError("Could not fetch PostComment records", { cause: error });
    }
  }

  async findById(id: string): Promise<PostComment | null> {
    try {
      const row = await prisma.postComment.findUnique({ where: { id } });
      return row ? PrismaPostCommentMapper.toDomain(row) : null;
    } catch (error) {
      throw new DatabaseError("Could not find PostComment", { cause: error });
    }
  }

  async create(entity: PostComment): Promise<PostComment> {
    try {
      const row = await prisma.postComment.create({ data: PrismaPostCommentMapper.toPersistence(entity) });
      return PrismaPostCommentMapper.toDomain(row);
    } catch (error) {
      throw new DatabaseError("Could not create PostComment", { cause: error });
    }
  }
}
