"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/home";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/** Inicio / Foro pills; the current section is filled. */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label={site.navLabel} className="flex items-center gap-1">
      {site.nav.map(({ label, href }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-10 items-center rounded-full px-4 text-[14px] text-v-text no-underline hover:bg-v-beige-2 hover:text-v-text",
              active ? "bg-v-beige font-semibold hover:bg-v-beige" : "font-medium",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
