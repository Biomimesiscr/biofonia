import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DisplayText } from "@/components/shared/display-text";
import { Icon } from "@/components/ui/icon";
import { profile } from "@/content/profile";
import { EditProfileForm } from "./edit-profile-form";
import type { EditableProfile } from "./types";

/** Heading, then the form to change name, role and biography. */
export function EditProfileView({ initial }: { initial: EditableProfile }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="flex max-w-[720px] flex-col gap-8 pt-10 pb-20">
          <div className="flex flex-col gap-3">
            <Link
              href="/perfil"
              className="flex min-h-11 items-center gap-1.5 self-start text-[14px] font-medium no-underline"
            >
              <Icon name="chevron-left" className="size-[18px]" />
              {profile.edit.back}
            </Link>
            <DisplayText as="h1" size="xl">
              {profile.edit.title}
            </DisplayText>
            <p className="text-[17px] leading-[1.55] text-v-text-2">{profile.edit.lead}</p>
          </div>
          <EditProfileForm initial={initial} />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
