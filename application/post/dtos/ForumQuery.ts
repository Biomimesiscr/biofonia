export const FORUM_SORTS = ["today", "recent", "month"] as const;

/** "today": last 24 h by votes; "recent": newest first; "month": last 30 days by votes. */
export type ForumSort = (typeof FORUM_SORTS)[number];

export interface ForumQuery {
  categoryId: string | null;
  sort: ForumSort;
  /** The signed-in user, to mark the posts they voted for. */
  viewerId: string | null;
}
