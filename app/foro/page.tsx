import type { Metadata } from "next";
import { toForumPostItem, toTopPostItem } from "@/components/forum/forum-mappers";
import { ForumView } from "@/components/forum/forum-view";
import { toCategoryOption } from "@/components/profile/profile-mappers";
import { forum } from "@/content/forum";
import { postCategoryService, postService, session } from "@/di/container";
import { sortFromParam } from "@/presentation/post/forumSortParams";
import { ForumSearchParamsSchema } from "@/presentation/post/validators/forum.validator";

export const metadata: Metadata = { title: forum.metaTitle };

export default async function ForoPage(props: PageProps<"/foro">) {
  const filters = ForumSearchParamsSchema.parse(await props.searchParams);
  const viewer = await session.getCurrentUser();

  const [posts, topPosts, today, categories] = await Promise.all([
    postService.listForum({
      categoryId: filters.categoria,
      sort: sortFromParam[filters.orden],
      viewerId: viewer?.id ?? null,
    }),
    postService.topOfMonth(),
    postService.countToday(),
    postCategoryService.list(),
  ]);

  return (
    <ForumView
      posts={posts.map(toForumPostItem)}
      topPosts={topPosts.map(toTopPostItem)}
      totalToday={today.total}
      categories={categories.map((category) => ({
        ...toCategoryOption(category),
        count: today.byCategory[category.id!] ?? 0,
      }))}
      filters={filters}
    />
  );
}
