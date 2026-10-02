import Link from "next/link";
import { DisplayText } from "@/components/shared/display-text";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge, BadgeIndicator } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { roleFor } from "./role-style";
import type { ProfileData } from "./types";

type ProfileCardProps = { profile: ProfileData; isOwner: boolean };

export function ProfileCard({ profile: user, isOwner }: ProfileCardProps) {
  const { role, style } = roleFor(user.userType);

  return (
    <Card className="flex flex-col gap-5 overflow-visible rounded-[28px] p-6">
      <Avatar
        variant={style.avatar}
        size="lg"
        role="img"
        aria-label={profile.avatarLabel(user.name)}
        className="-mt-[88px] size-32 text-[44px] [box-shadow:0_0_0_6px_var(--card)]"
      >
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-2">
        <DisplayText as="h1" size="md" className="leading-[1.1]">
          {user.name}
        </DisplayText>
        <Badge
          variant={style.badge}
          className={cn(
            "h-auto gap-2 self-start px-3 py-1 text-[13px] font-semibold whitespace-normal",
            style.text,
          )}
        >
          <BadgeIndicator className={cn("size-2", style.dot)} />
          {role.title} · {role.kicker}
        </Badge>
      </div>

      {user.biography && <p className="text-[15px] leading-[1.6]">{user.biography}</p>}

      <ul className="flex flex-col gap-2.5 text-[14px] text-v-text-2">
        <li className="flex items-center gap-2.5">
          <Icon name="calendar" className="size-[18px]" />
          {profile.memberSince(user.memberSince)}
        </li>
      </ul>

      {isOwner && (
        <Button asChild variant="outline" className="h-11">
          <Link href={profile.edit.href}>
            <Icon name="pencil" className="size-[18px]" />
            {profile.editProfile}
          </Link>
        </Button>
      )}
    </Card>
  );
}
