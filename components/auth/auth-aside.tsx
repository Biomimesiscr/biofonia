import type { CSSProperties } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/shared/eyebrow";
import { DisplayText } from "@/components/shared/display-text";
import { access } from "@/content/auth";
import { site } from "@/content/home";
import {
  SOUNDWAVE_BAR_RADIUS,
  SOUNDWAVE_BAR_WIDTH,
  SOUNDWAVE_VIEWBOX,
  soundwaveBars,
  type SoundwaveTone,
} from "@/content/soundwave";
import { cn } from "@/lib/utils";

// On the ink panel the lab side takes the panel's own text colour.
const barFill: Record<SoundwaveTone, string> = {
  laboratorio: "fill-v-on-ink",
  "encuentro-light": "fill-v-pink",
  "encuentro-deep": "fill-v-yellow",
  territorio: "fill-v-olive",
};

const dotTone = { pink: "bg-v-pink", olive: "bg-v-olive" } as const;

export function AuthAside() {
  return (
    <aside className="flex flex-[1_1_440px] flex-col justify-between gap-12 bg-v-ink p-[clamp(24px,4vw,48px)] text-v-on-ink">
      <Link
        href="/"
        className="flex min-h-11 items-center gap-3 self-start text-v-on-ink no-underline hover:text-v-on-ink"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
          <rect x="3" y="11" width="4" height="10" rx="2" className="fill-v-on-ink" />
          <rect x="10" y="6" width="4" height="20" rx="2" className="fill-v-on-ink" />
          <rect x="17" y="3" width="4" height="26" rx="2" className="fill-v-pink" />
          <rect x="24" y="9" width="4" height="14" rx="2" className="fill-v-olive" />
        </svg>
        <span className="font-cojeev-display text-[26px] font-medium tracking-[-0.015em]">
          {site.name}
        </span>
      </Link>

      <div className="flex max-w-[520px] flex-col gap-6">
        <Eyebrow tone="inverse">{access.aside.eyebrow}</Eyebrow>
        <DisplayText as="h1" size="xl" className="text-[clamp(36px,4vw,44px)] leading-[1.05]">
          {access.aside.title}
        </DisplayText>
        <p className="text-[17px] leading-[1.55]">{access.aside.lead}</p>
        <ul className="flex flex-col gap-3">
          {access.aside.benefits.map((benefit) => (
            <li key={benefit.text} className="flex items-center gap-3">
              <span className={cn("size-2 shrink-0 rounded-full", dotTone[benefit.tone])} />
              {benefit.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-5">
        <svg
          viewBox={`0 0 ${SOUNDWAVE_VIEWBOX.width} ${SOUNDWAVE_VIEWBOX.height}`}
          role="img"
          aria-label={access.aside.soundwaveLabel}
          className="bio-soundwave block h-auto w-full max-w-[520px]"
        >
          {soundwaveBars.map((bar, index) => (
            <rect
              key={bar.x}
              x={bar.x}
              y={bar.y}
              width={SOUNDWAVE_BAR_WIDTH}
              height={bar.height}
              rx={SOUNDWAVE_BAR_RADIUS}
              className={cn("bio-soundwave__bar", barFill[bar.tone])}
              data-tone={bar.tone}
              style={{ "--wave-enter": `${(index * 0.012).toFixed(3)}s` } as CSSProperties}
            />
          ))}
        </svg>
        <p className="text-[13px]">
          {access.aside.readOnly}{" "}
          <Link href="/" className="font-semibold text-v-on-ink hover:text-v-on-ink">
            {access.aside.explore}
          </Link>
        </p>
      </div>
    </aside>
  );
}
