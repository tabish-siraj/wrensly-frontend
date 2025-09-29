"use client";

import { useFeed } from "@/hooks/post/useFeed";
import { PostCard } from "@/components/card/PostCard";
import { PostComposer } from "@/components/input/PostComposer";
import { Loader2 } from "lucide-react";
import { Post } from "@/src/types";
import useUserStore from "@/src/stores/userStore";

export default function FeedPage() {
  const { user } = useUserStore();
  const { posts, loading, error } = useFeed();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        Error loading posts: {error}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No posts available
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <PostComposer
        user={{
          username: user?.username || "anonymous",
          avatar: user?.avatar || "/default-avatar.png"
        }}
      />
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}