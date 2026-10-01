import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  toCategoryOption,
  toProfileData,
  toProfilePostItem,
} from "@/components/profile/profile-mappers";
import { ProfileView } from "@/components/profile/profile-view";
import { profile } from "@/content/profile";
import { postCategoryService, postService, session } from "@/di/container";

export const metadata: Metadata = { title: profile.metaTitle };

export default async function PerfilPage() {
  const user = await session.requireUser();
  if (!user.isOnboarded) redirect("/bienvenida");

  const [posts, categories] = await Promise.all([
    postService.listByAuthor(user.id!, { includeDrafts: true }),
    postCategoryService.list(),
  ]);

  return (
    <ProfileView
      profile={toProfileData(user, posts)}
      posts={posts.map(toProfilePostItem)}
      categories={categories.map(toCategoryOption)}
      isOwner
    />
  );
}
