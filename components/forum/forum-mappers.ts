import "server-only";

import type { PostAuthor } from "@/components/posts/author-line";
import { audienceOf, roleFor, type UserType } from "@/components/profile/role-style";
import { categoryTone } from "@/content/forum";
import { profile } from "@/content/profile";
import type { ForumPost } from "@/domain/post/readmodels/ForumPost";
import { excerpt, formatRelativeDate, initials } from "@/lib/format";
import type { ForumPostItem, TopPostItem } from "./types";

/** How a post's or comment's author is shown: initials, avatar colour and audience pill. */
export function toPostAuthor({ name, userType }: { name: string; userType: UserType }): PostAuthor {
  return {
    name,
    initials: initials(name),
    avatar: roleFor(userType).style.avatar,
    audience: audienceOf(userType),
  };
}

export function toForumPostItem({ post, category, author, likeCount, commentCount, likedByViewer }: ForumPost): ForumPostItem {
  return {
    id: post.id!,
    title: post.title,
    excerpt: excerpt(post.content),
    category: category ? { name: category.name, tone: categoryTone(category.name) } : null,
    author: toPostAuthor(author),
    date: formatRelativeDate(post.createdAt),
    views: post.impressionCount,
    comments: commentCount,
    votes: likeCount,
    voted: likedByViewer,
  };
}

export function toTopPostItem({ post, category, likeCount }: ForumPost): TopPostItem {
  return {
    id: post.id!,
    title: post.title,
    votes: likeCount,
    category: category?.name ?? profile.posts.uncategorized,
  };
}
