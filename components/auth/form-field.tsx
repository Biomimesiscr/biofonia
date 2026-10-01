import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClassName =
  "h-12 w-full rounded-full border border-v-edge bg-v-paper px-5 text-[15px] text-v-text placeholder:text-v-text-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v-brand aria-invalid:border-v-danger";

type FormFieldProps = ComponentProps<"input"> & {
  id: string;
  label: string;
  /** Extra content on the label row (e.g. a "forgot password" link). */
  labelAside?: ReactNode;
  hint?: string;
  errors?: string[];
};

/** Label, pill input and its messages, wired together for screen readers. */
export function FormField({ id, label, labelAside, hint, errors, className, ...props }: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[14px] font-medium">
          {label}
        </label>
        {labelAside}
      </div>
      <input
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        className={cn(inputClassName, className)}
        {...props}
      />
      {hint && !errorId && (
        <p id={hintId} className="px-5 text-[13px] text-v-text-3">
          {hint}
        </p>
      )}
      {errorId && <FieldError id={errorId} errors={errors!} />}
    </div>
  );
}

export function FieldError({ id, errors }: { id: string; errors: string[] }) {
  return (
    <p id={id} className="px-5 text-[13px] font-medium text-v-danger-ink">
      {errors[0]}
    </p>
  );
}

/** Form-wide error, announced when it appears. */
export function FormMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-[20px] bg-v-danger-soft px-5 py-3 text-[14px] text-v-danger-ink">
      {message}
    </p>
  );
}
