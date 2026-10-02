"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { forum } from "@/content/forum";
import { cn } from "@/lib/utils";
import {
  FORUM_SORT_PARAMS,
  type ForumSortParam,
} from "@/presentation/post/forumSortParams";
import { forumHref } from "./forum-href";
import type { ForumFilters } from "./types";

const options = FORUM_SORT_PARAMS.map((value) => ({ value, label: forum.sort.options[value].label }));

/** "Destacadas de hoy" · "Recientes" · "Más votadas del mes", kept in the URL. */
export function ForumSort({ filters }: { filters: ForumFilters }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function change(orden: ForumSortParam) {
    startTransition(() => router.replace(forumHref({ ...filters, orden }), { scroll: false }));
  }

  return (
    <SegmentedControl
      aria-label={forum.sort.label}
      options={options}
      value={filters.orden}
      onChange={change}
      className={cn("max-sm:w-full max-sm:[&>button]:flex-1", pending && "opacity-70")}
    />
  );
}
