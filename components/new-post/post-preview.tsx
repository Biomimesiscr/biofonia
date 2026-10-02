import { CategoryDot } from "@/components/posts/category-dot";
import { roleFor } from "@/components/profile/role-style";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { newPost } from "@/content/post";
import { cn } from "@/lib/utils";
import type { NewPostAuthor, NewPostCategory } from "./types";

type PostPreviewProps = {
  author: NewPostAuthor;
  category: NewPostCategory | undefined;
  title: string;
  content: string;
  imageUrl: string | null;
};

/** How the post will look in the forum, updated as the author types. */
export function PostPreview({ author, category, title, content, imageUrl }: PostPreviewProps) {
  const copy = newPost.preview;
  const { style } = roleFor(author.userType);
  return (
    <section aria-label={copy.eyebrow} className="flex flex-col gap-3">
      <Eyebrow tone="pine" className="text-v-text-2">
        {copy.eyebrow}
      </Eyebrow>
      <Card className="flex flex-col gap-3 rounded-[20px] p-6">
        <div className="flex items-center gap-2.5">
          <Avatar variant={style.avatar} aria-hidden="true" className="size-9 text-[13px]">
            <AvatarFallback>{author.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-[13px]">
            <span className="font-semibold">{author.name}</span>
            <span className="text-v-text-2">{copy.now}</span>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-[13px] font-semibold">
          {category ? (
            <CategoryDot tone={category.tone} />
          ) : (
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-v-edge" />
          )}
          {category?.name ?? copy.uncategorized}
        </span>
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- local object URL
          <img src={imageUrl} alt="" className="block h-40 w-full rounded-xl object-cover" />
        )}
        <h3
          className={cn(
            "text-[19px] leading-[1.25] font-semibold break-words",
            title.trim() ? "text-v-text" : "text-v-text-3",
          )}
        >
          {title.trim() || copy.title}
        </h3>
        <p className="leading-[1.55] break-words whitespace-pre-line text-v-text-2">
          {content.trim() || copy.content}
        </p>
      </Card>
    </section>
  );
}
