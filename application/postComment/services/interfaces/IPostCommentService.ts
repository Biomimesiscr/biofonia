import { PostComment } from "@/domain/postComment/entities/PostComment";
import { CommentThread } from "@/domain/postComment/readmodels/ThreadComment";
import { CreateCommentInput } from "../../dtos/CreateCommentInput";

export interface IPostCommentService {
  /** A post's conversation: top-level comments (oldest first), each with its replies. */
  listThread(postId: string, viewerId: string | null): Promise<CommentThread[]>;
  /** Comments on a published post, or replies to one of its comments. */
  create(userId: string, input: CreateCommentInput): Promise<PostComment>;
  /** Adds the user's vote, or removes it if they already voted. */
  toggleVote(commentId: string, userId: string): Promise<{ voted: boolean }>;
}
