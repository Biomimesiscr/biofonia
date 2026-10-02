"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { DisplayText } from "@/components/shared/display-text";
import { access } from "@/content/auth";
import { FormField, FormMessage } from "@/components/forms/form-field";
import { Divider, GoogleButton } from "./google-button";

export function LoginForm({ onSwitch, notice }: { onSwitch: () => void; notice?: string }) {
  const [state, action, pending] = useActionState(login, undefined);
  const copy = access.login;

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
        id="login-email"
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
        id="login-password"
        name="password"
        type="password"
        autoComplete="current-password"
        label={copy.password}
        labelAside={
          <span className="text-[13px] font-medium text-v-text-3" title={copy.forgotSoon}>
            {copy.forgot} <span className="sr-only">({copy.forgotSoon})</span>
          </span>
        }
        errors={state?.errors?.password}
        required
      />
      <Button type="submit" size="lg" fullWidth loading={pending}>
        {copy.submit}
      </Button>
      <p className="text-center text-[13px] text-v-text-2">
        {copy.switchPrompt}{" "}
        <a
          href="?modo=registro"
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
