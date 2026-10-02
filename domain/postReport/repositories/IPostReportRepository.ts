export interface IPostReportRepository {
  /** Whether the user already reported the post. */
  exists(postId: string, userId: string): Promise<boolean>;
  create(postId: string, userId: string, reasonId: string): Promise<void>;
}
