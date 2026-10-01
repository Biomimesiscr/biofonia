"use client";

import { useActionState, useState } from "react";
import { completeOnboarding } from "@/app/actions/onboarding";
import { FieldError, FormMessage } from "@/components/auth/form-field";
import { Logo } from "@/components/brand/logo";
import { Eyebrow } from "@/components/shared/eyebrow";
import { DisplayText } from "@/components/shared/display-text";
import { Button } from "@/components/ui/button";
import { onboarding } from "@/content/auth";
import { site } from "@/content/home";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 2;

const iconTone = { olive: "bg-v-olive", pink: "bg-v-pink" } as const;
const kickerTone = { olive: "text-v-olive-ink", pink: "text-v-accent-ink" } as const;

type Role = (typeof onboarding.role.options)[number]["value"];

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
            <fieldset className="flex flex-wrap gap-4">
              <legend className="sr-only">{onboarding.role.legend}</legend>
              {onboarding.role.options.map((option) => {
                const checked = role === option.value;
                return (
                  <label
                    key={option.value}
                    className={cn(
                      "flex flex-[1_1_240px] cursor-pointer flex-col gap-4 rounded-[20px] border-2 p-6 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-v-brand",
                      checked ? "border-v-ink bg-v-pink-soft" : "border-v-border bg-v-paper",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "flex size-12 items-center justify-center rounded-full",
                          iconTone[option.tone],
                        )}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="text-v-on-accent"
                        >
                          <path d={option.icon} />
                        </svg>
                      </span>
                      <input
                        type="radio"
                        name="userType"
                        value={option.value}
                        checked={checked}
                        onChange={() => setRole(option.value)}
                        className="size-5 accent-v-ink"
                      />
                    </div>
                    <span
                      className={cn(
                        "text-[11px] font-semibold uppercase tracking-[0.075em]",
                        kickerTone[option.tone],
                      )}
                    >
                      {option.kicker}
                    </span>
                    <span className="text-[21px] leading-[1.2] font-semibold">{option.title}</span>
                    <span className="text-v-text-2">{option.text}</span>
                  </label>
                );
              })}
            </fieldset>
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
            <div className="flex flex-col gap-2">
              <label htmlFor="bio" className="text-[14px] font-medium">
                {onboarding.bio.label}
              </label>
              <textarea
                id="bio"
                name="biography"
                rows={6}
                maxLength={onboarding.bio.maxLength}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder={selected?.bioPlaceholder}
                aria-invalid={bioErrors ? true : undefined}
                aria-describedby={bioErrors ? "bio-help bio-error" : "bio-help"}
                className="w-full resize-y rounded-[20px] border border-v-edge bg-v-paper px-5 py-4 text-[15px] leading-normal text-v-text placeholder:text-v-text-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v-brand aria-invalid:border-v-danger"
              />
              <div className="flex justify-between gap-3 text-[13px] text-v-text-3">
                <span id="bio-help">{onboarding.bio.help}</span>
                <span className="tabular-nums">
                  {bio.length} / {onboarding.bio.maxLength}
                </span>
              </div>
              {bioErrors && <FieldError id="bio-error" errors={bioErrors} />}
            </div>
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
