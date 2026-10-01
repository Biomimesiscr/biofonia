"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { EmailAlreadyRegisteredError } from "@/application/auth/errors/EmailAlreadyRegisteredError";
import { InvalidCredentialsError } from "@/application/auth/errors/InvalidCredentialsError";
import { authService, session } from "@/di/container";
import DataError from "@/domain/core/errors/DataError";
import type { FormState } from "@/presentation/auth/formState";
import { LoginSchema, RegisterSchema } from "@/presentation/auth/validators/auth.validator";

const UNEXPECTED = "No pudimos completar la solicitud. Inténtalo de nuevo en un momento.";

export async function login(
  _previous: FormState<"email" | "password">,
  formData: FormData,
): Promise<FormState<"email" | "password">> {
  const values = { email: String(formData.get("email") ?? "") };
  const parsed = LoginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  let result;
  try {
    result = await authService.login(parsed.data);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) return { message: error.message, values };
    console.error(error);
    return { message: UNEXPECTED, values };
  }

  await session.setSessionCookie(result.token, result.expiresAt);
  redirect(result.user.isOnboarded ? "/" : "/bienvenida");
}

export async function register(
  _previous: FormState<"name" | "email" | "password" | "normas">,
  formData: FormData,
): Promise<FormState<"name" | "email" | "password" | "normas">> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
  };
  const parsed = RegisterSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  let result;
  try {
    result = await authService.register(parsed.data);
  } catch (error) {
    if (error instanceof EmailAlreadyRegisteredError) {
      return { errors: { email: [error.message] }, values };
    }
    if (error instanceof DataError) return { message: error.message, values };
    console.error(error);
    return { message: UNEXPECTED, values };
  }

  await session.setSessionCookie(result.token, result.expiresAt);
  redirect("/bienvenida");
}

export async function logout(): Promise<void> {
  await session.endSession();
  redirect("/");
}
