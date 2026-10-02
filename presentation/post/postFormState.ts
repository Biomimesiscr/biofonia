import type { FormState } from "@/presentation/auth/formState";
import type { PostIntent } from "./validators/post.validator";

export type PostField = "postCategoryId" | "title" | "content";

/** What `createPost` hands back to the editor: errors, or what was just saved. */
export type PostFormState =
  | (NonNullable<FormState<PostField>> & {
      /** Set once the post is stored, to show the confirmation banner. */
      saved?: PostIntent;
    })
  | undefined;
