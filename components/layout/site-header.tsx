import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { StatusPill } from "@/components/shared/status-pill";
import { Button } from "@/components/ui/button";
import { site } from "@/content/home";

export function SiteHeader() {
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
