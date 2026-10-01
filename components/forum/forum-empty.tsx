import Link from "next/link";
import { Card } from "@/components/ui/card";
import { forum } from "@/content/forum";
import { newPost } from "@/content/post";

/** Shown when the current filters match no post. */
export function ForumEmpty() {
  return (
    <Card className="rounded-[20px] px-6 py-10 text-center text-v-text-2">
      {forum.empty.text}{" "}
      <Link href={newPost.href} className="font-semibold">
        {forum.empty.cta}
      </Link>
      .
    </Card>
  );
}
