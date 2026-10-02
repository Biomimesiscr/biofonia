import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { EditProfileView } from "@/components/profile/edit-profile-view";
import { profile } from "@/content/profile";
import { session } from "@/di/container";

export const metadata: Metadata = { title: profile.edit.metaTitle };

export default async function EditarPerfilPage() {
  const user = await session.requireUser();
  if (!user.isOnboarded) redirect("/bienvenida");

  return (
    <EditProfileView
      initial={{
        name: user.name ?? "",
        userType: user.userType,
        biography: user.biography ?? "",
      }}
    />
  );
}
