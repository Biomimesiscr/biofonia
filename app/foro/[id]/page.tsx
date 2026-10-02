import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { toForumPostItem } from "@/components/forum/forum-mappers";
import {
  toCommentThreadItem,
  toConversationVoices,
  toPostDetailItem,
  toPostViewer,
  toReportReasonOption,
} from "@/components/post/post-mappers";
import { PostView } from "@/components/post/post-view";
import { postDetail } from "@/content/post-detail";
import { postCommentService, postReportService, postService, session } from "@/di/container";
import NotFoundError from "@/domain/core/errors/NotFoundError";

/** The viewer and the post they may see, or a 404. Shared by the page and its metadata. */
const getPost = cache(async (id: string) => {
  const viewer = await session.getCurrentUser();
  try {
    const detail = await postService.getDetail(id, viewer?.id ?? null);
    return { viewer, detail };
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
});

export async function generateMetadata(props: PageProps<"/foro/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const { detail } = await getPost(id);
  return { title: postDetail.metaTitle(detail.post.title) };
}

export default async function PostPage(props: PageProps<"/foro/[id]">) {
  const { id } = await props.params;
  const { viewer, detail } = await getPost(id);

  const [threads, related, reasons] = await Promise.all([
    detail.post.published ? postCommentService.listThread(id, viewer?.id ?? null) : [],
    postService.listRelated(detail.post),
    postReportService.listReasons(),
  ]);

  return (
    <PostView
      post={toPostDetailItem(detail)}
      threads={threads.map((thread) => toCommentThreadItem(thread, detail.author.id))}
      voices={toConversationVoices(detail, threads)}
      related={related.map(toForumPostItem)}
      reasons={reasons.map(toReportReasonOption)}
      viewer={toPostViewer(viewer)}
    />
  );
}
