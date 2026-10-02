import Link from "next/link";
import { CategoryDot } from "@/components/posts/category-dot";
import { AudienceBadge } from "@/components/shared/audience-badge";
import { Stat } from "@/components/shared/stat";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Post } from "@/content/home";

type PostCardProps = Post & {
  votesLabel: string;
  commentsLabel: string;
};

export function PostCard({
  href,
  category,
  title,
  author,
  audience,
  votes,
  comments,
  votesLabel,
  commentsLabel,
}: PostCardProps) {
  return (
    <Link
      href={href}
      className="flex basis-[300px] flex-1 text-v-text no-underline hover:text-v-text"
    >
      <Card lift className="flex flex-1 flex-col gap-3.5 rounded-[20px] p-6">
        <span className="flex items-center gap-1.5 text-[13px] font-semibold">
          <CategoryDot tone={category.tone} />
          {category.label}
        </span>
        <span className="text-[19px] leading-[1.3] font-semibold">{title}</span>
        <span className="flex flex-wrap items-center gap-2 text-[13px] text-v-text-2">
          <Avatar
            variant={author.tone}
            className="size-6 font-text text-[10px] font-bold [box-shadow:none]"
          >
            <AvatarFallback>{author.initials}</AvatarFallback>
          </Avatar>
          {author.name}
          <AudienceBadge audience={audience} />
        </span>
        <span className="mt-auto flex flex-col">
          <Separator decorative className="mt-0 mb-0 mx-0 [background:var(--bio-hairline)]" />
          <span className="flex gap-4 pt-3 text-[13px] text-v-text-2">
            <Stat icon="arrow-up" value={votes} label={votesLabel} />
            <Stat icon="message-circle" value={comments} label={commentsLabel} />
          </span>
        </span>
      </Card>
    </Link>
  );
}
