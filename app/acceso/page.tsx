import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthAside } from "@/components/auth/auth-aside";
import { AuthPanel } from "@/components/auth/auth-panel";
import { access } from "@/content/auth";
import { session } from "@/di/container";

export const metadata: Metadata = { title: access.metaTitle };

export default async function AccesoPage({ searchParams }: PageProps<"/acceso">) {
  const user = await session.getCurrentUser();
  if (user) redirect(user.isOnboarded ? "/" : "/bienvenida");

  const { modo, error } = await searchParams;

  return (
    <div className="flex min-h-screen flex-wrap content-start bg-v-canvas md:content-stretch text-v-text">
      <AuthAside />
      <main className="flex flex-[1_1_480px] items-start justify-center px-6 py-8 md:items-center md:py-[clamp(24px,4vw,64px)]">
        <AuthPanel
          initialMode={modo === "registro" ? "registro" : "login"}
          notice={error === "google" ? access.googleError : undefined}
        />
      </main>
    </div>
  );
}
