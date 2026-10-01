import type { ForumSort } from "@/application/post/dtos/ForumQuery";

/** Sort names as they appear in the URL (`?orden=`), in display order. */
export const FORUM_SORT_PARAMS = ["hoy", "recientes", "mes"] as const;
export type ForumSortParam = (typeof FORUM_SORT_PARAMS)[number];

export const sortFromParam: Record<ForumSortParam, ForumSort> = {
  hoy: "today",
  recientes: "recent",
  mes: "month",
};
