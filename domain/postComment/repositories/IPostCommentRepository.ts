import { PostComment } from "../entities/PostComment";
import { ThreadComment } from "../readmodels/ThreadComment";

export interface IPostCommentRepository {
  /** Every comment and reply of a post, oldest first. `viewerId` fills `likedByViewer`. */
  listByPost(postId: string, viewerId?: string | null): Promise<ThreadComment[]>;
  findById(id: string): Promise<PostComment | null>;
  /** Persists a new comment and returns it with its generated id. */
  create(comment: PostComment): Promise<PostComment>;
}
