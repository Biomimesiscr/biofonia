"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useRouter } from "next/navigation";
import { type FormEvent, useState, useTransition } from "react";
import { reportPost } from "@/app/actions/report";
import { FormMessage } from "@/components/forms/form-field";
import { useToast } from "@/components/shared/toast";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { site } from "@/content/home";
import { postDetail } from "@/content/post-detail";
import type { ReportReasonOption } from "./types";

type ReportDialogProps = {
  postId: string;
  reasons: readonly ReportReasonOption[];
  /** Classes for the "Reportar" trigger. */
  className?: string;
};

const copy = postDetail.report;

/** "Reportar" button and the modal where the visitor picks why. */
export function ReportDialog({ postId, reasons, className }: ReportDialogProps) {
  const router = useRouter();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [reasonId, setReasonId] = useState<string | null>(null);
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  function changeOpen(next: boolean) {
    setOpen(next);
    if (!next) {
      setReasonId(null);
      setError(undefined);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reasonId) return;
    startTransition(async () => {
      const result = await reportPost(postId, reasonId);
      if ("requiresLogin" in result) return router.push(site.loginHref);
      if ("error" in result) return setError(result.error);
      changeOpen(false);
      toast(postDetail.toast.reported);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Dialog.Trigger render={<Button variant="ghost" className={className} />}>
        <Icon name="flag" className="size-[18px]" />
        {postDetail.actions.report}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-[rgba(20,23,27,.45)]" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col gap-5 overflow-y-auto rounded-[28px] bg-v-paper p-7 text-v-text shadow-[0_12px_32px_-12px_rgba(17,17,17,.18)] outline-none">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <Dialog.Title className="text-[21px] font-semibold">{copy.title}</Dialog.Title>
              <Dialog.Description className="text-[14px] text-v-text-2">{copy.text}</Dialog.Description>
            </div>
            <Dialog.Close
              aria-label={copy.close}
              className="-mt-2 -mr-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-v-text hover:bg-v-beige focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v-brand"
            >
              <Icon name="x" className="size-5" />
            </Dialog.Close>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-5">
            <fieldset className="flex flex-col gap-1">
              <legend className="mb-2 text-[14px] font-semibold">{copy.legend}</legend>
              {reasons.map((reason) => (
                <label
                  key={reason.id}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-[14px] hover:bg-v-beige has-checked:bg-v-beige-2 has-focus-visible:outline-2 has-focus-visible:outline-v-brand"
                >
                  <input
                    type="radio"
                    name="reasonId"
                    value={reason.id}
                    checked={reasonId === reason.id}
                    onChange={() => setReasonId(reason.id)}
                    className="m-0 size-[18px] accent-[var(--v-brand)] outline-none"
                  />
                  {reason.label}
                </label>
              ))}
            </fieldset>

            <FormMessage message={error} />

            <div className="flex flex-wrap justify-end gap-2">
              <Dialog.Close render={<Button type="button" variant="outline" className="h-11 px-5" />}>
                {copy.cancel}
              </Dialog.Close>
              <Button type="submit" className="h-11 px-5" disabled={!reasonId} loading={pending}>
                {copy.submit}
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
