"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { postCommentService, session } from "@/di/container";
import DataError from "@/domain/core/errors/DataError";
import NotFoundError from "@/domain/core/errors/NotFoundError";
import { postDetail } from "@/content/post-detail";
import type { CommentFormState } from "@/presentation/postComment/commentFormState";
import { CreateCommentSchema } from "@/presentation/postComment/validators/comment.validator";
import type { VoteResult } from "./vote";

/** Publishes a comment on a post, or a reply when `parentId` is given. Bind both ids. */
export async function createComment(
  postId: string,
  parentId: string | null,
  _previous: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const values = { content: String(formData.get("content") ?? "") };
  const user = await session.getCurrentUser();
  if (!user) return { requiresLogin: true, values };

  const parsed = CreateCommentSchema.safeParse(values);
  if (!parsed.success) return { errors: z.flattenError(parsed.error).fieldErrors, values };

  try {
    await postCommentService.create(user.id!, { postId, parentId, content: parsed.data.content });
  } catch (error) {
    if (error instanceof DataError) return { message: error.message, values };
    if (error instanceof NotFoundError) {
      return { message: parentId ? postDetail.errors.commentUnavailable : postDetail.errors.unavailable, values };
    }
    console.error(error);
    return { message: postDetail.errors.comment, values };
  }

  revalidatePath("/foro", "layout");
  revalidatePath("/perfil", "layout");
  return { published: true };
}

/** Adds or removes the current user's vote on a comment or reply. */
export async function toggleCommentVote(commentId: string): Promise<VoteResult> {
  const user = await session.getCurrentUser();
  if (!user) return { requiresLogin: true };

  try {
    const result = await postCommentService.toggleVote(commentId, user.id!);
    revalidatePath("/foro", "layout");
    return result;
  } catch (error) {
    if (error instanceof NotFoundError) return { error: postDetail.errors.commentUnavailable };
    console.error(error);
    return { error: postDetail.errors.vote };
  }
}
