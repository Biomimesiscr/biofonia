import { Post } from "@/domain/post/entities/Post";
import { AuthorPost } from "@/domain/post/readmodels/AuthorPost";
import { ForumPost } from "@/domain/post/readmodels/ForumPost";
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
  /** Adds the user's vote, or removes it if they already voted. */
  toggleVote(postId: string, userId: string): Promise<{ voted: boolean }>;
}
