"use client";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const sizes = {
  md: { button: "h-11 gap-2 px-4 text-[14px]", icon: "size-[18px]" },
  sm: { button: "h-9 gap-1.5 px-3 text-[13px]", icon: "size-4" },
} as const;

type VotePillProps = {
  voted: boolean;
  count: number;
  onToggle: () => void;
  /** Accessible name; the count is appended to it. */
  label: string;
  /** Word after the count ("votos"); omitted on comments. */
  unit?: string;
  size?: keyof typeof sizes;
};

/** Pill-shaped upvote toggle: arrow and count, clay when voted. */
export function VotePill({ voted, count, onToggle, label, unit, size = "md" }: VotePillProps) {
  const style = sizes[size];
  return (
    <button
      type="button"
      aria-pressed={voted}
      aria-label={`${label}, ${count}`}
      onClick={onToggle}
      className={cn(
        "flex cursor-pointer items-center rounded-full font-semibold text-v-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v-brand",
        style.button,
        voted ? "bg-v-pink" : "bg-v-beige text-v-text hover:bg-v-beige-2",
      )}
    >
      <Icon name="arrow-up" className={style.icon} />
      <span className="tabular-nums">{count}</span>
      {unit && <span>{unit}</span>}
    </button>
  );
}
