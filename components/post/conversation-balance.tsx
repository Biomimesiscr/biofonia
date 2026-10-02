import { Eyebrow } from "@/components/shared/eyebrow";
import { postDetail } from "@/content/post-detail";
import type { ConversationVoices } from "./types";

const copy = postDetail.balance;

/** "Esta conversación": how many lab and territory voices take part, with a split bar. */
export function ConversationBalance({ voices }: { voices: ConversationVoices }) {
  const labShare = Math.round((100 * voices.lab) / Math.max(1, voices.lab + voices.field));
  return (
    <div className="flex flex-col gap-2.5 rounded-[20px] bg-surface-memory p-6">
      <Eyebrow tone="pine">{copy.eyebrow}</Eyebrow>
      <p className="text-[14px] leading-[1.55]">
        {copy.gathers} <strong>{copy.lab(voices.lab)}</strong> {copy.and} <strong>{copy.field(voices.field)}</strong>.
      </p>
      <div aria-hidden="true" className="flex h-2 overflow-hidden rounded-full bg-v-pink">
        <span className="bg-v-ink" style={{ width: `${labShare}%` }} />
      </div>
    </div>
  );
}
