import { Post } from "../entities/Post";

/** A post as listed on its author's profile: with its category and engagement counts. */
export interface AuthorPost {
  post: Post;
  category: { id: string; name: string } | null;
  likeCount: number;
  commentCount: number;
}
