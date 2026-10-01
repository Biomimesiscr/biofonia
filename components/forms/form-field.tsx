import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClassName =
  "h-12 w-full rounded-full border border-v-edge bg-v-paper px-5 text-[15px] text-v-text placeholder:text-v-text-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v-brand aria-invalid:border-v-danger";

export const textareaClassName =
  "w-full resize-y rounded-[20px] border border-v-edge bg-v-paper px-5 py-4 text-[15px] leading-normal text-v-text placeholder:text-v-text-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v-brand aria-invalid:border-v-danger";

type FieldProps = {
  id: string;
  label: ReactNode;
  hint?: string;
  errors?: string[];
  /** Show "n / maxLength" under the field (needs a controlled `value` and `maxLength`). */
  showCount?: boolean;
};

type FormFieldProps = ComponentProps<"input"> &
  FieldProps & {
    /** Extra content on the label row (e.g. a "forgot password" link). */
    labelAside?: ReactNode;
  };

/** Label, pill input and its messages, wired together for screen readers. */
export function FormField({
  id,
  label,
  labelAside,
  hint,
  errors,
  showCount,
  className,
  ...props
}: FormFieldProps) {
  const { hintId, errorId, describedBy } = fieldIds(id, hint, errors);
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
        aria-describedby={describedBy}
        className={cn(inputClassName, className)}
        {...props}
      />
      <FieldFooter
        hintId={hintId}
        hint={errorId ? undefined : hint}
        count={showCount ? { value: props.value, max: props.maxLength } : undefined}
        className="px-5"
      />
      {errorId && <FieldError id={errorId} errors={errors!} />}
    </div>
  );
}

type TextareaFieldProps = ComponentProps<"textarea"> & FieldProps;

/** Label, rounded textarea, hint + character count and its error. */
export function TextareaField({
  id,
  label,
  hint,
  errors,
  showCount,
  className,
  ...props
}: TextareaFieldProps) {
  const { hintId, errorId, describedBy } = fieldIds(id, hint, errors);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-medium">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={describedBy}
        className={cn(textareaClassName, className)}
        {...props}
      />
      <FieldFooter
        hintId={hintId}
        hint={hint}
        count={showCount ? { value: props.value, max: props.maxLength } : undefined}
      />
      {errorId && <FieldError id={errorId} errors={errors!} />}
    </div>
  );
}

function fieldIds(id: string, hint?: string, errors?: string[]) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = errors?.length ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return { hintId, errorId, describedBy };
}

type FieldFooterProps = {
  hintId?: string;
  hint?: string;
  count?: { value: unknown; max?: number };
  className?: string;
};

/** Hint on the left, "n / max" on the right; renders nothing when both are absent. */
function FieldFooter({ hintId, hint, count, className }: FieldFooterProps) {
  if (!hint && !count) return null;
  return (
    <div className={cn("flex justify-between gap-3 text-[13px] text-v-text-3", className)}>
      {hint ? <p id={hintId}>{hint}</p> : <span />}
      {count && (
        <span className="tabular-nums">
          {String(count.value ?? "").length}
          {count.max !== undefined && ` / ${count.max}`}
        </span>
      )}
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
