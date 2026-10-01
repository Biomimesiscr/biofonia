"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { createPost } from "@/app/actions/post";
import { FormField, FormMessage, TextareaField } from "@/components/forms/form-field";
import { ForumRulesCard } from "@/components/posts/forum-rules-card";
import { Button } from "@/components/ui/button";
import { newPost } from "@/content/post";
import { PostContent } from "@/domain/post/valueobjects/PostContent.vo";
import { PostTitle } from "@/domain/post/valueobjects/PostTitle.vo";
import type { PostFormState } from "@/presentation/post/postFormState";
import type { PostIntent } from "@/presentation/post/validators/post.validator";
import { CategoryPicker } from "./category-picker";
import { ImagePicker } from "./image-picker";
import { PostPreview } from "./post-preview";
import { PostSavedNotice } from "./post-saved-notice";
import type { NewPostAuthor, NewPostCategory } from "./types";

type NewPostFormProps = {
  author: NewPostAuthor;
  categories: readonly NewPostCategory[];
};

/** The editor (category, title, text, image) with a live preview beside it. */
export function NewPostForm({ author, categories }: NewPostFormProps) {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [saved, setSaved] = useState<PostIntent | null>(null);

  const [state, action, pending] = useActionState(
    async (previous: PostFormState, formData: FormData) => {
      const result = await createPost(previous, formData);
      if (result?.saved) {
        setSaved(result.saved);
        setCategoryId(null);
        setTitle("");
        setContent("");
        changeImage(null);
      }
      return result;
    },
    undefined,
  );

  /** Any edit hides the confirmation of the previous save. */
  function edit<T>(setter: (value: T) => void) {
    return (value: T) => {
      setSaved(null);
      setter(value);
    };
  }

  function changeImage(url: string | null) {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(url);
  }

  const hasLink = PostContent.containsLink(content);
  const missing = !categoryId || !title.trim() || !content.trim();
  const errors = state?.errors;

  return (
    <div className="flex flex-col gap-8">
      {saved && <PostSavedNotice intent={saved} />}

      <div className="flex flex-wrap items-start gap-8">
        <form action={action} className="flex min-w-0 flex-[999_1_560px] flex-col gap-8">
          <FormMessage message={state?.message} />

          <CategoryPicker
            categories={categories}
            value={categoryId}
            onChange={edit(setCategoryId)}
            errors={errors?.postCategoryId}
          />

          <FormField
            id="post-title"
            name="title"
            label={newPost.postTitle.label}
            placeholder={newPost.postTitle.placeholder}
            maxLength={PostTitle.MAX_LENGTH}
            showCount
            value={title}
            onChange={(event) => edit(setTitle)(event.target.value)}
            errors={errors?.title}
          />

          <TextareaField
            id="post-content"
            name="content"
            label={newPost.content.label}
            placeholder={newPost.content.placeholder}
            hint={newPost.content.help}
            rows={8}
            maxLength={PostContent.MAX_LENGTH}
            showCount
            value={content}
            onChange={(event) => edit(setContent)(event.target.value)}
            errors={hasLink ? [newPost.content.linkError] : errors?.content}
          />

          <ImagePicker value={imageUrl} onChange={edit(changeImage)} />

          <div className="flex flex-col gap-2 border-t border-v-edge pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link href="/perfil" className="flex h-11 items-center text-[14px] font-medium">
                {newPost.cancel}
              </Link>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="submit"
                  name="intent"
                  value="draft"
                  variant="outline"
                  size="lg"
                  disabled={pending || hasLink}
                >
                  {newPost.saveDraft}
                </Button>
                <Button
                  type="submit"
                  name="intent"
                  value="publish"
                  size="lg"
                  disabled={missing || hasLink}
                  loading={pending}
                >
                  {newPost.publish}
                </Button>
              </div>
            </div>
            {missing && !saved && (
              <p className="text-right text-[13px] text-v-text-3">{newPost.missing}</p>
            )}
          </div>
        </form>

        <aside className="flex flex-[1_1_340px] flex-col gap-6">
          <PostPreview
            author={author}
            category={categories.find((category) => category.id === categoryId)}
            title={title}
            content={content}
            imageUrl={imageUrl}
          />
          <ForumRulesCard variant="list" />
        </aside>
      </div>
    </div>
  );
}
