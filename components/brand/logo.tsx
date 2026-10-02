import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = { name: string; size?: "md" | "sm"; className?: string };

export function Logo({ name, size = "md", className }: LogoProps) {
  const mark = size === "sm" ? 28 : 32;

  return (
    <Link
      href="/"
      className={cn(
        "flex min-h-11 items-center text-v-text no-underline hover:text-v-text",
        size === "sm" ? "gap-2.5" : "gap-3",
        className,
      )}
    >
      <svg width={mark} height={mark} viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
        <rect x="3" y="11" width="4" height="10" rx="2" className="fill-v-ink" />
        <rect x="10" y="6" width="4" height="20" rx="2" className="fill-v-ink" />
        <rect x="17" y="3" width="4" height="26" rx="2" className="fill-v-pink" />
        <rect x="24" y="9" width="4" height="14" rx="2" className="fill-v-olive" />
      </svg>
      <span
        className={cn(
          "font-cojeev-display font-medium tracking-[-0.015em]",
          size === "sm" ? "text-[21px]" : "text-[26px]",
        )}
      >
        {name}
      </span>
    </Link>
  );
}
