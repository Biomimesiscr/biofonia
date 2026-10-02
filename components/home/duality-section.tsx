import { Container } from "@/components/layout/container";
import { DisplayText } from "@/components/shared/display-text";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { duality } from "@/content/home";

const audienceStyle = {
  laboratorio: { card: "bg-surface-memory", tone: "pine" },
  territorio: { card: "bg-surface-library", tone: "clay" },
} as const;

export function DualitySection() {
  return (
    <Container as="section" className="flex flex-col gap-8 pt-8 pb-10 sm:pt-12 sm:pb-16">
      <div className="flex flex-wrap gap-4">
        {duality.cards.map((item) => (
          <Card
            key={item.audience}
            className={cn(
              "flex min-h-[180px] basis-[320px] flex-1 flex-col justify-between gap-5 rounded-[28px] px-6 py-8 sm:min-h-[220px] sm:px-8 sm:py-10",
              audienceStyle[item.audience].card,
            )}
          >
            <Eyebrow tone={audienceStyle[item.audience].tone}>{item.eyebrow}</Eyebrow>
            <DisplayText size="lg">{item.text}</DisplayText>
          </Card>
        ))}
      </div>
      <DisplayText size="md" className="mx-auto max-w-[760px] text-center">
        {duality.closing}
      </DisplayText>
    </Container>
  );
}
