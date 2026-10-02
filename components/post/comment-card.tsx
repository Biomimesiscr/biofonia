"use client";

import type { ReactNode } from "react";
import { toggleCommentVote } from "@/app/actions/comment";
import { AuthorLine } from "@/components/posts/author-line";
import { useOptimisticToggle } from "@/components/shared/use-optimistic-toggle";
import { VotePill } from "@/components/shared/vote-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { postDetail } from "@/content/post-detail";
import { cn } from "@/lib/utils";
import { CommentComposer } from "./comment-composer";
import type { CommentItem, CommentThreadItem } from "./types";

const copy = postDetail.conversation;

type CommentCardProps = {
  postId: string;
  comment: CommentThreadItem;
  replying: boolean;
  onReply: () => void;
  onCancelReply: () => void;
  onReplied: () => void;
};

/** A top-level comment, its replies and, when open, the reply composer. */
export function CommentCard({ postId, comment, replying, onReply, onCancelReply, onReplied }: CommentCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col gap-3 rounded-[20px] p-5 [box-shadow:inset_0_0_0_2px_transparent]",
        replying && "[box-shadow:inset_0_0_0_2px_var(--v-pink)]",
      )}
    >
      <CommentBody comment={comment} kind="comment">
        <Button
          variant="ghost"
          size="sm"
          aria-expanded={replying}
          onClick={onReply}
          className="h-9 px-3 text-[13px] font-medium"
        >
          <Icon name="reply" className="size-4" />
          {copy.reply.action}
        </Button>
      </CommentBody>

      {replying && (
        <div className="pl-[42px]">
          <CommentComposer
            id={`reply-${comment.id}`}
            postId={postId}
            parentId={comment.id}
            label={copy.reply.label(comment.author.name)}
            help={copy.reply.help}
            linkError={copy.reply.linkError}
            submitLabel={copy.reply.submit}
            rows={2}
            autoFocus
            onPublished={onReplied}
            onCancel={onCancelReply}
            cancelLabel={copy.reply.cancel}
          />
        </div>
      )}

      {comment.replies.length > 0 && (
        <ul
          aria-label={copy.reply.repliesLabel(comment.author.name)}
          className="ml-4 flex flex-col gap-4 border-l-2 border-[var(--bio-hairline)] pl-6"
        >
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <CommentBody comment={reply} kind="reply" />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

type CommentBodyProps = {
  comment: CommentItem;
  kind: "comment" | "reply";
  /** Extra actions after the vote (Responder). */
  children?: ReactNode;
};

/** Header (author, badges, time), text and actions: shared by comments and replies. */
function CommentBody({ comment, kind, children }: CommentBodyProps) {
  const indent = kind === "comment" ? "pl-[42px]" : "pl-[38px]";
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2.5 text-[13px] text-v-text-2">
        <AuthorLine author={comment.author} size="md">
          {comment.isPostAuthor && (
            <Badge className="h-auto px-2 py-0.5 text-xs font-semibold">{postDetail.postAuthor}</Badge>
          )}
        </AuthorLine>
        <span aria-hidden="true">·</span>
        <span>{comment.date}</span>
      </div>
      <p className={cn("leading-[1.6] break-words whitespace-pre-line", indent)}>{comment.text}</p>
      <div className={cn("flex flex-wrap items-center gap-1", kind === "comment" ? "pl-[34px]" : "pl-[30px]")}>
        <CommentVote comment={comment} label={copy.vote[kind]} />
        {children}
      </div>
    </div>
  );
}

function CommentVote({ comment, label }: { comment: CommentItem; label: string }) {
  const [vote, toggle] = useOptimisticToggle({ active: comment.voted, count: comment.votes }, () =>
    toggleCommentVote(comment.id),
  );
  return <VotePill voted={vote.active} count={vote.count} onToggle={toggle} label={label} size="sm" />;
}
