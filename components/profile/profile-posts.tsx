"use client";

import { useState } from "react";
import { CategoryFilter } from "@/components/posts/category-filter";
import { SearchField } from "@/components/posts/search-field";
import { DisplayText } from "@/components/shared/display-text";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { Card } from "@/components/ui/card";
import { profile } from "@/content/profile";
import { ProfilePostCard } from "./profile-post-card";
import type { CategoryOption, ProfilePostItem } from "./types";

type View = "published" | "drafts";

type ProfilePostsProps = {
  posts: readonly ProfilePostItem[];
  categories: readonly CategoryOption[];
  isOwner: boolean;
};

/** The author's posts: view toggle (owner only), search and category filter. */
export function ProfilePosts({ posts, categories, isOwner }: ProfilePostsProps) {
  const [view, setView] = useState<View>("published");
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const published = posts.filter((post) => post.published);
  const drafts = posts.filter((post) => !post.published);
  const needle = query.trim().toLowerCase();
  const visible = (view === "drafts" ? drafts : published)
    .filter((post) => category === null || post.category?.id === category)
    .filter((post) => !needle || `${post.title} ${post.excerpt}`.toLowerCase().includes(needle));

  const views: { value: View; label: string }[] = [
    { value: "published", label: `${profile.posts.views.published} · ${published.length}` },
    { value: "drafts", label: `${profile.posts.views.drafts} · ${drafts.length}` },
  ];

  return (
    <section
      aria-labelledby="profile-posts"
      className="flex min-w-0 flex-[999_1_520px] flex-col gap-6 pt-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <DisplayText as="h2" id="profile-posts" size="lg">
          {isOwner ? profile.posts.ownTitle : profile.posts.title}
        </DisplayText>
        {isOwner && (
          <SegmentedControl
            aria-label={profile.posts.viewsLabel}
            options={views}
            value={view}
            onChange={setView}
            tone="paper"
          />
        )}
      </div>

      <SearchField
        label={profile.posts.searchLabel}
        placeholder={profile.posts.searchPlaceholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {categories.length > 0 && (
        <CategoryFilter
          aria-label={profile.posts.categoriesLabel}
          allLabel={profile.posts.allCategories}
          categories={categories}
          value={category}
          onChange={setCategory}
        />
      )}

      <div className="flex flex-col gap-3">
        {visible.map((post) => (
          <ProfilePostCard key={post.id} post={post} />
        ))}
        {visible.length === 0 && (
          <Card className="rounded-[20px] px-6 py-10 text-center text-v-text-2">
            {posts.length === 0 ? profile.posts.noPosts : profile.posts.empty}
          </Card>
        )}
      </div>
    </section>
  );
}
