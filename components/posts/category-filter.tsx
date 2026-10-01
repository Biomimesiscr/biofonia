"use client";

import { CategoryDot } from "@/components/posts/category-dot";
import type { CategoryTone } from "@/content/forum";
import { cn } from "@/lib/utils";

export type CategoryOption = { id: string; name: string; tone: CategoryTone };

type CategoryFilterProps = {
  categories: readonly CategoryOption[];
  /** Selected category id, or null for all of them. */
  value: string | null;
  onChange: (id: string | null) => void;
  allLabel: string;
  "aria-label": string;
};

/** Chips to filter posts by category; "all" comes first. */
export function CategoryFilter({ categories, value, onChange, allLabel, ...props }: CategoryFilterProps) {
  const chips: { id: string | null; name: string; tone: CategoryTone }[] = [
    { id: null, name: allLabel, tone: "ink" },
    ...categories,
  ];
  return (
    <div role="group" aria-label={props["aria-label"]} className="flex flex-wrap gap-2">
      {chips.map((chip) => {
        const active = chip.id === value;
        return (
          <button
            key={chip.id ?? "all"}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(chip.id)}
            className={cn(
              "flex h-9 cursor-pointer items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium text-v-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v-brand",
              active ? "border-v-pink bg-v-pink text-v-on-accent" : "border-v-edge bg-v-paper",
            )}
          >
            <CategoryDot tone={chip.tone} />
            {chip.name}
          </button>
        );
      })}
    </div>
  );
}
