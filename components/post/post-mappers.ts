import "server-only";

import { toForumPostItem, toPostAuthor } from "@/components/forum/forum-mappers";
import type { PostDetail } from "@/domain/post/readmodels/PostDetail";
import type { CommentThread, ThreadComment } from "@/domain/postComment/readmodels/ThreadComment";
import type { PostReportReason } from "@/domain/postReportReason/readmodels/PostReportReason";
import type { User } from "@/domain/user/entities/User";
import { formatRelativeDate } from "@/lib/format";
import type {
  CommentItem,
  CommentThreadItem,
  ConversationVoices,
  PostDetailItem,
  PostViewer,
  ReportReasonOption,
} from "./types";

export function toPostDetailItem(detail: PostDetail): PostDetailItem {
  const item = toForumPostItem(detail);
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    date: item.date,
    views: item.views,
    comments: item.comments,
    votes: item.votes,
    voted: item.voted,
    paragraphs: detail.post.content.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean),
    published: detail.post.published,
    author: {
      ...item.author,
      id: detail.author.id,
      userType: detail.author.userType,
      biography: detail.author.biography,
    },
  };
}

function toCommentItem({ comment, author, likeCount, likedByViewer }: ThreadComment, postAuthorId: string): CommentItem {
  return {
    id: comment.id!,
    author: toPostAuthor(author),
    isPostAuthor: author.id === postAuthorId,
    text: comment.content,
    date: formatRelativeDate(comment.createdAt),
    createdAt: comment.createdAt.getTime(),
    votes: likeCount,
    voted: likedByViewer,
  };
}

export function toCommentThreadItem(thread: CommentThread, postAuthorId: string): CommentThreadItem {
  return {
    ...toCommentItem(thread, postAuthorId),
    replies: thread.replies.map((reply) => toCommentItem(reply, postAuthorId)),
  };
}

/** Counts each person once, whether they wrote the post, comments or replies. */
export function toConversationVoices(detail: PostDetail, threads: readonly CommentThread[]): ConversationVoices {
  const people = new Map([[detail.author.id, detail.author.userType]]);
  for (const thread of threads) {
    for (const { author } of [thread, ...thread.replies]) people.set(author.id, author.userType);
  }
  const types = [...people.values()];
  return {
    lab: types.filter((type) => type === "IN_LABORATORY").length,
    field: types.filter((type) => type === "IN_FIELD").length,
  };
}

export function toReportReasonOption({ id, reason }: PostReportReason): ReportReasonOption {
  return { id, label: reason };
}

export function toPostViewer(user: User | null): PostViewer {
  if (!user) return null;
  return toPostAuthor({ name: user.name ?? user.email, userType: user.userType });
}
