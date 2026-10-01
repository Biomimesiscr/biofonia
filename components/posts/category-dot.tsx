import { dotClass } from "@/components/shared/tone";
import type { CategoryTone } from "@/content/forum";
import { cn } from "@/lib/utils";

export function CategoryDot({ tone, className }: { tone: CategoryTone; className?: string }) {
  return <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", dotClass[tone], className)} />;
}
