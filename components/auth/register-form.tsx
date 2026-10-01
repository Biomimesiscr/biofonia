"use client";

import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { DisplayText } from "@/components/shared/display-text";
import { access } from "@/content/auth";
import { FieldError, FormField, FormMessage } from "./form-field";
import { Divider, GoogleButton } from "./google-button";

export function RegisterForm({ onSwitch, notice }: { onSwitch: () => void; notice?: string }) {
  const [state, action, pending] = useActionState(register, undefined);
  const copy = access.register;
  const rulesError = state?.errors?.normas;

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <DisplayText as="h2" size="md" className="leading-[1.1]">
          {copy.title}
        </DisplayText>
        <p className="text-v-text-2">{copy.lead}</p>
      </div>
      <FormMessage message={state?.message ?? notice} />
      <GoogleButton label={copy.google} />
      <Divider label={access.divider} />
      <FormField
        id="reg-name"
        name="name"
        type="text"
        autoComplete="name"
        label={copy.name}
        defaultValue={state?.values?.name}
        errors={state?.errors?.name}
        required
      />
      <FormField
        id="reg-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder={access.emailPlaceholder}
        label={copy.email}
        defaultValue={state?.values?.email}
        errors={state?.errors?.email}
        required
      />
      <FormField
        id="reg-password"
        name="password"
        type="password"
        autoComplete="new-password"
        label={copy.password}
        hint={copy.passwordHint}
        errors={state?.errors?.password}
        required
      />
      <div className="flex flex-col gap-1">
        <div className="flex min-h-11 items-center gap-3 text-[14px]">
          <input
            id="reg-rules"
            type="checkbox"
            name="normas"
            required
            aria-invalid={rulesError ? true : undefined}
            aria-describedby={rulesError ? "reg-rules-error" : undefined}
            className="size-5 shrink-0 accent-v-ink"
          />
          <label htmlFor="reg-rules">
            {copy.rulesPrefix} <a href="#normas">{copy.rulesLink}</a>
          </label>
        </div>
        {rulesError && <FieldError id="reg-rules-error" errors={rulesError} />}
      </div>
      <Button type="submit" size="lg" fullWidth loading={pending}>
        {copy.submit}
      </Button>
      <p className="text-center text-[13px] text-v-text-2">
        {copy.switchPrompt}{" "}
        <a
          href="?"
          onClick={(event) => {
            event.preventDefault();
            onSwitch();
          }}
          className="font-semibold"
        >
          {copy.switchAction}
        </a>
      </p>
    </form>
  );
}
