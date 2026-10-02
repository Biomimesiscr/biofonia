"use server";

import { postReportService, session } from "@/di/container";
import { postDetail } from "@/content/post-detail";
import { PostReportReasonNotFoundError } from "@/application/postReport/errors/PostReportReasonNotFoundError";
import ConflictError from "@/domain/core/errors/ConflictError";
import NotFoundError from "@/domain/core/errors/NotFoundError";
import { ReportPostSchema } from "@/presentation/postReport/validators/report.validator";

export type ReportResult = { reported: true } | { requiresLogin: true } | { error: string };

/** Flags a post for moderation with the chosen reason. */
export async function reportPost(postId: string, reasonId: string): Promise<ReportResult> {
  const user = await session.getCurrentUser();
  if (!user) return { requiresLogin: true };

  const parsed = ReportPostSchema.safeParse({ postId, reasonId });
  if (!parsed.success) return { error: postDetail.errors.reasonMissing };

  try {
    await postReportService.reportPost(parsed.data.postId, user.id!, parsed.data.reasonId);
    return { reported: true };
  } catch (error) {
    if (error instanceof ConflictError) return { error: postDetail.errors.alreadyReported };
    if (error instanceof PostReportReasonNotFoundError) return { error: postDetail.errors.reasonMissing };
    if (error instanceof NotFoundError) return { error: postDetail.errors.unavailable };
    console.error(error);
    return { error: postDetail.errors.report };
  }
}
