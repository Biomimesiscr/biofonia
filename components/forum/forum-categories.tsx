import Link from "next/link";
import { CategoryDot } from "@/components/posts/category-dot";
import { Eyebrow } from "@/components/shared/eyebrow";
import { forum } from "@/content/forum";
import { cn } from "@/lib/utils";
import { forumHref } from "./forum-href";
import type { ForumCategoryItem, ForumFilters } from "./types";

type ForumCategoriesProps = {
  categories: readonly ForumCategoryItem[];
  /** Today's posts across every category. */
  total: number;
  filters: ForumFilters;
};

/** Left column: "Todo el foro" and each category, with today's post count. */
export function ForumCategories({ categories, total, filters }: ForumCategoriesProps) {
  const items = [
    { id: null, name: forum.categories.all, tone: "ink" as const, count: total },
    ...categories,
  ];
  return (
    <nav aria-label={forum.categories.label} className="flex max-w-60 flex-[1_1_220px] flex-col gap-1">
      <Eyebrow tone="pine" className="px-3 pb-2 text-v-text-2">
        {forum.categories.label}
      </Eyebrow>
      {items.map((item) => {
        const active = filters.categoria === item.id;
        return (
          <Link
            key={item.id ?? "all"}
            href={forumHref({ ...filters, categoria: item.id })}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center gap-2.5 rounded-xl px-3 text-[14px] text-v-text no-underline hover:bg-v-paper hover:text-v-text",
              active ? "bg-v-paper font-semibold" : "font-medium",
            )}
          >
            <CategoryDot tone={item.tone} className="size-2.5" />
            <span className="flex-1">{item.name}</span>
            <span className="text-[13px] font-normal text-v-text-2 tabular-nums">{item.count}</span>
          </Link>
        );
      })}
    </nav>
  );
}
