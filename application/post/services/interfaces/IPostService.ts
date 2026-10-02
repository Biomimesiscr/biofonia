import { Post } from "@/domain/post/entities/Post";
import { AuthorPost } from "@/domain/post/readmodels/AuthorPost";
import { ForumPost } from "@/domain/post/readmodels/ForumPost";
import { PostDetail } from "@/domain/post/readmodels/PostDetail";
import { ListByAuthorOptions } from "@/domain/post/repositories/IPostRepository";
import { CreatePostInput } from "../../dtos/CreatePostInput";
import { ForumQuery } from "../../dtos/ForumQuery";

export interface ForumCounts {
  /** Published posts in the window, all categories. */
  total: number;
  /** Published posts in the window, by category id. */
  byCategory: Record<string, number>;
}

export interface IPostService {
  listByAuthor(authorId: string, options: ListByAuthorOptions): Promise<AuthorPost[]>;
  listForum(query: ForumQuery): Promise<ForumPost[]>;
  /** The most voted published posts of the last 30 days. */
  topOfMonth(limit?: number): Promise<ForumPost[]>;
  /** Published posts of the last 24 h, counted per category. */
  countToday(): Promise<ForumCounts>;
  create(authorId: string, input: CreatePostInput): Promise<Post>;
  /**
   * A post for its own page. Drafts are only visible to their author; anything
   * else throws `PostNotFoundError`.
   */
  getDetail(id: string, viewerId: string | null): Promise<PostDetail>;
  /** Counts one view of a published post. */
  registerView(id: string): Promise<void>;
  /** The most voted published posts of the same category, without the post itself. */
  listRelated(post: Post, limit?: number): Promise<ForumPost[]>;
  /** Adds the user's vote, or removes it if they already voted. */
  toggleVote(postId: string, userId: string): Promise<{ voted: boolean }>;
}
