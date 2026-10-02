import type {
  Prisma,
  PostComment as PrismaPostComment,
  User as PrismaUser,
} from "@/generated/prisma/client";
import { PostComment } from "@/domain/postComment/entities/PostComment";
import { ThreadComment } from "@/domain/postComment/readmodels/ThreadComment";

type ThreadCommentRow = PrismaPostComment & {
  user: Pick<PrismaUser, "id" | "name" | "email" | "userType">;
  _count: { postCommentLikes: number };
  /** Only the viewer's own like, when a viewer was given. */
  postCommentLikes?: { id: string }[];
};

export class PrismaPostCommentMapper {
  static toDomain(row: PrismaPostComment): PostComment {
    return PostComment.restore({
      id: row.id,
      content: row.content,
      postId: row.postId,
      userId: row.userId,
      fatherId: row.fatherId,
      createdAt: row.createdAt,
    });
  }

  static toThreadComment(row: ThreadCommentRow): ThreadComment {
    return {
      comment: PrismaPostCommentMapper.toDomain(row),
      author: { id: row.user.id, name: row.user.name ?? row.user.email, userType: row.user.userType },
      likeCount: row._count.postCommentLikes,
      likedByViewer: (row.postCommentLikes?.length ?? 0) > 0,
    };
  }

  static toPersistence(entity: PostComment): Prisma.PostCommentUncheckedCreateInput {
    return {
      ...(entity.id ? { id: entity.id } : {}),
      content: entity.content,
      postId: entity.postId,
      userId: entity.userId,
      fatherId: entity.fatherId,
    };
  }
}
