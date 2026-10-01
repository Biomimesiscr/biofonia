import { Card } from "@/components/ui/card";
import { profile } from "@/content/profile";
import type { ProfileData } from "./types";

export function ProfileStats({ profile: user }: { profile: ProfileData }) {
  const stats = [
    { value: user.publishedCount, label: profile.stats.published },
    { value: user.votesReceived, label: profile.stats.votes },
  ];
  return (
    <dl className="flex gap-3">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          size="sm"
          className="flex flex-1 flex-col-reverse gap-0.5 rounded-[20px] px-5 py-4"
        >
          <dt className="text-[13px] text-v-text-2">{stat.label}</dt>
          <dd className="text-[21px] font-bold tabular-nums">{stat.value}</dd>
        </Card>
      ))}
    </dl>
  );
}
