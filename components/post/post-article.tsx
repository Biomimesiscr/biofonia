import { AuthorLine } from "@/components/posts/author-line";
import { CategoryLabel } from "@/components/posts/category-label";
import { DisplayText } from "@/components/shared/display-text";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { postDetail } from "@/content/post-detail";
import { PostActions } from "./post-actions";
import type { PostDetailItem, ReportReasonOption } from "./types";

type PostArticleProps = { post: PostDetailItem; reasons: readonly ReportReasonOption[] };

/** The post itself: meta, title, author, body and (once published) its actions. */
export function PostArticle({ post, reasons }: PostArticleProps) {
  return (
    <Card className="rounded-[28px] p-[clamp(24px,3vw,40px)]">
      <article className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px]">
          <CategoryLabel category={post.category} />
          {post.published ? (
            <span className="text-v-text-2">
              {postDetail.published(post.date)} · {postDetail.views(post.views)}
            </span>
          ) : (
            <Badge className="h-auto px-2.5 py-0.5 text-[13px]">{postDetail.draft}</Badge>
          )}
        </div>

        <DisplayText as="h1" size="xl" className="break-words">
          {post.title}
        </DisplayText>

        <AuthorLine author={post.author} size="lg" />

        <div className="flex max-w-[70ch] flex-col gap-3.5 text-[16px] leading-[1.65] break-words">
          {post.paragraphs.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>

        {post.published && (
          <PostActions
            postId={post.id}
            votes={post.votes}
            voted={post.voted}
            comments={post.comments}
            reasons={reasons}
          />
        )}
      </article>
    </Card>
  );
}
