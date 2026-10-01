import { ComingSoonBanner } from "@/components/home/coming-soon-banner";
import { DualitySection } from "@/components/home/duality-section";
import { FeaturedPostsSection } from "@/components/home/featured-posts-section";
import { HeroSection } from "@/components/home/hero-section";
import { ManifestoBanner } from "@/components/home/manifesto-banner";
import { ParticipateSection } from "@/components/home/participate-section";
import { Soundwave } from "@/components/home/soundwave";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="inicio">
        <HeroSection />
        <Soundwave />
        <DualitySection />
        <ManifestoBanner />
        <ParticipateSection />
        <FeaturedPostsSection />
        <ComingSoonBanner />
      </main>
      <SiteFooter />
    </>
  );
}
