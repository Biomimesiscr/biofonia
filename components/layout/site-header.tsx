import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { StatusPill } from "@/components/shared/status-pill";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/content/home";
import { newPost } from "@/content/post";
import { session } from "@/di/container";

export async function SiteHeader() {
  const user = await session.getCurrentUser();

  return (
    <Container as="header" className="flex flex-wrap items-center justify-between gap-4 py-6">
      <Logo name={site.name} />
      <div className="flex flex-wrap items-center gap-3">
        <StatusPill label={site.statusLabel} />
        {user ? (
          <>
            {user.isOnboarded ? (
              <>
                <Button asChild className="h-11 px-5">
                  <Link href={newPost.href} className="no-underline">
                    <Icon name="plus" className="size-[18px]" />
                    {newPost.navLabel}
                  </Link>
                </Button>
                <Link href="/perfil" className="text-[14px] font-medium">
                  {user.name}
                </Link>
              </>
            ) : (
              <Link href="/bienvenida" className="text-[14px] font-medium">
                {site.completeProfileLabel}
              </Link>
            )}
            <form action={logout}>
              <Button type="submit" variant="outline" className="h-11 px-5">
                {site.logoutLabel}
              </Button>
            </form>
          </>
        ) : (
          <Button asChild className="h-11 px-5">
            <Link href={site.loginHref} className="no-underline">
              {site.loginLabel}
            </Link>
          </Button>
        )}
      </div>
    </Container>
  );
}
