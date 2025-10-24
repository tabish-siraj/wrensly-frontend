"use client";

import { PostDetail } from "@/components/card/PostDetail";
import { useParams } from "next/navigation";
import { usePostByID } from "@/hooks/post/usePost";
import { SCREEN } from "@/src/constants";

const PostPage = () => {
  const { id } = useParams();
  const { post, loading, error } = usePostByID(id as string);
  console.log(post)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <>
      <PostDetail screen={SCREEN.POST} post={post} />
    </>
  )

};

export default PostPage;
