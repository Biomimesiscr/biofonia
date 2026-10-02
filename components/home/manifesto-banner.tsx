import { Container } from "@/components/layout/container";
import { DisplayText } from "@/components/shared/display-text";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Card } from "@/components/ui/card";
import { manifesto } from "@/content/home";

export function ManifestoBanner() {
  return (
    <Container as="section" className="pb-10 sm:pb-16">
      <Card
        variant="ink"
        className="flex flex-col gap-6 rounded-[28px] sm:rounded-[40px] px-[clamp(24px,5vw,64px)] py-[clamp(40px,6vw,80px)]"
      >
        <Eyebrow tone="inverse">{manifesto.eyebrow}</Eyebrow>
        <DisplayText size="xl" className="max-w-[900px]">
          {manifesto.text}
        </DisplayText>
      </Card>
    </Container>
  );
}
