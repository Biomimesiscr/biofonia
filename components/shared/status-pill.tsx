import { Badge, BadgeIndicator } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function StatusPill({ label, className }: { label: string; className?: string }) {
  return (
    <Badge variant="default" className={cn("h-auto gap-2 px-4 py-2 text-[13px] font-medium", className)}>
      <BadgeIndicator className="size-2 text-v-yellow" />
      <span>{label}</span>
    </Badge>
  );
}
