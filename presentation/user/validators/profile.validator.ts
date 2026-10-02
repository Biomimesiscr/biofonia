import { z } from "zod";
import { Biography } from "@/domain/user/valueobjects/Biography.vo";
import { UserName } from "@/domain/user/valueobjects/UserName.vo";
import { USER_TYPES } from "@/domain/user/valueobjects/UserType";

// Form-level checks so each field can show its own message. The User entity
// re-validates through its value objects.

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(UserName.MIN_LENGTH, { error: "Escribe tu nombre completo" })
    .max(UserName.MAX_LENGTH, { error: `Máximo ${UserName.MAX_LENGTH} caracteres` }),
  userType: z.enum(USER_TYPES, { error: "Elige desde dónde llegas" }),
  biography: z
    .string()
    .trim()
    .min(1, { error: "Escribe una biografía breve" })
    .max(Biography.MAX_LENGTH, { error: `Máximo ${Biography.MAX_LENGTH} caracteres` }),
});

export type UpdateProfileRequest = z.infer<typeof UpdateProfileSchema>;
