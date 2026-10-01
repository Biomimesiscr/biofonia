import Link from "next/link";
import { Card } from "@/components/ui/card";
import { forum } from "@/content/forum";
import { site } from "@/content/home";
import { newPost } from "@/content/post";

type ForumRulesCardProps = {
  /** "list": the rules one by one (new post); "summary": one paragraph (forum). */
  variant: "list" | "summary";
};

/** The forum rules in short, on a cream card. */
export function ForumRulesCard({ variant }: ForumRulesCardProps) {
  const copy = variant === "list" ? newPost.guidelines : forum.rules;
  return (
    <Card variant="cream" className="flex flex-col gap-3 rounded-[20px] p-6">
      <h2 className="text-[16px] font-semibold">{copy.title}</h2>
      {variant === "list" ? (
        <ul className="flex flex-col gap-2.5 text-[14px]">
          {newPost.guidelines.items.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-[7px] size-2 shrink-0 rounded-full bg-v-ink" />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[14px]">{forum.rules.summary}</p>
      )}
      {/* No rules page yet: the link opens the forum. */}
      <Link href={site.forumHref} className="text-[14px] font-semibold">
        {copy.readAll}
      </Link>
    </Card>
  );
}
