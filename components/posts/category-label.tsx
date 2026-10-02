import type { CategoryTone } from "@/content/forum";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { CategoryDot } from "./category-dot";

type CategoryLabelProps = {
  category: { name: string; tone: CategoryTone } | null;
  className?: string;
};

/** A post's category: coloured dot and name ("Sin categoría" when it has none). */
export function CategoryLabel({ category, className }: CategoryLabelProps) {
  return (
    <span className={cn("flex items-center gap-1.5 font-semibold text-v-text", className)}>
      {category && <CategoryDot tone={category.tone} />}
      {category?.name ?? profile.posts.uncategorized}
    </span>
  );
}
