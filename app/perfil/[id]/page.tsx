import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import {
  toCategoryOption,
  toProfileData,
  toProfilePostItem,
} from "@/components/profile/profile-mappers";
import { ProfileView } from "@/components/profile/profile-view";
import { profile } from "@/content/profile";
import { postCategoryService, postService, session, userService } from "@/di/container";
import NotFoundError from "@/domain/core/errors/NotFoundError";

/** The onboarded user behind `id`, or a 404. Shared by the page and its metadata. */
const getProfileUser = cache(async (id: string) => {
  try {
    const user = await userService.get(id);
    if (!user.isOnboarded) notFound();
    return user;
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
});

export async function generateMetadata(props: PageProps<"/perfil/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const user = await getProfileUser(id);
  return { title: profile.metaTitleOf(user.name ?? user.email) };
}

export default async function PublicProfilePage(props: PageProps<"/perfil/[id]">) {
  const { id } = await props.params;
  const viewer = await session.getCurrentUser();
  if (viewer?.id === id) redirect("/perfil");

  const user = await getProfileUser(id);
  const [posts, categories] = await Promise.all([
    postService.listByAuthor(id, { includeDrafts: false }),
    postCategoryService.list(),
  ]);

  return (
    <ProfileView
      profile={toProfileData(user, posts)}
      posts={posts.map(toProfilePostItem)}
      categories={categories.map(toCategoryOption)}
      isOwner={false}
    />
  );
}
