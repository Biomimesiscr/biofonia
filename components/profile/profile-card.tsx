import { DisplayText } from "@/components/shared/display-text";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge, BadgeIndicator } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { onboarding } from "@/content/auth";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import type { ProfileData } from "./types";

const roleStyle = {
  pink: { badge: "pink-soft", avatar: "pink", dot: "text-v-pink", text: "text-v-accent-ink" },
  olive: { badge: "olive-soft", avatar: "olive", dot: "text-v-olive", text: "text-v-olive-ink" },
} as const;

type ProfileCardProps = { profile: ProfileData; isOwner: boolean };

export function ProfileCard({ profile: user, isOwner }: ProfileCardProps) {
  const role = onboarding.role.options.find((option) => option.value === user.userType)!;
  const style = roleStyle[role.tone];

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
        <div className="flex flex-col gap-1.5">
          {/* No edit page yet: the action is shown but unavailable. */}
          <Button variant="outline" disabled aria-describedby="edit-profile-soon" className="h-11">
            <Icon name="pencil" className="size-[18px]" />
            {profile.editProfile}
          </Button>
          <Eyebrow id="edit-profile-soon" tone="pine" className="text-center">
            {profile.editProfileSoon}
          </Eyebrow>
        </div>
      )}
    </Card>
  );
}
