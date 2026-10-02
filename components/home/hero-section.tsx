import { Container } from "@/components/layout/container";
import { DisplayText } from "@/components/shared/display-text";
import { Eyebrow } from "@/components/shared/eyebrow";
import { hero, site } from "@/content/home";
import { Button } from "../ui/button";
import Link from "next/link";
import { Icon } from "../ui/icon";

export function HeroSection() {
  return (
    <Container as="section" className="flex flex-col gap-8 pt-16 pb-12">
      <Eyebrow>{hero.eyebrow}</Eyebrow>
      <DisplayText as="h1" size="hero" className="max-w-245">
        {hero.title}
      </DisplayText>
      <p className="max-w-160 text-[17px] leading-[1.55] text-v-text-2">{hero.lead}</p>
      <Button asChild size="lg" className="max-w-40">
        <Link href={site.forumHref} className="no-underline">
          {hero.cta}
          <Icon name="arrow-right" className="size-4,5" />
        </Link>
      </Button>
    </Container>
  );
}
