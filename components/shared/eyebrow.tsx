import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const tones = {
  clay: "text-v-accent-ink",
  pine: "text-v-ink",
  inverse: "text-v-on-ink",
} as const;

type EyebrowProps = ComponentProps<"p"> & { tone?: keyof typeof tones };

export function Eyebrow({ tone = "clay", className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.075em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
