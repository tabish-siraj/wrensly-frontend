"use client";

import { usePost } from "@/hooks/post/usePost";
import { TweetCard } from "@/components/card/TweetCard";
import { TweetComposer } from "@/components/input/TweetComposer";


export default function FeedPage() {
  const { posts, loading, error } = usePost();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!posts || posts.data.length === 0) return <div>No posts available</div>;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/4">
      nav
      </div>
      <div className="w-full md:w-1/2">
      <TweetComposer user={
        {
          id: "1",
          username: "testuser",
          displayName: "Test User",
          avatar: "https://example.com/profile.jpg",
        }
        
      }/>
      {posts.data.map((post) => (
        <TweetCard
          key={post.id}
          content={post.content}
          username={post.userId}
          isLiked={true}
          likeCount={0}
          isRetweeted={true}
          retweetCount={0}
          isShared={true}
          shareCount={0}
          isBookmarked={true}
          onToggleLike={() => {}}
          onToggleRetweet={() => {}}
          onToggleShare={() => {}}
          onToggleBookmark={() => {}}
        />
      ))}
      </div>
      <div className="w-full md:w-1/4">
      trending
            </div>
    </div>
  );
}