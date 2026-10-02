export interface IPostCommentLikeRepository {
  exists(postCommentId: string, userId: string): Promise<boolean>;
  create(postCommentId: string, userId: string): Promise<void>;
  delete(postCommentId: string, userId: string): Promise<void>;
}
