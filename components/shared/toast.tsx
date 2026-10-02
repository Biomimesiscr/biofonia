"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";

const DURATION = 2600;

type ShowToast = (message: string) => void;

const ToastContext = createContext<ShowToast>(() => {});

/** Shows short confirmations ("Enlace copiado") at the bottom of the screen. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = useCallback<ShowToast>((next) => {
    setMessage(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), DURATION);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext value={show}>
      {children}
      {/* Always mounted so screen readers announce each new message. */}
      <div role="status" className="pointer-events-none fixed inset-x-4 bottom-8 z-50 flex justify-center">
        {message && (
          <p className="flex items-center gap-2.5 rounded-full bg-v-ink px-5 py-3.5 text-[14px] font-medium text-v-on-ink shadow-[0_12px_32px_-12px_rgba(17,17,17,.4)]">
            <Icon name="check" className="size-[18px] text-v-olive" />
            {message}
          </p>
        )}
      </div>
    </ToastContext>
  );
}

/** Shows a toast; a no-op outside `ToastProvider`. */
export function useToast(): ShowToast {
  return useContext(ToastContext);
}
