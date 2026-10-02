"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { session, userService } from "@/di/container";
import DataError from "@/domain/core/errors/DataError";
import type { FormState } from "@/presentation/auth/formState";
import { UpdateProfileSchema } from "@/presentation/user/validators/profile.validator";

type ProfileField = "name" | "userType" | "biography";

export async function updateProfile(
  _previous: FormState<ProfileField>,
  formData: FormData,
): Promise<FormState<ProfileField>> {
  const user = await session.requireUser();

  const values = {
    name: String(formData.get("name") ?? ""),
    userType: String(formData.get("userType") ?? ""),
    biography: String(formData.get("biography") ?? ""),
  };
  const parsed = UpdateProfileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  try {
    await userService.updateProfile(user.id!, parsed.data);
  } catch (error) {
    if (error instanceof DataError) return { message: error.message, values };
    console.error(error);
    return { message: "No pudimos guardar tu perfil. Inténtalo de nuevo.", values };
  }

  revalidatePath("/perfil", "layout");
  redirect("/perfil");
}
