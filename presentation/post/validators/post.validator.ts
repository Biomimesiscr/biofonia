import { z } from "zod";
import { PostContent } from "@/domain/post/valueobjects/PostContent.vo";
import { PostTitle } from "@/domain/post/valueobjects/PostTitle.vo";

// Form-level checks so each field can show its own message. The domain value
// objects stay the source of truth (limits are read from them) and re-validate.

export const POST_INTENTS = ["publish", "draft"] as const;

export const CreatePostSchema = z.object({
  postCategoryId: z.string().min(1, { error: "Elige una categoría" }),
  title: z
    .string()
    .trim()
    .min(1, { error: "Escribe un título" })
    .max(PostTitle.MAX_LENGTH, { error: `Máximo ${PostTitle.MAX_LENGTH} caracteres` }),
  content: z
    .string()
    .trim()
    .min(1, { error: "Escribe el texto del post" })
    .max(PostContent.MAX_LENGTH, { error: `Máximo ${PostContent.MAX_LENGTH} caracteres` })
    .refine((text) => !PostContent.containsLink(text), {
      error: "Tu texto incluye un enlace. Quítalo para poder publicar.",
    }),
  intent: z.enum(POST_INTENTS, { error: "Acción no válida" }),
});

export type CreatePostRequest = z.infer<typeof CreatePostSchema>;
export type PostIntent = (typeof POST_INTENTS)[number];
