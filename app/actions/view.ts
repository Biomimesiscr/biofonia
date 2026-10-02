"use server";

import { postService } from "@/di/container";
import NotFoundError from "@/domain/core/errors/NotFoundError";

/**
 * Counts one view of a post. Called once from the page on mount, not while
 * rendering, so revalidations after a vote or comment don't add views.
 */
export async function registerView(postId: string): Promise<void> {
  try {
    await postService.registerView(postId);
  } catch (error) {
    // Drafts and deleted posts are simply not counted.
    if (!(error instanceof NotFoundError)) console.error(error);
  }
}
