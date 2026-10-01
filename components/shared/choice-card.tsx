import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ChoiceCardProps = ComponentProps<"label"> & {
  /** Whether the radio/checkbox inside is selected. */
  checked: boolean;
};

/** Large clickable label wrapping a radio: 2px border, tinted when selected. */
export function ChoiceCard({ checked, className, ...props }: ChoiceCardProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer rounded-[20px] border-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-v-brand",
        checked ? "border-v-ink bg-v-pink-soft" : "border-v-border bg-v-paper",
        className,
      )}
      {...props}
    />
  );
}
