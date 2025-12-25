"use client";

import { PostDetail } from "@/components/card/PostDetail";
import { useParams } from "next/navigation";
import { usePostByID } from "@/hooks/post/usePost";
import { SCREEN } from "@/src/constants";
import { Loader2 } from "lucide-react";

const PostPage = () => {
  const { id } = useParams();
  const { post, loading, error } = usePostByID(id as string);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Post not found</h2>
        <p className="text-gray-600">The post you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Post not found</h2>
        <p className="text-gray-600">The post you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <>
      <PostDetail screen={SCREEN.POST} post={post} />
    </>
  );
};

export default PostPage;
