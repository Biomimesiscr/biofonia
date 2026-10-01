import { z } from "zod";

// Shape checks only; business rules (trim, length) live in the domain value objects.
export const CreatePostCategorySchema = z.object({
  name: z.string(),
});

export const UpdatePostCategorySchema = z.object({
  name: z.string().optional(),
});

export type CreatePostCategoryRequest = z.infer<typeof CreatePostCategorySchema>;
export type UpdatePostCategoryRequest = z.infer<typeof UpdatePostCategorySchema>;
