import type { Post as PrismaPost, PostCategory as PrismaPostCategory } from "@/generated/prisma/client";
import { Post } from "@/domain/post/entities/Post";
import { AuthorPost } from "@/domain/post/readmodels/AuthorPost";

type AuthorPostRow = PrismaPost & {
  postCategory: PrismaPostCategory | null;
  _count: { postLikes: number; postComments: number };
};

export class PrismaPostMapper {
  static toDomain(row: PrismaPost): Post {
    return Post.restore({
      id: row.id,
      title: row.title,
      content: row.content,
      published: row.published,
      authorId: row.authorId,
      postCategoryId: row.postCategoryId,
      impressionCount: row.impressionCount,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toAuthorPost(row: AuthorPostRow): AuthorPost {
    return {
      post: PrismaPostMapper.toDomain(row),
      category: row.postCategory ? { id: row.postCategory.id, name: row.postCategory.name } : null,
      likeCount: row._count.postLikes,
      commentCount: row._count.postComments,
    };
  }
}
