"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { session, userService } from "@/di/container";
import DataError from "@/domain/core/errors/DataError";
import type { FormState } from "@/presentation/auth/formState";
import { OnboardingSchema } from "@/presentation/auth/validators/auth.validator";

export async function completeOnboarding(
  _previous: FormState<"userType" | "biography">,
  formData: FormData,
): Promise<FormState<"userType" | "biography">> {
  const user = await session.requireUser();

  const values = {
    userType: String(formData.get("userType") ?? ""),
    biography: String(formData.get("biography") ?? ""),
  };
  const parsed = OnboardingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  try {
    await userService.completeOnboarding(user.id!, parsed.data);
  } catch (error) {
    if (error instanceof DataError) return { message: error.message, values };
    console.error(error);
    return { message: "No pudimos guardar tu perfil. Inténtalo de nuevo.", values };
  }

  redirect("/");
}
