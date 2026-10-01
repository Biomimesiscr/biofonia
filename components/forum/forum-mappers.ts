import "server-only";

import { audienceOf, roleFor } from "@/components/profile/role-style";
import { categoryTone } from "@/content/forum";
import { profile } from "@/content/profile";
import type { ForumPost } from "@/domain/post/readmodels/ForumPost";
import { excerpt, formatRelativeDate, initials } from "@/lib/format";
import type { ForumPostItem, TopPostItem } from "./types";

export function toForumPostItem({ post, category, author, likeCount, commentCount, likedByViewer }: ForumPost): ForumPostItem {
  return {
    id: post.id!,
    title: post.title,
    excerpt: excerpt(post.content),
    category: category ? { name: category.name, tone: categoryTone(category.name) } : null,
    author: {
      name: author.name,
      initials: initials(author.name),
      avatar: roleFor(author.userType).style.avatar,
      audience: audienceOf(author.userType),
    },
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
