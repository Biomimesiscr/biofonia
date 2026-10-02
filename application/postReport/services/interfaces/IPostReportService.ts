import { PostReportReason } from "@/domain/postReportReason/readmodels/PostReportReason";

export interface IPostReportService {
  listReasons(): Promise<PostReportReason[]>;
  /** Flags a published post for moderation; once per user and post. */
  reportPost(postId: string, userId: string, reasonId: string): Promise<void>;
}
