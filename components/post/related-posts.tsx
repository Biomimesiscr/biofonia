import Link from "next/link";
import { Fragment } from "react";
import { postHref } from "@/components/forum/forum-href";
import type { ForumPostItem } from "@/components/forum/types";
import { CategoryLabel } from "@/components/posts/category-label";
import { Card } from "@/components/ui/card";
import { postDetail } from "@/content/post-detail";

/** "También te puede interesar": the most voted posts of the same category. */
export function RelatedPosts({ posts }: { posts: readonly ForumPostItem[] }) {
  if (posts.length === 0) return null;
  return (
    <Card className="flex flex-col gap-3.5 rounded-[20px] p-6">
      <h2 className="text-[16px] font-semibold">{postDetail.related.title}</h2>
      {posts.map((post, index) => (
        <Fragment key={post.id}>
          {index > 0 && <span aria-hidden="true" className="h-px bg-[var(--bio-hairline)]" />}
          <Link href={postHref(post.id)} className="group flex flex-col gap-1 text-v-text no-underline hover:text-v-text">
            <CategoryLabel category={post.category} className="text-[12px]" />
            <span className="text-[14px] leading-[1.35] font-semibold group-hover:underline">{post.title}</span>
            <span className="text-[12px] text-v-text-2">{postDetail.related.meta(post.votes, post.comments)}</span>
          </Link>
        </Fragment>
      ))}
    </Card>
  );
}
