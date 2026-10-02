import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NewPostView } from "@/components/new-post/new-post-view";
import { toCategoryOption } from "@/components/profile/profile-mappers";
import { categoryDescription } from "@/content/forum";
import { newPost } from "@/content/post";
import { postCategoryService, session } from "@/di/container";
import { initials } from "@/lib/format";

export const metadata: Metadata = { title: newPost.metaTitle };

export default async function PublicarPage() {
  const user = await session.requireUser();
  if (!user.isOnboarded) redirect("/bienvenida");

  const categories = await postCategoryService.list();
  const name = user.name ?? user.email;

  return (
    <NewPostView
      author={{ name, initials: initials(name), userType: user.userType }}
      categories={categories.map((category) => ({
        ...toCategoryOption(category),
        description: categoryDescription(category.name),
      }))}
    />
  );
}
