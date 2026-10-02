"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { site } from "@/content/home";
import { useToast } from "./toast";

type ToggleState = { active: boolean; count: number };

/** What a toggle Server Action answers (see `app/actions/vote.ts`). */
type ToggleResult = { voted: boolean } | { requiresLogin: true } | { error: string };

/**
 * A counted on/off toggle (votes) that updates at once and settles when the
 * server answers: signed-out visitors go to log in, errors show as a toast.
 */
export function useOptimisticToggle(initial: ToggleState, action: () => Promise<ToggleResult>) {
  const router = useRouter();
  const toast = useToast();
  const [, startTransition] = useTransition();
  const [state, setState] = useOptimistic(initial, (current, active: boolean) => ({
    active,
    count: current.count + (active ? 1 : -1),
  }));

  function toggle() {
    startTransition(async () => {
      setState(!state.active);
      const result = await action();
      if ("requiresLogin" in result) router.push(site.loginHref);
      else if ("error" in result) toast(result.error);
    });
  }

  return [state, toggle] as const;
}
