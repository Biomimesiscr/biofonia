import { SoundwaveGraphic } from "@/components/shared/soundwave-graphic";

/** Ink band with the soundwave; the lab side takes the canvas colour. */
export function ProfileBanner() {
  return (
    <div aria-hidden="true" className="flex h-[200px] items-center overflow-hidden bg-v-ink">
      <SoundwaveGraphic
        preserveAspectRatio="xMidYMid slice"
        fills={{ laboratorio: "fill-v-canvas" }}
        className="h-[200px] w-full opacity-90"
      />
    </div>
  );
}
