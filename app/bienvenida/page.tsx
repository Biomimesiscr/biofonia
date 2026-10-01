import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { onboarding } from "@/content/auth";
import { session } from "@/di/container";

export const metadata: Metadata = { title: onboarding.metaTitle };

export default async function BienvenidaPage() {
  const user = await session.requireUser();
  if (user.isOnboarded) redirect("/");

  return <OnboardingWizard />;
}
