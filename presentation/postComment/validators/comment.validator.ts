import { z } from "zod";
import { PostContent } from "@/domain/post/valueobjects/PostContent.vo";
import { PostCommentContent } from "@/domain/postComment/valueobjects/PostCommentContent.vo";

// Form-level checks so the composer can show its own message. The domain value
// object stays the source of truth (limits are read from it) and re-validates.

export const CreateCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { error: "Escribe tu comentario" })
    .max(PostCommentContent.MAX_LENGTH, { error: `Máximo ${PostCommentContent.MAX_LENGTH} caracteres` })
    .refine((text) => !PostContent.containsLink(text), {
      error: "Tu comentario incluye un enlace. Quítalo para poder publicarlo.",
    }),
});

export type CreateCommentRequest = z.infer<typeof CreateCommentSchema>;
