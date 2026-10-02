import { Post } from "../entities/Post";
import { AuthorPost } from "../readmodels/AuthorPost";
import { ForumPost } from "../readmodels/ForumPost";
import { PostDetail } from "../readmodels/PostDetail";

export interface ListByAuthorOptions {
  /** Include unpublished posts (only for the author's own profile). */
  includeDrafts: boolean;
}

export interface ListPublishedOptions {
  categoryId?: string | null;
  /** Only posts created at or after this date. */
  since?: Date;
  /** "votes": most liked first; "recent": newest first. */
  orderBy: "votes" | "recent";
  limit?: number;
  /** Leave this post out (e.g. the one being read). */
  excludeId?: string;
  /** Fills `likedByViewer`; omit when signed out. */
  viewerId?: string | null;
}

export interface IPostRepository {
  /** The author's posts, most recently updated first. */
  listByAuthor(authorId: string, options: ListByAuthorOptions): Promise<AuthorPost[]>;
  /** Published posts for the forum feed. */
  listPublished(options: ListPublishedOptions): Promise<ForumPost[]>;
  /** Published posts created since `since`, counted per category id. */
  countPublishedByCategory(since: Date): Promise<Record<string, number>>;
  findById(id: string): Promise<Post | null>;
  /** A post (published or not) with its author, category and engagement. */
  findDetail(id: string, viewerId?: string | null): Promise<PostDetail | null>;
  /** Counts one more view of the post. */
  incrementImpressions(id: string): Promise<void>;
  /** Persists a new post and returns it with its generated id. */
  create(post: Post): Promise<Post>;
}
