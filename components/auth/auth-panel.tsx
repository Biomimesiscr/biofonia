"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { access } from "@/content/auth";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export type AuthMode = "login" | "registro";

/** Login / create-account toggle and the active form. */
export function AuthPanel({ initialMode, notice }: { initialMode: AuthMode; notice?: string }) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const switchTo = (next: AuthMode) => {
    setMode(next);
    // Keep the URL shareable without a navigation.
    window.history.replaceState(null, "", next === "registro" ? "?modo=registro" : "?");
  };

  const tabs: { value: AuthMode; label: string }[] = [
    { value: "login", label: access.login.tab },
    { value: "registro", label: access.register.tab },
  ];

  return (
    <div className="flex w-full max-w-[440px] flex-col gap-6">
      <SegmentedControl
        aria-label={access.tabsLabel}
        options={tabs}
        value={mode}
        onChange={switchTo}
        fill
      />

      {mode === "login" ? (
        <LoginForm onSwitch={() => switchTo("registro")} notice={notice} />
      ) : (
        <RegisterForm onSwitch={() => switchTo("login")} notice={notice} />
      )}
    </div>
  );
}
