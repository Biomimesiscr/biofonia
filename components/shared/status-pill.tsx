import { Badge, BadgeIndicator } from "@/components/ui/badge";

export function StatusPill({ label }: { label: string }) {
  return (
    <Badge variant="default" className="h-auto gap-2 px-4 py-2 text-[13px] font-medium">
      <BadgeIndicator className="size-2 text-v-yellow" />
      <span>{label}</span>
    </Badge>
  );
}
