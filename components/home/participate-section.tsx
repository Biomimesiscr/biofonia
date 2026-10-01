import { StepCard } from "@/components/home/step-card";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { participate } from "@/content/home";

export function ParticipateSection() {
  return (
    <Container
      as="section"
      aria-labelledby={participate.id}
      className="flex flex-col gap-10 pt-12 pb-20"
    >
      <SectionHeading
        id={participate.id}
        eyebrow={participate.eyebrow}
        title={participate.title}
      />
      <div className="flex flex-wrap gap-4">
        {participate.steps.map((step) => (
          <StepCard key={step.number} {...step} />
        ))}
      </div>
    </Container>
  );
}
