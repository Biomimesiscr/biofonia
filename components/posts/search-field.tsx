import type { ComponentProps } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type SearchFieldProps = Omit<ComponentProps<"input">, "type"> & { label: string };

/** Pill search input with a leading icon and a visually hidden label. */
export function SearchField({ label, className, ...props }: SearchFieldProps) {
  return (
    <label
      className={cn(
        "flex h-12 items-center gap-3 rounded-full border border-v-edge bg-v-paper px-5 text-v-text-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-v-brand",
        className,
      )}
    >
      <Icon name="search" className="size-5 shrink-0" />
      <span className="sr-only">{label}</span>
      <input
        type="search"
        className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-v-text sm:text-[15px] outline-none placeholder:text-v-text-3"
        {...props}
      />
    </label>
  );
}
