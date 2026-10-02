import type { CategoryOption } from "@/components/posts/category-filter";
import type { CategoryTone } from "@/content/forum";

/** Serializable profile data: entities never reach client components. */
export type ProfileData = {
  name: string;
  initials: string;
  userType: "IN_LABORATORY" | "IN_FIELD";
  biography: string | null;
  memberSince: string;
  publishedCount: number;
  votesReceived: number;
};

export type ProfilePostItem = {
  id: string;
  title: string;
  excerpt: string;
  published: boolean;
  category: { id: string; name: string; tone: CategoryTone } | null;
  date: string;
  views: number;
  comments: number;
  votes: number;
};

export type { CategoryOption };
