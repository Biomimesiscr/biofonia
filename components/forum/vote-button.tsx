"use client";

import { toggleVote } from "@/app/actions/vote";
import { useOptimisticToggle } from "@/components/shared/use-optimistic-toggle";
import { Icon } from "@/components/ui/icon";
import { forum } from "@/content/forum";
import { cn } from "@/lib/utils";

type VoteButtonProps = { postId: string; votes: number; voted: boolean };

/** Upvote toggle with its count; updates at once and settles when the server answers. */
export function VoteButton({ postId, votes, voted }: VoteButtonProps) {
  const [vote, toggle] = useOptimisticToggle({ active: voted, count: votes }, () => toggleVote(postId));

  return (
    <div className="flex w-11 shrink-0 sm:w-13 flex-col items-center gap-0.5">
      <button
        type="button"
        aria-pressed={vote.active}
        aria-label={forum.vote.label}
        onClick={toggle}
        className={cn(
          "flex size-11 cursor-pointer items-center justify-center rounded-full text-v-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v-brand",
          vote.active ? "bg-v-pink" : "bg-v-beige text-v-text hover:bg-v-beige-2",
        )}
      >
        <Icon name="arrow-up" className="size-5" />
      </button>
      <span
        className={cn(
          "text-[15px] font-bold tabular-nums",
          vote.active ? "text-v-accent-ink" : "text-v-text",
        )}
      >
        {vote.count}
      </span>
      <span className="text-[11px] text-v-text-2">{forum.vote.unit}</span>
    </div>
  );
}
