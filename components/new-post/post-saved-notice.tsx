import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { newPost } from "@/content/post";
import type { PostIntent } from "@/presentation/post/validators/post.validator";

/** Confirmation shown after publishing or saving a draft. */
export function PostSavedNotice({ intent }: { intent: PostIntent }) {
  const copy = newPost.saved;
  return (
    <div
      role="status"
      className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border-2 border-v-olive bg-v-olive-soft px-6 py-5"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-v-olive text-v-on-accent">
          <Icon name="check" className="size-5" />
        </span>
        <div className="flex flex-col">
          <strong className="text-[16px]">{copy[intent].title}</strong>
          <span className="text-v-text-2">{copy[intent].text}</span>
        </div>
      </div>
      <Button asChild className="h-11 px-5">
        <Link href="/perfil" className="no-underline">
          {copy.goToProfile}
        </Link>
      </Button>
    </div>
  );
}
