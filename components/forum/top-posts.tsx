import { Card } from "@/components/ui/card";
import { forum } from "@/content/forum";
import type { TopPostItem } from "./types";

/** "Lo más votado del mes": the month's three most voted posts. */
export function TopPosts({ posts }: { posts: readonly TopPostItem[] }) {
  if (posts.length === 0) return null;
  return (
    <Card className="flex flex-col gap-3 rounded-[20px] p-5">
      <h2 className="text-[16px] font-semibold">{forum.top.title}</h2>
      <ol className="flex flex-col gap-3">
        {posts.map((post, index) => (
          <li key={post.id} className="flex items-start gap-3">
            <span aria-hidden="true" className="w-7 shrink-0 text-[15px] font-bold text-v-accent-ink tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-[14px] leading-[1.35] font-semibold">{post.title}</span>
              <span className="text-[12px] text-v-text-2">{forum.top.meta(post.votes, post.category)}</span>
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
