import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  hero: "text-[clamp(40px,9vw,72px)] leading-[0.95] tracking-[-0.03em]",
  xl: "text-[clamp(32px,4.5vw,44px)] leading-[1.08] tracking-[-0.015em]",
  lg: "text-[clamp(26px,3.2vw,44px)] leading-[1.05] tracking-[-0.015em]",
  md: "text-[26px] leading-[1.2] tracking-[-0.015em]",
} as const;

type DisplayTextProps<T extends ElementType> = {
  as?: T;
  size: keyof typeof sizes;
} & Omit<ComponentProps<T>, "as" | "size">;

/** Bricolage Grotesque display copy with the design's size presets. */
export function DisplayText<T extends ElementType = "p">({
  as,
  size,
  className,
  ...props
}: DisplayTextProps<T>) {
  const Comp: ElementType = as ?? "p";
  return (
    <Comp
      className={cn("font-cojeev-display font-medium text-balance", sizes[size], className)}
      {...props}
    />
  );
}
