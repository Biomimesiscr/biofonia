import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ForumRulesCard } from "@/components/posts/forum-rules-card";
import { DisplayText } from "@/components/shared/display-text";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { forum } from "@/content/forum";
import { newPost } from "@/content/post";
import { ForumBanner } from "./forum-banner";
import { ForumCategories } from "./forum-categories";
import { ForumEmpty } from "./forum-empty";
import { ForumPostCard } from "./forum-post-card";
import { ForumSort } from "./forum-sort";
import { TopPosts } from "./top-posts";
import type { ForumCategoryItem, ForumFilters, ForumPostItem, TopPostItem } from "./types";

type ForumViewProps = {
  posts: readonly ForumPostItem[];
  categories: readonly ForumCategoryItem[];
  totalToday: number;
  topPosts: readonly TopPostItem[];
  filters: ForumFilters;
};

/** Categories on the left, the feed in the middle, banner, top posts and rules on the right. */
export function ForumView({ posts, categories, totalToday, topPosts, filters }: ForumViewProps) {
  const sort = forum.sort.options[filters.orden];
  return (
    <>
      <SiteHeader />
      <Container className="flex max-w-[1240px] flex-1 flex-wrap items-start gap-6 pt-6 pb-16 sm:gap-8 sm:pt-8 sm:pb-20">
        <ForumCategories categories={categories} total={totalToday} filters={filters} />

        <main className="flex min-w-0 flex-[999_1_520px] flex-col gap-5">
          <div className="flex flex-col gap-2">
            <DisplayText as="h1" size="xl">
              {sort.title}
            </DisplayText>
            <p className="text-v-text-2">{sort.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <ForumSort filters={filters} />
            <Button asChild variant="outline" className="h-11 bg-v-paper px-5 max-sm:w-full">
              <Link href={newPost.href} className="no-underline">
                <Icon name="plus" className="size-[18px]" />
                {forum.share}
              </Link>
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {posts.length > 0 ? (
              posts.map((post) => <ForumPostCard key={post.id} post={post} />)
            ) : (
              <ForumEmpty />
            )}
          </div>
        </main>

        <aside className="flex flex-[1_1_280px] flex-col gap-4 max-lg:grid max-lg:grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] max-lg:items-start lg:max-w-80">
          <ForumBanner />
          <TopPosts posts={topPosts} />
          <ForumRulesCard variant="summary" />
        </aside>
      </Container>
      <SiteFooter />
    </>
  );
}
