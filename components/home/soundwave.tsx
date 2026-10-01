import type * as React from "react";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { soundwave } from "@/content/home";
import {
  SOUNDWAVE_BAR_RADIUS,
  SOUNDWAVE_BAR_WIDTH,
  SOUNDWAVE_VIEWBOX,
  soundwaveBars,
  type SoundwaveTone,
} from "@/content/soundwave";

const barFill: Record<SoundwaveTone, string> = {
  laboratorio: "fill-v-ink",
  "encuentro-light": "fill-v-pink",
  "encuentro-deep": "fill-v-yellow",
  territorio: "fill-v-olive",
};

/** Seconds for one breath of a bar; the wave travels from both edges toward the centre. */
const WAVE_PERIOD = 2.4;
const center = (soundwaveBars.length - 1) / 2;

/** Edges start breathing first and the centre last, so the two waves travel inward and meet. */
function barStyle(index: number): React.CSSProperties {
  const distance = Math.abs(index - center) / center;
  return {
    "--wave-delay": `${((1 - distance) * WAVE_PERIOD * 0.5).toFixed(2)}s`,
    "--wave-enter": `${(index * 0.012).toFixed(3)}s`,
  } as React.CSSProperties;
}

export function Soundwave() {
  return (
    <Container as="section" aria-label={soundwave.sectionLabel} className="pb-16">
      <Card className="flex flex-col gap-6 rounded-[40px] px-8 pt-10 pb-8">
        <svg
          viewBox={`0 0 ${SOUNDWAVE_VIEWBOX.width} ${SOUNDWAVE_VIEWBOX.height}`}
          role="img"
          aria-label={soundwave.ariaLabel}
          className="bio-soundwave block h-auto w-full"
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
              style={barStyle(index)}
            />
          ))}
        </svg>
        <div className="flex flex-wrap items-center justify-between gap-4 text-[13px] font-medium">
          {soundwave.legend.map((item) => (
            <span key={item.label} className={cn("flex items-center gap-2", item.text)}>
              <span className={cn("size-3 rounded-full", item.dot)} />
              {item.label}
            </span>
          ))}
        </div>
      </Card>
    </Container>
  );
}
