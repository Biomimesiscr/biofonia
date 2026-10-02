import type { UserType } from "@/domain/user/valueobjects/UserType";
import { PostComment } from "../entities/PostComment";

/** A comment as shown in a post's conversation: with its author and votes. */
export interface ThreadComment {
  comment: PostComment;
  author: { id: string; name: string; userType: UserType };
  likeCount: number;
  /** Whether the current viewer already voted for it (false when signed out). */
  likedByViewer: boolean;
}

/** A top-level comment with its replies, oldest reply first. */
export interface CommentThread extends ThreadComment {
  replies: ThreadComment[];
}
