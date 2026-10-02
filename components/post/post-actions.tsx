"use client";

import { toggleVote } from "@/app/actions/vote";
import { useToast } from "@/components/shared/toast";
import { useOptimisticToggle } from "@/components/shared/use-optimistic-toggle";
import { VotePill } from "@/components/shared/vote-pill";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { postDetail } from "@/content/post-detail";
import { CONVERSATION_ID } from "./comment-section";
import { ReportDialog } from "./report-dialog";
import type { ReportReasonOption } from "./types";

type PostActionsProps = {
  postId: string;
  votes: number;
  voted: boolean;
  comments: number;
  reasons: readonly ReportReasonOption[];
};

const copy = postDetail.actions;
const pillClass = "h-11 px-4 text-[14px] font-medium";

/** Vote, jump to the conversation, save (soon), share and report. */
export function PostActions({ postId, votes, voted, comments, reasons }: PostActionsProps) {
  const toast = useToast();
  const [vote, toggle] = useOptimisticToggle({ active: voted, count: votes }, () => toggleVote(postId));
  const saveHintId = `save-soon-${postId}`;

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast(postDetail.toast.linkCopied);
    } catch {
      // Clipboard blocked (e.g. insecure origin): nothing to confirm.
    }
  }

  return (
    <div
      role="group"
      aria-label={copy.label}
      className="flex flex-wrap items-center gap-2 border-t border-[var(--bio-hairline)] pt-4"
    >
      <VotePill voted={vote.active} count={vote.count} onToggle={toggle} label={copy.voteLabel} unit={copy.votes} />

      <Button asChild variant="ghost" className={`${pillClass} bg-v-beige`}>
        <a href={`#${CONVERSATION_ID}`} className="no-underline">
          <Icon name="message-circle" className="size-[18px]" />
          {comments} {copy.comments}
        </a>
      </Button>

      <span className="flex items-center gap-2">
        <Button variant="ghost" disabled aria-describedby={saveHintId} className={pillClass}>
          <Icon name="bookmark" className="size-[18px]" />
          {copy.save}
        </Button>
        <span id={saveHintId} className="text-[12px] text-v-text-3">
          {copy.saveSoon}
        </span>
      </span>

      <Button variant="ghost" onClick={share} className={pillClass}>
        <Icon name="share-2" className="size-[18px]" />
        {copy.share}
      </Button>

      <ReportDialog postId={postId} reasons={reasons} className={`${pillClass} ml-auto text-v-text-2`} />
    </div>
  );
}
