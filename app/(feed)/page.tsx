"use client";

import { usePost } from "@/hooks/post/usePost";
import { TweetCard } from "@/components/card/TweetCard";
import { TweetComposer } from "@/components/input/TweetComposer";
import { Loader2 } from "lucide-react";

export default function FeedPage() {
  const { posts, loading, error } = usePost();

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/4">nav</div>
      <div className="w-full md:w-1/2">
        <TweetComposer
          user={{
            id: "1",
            username: "testuser",
            displayName: "Test User",
            avatar: "https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png",
          }}
        />
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-8">Error loading posts: {error}</div>
        ) : posts && posts.data && posts.data.length > 0 ? (
          posts.data.map((post) => (
            <TweetCard
              key={post.id}
              content={post.content}
              username={post.user.username}
              isLiked={true}
              likeCount={0}
              isRetweeted={true}
              retweetCount={0}
              isShared={true}
              shareCount={0}
              isBookmarked={true}
              onToggleLike={() => { }}
              onToggleRetweet={() => { }}
              onToggleShare={() => { }}
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