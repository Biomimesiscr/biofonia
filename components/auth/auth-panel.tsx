"use client";

import { useState } from "react";
import { access } from "@/content/auth";
import { cn } from "@/lib/utils";
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

  const tabs: { mode: AuthMode; label: string }[] = [
    { mode: "login", label: access.login.tab },
    { mode: "registro", label: access.register.tab },
  ];

  return (
    <div className="flex w-full max-w-[440px] flex-col gap-6">
      <div role="group" aria-label={access.tabsLabel} className="flex gap-1 rounded-full bg-v-beige p-1">
        {tabs.map((tab) => {
          const active = tab.mode === mode;
          return (
            <button
              key={tab.mode}
              type="button"
              aria-pressed={active}
              onClick={() => switchTo(tab.mode)}
              className={cn(
                "h-11 flex-1 cursor-pointer rounded-full text-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v-brand",
                active ? "bg-v-pink font-semibold text-v-on-accent" : "font-medium text-v-text",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {mode === "login" ? (
        <LoginForm onSwitch={() => switchTo("registro")} notice={notice} />
      ) : (
        <RegisterForm onSwitch={() => switchTo("login")} notice={notice} />
      )}
    </div>
  );
}
