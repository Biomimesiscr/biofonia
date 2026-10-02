import Link from "next/link";
import { PostCard } from "@/components/home/post-card";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { featuredPosts, site } from "@/content/home";

export function FeaturedPostsSection() {
  return (
    <Container
      as="section"
      aria-labelledby={featuredPosts.id}
      className="flex flex-col gap-8 pb-12 sm:pb-20"
    >
      <SectionHeading
        id={featuredPosts.id}
        eyebrow={featuredPosts.eyebrow}
        title={featuredPosts.title}
        action={
          <Button asChild size="lg" className="max-sm:w-full">
            <Link href={site.forumHref} className="no-underline">
              {featuredPosts.actionLabel}
              <Icon name="arrow-right" className="size-[18px]" />
            </Link>
          </Button>
        }
      />
      <div className="flex flex-wrap gap-4">
        {featuredPosts.posts.map((post) => (
          <PostCard
            key={post.title}
            {...post}
            votesLabel={featuredPosts.votesLabel}
            commentsLabel={featuredPosts.commentsLabel}
          />
        ))}
      </div>
    </Container>
  );
}
