import { AuthorPost } from "@/domain/post/readmodels/AuthorPost";
import { ListByAuthorOptions } from "@/domain/post/repositories/IPostRepository";

export interface IPostService {
  listByAuthor(authorId: string, options: ListByAuthorOptions): Promise<AuthorPost[]>;
}
