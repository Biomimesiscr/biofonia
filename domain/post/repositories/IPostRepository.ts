import { Post } from "../entities/Post";
import { AuthorPost } from "../readmodels/AuthorPost";
import { ForumPost } from "../readmodels/ForumPost";

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
  /** Persists a new post and returns it with its generated id. */
  create(post: Post): Promise<Post>;
}
