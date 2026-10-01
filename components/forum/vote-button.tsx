"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { toggleVote } from "@/app/actions/vote";
import { Icon } from "@/components/ui/icon";
import { forum } from "@/content/forum";
import { site } from "@/content/home";
import { cn } from "@/lib/utils";

type VoteButtonProps = { postId: string; votes: number; voted: boolean };

/** Upvote toggle with its count; updates at once and settles when the server answers. */
export function VoteButton({ postId, votes, voted }: VoteButtonProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(
    { votes, voted },
    (current, nextVoted: boolean) => ({
      voted: nextVoted,
      votes: current.votes + (nextVoted ? 1 : -1),
    }),
  );

  function vote() {
    startTransition(async () => {
      setOptimistic(!optimistic.voted);
      const result = await toggleVote(postId);
      if ("requiresLogin" in result) router.push(site.loginHref);
    });
  }

  return (
    <div className="flex w-13 shrink-0 flex-col items-center gap-0.5">
      <button
        type="button"
        aria-pressed={optimistic.voted}
        aria-label={forum.vote.label}
        onClick={vote}
        className={cn(
          "flex size-11 cursor-pointer items-center justify-center rounded-full text-v-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v-brand",
          optimistic.voted ? "bg-v-pink" : "bg-v-beige text-v-text hover:bg-v-beige-2",
        )}
      >
        <Icon name="arrow-up" className="size-5" />
      </button>
      <span
        className={cn(
          "text-[15px] font-bold tabular-nums",
          optimistic.voted ? "text-v-accent-ink" : "text-v-text",
        )}
      >
        {optimistic.votes}
      </span>
      <span className="text-[11px] text-v-text-2">{forum.vote.unit}</span>
    </div>
  );
}
