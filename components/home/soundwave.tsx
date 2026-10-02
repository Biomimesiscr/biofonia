import { Container } from "@/components/layout/container";
import { SoundwaveGraphic } from "@/components/shared/soundwave-graphic";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { soundwave } from "@/content/home";

export function Soundwave() {
  return (
    <Container as="section" aria-label={soundwave.sectionLabel} className="pb-16">
      <Card className="flex flex-col gap-6 rounded-[40px] px-8 pt-10 pb-8">
        <SoundwaveGraphic role="img" aria-label={soundwave.ariaLabel} className="h-auto w-full" />
        <div className="flex flex-wrap items-center justify-between gap-4 text-[13px] font-medium">
          {soundwave.legend.map((item) => (
            <span key={item.label} className={cn("flex items-center gap-2", item.text)}>
              <span className={cn("size-3 rounded-full", item.dot)} />
              {item.label}
            </span>
          ))}
        </div>
      </Card>
    </Container>
  );
}
