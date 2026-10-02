import Link from "next/link";
import { postHref } from "@/components/forum/forum-href";
import { CategoryLabel } from "@/components/posts/category-label";
import { Stat } from "@/components/shared/stat";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { postStats } from "@/content/forum";
import { profile } from "@/content/profile";
import type { ProfilePostItem } from "./types";

export function ProfilePostCard({ post }: { post: ProfilePostItem }) {
  return (
    <Card className="flex flex-col gap-3 rounded-[20px] p-6">
      <div className="flex flex-wrap items-center gap-2.5 text-[13px] text-v-text-2">
        <CategoryLabel category={post.category} />
        <span aria-hidden="true">·</span>
        <span>{post.date}</span>
        {!post.published && (
          <Badge className="h-auto px-2.5 py-0.5 text-[13px]">{profile.posts.draft}</Badge>
        )}
      </div>
      <h3 className="text-[21px] leading-[1.25] font-semibold">
        <Link href={postHref(post.id)} className="text-v-text no-underline hover:text-v-text hover:underline">
          {post.title}
        </Link>
      </h3>
      {post.excerpt && <p className="line-clamp-2 leading-[1.55] text-v-text-2">{post.excerpt}</p>}
      {post.published && (
        <div className="flex flex-wrap gap-5 pt-1 text-[13px] text-v-text-2">
          <Stat icon="eye" value={post.views} label={postStats.views} />
          <Stat icon="message-circle" value={post.comments} label={postStats.comments} />
          <Stat icon="arrow-up" value={post.votes} label={postStats.votes} />
        </div>
      )}
    </Card>
  );
}
