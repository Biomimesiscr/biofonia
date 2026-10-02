"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { createComment } from "@/app/actions/comment";
import { FormMessage, textareaClassName } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { site } from "@/content/home";
import { PostContent } from "@/domain/post/valueobjects/PostContent.vo";
import { PostCommentContent } from "@/domain/postComment/valueobjects/PostCommentContent.vo";
import { cn } from "@/lib/utils";
import type { CommentFormState } from "@/presentation/postComment/commentFormState";

type CommentComposerProps = {
  id: string;
  postId: string;
  /** The comment being answered; `null` for a new top-level comment. */
  parentId: string | null;
  label: string;
  /** Keep the label for screen readers only (the main composer). */
  hideLabel?: boolean;
  placeholder?: string;
  help: string;
  linkError: string;
  submitLabel: string;
  rows?: number;
  autoFocus?: boolean;
  onPublished: () => void;
  /** Shows a "Cancelar" button (reply composer). */
  onCancel?: () => void;
  cancelLabel?: string;
};

/** Textarea with the no-links rule checked as you type; used for comments and replies. */
export function CommentComposer({
  id,
  postId,
  parentId,
  label,
  hideLabel = false,
  placeholder,
  help,
  linkError,
  submitLabel,
  rows = 3,
  autoFocus,
  onPublished,
  onCancel,
  cancelLabel,
}: CommentComposerProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [state, action, pending] = useActionState(
    async (previous: CommentFormState, formData: FormData) => {
      const result = await createComment(postId, parentId, previous, formData);
      if (result?.requiresLogin) router.push(site.loginHref);
      if (result?.published) {
        setContent("");
        onPublished();
      }
      return result;
    },
    undefined,
  );

  const hasLink = PostContent.containsLink(content);
  const error = hasLink ? linkError : state?.errors?.content?.[0];
  const hintId = `${id}-hint`;

  return (
    <form action={action} className="flex flex-col gap-2.5">
      <label htmlFor={id} className={cn("text-[13px] font-medium", hideLabel && "sr-only")}>
        {label}
      </label>
      <textarea
        id={id}
        name="content"
        rows={rows}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder={placeholder}
        maxLength={PostCommentContent.MAX_LENGTH}
        autoFocus={autoFocus}
        aria-invalid={error ? true : undefined}
        aria-describedby={hintId}
        className={cn(textareaClassName, "rounded-2xl px-4 py-3")}
      />
      <FormMessage message={state?.message} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p id={hintId} className={cn("text-[13px]", error ? "font-medium text-v-danger-ink" : "text-v-text-3")}>
          {error ?? help}
        </p>
        <div className="flex gap-2">
          {onCancel && (
            <Button type="button" variant="outline" className="h-10 px-4" onClick={onCancel}>
              {cancelLabel}
            </Button>
          )}
          <Button type="submit" className="h-10 px-5" disabled={!content.trim() || hasLink} loading={pending}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
