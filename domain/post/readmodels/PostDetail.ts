import type { ForumPost } from "./ForumPost";

/** A post as shown on its own page: the forum data plus the author's biography. */
export interface PostDetail extends ForumPost {
  author: ForumPost["author"] & { biography: string | null };
}
