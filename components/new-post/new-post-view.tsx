import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DisplayText } from "@/components/shared/display-text";
import { Icon } from "@/components/ui/icon";
import { newPost } from "@/content/post";
import { NewPostForm } from "./new-post-form";
import type { NewPostAuthor, NewPostCategory } from "./types";

type NewPostViewProps = {
  author: NewPostAuthor;
  categories: readonly NewPostCategory[];
};

/** Heading, then the editor with its preview and guidelines. */
export function NewPostView({ author, categories }: NewPostViewProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="flex flex-col gap-8 pt-10 pb-20">
          <div className="flex flex-col gap-3">
            <Link
              href="/perfil"
              className="flex min-h-11 items-center gap-1.5 self-start text-[14px] font-medium no-underline"
            >
              <Icon name="chevron-left" className="size-[18px]" />
              {newPost.back}
            </Link>
            <DisplayText as="h1" size="xl">
              {newPost.title}
            </DisplayText>
            <p className="max-w-[640px] text-[17px] leading-[1.55] text-v-text-2">{newPost.lead}</p>
          </div>
          <NewPostForm author={author} categories={categories} />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
