"use server";

import { revalidatePath } from "next/cache";
import { postService, session } from "@/di/container";
import NotFoundError from "@/domain/core/errors/NotFoundError";

export type VoteResult =
  | { voted: boolean }
  | { requiresLogin: true }
  | { error: string };

/** Adds or removes the current user's vote on a post. */
export async function toggleVote(postId: string): Promise<VoteResult> {
  const user = await session.getCurrentUser();
  if (!user) return { requiresLogin: true };

  try {
    const result = await postService.toggleVote(postId, user.id!);
    revalidatePath("/foro");
    revalidatePath("/perfil", "layout");
    return result;
  } catch (error) {
    if (error instanceof NotFoundError) return { error: "Esta publicación ya no está disponible." };
    console.error(error);
    return { error: "No pudimos registrar tu voto. Inténtalo de nuevo." };
  }
}
