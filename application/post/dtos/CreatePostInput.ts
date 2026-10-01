export interface CreatePostInput {
  title: string;
  content: string;
  postCategoryId: string;
  /** `true` publishes right away; `false` keeps it as a draft. */
  publish: boolean;
}
