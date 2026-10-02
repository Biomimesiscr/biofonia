import type { CategoryOption } from "@/components/posts/category-filter";
import type { UserType } from "@/components/profile/role-style";

/** Who is writing: shown in the live preview. */
export type NewPostAuthor = {
  name: string;
  initials: string;
  userType: UserType;
};

export type NewPostCategory = CategoryOption & { description: string | null };
