import Link from "next/link";
import type { ForumPostItem } from "@/components/forum/types";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Icon } from "@/components/ui/icon";
import { site } from "@/content/home";
import { postDetail } from "@/content/post-detail";
import { CommentSection } from "./comment-section";
import { ConversationBalance } from "./conversation-balance";
import { PostArticle } from "./post-article";
import { PostAuthorCard } from "./post-author-card";
import { RelatedPosts } from "./related-posts";
import type {
  CommentThreadItem,
  ConversationVoices,
  PostDetailItem,
  PostViewer,
  ReportReasonOption,
} from "./types";
import { ViewTracker } from "./view-tracker";

type PostViewProps = {
  post: PostDetailItem;
  threads: readonly CommentThreadItem[];
  voices: ConversationVoices;
  related: readonly ForumPostItem[];
  reasons: readonly ReportReasonOption[];
  viewer: PostViewer;
};

/** The post and its conversation on the left; author, voices and related posts on the right. */
export function PostView({ post, threads, voices, related, reasons, viewer }: PostViewProps) {
  return (
    <>
      {post.published && <ViewTracker postId={post.id} />}
      <SiteHeader />
      <Container className="flex max-w-[1240px] flex-1 flex-col gap-4 pt-4 pb-16 sm:pt-6 sm:pb-24">
        <Link
          href={site.forumHref}
          className="flex min-h-11 items-center gap-1.5 self-start text-[14px] font-medium no-underline"
        >
          <Icon name="chevron-left" className="size-[18px]" />
          {postDetail.back}
        </Link>

        <div className="flex flex-wrap items-start gap-6 sm:gap-8">
          <main className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
            <PostArticle post={post} reasons={reasons} />
            {post.published && (
              <CommentSection postId={post.id} threads={threads} total={post.comments} viewer={viewer} />
            )}
          </main>

          <aside className="flex min-w-0 lg:max-w-[340px] flex-[1_1_280px] flex-col gap-4">
            <PostAuthorCard author={post.author} />
            {post.published && <ConversationBalance voices={voices} />}
            <RelatedPosts posts={related} />
          </aside>
        </div>
      </Container>
      <SiteFooter />
    </>
  );
}
