import { AuthorPost } from "@/domain/post/readmodels/AuthorPost";
import { IPostRepository, ListByAuthorOptions } from "@/domain/post/repositories/IPostRepository";
import { IPostService } from "../interfaces/IPostService";

export class PostService implements IPostService {
  constructor(private readonly postRepository: IPostRepository) {}

  async listByAuthor(authorId: string, options: ListByAuthorOptions): Promise<AuthorPost[]> {
    return this.postRepository.listByAuthor(authorId, options);
  }
}
