import type { Tone } from "@/content/home";

/** Solid fills for dots, matching the Cojeev accent roles. */
export const dotClass: Record<Tone | "rust", string> = {
  pink: "bg-v-pink",
  olive: "bg-v-olive",
  yellow: "bg-v-yellow",
  blue: "bg-v-blue",
  ink: "bg-v-ink",
  rust: "bg-bio-rust",
};

/**
 * Cojeev's `olive` / `yellow` / `blue` Badge variants are soft status tints,
 * so solid accent pills pair the base variant with an explicit fill.
 */
export const solidBadge: Record<
  Tone,
  { variant: "pink" | "ink" | "default"; className: string }
> = {
  pink: { variant: "pink", className: "" },
  ink: { variant: "ink", className: "" },
  olive: { variant: "default", className: "bg-v-olive text-v-on-accent" },
  yellow: { variant: "default", className: "bg-v-yellow text-v-on-accent" },
  blue: { variant: "default", className: "bg-v-blue text-v-on-accent" },
};
