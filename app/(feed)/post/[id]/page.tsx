"use client";

import { PostComposer } from "@/components/input/PostComposer";
import useUserStore from "@/src/stores/userStore";
import { useRouter } from "next/navigation";

const PostPage = () => {
  const { user } = useUserStore();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handlePostSubmit = () => {
    router.push("/");
  };

  return (
    <div className="p-4">
      <PostComposer
        user={{ username: user.username, avatar: user.avatar }}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
};

export default PostPage;
