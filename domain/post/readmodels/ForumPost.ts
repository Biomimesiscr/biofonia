import type { UserType } from "@/domain/user/valueobjects/UserType";
import { Post } from "../entities/Post";

/** A published post as listed in the forum: with its author, category and engagement. */
export interface ForumPost {
  post: Post;
  category: { id: string; name: string } | null;
  author: { id: string; name: string; userType: UserType };
  likeCount: number;
  commentCount: number;
  /** Whether the current viewer already voted for it (false when signed out). */
  likedByViewer: boolean;
}
