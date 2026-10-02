"use client";

import { useActionState, useState } from "react";
import { completeOnboarding } from "@/app/actions/onboarding";
import { Logo } from "@/components/brand/logo";
import { FieldError, FormMessage, TextareaField } from "@/components/forms/form-field";
import { Eyebrow } from "@/components/shared/eyebrow";
import { DisplayText } from "@/components/shared/display-text";
import { type Role, RoleChoice } from "@/components/shared/role-choice";
import { Button } from "@/components/ui/button";
import { onboarding } from "@/content/auth";
import { site } from "@/content/home";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 2;

/** Two steps (where you come from, biography) posted together at the end. */
export function OnboardingWizard() {
  const [state, action, pending] = useActionState(completeOnboarding, undefined);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role | null>(
    (state?.values?.userType as Role | undefined) ?? null,
  );
  const [bio, setBio] = useState(state?.values?.biography ?? "");

  const selected = onboarding.role.options.find((option) => option.value === role);
  const roleErrors = state?.errors?.userType;
  const bioErrors = state?.errors?.biography;

  return (
    <div className="flex min-h-screen flex-col bg-v-canvas text-v-text">
      <header className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 p-6">
        <Logo name={site.name} />
        <span className="text-[13px] font-medium text-v-text-2" aria-live="polite">
          {onboarding.stepLabel(step, TOTAL_STEPS)}
        </span>
      </header>

      <main className="mx-auto flex w-full max-w-[640px] flex-1 flex-col gap-8 px-6 pt-8 pb-16">
        <div aria-hidden="true" className="flex gap-2">
          {Array.from({ length: TOTAL_STEPS }, (_, index) => (
            <span
              key={index}
              className={cn("h-1.5 flex-1 rounded-full", index < step ? "bg-v-ink" : "bg-v-beige")}
            />
          ))}
        </div>

        <form action={action} className="flex flex-col gap-6">
          <FormMessage message={state?.message} />

          <section hidden={step !== 1} className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Eyebrow>{onboarding.role.eyebrow}</Eyebrow>
              <DisplayText as="h1" size="xl">
                {onboarding.role.title}
              </DisplayText>
              <p className="text-[17px] leading-[1.55] text-v-text-2">{onboarding.role.lead}</p>
            </div>
            <RoleChoice legend={onboarding.role.legend} value={role} onChange={setRole} />
            {roleErrors && <FieldError id="role-error" errors={roleErrors} />}
            <div className="flex justify-end">
              <Button type="button" size="lg" disabled={!role} onClick={() => setStep(2)}>
                {onboarding.next}
              </Button>
            </div>
          </section>

          <section hidden={step !== 2} className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Eyebrow>{onboarding.bio.eyebrow}</Eyebrow>
              <DisplayText as="h1" size="xl">
                {onboarding.bio.title}
              </DisplayText>
              <p className="text-[17px] leading-[1.55] text-v-text-2">{onboarding.bio.lead}</p>
            </div>
            <TextareaField
              id="bio"
              name="biography"
              label={onboarding.bio.label}
              hint={onboarding.bio.help}
              errors={bioErrors}
              showCount
              rows={6}
              maxLength={onboarding.bio.maxLength}
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder={selected?.bioPlaceholder}
            />
            <div className="flex justify-between gap-3">
              <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
                {onboarding.back}
              </Button>
              <Button type="submit" size="lg" disabled={!bio.trim()} loading={pending}>
                {onboarding.finish}
              </Button>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
