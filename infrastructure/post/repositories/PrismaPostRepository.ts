import { Post } from "@/domain/post/entities/Post";
import { AuthorPost } from "@/domain/post/readmodels/AuthorPost";
import { ForumPost } from "@/domain/post/readmodels/ForumPost";
import {
  IPostRepository,
  ListByAuthorOptions,
  ListPublishedOptions,
} from "@/domain/post/repositories/IPostRepository";
import type { Prisma } from "@/generated/prisma/client";
import DatabaseError from "@/infrastructure/core/errors/DatabaseError";
import { prisma } from "@/infrastructure/prisma/client";
import { PrismaPostMapper } from "../mappers/PrismaPostMapper";

export class PrismaPostRepository implements IPostRepository {
  async listByAuthor(authorId: string, { includeDrafts }: ListByAuthorOptions): Promise<AuthorPost[]> {
    try {
      const rows = await prisma.post.findMany({
        where: { authorId, ...(includeDrafts ? {} : { published: true }) },
        include: {
          postCategory: true,
          _count: { select: { postLikes: true, postComments: true } },
        },
        orderBy: { updatedAt: "desc" },
      });
      return rows.map(PrismaPostMapper.toAuthorPost);
    } catch (error) {
      throw new DatabaseError("Could not fetch Post records", { cause: error });
    }
  }

  async listPublished({
    categoryId,
    since,
    orderBy,
    limit,
    viewerId,
  }: ListPublishedOptions): Promise<ForumPost[]> {
    const order: Prisma.PostOrderByWithRelationInput[] =
      orderBy === "votes"
        ? [{ postLikes: { _count: "desc" } }, { createdAt: "desc" }]
        : [{ createdAt: "desc" }];
    try {
      const rows = await prisma.post.findMany({
        where: {
          published: true,
          ...(categoryId ? { postCategoryId: categoryId } : {}),
          ...(since ? { createdAt: { gte: since } } : {}),
        },
        include: {
          postCategory: true,
          author: { select: { id: true, name: true, email: true, userType: true } },
          _count: { select: { postLikes: true, postComments: true } },
          ...(viewerId ? { postLikes: { where: { userId: viewerId }, select: { id: true } } } : {}),
        },
        orderBy: order,
        ...(limit ? { take: limit } : {}),
      });
      return rows.map(PrismaPostMapper.toForumPost);
    } catch (error) {
      throw new DatabaseError("Could not fetch published Post records", { cause: error });
    }
  }

  async countPublishedByCategory(since: Date): Promise<Record<string, number>> {
    try {
      const groups = await prisma.post.groupBy({
        by: ["postCategoryId"],
        where: { published: true, createdAt: { gte: since } },
        _count: { _all: true },
      });
      return Object.fromEntries(
        groups
          .filter((group) => group.postCategoryId !== null)
          .map((group) => [group.postCategoryId!, group._count._all]),
      );
    } catch (error) {
      throw new DatabaseError("Could not count Post records", { cause: error });
    }
  }

  async findById(id: string): Promise<Post | null> {
    try {
      const row = await prisma.post.findUnique({ where: { id } });
      return row ? PrismaPostMapper.toDomain(row) : null;
    } catch (error) {
      throw new DatabaseError("Could not find Post", { cause: error });
    }
  }

  async create(entity: Post): Promise<Post> {
    try {
      const row = await prisma.post.create({ data: PrismaPostMapper.toPersistence(entity) });
      return PrismaPostMapper.toDomain(row);
    } catch (error) {
      throw new DatabaseError("Could not create Post", { cause: error });
    }
  }
}
