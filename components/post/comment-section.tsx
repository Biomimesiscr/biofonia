"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DisplayText } from "@/components/shared/display-text";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { useToast } from "@/components/shared/toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { site } from "@/content/home";
import { postDetail } from "@/content/post-detail";
import { CommentCard } from "./comment-card";
import { CommentComposer } from "./comment-composer";
import type { CommentSort, CommentThreadItem, PostViewer } from "./types";

/** Anchor of the conversation, linked from the post's "N comentarios" pill. */
export const CONVERSATION_ID = "conversacion";

const copy = postDetail.conversation;

const sortOptions = [
  { value: "votes", label: copy.sort.votes },
  { value: "recent", label: copy.sort.recent },
] as const satisfies readonly { value: CommentSort; label: string }[];

const compare: Record<CommentSort, (a: CommentThreadItem, b: CommentThreadItem) => number> = {
  votes: (a, b) => b.votes - a.votes || b.createdAt - a.createdAt,
  recent: (a, b) => b.createdAt - a.createdAt,
};

type CommentSectionProps = {
  postId: string;
  threads: readonly CommentThreadItem[];
  /** Comments and replies together. */
  total: number;
  viewer: PostViewer;
};

/** "Conversación": sort, the composer and every comment with its replies. */
export function CommentSection({ postId, threads, total, viewer }: CommentSectionProps) {
  const router = useRouter();
  const toast = useToast();
  const [sort, setSort] = useState<CommentSort>("votes");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const sorted = useMemo(() => [...threads].sort(compare[sort]), [threads, sort]);

  function reply(commentId: string) {
    if (!viewer) return router.push(site.loginHref);
    setReplyingTo(commentId);
  }

  return (
    <section id={CONVERSATION_ID} aria-labelledby="conversation-title" className="flex scroll-mt-6 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <DisplayText as="h2" size="md" id="conversation-title">
          {copy.title(total)}
        </DisplayText>
        {threads.length > 1 && (
          <SegmentedControl
            options={sortOptions}
            value={sort}
            onChange={setSort}
            tone="paper"
            aria-label={copy.sortLabel}
          />
        )}
      </div>

      <Card className="flex gap-3 rounded-[20px] p-4">
        {viewer ? (
          <>
            <Avatar
              variant={viewer.avatar}
              aria-hidden="true"
              className="size-10 font-text text-[13px] font-bold [box-shadow:none]"
            >
              <AvatarFallback>{viewer.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <CommentComposer
                id="new-comment"
                postId={postId}
                parentId={null}
                label={copy.composer.label}
                hideLabel
                placeholder={copy.composer.placeholder}
                help={copy.composer.help}
                linkError={copy.composer.linkError}
                submitLabel={copy.composer.submit}
                onPublished={() => {
                  setSort("recent");
                  toast(postDetail.toast.commentPublished);
                }}
              />
            </div>
          </>
        ) : (
          <div className="flex w-full flex-wrap items-center justify-between gap-3 px-2">
            <p className="text-v-text-2">{copy.signedOut.text}</p>
            <Button asChild className="h-11 px-5">
              <Link href={site.loginHref} className="no-underline">
                {copy.signedOut.cta}
              </Link>
            </Button>
          </div>
        )}
      </Card>

      {sorted.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {sorted.map((comment) => (
            <li key={comment.id}>
              <CommentCard
                postId={postId}
                comment={comment}
                replying={replyingTo === comment.id}
                onReply={() => reply(comment.id)}
                onCancelReply={() => setReplyingTo(null)}
                onReplied={() => {
                  setReplyingTo(null);
                  toast(postDetail.toast.replyPublished);
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-2 text-v-text-2">{copy.empty}</p>
      )}
    </section>
  );
}
