"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { postService, session } from "@/di/container";
import DataError from "@/domain/core/errors/DataError";
import NotFoundError from "@/domain/core/errors/NotFoundError";
import type { PostFormState } from "@/presentation/post/postFormState";
import { CreatePostSchema } from "@/presentation/post/validators/post.validator";

export async function createPost(_previous: PostFormState, formData: FormData): Promise<PostFormState> {
  const user = await session.requireUser();

  const values = {
    postCategoryId: String(formData.get("postCategoryId") ?? ""),
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
  };
  const parsed = CreatePostSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const { intent, ...input } = parsed.data;
  try {
    await postService.create(user.id!, { ...input, publish: intent === "publish" });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return { errors: { postCategoryId: ["Esa categoría ya no existe. Elige otra."] }, values };
    }
    if (error instanceof DataError) return { message: error.message, values };
    console.error(error);
    return { message: "No pudimos guardar tu post. Inténtalo de nuevo.", values };
  }

  revalidatePath("/perfil");
  return { saved: intent };
}
