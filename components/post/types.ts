import type { ForumPostItem } from "@/components/forum/types";
import type { PostAuthor } from "@/components/posts/author-line";
import type { UserType } from "@/components/profile/role-style";

/** Serializable post for its own page: entities never reach client components. */
export type PostDetailItem = Omit<ForumPostItem, "excerpt" | "author"> & {
  paragraphs: string[];
  published: boolean;
  author: PostAuthor & { id: string; userType: UserType; biography: string | null };
};

export type CommentItem = {
  id: string;
  author: PostAuthor;
  /** Written by the post's author: gets the "Autor del post" pill. */
  isPostAuthor: boolean;
  text: string;
  date: string;
  /** Milliseconds since the epoch, to sort by "Recientes". */
  createdAt: number;
  votes: number;
  voted: boolean;
};

export type CommentThreadItem = CommentItem & { replies: CommentItem[] };

export type CommentSort = "votes" | "recent";

/** Distinct people in the conversation (author included), by audience. */
export type ConversationVoices = { lab: number; field: number };

export type ReportReasonOption = { id: string; label: string };

/** The signed-in visitor, shown next to the composer; `null` when signed out. */
export type PostViewer = PostAuthor | null;
