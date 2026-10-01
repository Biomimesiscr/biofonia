/** What an auth Server Action hands back to its form through `useActionState`. */
export type FormState<TField extends string = string> =
  | {
      /** Per-field messages, shown under each input. */
      errors?: Partial<Record<TField, string[]>>;
      /** Form-wide message (bad credentials, duplicate email…). */
      message?: string;
      /** Submitted values to refill the form; React resets it after an action. */
      values?: Partial<Record<TField, string>>;
    }
  | undefined;
