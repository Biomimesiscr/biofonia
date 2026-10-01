import { Container } from "@/components/layout/container";
import { footer } from "@/content/home";

export function SiteFooter() {
  return (
    <Container
      as="footer"
      className="flex flex-wrap justify-between gap-4 border-t border-v-border pt-6 pb-10 text-[13px] text-v-text-3"
    >
      <span>{footer.left}</span>
      <span>{footer.right}</span>
    </Container>
  );
}
