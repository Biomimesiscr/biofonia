import Link from "next/link";
import { dotClass } from "@/components/shared/tone";
import { Stat } from "@/components/shared/stat";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Audience, Post } from "@/content/home";

const audienceBadge: Record<Audience, string> = {
  laboratorio: "bg-surface-memory text-v-ink",
  territorio: "bg-surface-library text-v-accent-ink",
};

type PostCardProps = Post & {
  audienceLabel: string;
  votesLabel: string;
  commentsLabel: string;
};

export function PostCard({
  href,
  category,
  title,
  author,
  audience,
  audienceLabel,
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
          <span className={cn("size-2 rounded-full", dotClass[category.tone])} />
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
          <Badge
            variant="default"
            className={cn(
              "h-auto px-2 py-0.5 text-xs font-semibold",
              audienceBadge[audience],
            )}
          >
            {audienceLabel}
          </Badge>
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
