import Link from "next/link";
import { AuthorLine } from "@/components/posts/author-line";
import { CategoryLabel } from "@/components/posts/category-label";
import { Stat } from "@/components/shared/stat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { forum, postStats } from "@/content/forum";
import { postHref } from "./forum-href";
import type { ForumPostItem } from "./types";
import { VoteButton } from "./vote-button";

/** One post in the feed: votes on the left, meta, title, excerpt and stats on the right. */
export function ForumPostCard({ post }: { post: ForumPostItem }) {
  const reportHintId = `report-soon-${post.id}`;
  return (
    <Card className="flex gap-4 rounded-[20px] py-5 pr-6 pl-4">
      <VoteButton postId={post.id} votes={post.votes} voted={post.voted} />
      <article className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-v-text-2">
          <CategoryLabel category={post.category} />
          <span aria-hidden="true">·</span>
          <AuthorLine author={post.author} />
          <span aria-hidden="true">·</span>
          <span>{post.date}</span>
        </div>
        <h2 className="text-[19px] leading-[1.3] font-semibold break-words">
          <Link href={postHref(post.id)} className="text-v-text no-underline hover:underline">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && <p className="line-clamp-2 leading-[1.55] text-v-text-2">{post.excerpt}</p>}
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-v-text-2">
          <span className="flex min-h-9 items-center rounded-full bg-v-beige px-3 font-medium text-v-text">
            <Stat icon="message-circle" value={post.comments} label={postStats.comments} />
          </span>
          <span className="flex min-h-9 items-center px-3">
            <Stat icon="eye" value={post.views} label={postStats.views} />
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled
            aria-describedby={reportHintId}
            className="text-[13px] font-normal text-v-text-2"
          >
            <Icon name="triangle-alert" className="size-4" />
            {forum.report.label}
          </Button>
          <span id={reportHintId} className="text-[12px] text-v-text-3">
            {forum.report.soon}
          </span>
        </div>
      </article>
    </Card>
  );
}
