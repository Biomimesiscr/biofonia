import Link from "next/link";
import { roleFor } from "@/components/profile/role-style";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { postDetail } from "@/content/post-detail";
import { cn } from "@/lib/utils";
import type { PostDetailItem } from "./types";

/** "Sobre quien publica": avatar, role, biography and a link to the profile. */
export function PostAuthorCard({ author }: { author: PostDetailItem["author"] }) {
  const { role, style } = roleFor(author.userType);
  return (
    <Card className="flex flex-col gap-3.5 rounded-[20px] p-6">
      <Eyebrow tone="pine" className="text-v-text-2">
        {postDetail.author.eyebrow}
      </Eyebrow>
      <div className="flex items-center gap-3">
        <Avatar
          variant={author.avatar}
          aria-hidden="true"
          className="size-13 font-text text-[16px] font-bold [box-shadow:none]"
        >
          <AvatarFallback>{author.initials}</AvatarFallback>
        </Avatar>
        <span className="flex min-w-0 flex-col gap-1">
          <span className="font-semibold break-words">{author.name}</span>
          <Badge
            variant={style.badge}
            className={cn("h-auto self-start px-2 py-0.5 text-xs font-semibold whitespace-normal", style.text)}
          >
            {role.title}
          </Badge>
        </span>
      </div>
      {author.biography && <p className="text-[14px] leading-[1.55] text-v-text-2">{author.biography}</p>}
      <Button asChild variant="outline" className="h-11">
        <Link href={`/perfil/${author.id}`} className="no-underline">
          {postDetail.author.viewProfile}
        </Link>
      </Button>
    </Card>
  );
}
