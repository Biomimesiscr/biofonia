import { Container } from "@/components/layout/container";
import { DisplayText } from "@/components/shared/display-text";
import { Card } from "@/components/ui/card";
import { comingSoon } from "@/content/home";

export function ComingSoonBanner() {
  return (
    <Container as="section" className="pb-12 sm:pb-20">
      <Card
        variant="cream"
        className="flex flex-wrap items-end justify-between gap-8 rounded-[28px] sm:rounded-[40px] bg-v-beige px-[clamp(24px,5vw,64px)] py-[clamp(40px,6vw,80px)]"
      >
        <p className="max-w-[640px] flex-1 basis-[420px] text-[17px] leading-[1.55] text-v-text">
          {comingSoon.text}
        </p>
        <DisplayText size="hero">{comingSoon.display}</DisplayText>
      </Card>
    </Container>
  );
}
