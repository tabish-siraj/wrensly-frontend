import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Post, PostWithInteractions } from "@/src/types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const removeEmptyFields = (obj: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== null && value !== "" && value !== undefined)
  );
};

export function normalizePost(post: Post): PostWithInteractions {
  return {
    ...post,
    user: post.user,
    // _count: post._count,
    isLiked: false,
    likeCount: 0,
    isEchoed: false,
    echoCount: 0,
    isSpread: false,
    spreadCount: 0,
    isBookmarked: false,
  };
}

export function normalizePosts(posts: Post[]): PostWithInteractions[] {
  if (!Array.isArray(posts)) {
    console.error("Expected posts to be an array:", posts);
    return [];
  }
  return posts.map(normalizePost);
}
