import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DisplayText } from "@/components/shared/display-text";
import { Eyebrow } from "@/components/shared/eyebrow";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, action, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      <div className="flex flex-col gap-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        <DisplayText as="h2" id={id} size="xl" className="max-w-[720px] leading-[1.05]">
          {title}
        </DisplayText>
      </div>
      {action}
    </div>
  );
}
