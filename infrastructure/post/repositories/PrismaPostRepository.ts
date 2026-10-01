import { AuthorPost } from "@/domain/post/readmodels/AuthorPost";
import { IPostRepository, ListByAuthorOptions } from "@/domain/post/repositories/IPostRepository";
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
}
