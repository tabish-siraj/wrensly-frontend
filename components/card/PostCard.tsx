import { useState } from "react";
import Link from 'next/link';

import { Post } from '@/src/types';

import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { PostHeader } from "./PostHeader";
import { ParentPostCard } from "./ParentPostCard";
import { PostActions } from "./PostActions";
import { CommentComposer } from "@/components/input/CommentComposer";
import useUserStore from "@/src/stores/userStore";
import { useCreatePost } from "@/hooks/post/useCreatePost";
import { toast } from "sonner";
import { SCREEN, POST_TYPE } from "@/src/constants";

interface PostCardProps {
  post: Post;
  screen: string;
}

export function PostCard({ screen, post }: PostCardProps) {
  const [isCommenting, setIsCommenting] = useState(false);
  const { user } = useUserStore();
  const postMutation = useCreatePost({ screen });

  const handleCommentClick = () => {
    setIsCommenting(!isCommenting);
  };

  const handleSubmitComment = (content: string) => {
    if (!user) {
      toast.error("You must be logged in to comment.");
      return;
    }
    postMutation.mutate(
      {
        content: content.trim(),
        type: POST_TYPE.COMMENT,
        parentId: post.id,
      },
      {
        onSuccess: () => {
          toast.success("Your comment has been posted.");
          setIsCommenting(false);
        },
        onError: (error) => {
          toast.error("Failed to post your comment.");
          console.error(error);
        },
      }
    );
  };
  const isReposted = post.parentId !== null && post.parentId !== "";
  const parentPost = isReposted ? post.parent : null;
  const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const postTime = new Date(post.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <PostHeader user={post.user} />
      </CardHeader>
      <CardContent>
        <Link href={`/post/${post.id}`}>
          <p className="text-gray-800 mb-4">{post.content}</p>
        </Link>
        {isReposted && parentPost && (
          <ParentPostCard post={parentPost} />
        )}
        <div className="text-sm text-gray-500">
          <span>{postTime} &middot; {postDate}</span>
        </div>
      </CardContent>
      <PostActions screen={screen} post={post} onCommentClick={handleCommentClick} />
      {isCommenting && user && (
        <CommentComposer
          user={user}
          placeholder={`Replying to @${post.user.username}`}
          onSubmit={handleSubmitComment}
          screen={SCREEN.POST}
          post={post}
        />
      )}
    </Card>
  )
}
