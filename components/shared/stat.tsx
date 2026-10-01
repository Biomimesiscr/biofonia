import { Icon } from "@/components/ui/icon";

type StatProps = { icon: string; value: number; label: string };

export function Stat({ icon, value, label }: StatProps) {
  return (
    <span className="flex items-center gap-1.5">
      <Icon name={icon} size="sm" />
      {value} {label}
    </span>
  );
}
