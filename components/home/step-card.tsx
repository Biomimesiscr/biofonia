import { solidBadge } from "@/components/shared/tone";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Step } from "@/content/home";

export function StepCard({ number, tone, title, paragraphs }: Step) {
  const badge = solidBadge[tone];
  return (
    <article className="flex basis-[260px] flex-1">
      <Card lift className="flex flex-1 flex-col gap-4 rounded-[20px] p-6">
        <Badge
          variant={badge.variant}
          className={cn(
            "h-auto self-start px-3 py-1 text-[13px] font-bold tabular-nums lining-nums",
            badge.className,
          )}
        >
          {number}
        </Badge>
        <h3 className="text-[21px] leading-[1.2] font-semibold">{title}</h3>
        {paragraphs.map((text) => (
          <p key={text} className="text-v-text-2">
            {text}
          </p>
        ))}
      </Card>
    </article>
  );
}
