import type { FormState } from "@/presentation/auth/formState";

export type CommentField = "content";

/** What `createComment` hands back to a composer: errors, or that it was published. */
export type CommentFormState =
  | (NonNullable<FormState<CommentField>> & {
      /** Set once the comment is stored, so the composer can clear and confirm. */
      published?: true;
      /** The visitor is signed out: the composer sends them to log in. */
      requiresLogin?: true;
    })
  | undefined;
