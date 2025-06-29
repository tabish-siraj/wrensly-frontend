"use client";

import { usePost } from "@/hooks/post/usePost";
import { ChirpCard } from "@/components/chirp/ChirpCard";
import { ChirpComposer } from "@/components/input/ChirpComposer";
import { Loader2 } from "lucide-react";
import { Post } from "@/src/types";
import useUserStore from "@/src/stores/userStore";

export default function FeedPage() {
  const { posts, loading, error } = usePost();
  const { user } = useUserStore()

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/4">nav</div>
      <div className="w-full md:w-1/2">
        <ChirpComposer user={{
          username: user?.username || "",
          avatar: user?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHPCQDGxzqlFNGeeP1WPx_5tLK03EMXLwpA&s"
        }} />
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-8">Error loading posts: {error}</div>
        ) : posts && posts.data && posts.data.length > 0 ? (
          posts.data.map((post: Post) => (
            <ChirpCard
              key={post.id}
              content={post.content}
              username={post.user.username}
              isFeathered={true}
              featherCount={0}
              isEchoed={true}
              echoCount={0}
              isBookmarked={true}
              isSpread={true}
              spreadCount={0}
              onToggleFeather={() => { }}
              onToggleEcho={() => { }}
              onToggleSpread={() => { }}
              onToggleBookmark={() => { }}
            />
          ))
        ) : (
          <div className="py-8 text-gray-500">No posts available</div>
        )}
      </div>
      <div className="w-full md:w-1/4">trending</div>
    </div>
  );
}