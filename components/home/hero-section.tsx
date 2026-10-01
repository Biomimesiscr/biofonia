import { Container } from "@/components/layout/container";
import { DisplayText } from "@/components/shared/display-text";
import { Eyebrow } from "@/components/shared/eyebrow";
import { hero } from "@/content/home";

export function HeroSection() {
  return (
    <Container as="section" className="flex flex-col gap-8 pt-16 pb-12">
      <Eyebrow>{hero.eyebrow}</Eyebrow>
      <DisplayText as="h1" size="hero" className="max-w-[980px]">
        {hero.title}
      </DisplayText>
      <p className="max-w-[640px] text-[17px] leading-[1.55] text-v-text-2">{hero.lead}</p>
    </Container>
  );
}
