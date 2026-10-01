import { z } from "zod";
import { Biography } from "@/domain/user/valueobjects/Biography.vo";
import { Password } from "@/domain/user/valueobjects/Password.vo";
import { UserName } from "@/domain/user/valueobjects/UserName.vo";
import { USER_TYPES } from "@/domain/user/valueobjects/UserType";

// Form-level checks so each field can show its own message. The domain value
// objects stay the source of truth (limits are read from them) and re-validate.

const email = z
  .string()
  .trim()
  .min(1, { error: "Escribe tu correo electrónico" })
  .pipe(z.email({ error: "Escribe un correo electrónico válido" }));

export const LoginSchema = z.object({
  email,
  password: z.string().min(1, { error: "Escribe tu contraseña" }),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(UserName.MIN_LENGTH, { error: "Escribe tu nombre completo" })
    .max(UserName.MAX_LENGTH, { error: `Máximo ${UserName.MAX_LENGTH} caracteres` }),
  email,
  password: z
    .string()
    .min(Password.MIN_LENGTH, { error: `Usa al menos ${Password.MIN_LENGTH} caracteres` })
    .max(Password.MAX_LENGTH, { error: `Máximo ${Password.MAX_LENGTH} caracteres` }),
  normas: z.literal("on", { error: "Debes aceptar las normas del foro" }),
});

export const OnboardingSchema = z.object({
  userType: z.enum(USER_TYPES, { error: "Elige desde dónde llegas" }),
  biography: z
    .string()
    .trim()
    .min(1, { error: "Escribe una biografía breve" })
    .max(Biography.MAX_LENGTH, { error: `Máximo ${Biography.MAX_LENGTH} caracteres` }),
});

export type LoginRequest = z.infer<typeof LoginSchema>;
export type RegisterRequest = z.infer<typeof RegisterSchema>;
export type OnboardingRequest = z.infer<typeof OnboardingSchema>;
