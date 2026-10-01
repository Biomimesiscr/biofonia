import type { CategoryOption } from "@/components/posts/category-filter";
import type { CategoryTone } from "@/content/forum";
import type { Audience } from "@/content/home";
import type { ForumSortParam } from "@/presentation/post/forumSortParams";

/** Serializable post for the forum feed: entities never reach client components. */
export type ForumPostItem = {
  id: string;
  title: string;
  excerpt: string;
  category: { name: string; tone: CategoryTone } | null;
  author: { name: string; initials: string; avatar: "pink" | "olive"; audience: Audience };
  date: string;
  views: number;
  comments: number;
  votes: number;
  /** Whether the viewer already voted for it. */
  voted: boolean;
};

export type TopPostItem = { id: string; title: string; votes: number; category: string };

export type ForumCategoryItem = CategoryOption & { count: number };

/** The current filters, as read from the URL. */
export type ForumFilters = { categoria: string | null; orden: ForumSortParam };
