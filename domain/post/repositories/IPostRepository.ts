import { AuthorPost } from "../readmodels/AuthorPost";

export interface ListByAuthorOptions {
  /** Include unpublished posts (only for the author's own profile). */
  includeDrafts: boolean;
}

export interface IPostRepository {
  /** The author's posts, most recently updated first. */
  listByAuthor(authorId: string, options: ListByAuthorOptions): Promise<AuthorPost[]>;
}
