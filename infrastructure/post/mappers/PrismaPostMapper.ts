import type {
  Prisma,
  Post as PrismaPost,
  PostCategory as PrismaPostCategory,
  User as PrismaUser,
} from "@/generated/prisma/client";
import { Post } from "@/domain/post/entities/Post";
import { AuthorPost } from "@/domain/post/readmodels/AuthorPost";
import { ForumPost } from "@/domain/post/readmodels/ForumPost";

type AuthorPostRow = PrismaPost & {
  postCategory: PrismaPostCategory | null;
  _count: { postLikes: number; postComments: number };
};

type ForumPostRow = AuthorPostRow & {
  author: Pick<PrismaUser, "id" | "name" | "email" | "userType">;
  /** Only the viewer's own like, when a viewer was given. */
  postLikes?: { id: string }[];
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

  static toForumPost(row: ForumPostRow): ForumPost {
    return {
      ...PrismaPostMapper.toAuthorPost(row),
      author: {
        id: row.author.id,
        name: row.author.name ?? row.author.email,
        userType: row.author.userType,
      },
      likedByViewer: (row.postLikes?.length ?? 0) > 0,
    };
  }

  static toPersistence(entity: Post): Prisma.PostUncheckedCreateInput {
    return {
      ...(entity.id ? { id: entity.id } : {}),
      title: entity.title,
      content: entity.content,
      published: entity.published,
      authorId: entity.authorId,
      postCategoryId: entity.postCategoryId,
      impressionCount: entity.impressionCount,
    };
  }
}
