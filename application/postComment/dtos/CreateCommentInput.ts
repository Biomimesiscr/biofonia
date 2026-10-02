export interface CreateCommentInput {
  postId: string;
  content: string;
  /** The comment being answered; `null` for a top-level comment. */
  parentId: string | null;
}
