"use client";

import { usePost } from "@/hooks/post/usePost";
import { ChirpCard } from "@/components/card/ChirpCard";
import { ChirpComposer } from "@/components/input/ChirpComposer";
import { Loader2 } from "lucide-react";
import { PostWithInteractions } from "@/src/types";
import useUserStore from "@/src/stores/userStore";
import usePostStore from "@/src/stores/postStore";
import { useToggleLike } from "@/hooks/post/useToggleLike";

import { useState, useEffect } from "react";


export default function FeedPage() {
  const { posts: fetchedPosts, loading, error } = usePost();
  const setPosts = usePostStore((state) => state.setPosts);
  const posts = usePostStore((state) => state.posts);

  useEffect(() => {
    if (fetchedPosts?.data) {
      setPosts(fetchedPosts.data);
    }
  }, [fetchedPosts, setPosts]);

  if (loading) return <Loader2 />;
  if (error) return <div>Error loading posts: {error}</div>;
  if (!posts || posts.length === 0) return <div>No posts available</div>;
  return (
    <div className="w-full">
      {posts.map((post: PostWithInteractions) => (
        <ChirpCard
          key={post.id} post={post}
        />
      ))}
    </div>
  );
}

// export default function FeedPage() {
//   const { user } = useUserStore();
//   const { posts: fetchedPosts, loading, error } = usePost();
//   const [posts, setPosts] = useState<PostWithInteractions[]>([]);

//   useEffect(() => {
//     if (fetchedPosts?.data) setPosts(fetchedPosts.data);
//   }, [fetchedPosts]);


//   return (
//     <div className="w-full">
//       <ChirpComposer user={{
//         username: user?.username || "",
//         avatar:
//           user?.avatar ||
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHPCQDGxzqlFNGeeP1WPx_5tLK03EMXLwpA&s"
//       }}
//       />

//       {loading ? (
//         <div className="flex justify-center py-8">
//           <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
//         </div>
//       ) : error ? (
//         <div className="text-red-500 py-8">Error loading posts: {error}</div>
//         // ) : fetchedPosts && fetchedPosts.data && fetchedPosts.data.length > 0 ? (
//         //   fetchedPosts.data.map((post: PostWithInteractions) => (
//       ) : posts && posts.length > 0 ? (
//         posts.map((post: PostWithInteractions) => (
//           <ChirpCard
//             key={post.id}
//             content={post.content}
//             username={post.user.username || "unknown"}
//             isFeathered={post.isFeathered}
//             featherCount={post.featherCount}
//             isEchoed={post.isEchoed}
//             echoCount={post.echoCount}
//             isBookmarked={post.isBookmarked}
//             isSpread={post.isSpread}
//             spreadCount={post.spreadCount}
//             // onToggleFeather={() => toggleLike.mutate({ postId: post.id, isFeathered: post.isFeathered })}
//             onToggleFeather={() => handleToggleLike(post.id)}
//             onToggleEcho={() => { }}
//             onToggleSpread={() => { }}
//             onToggleBookmark={() => { }}
//           />
//         ))
//       ) : (
//         <div className="py-8 text-gray-500">No posts available</div>
//       )}
//     </div>
//   );
// }