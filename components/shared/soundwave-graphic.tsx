import type * as React from "react";
import { cn } from "@/lib/utils";
import {
  SOUNDWAVE_BAR_RADIUS,
  SOUNDWAVE_BAR_WIDTH,
  SOUNDWAVE_VIEWBOX,
  soundwaveBars,
  type SoundwaveTone,
} from "@/content/soundwave";

const defaultFills: Record<SoundwaveTone, string> = {
  laboratorio: "fill-v-ink",
  "encuentro-light": "fill-v-pink",
  "encuentro-deep": "fill-v-yellow",
  territorio: "fill-v-olive",
};

/** Seconds for one breath of a bar; the wave travels from both edges toward the centre. */
const WAVE_PERIOD = 2.4;
const center = (soundwaveBars.length - 1) / 2;

/** Edges start breathing first and the centre last, so the two waves travel inward and meet. */
function barStyle(index: number, travel: boolean): React.CSSProperties {
  const distance = Math.abs(index - center) / center;
  return {
    ...(travel ? { "--wave-delay": `${((1 - distance) * WAVE_PERIOD * 0.5).toFixed(2)}s` } : {}),
    "--wave-enter": `${(index * 0.012).toFixed(3)}s`,
  } as React.CSSProperties;
}

type SoundwaveGraphicProps = Omit<React.ComponentProps<"svg">, "children" | "viewBox"> & {
  /** Fill class per tone; tones left out keep the default palette. */
  fills?: Partial<Record<SoundwaveTone, string>>;
  /** Breathe as a wave travelling inward (default) or all bars together. */
  travel?: boolean;
};

/** The lab / meeting / territory soundwave bars, animated by `.bio-soundwave`. */
export function SoundwaveGraphic({ fills, travel = true, className, ...props }: SoundwaveGraphicProps) {
  const fill = { ...defaultFills, ...fills };
  return (
    <svg
      viewBox={`0 0 ${SOUNDWAVE_VIEWBOX.width} ${SOUNDWAVE_VIEWBOX.height}`}
      className={cn("bio-soundwave block", className)}
      {...props}
    >
      {soundwaveBars.map((bar, index) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={bar.y}
          width={SOUNDWAVE_BAR_WIDTH}
          height={bar.height}
          rx={SOUNDWAVE_BAR_RADIUS}
          className={cn("bio-soundwave__bar", fill[bar.tone])}
          data-tone={bar.tone}
          style={barStyle(index, travel)}
        />
      ))}
    </svg>
  );
}
