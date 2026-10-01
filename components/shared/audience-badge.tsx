import { Badge } from "@/components/ui/badge";
import { type Audience, featuredPosts } from "@/content/home";
import { cn } from "@/lib/utils";

const audienceStyle: Record<Audience, string> = {
  laboratorio: "bg-surface-memory text-v-ink",
  territorio: "bg-surface-library text-v-accent-ink",
};

/** "Laboratorio" / "Territorio" pill next to an author's name. */
export function AudienceBadge({ audience, className }: { audience: Audience; className?: string }) {
  return (
    <Badge
      variant="default"
      className={cn("h-auto px-2 py-0.5 text-xs font-semibold", audienceStyle[audience], className)}
    >
      {featuredPosts.audienceLabels[audience]}
    </Badge>
  );
}
