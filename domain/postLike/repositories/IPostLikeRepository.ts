export interface IPostLikeRepository {
  exists(postId: string, userId: string): Promise<boolean>;
  create(postId: string, userId: string): Promise<void>;
  delete(postId: string, userId: string): Promise<void>;
}
