import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProfileBanner } from "./profile-banner";
import { ProfileCard } from "./profile-card";
import { ProfilePosts } from "./profile-posts";
import { ProfileStats } from "./profile-stats";
import type { CategoryOption, ProfileData, ProfilePostItem } from "./types";

type ProfileViewProps = {
  profile: ProfileData;
  posts: readonly ProfilePostItem[];
  categories: readonly CategoryOption[];
  isOwner: boolean;
};

/** Banner, profile card + stats on the left, the author's posts on the right. */
export function ProfileView({ profile, posts, categories, isOwner }: ProfileViewProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <ProfileBanner />
        <Container className="flex flex-wrap items-start gap-6 pb-16 sm:pb-20 lg:gap-10">
          <aside className="-mt-[72px] flex flex-[1_1_320px] flex-col gap-6 lg:max-w-[380px]">
            <ProfileCard profile={profile} isOwner={isOwner} />
            <ProfileStats profile={profile} />
          </aside>
          <ProfilePosts posts={posts} categories={categories} isOwner={isOwner} />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
