import type { ReactNode } from "react";
import { AudienceBadge } from "@/components/shared/audience-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Audience } from "@/content/home";
import { cn } from "@/lib/utils";

export type PostAuthor = {
  name: string;
  initials: string;
  avatar: "pink" | "olive";
  audience: Audience;
};

const sizes = {
  sm: { avatar: "size-6 text-[10px]", name: "" },
  md: { avatar: "size-8 text-[11px]", name: "text-[14px] font-semibold text-v-text" },
  lg: { avatar: "size-11 text-[14px]", name: "text-[15px] font-semibold text-v-text" },
} as const;

type AuthorLineProps = {
  author: PostAuthor;
  size?: keyof typeof sizes;
  /** Extra pills after the audience badge (e.g. "Autor del post"). */
  children?: ReactNode;
  className?: string;
};

/** Avatar, name and "Laboratorio" / "Territorio" pill of whoever wrote a post or comment. */
export function AuthorLine({ author, size = "sm", children, className }: AuthorLineProps) {
  const style = sizes[size];
  return (
    <span className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="flex items-center gap-1.5">
        <Avatar
          variant={author.avatar}
          aria-hidden="true"
          className={cn("font-text font-bold [box-shadow:none]", style.avatar)}
        >
          <AvatarFallback>{author.initials}</AvatarFallback>
        </Avatar>
        <span className={style.name}>{author.name}</span>
      </span>
      <AudienceBadge audience={author.audience} />
      {children}
    </span>
  );
}
