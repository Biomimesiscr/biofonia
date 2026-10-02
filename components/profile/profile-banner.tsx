import { SoundwaveGraphic } from "@/components/shared/soundwave-graphic";

/** Ink band with the soundwave; the lab side takes the canvas colour. */
export function ProfileBanner() {
  return (
    <div aria-hidden="true" className="flex h-[140px] items-center sm:h-[200px] overflow-hidden bg-v-ink">
      <SoundwaveGraphic
        preserveAspectRatio="xMidYMid slice"
        fills={{ laboratorio: "fill-v-canvas" }}
        className="h-[140px] w-full opacity-90 sm:h-[200px]"
      />
    </div>
  );
}
