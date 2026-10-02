"use client";

import { cn } from "@/lib/utils";

const activeTone = {
  /** Clay pill, as on the access page. */
  accent: "bg-v-pink font-semibold text-v-on-accent",
  /** White pill lifted from the track. */
  paper: "bg-v-paper font-semibold text-v-text",
} as const;

type SegmentedControlProps<T extends string> = {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  "aria-label": string;
  tone?: keyof typeof activeTone;
  /** Stretch the segments to fill the track. */
  fill?: boolean;
  className?: string;
};

/** Pill toggle of mutually exclusive views (`aria-pressed` buttons on a beige track). */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  tone = "accent",
  fill = false,
  className,
  ...props
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={props["aria-label"]}
      className={cn("flex gap-1 rounded-full bg-v-beige p-1", className)}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-10 min-w-0 cursor-pointer rounded-full px-4 py-1.5 text-[14px] leading-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v-brand",
              fill && "min-h-11 flex-1",
              active ? activeTone[tone] : "font-medium text-v-text",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
