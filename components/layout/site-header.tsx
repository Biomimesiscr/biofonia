import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { StatusPill } from "@/components/shared/status-pill";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/content/home";
import { newPost } from "@/content/post";
import { session } from "@/di/container";
import { initials } from "@/lib/format";
import { AccountMenu } from "./account-menu";
import { MainNav } from "./main-nav";

export async function SiteHeader() {
  const user = await session.getCurrentUser();

  if (!user) {
    return (
      <Container as="header" className="flex flex-wrap items-center justify-between gap-4 py-6">
        <Logo name={site.name} />
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill label={site.statusLabel} />
          <Button asChild className="h-11 px-5">
            <Link href={site.loginHref} className="no-underline">
              {site.loginLabel}
            </Link>
          </Button>
        </div>
      </Container>
    );
  }

  const name = user.name ?? user.email;

  return (
    <header className="relative z-20 border-b border-[var(--bio-hairline)] bg-v-paper">
      <Container className="flex max-w-[1240px] flex-wrap items-center justify-between gap-4 py-3">
        <div className="flex flex-wrap items-center gap-6">
          <Logo name={site.name} size="sm" />
          <MainNav />
        </div>
        <div className="flex items-center gap-2">
          {user.isOnboarded && (
            <Button asChild className="h-10 px-[18px]">
              <Link href={newPost.href} className="no-underline">
                <Icon name="plus" className="size-[18px]" />
                {newPost.navLabel}
              </Link>
            </Button>
          )}
          <AccountMenu
            name={name}
            initials={initials(name)}
            userType={user.isOnboarded ? user.userType : null}
          />
        </div>
      </Container>
    </header>
  );
}
