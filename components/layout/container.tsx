import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & Omit<ComponentProps<T>, "as">;

/** Centered 1200px column with 24px gutters. */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Comp: ElementType = as ?? "div";
  return (
    <Comp className={cn("mx-auto w-full max-w-[1200px] px-6", className)} {...props} />
  );
}
