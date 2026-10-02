import { PostReportReason } from "../readmodels/PostReportReason";

export interface IPostReportReasonRepository {
  /** Every reason, oldest first (the order they were seeded in). */
  list(): Promise<PostReportReason[]>;
  findById(id: string): Promise<PostReportReason | null>;
}
