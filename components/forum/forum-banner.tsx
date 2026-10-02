import Link from "next/link";
import { DisplayText } from "@/components/shared/display-text";
import { SoundwaveGraphic } from "@/components/shared/soundwave-graphic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { forum } from "@/content/forum";
import { newPost } from "@/content/post";

/** Pine card with the soundwave, the forum's motto and a call to post. */
export function ForumBanner() {
  return (
    <Card variant="ink" className="flex flex-col gap-4 rounded-[28px] p-6">
      <SoundwaveGraphic aria-hidden="true" className="h-auto w-full" fills={{ laboratorio: "fill-v-on-ink" }} />
      <DisplayText as="h2" size="md" className="leading-[1.1]">
        {forum.banner.title}
      </DisplayText>
      <p className="text-[14px] leading-[1.55]">{forum.banner.text}</p>
      <Button asChild variant="accent" className="h-11 font-semibold">
        <Link href={newPost.href} className="no-underline">
          {forum.banner.cta}
        </Link>
      </Button>
    </Card>
  );
}
