import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = { name: string; className?: string };

export function Logo({ name, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex min-h-11 items-center gap-3 text-v-text no-underline hover:text-v-text",
        className,
      )}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
        <rect x="3" y="11" width="4" height="10" rx="2" className="fill-v-ink" />
        <rect x="10" y="6" width="4" height="20" rx="2" className="fill-v-ink" />
        <rect x="17" y="3" width="4" height="26" rx="2" className="fill-v-pink" />
        <rect x="24" y="9" width="4" height="14" rx="2" className="fill-v-olive" />
      </svg>
      <span className="font-cojeev-display text-[26px] font-medium tracking-[-0.015em]">
        {name}
      </span>
    </Link>
  );
}
