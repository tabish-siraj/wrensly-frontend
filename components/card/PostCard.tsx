import { useState } from "react";
import Link from 'next/link';

import { Post } from '@/src/types';

import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { PostHeader } from "./PostHeader";
import { ParentPostCard } from "./ParentPostCard";
import { PostActions } from "./PostActions";
import { CommentComposer } from "@/components/input/CommentComposer";
import useUserStore from "@/src/stores/userStore";
import { useCreateComment } from "@/hooks/comment/useCreateComment";
import { toast } from "sonner";

interface PostCardProps {
  post: Post;
  screen: string;
}

export function PostCard({ screen, post }: PostCardProps) {
  const [isCommenting, setIsCommenting] = useState(false);
  const { user } = useUserStore();
  const postMutation = useCreateComment({ screen });

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
        post_id: post.id,
        parent_id: post.id,
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
  const is_reposted = post.parent_id !== null && post.parent_id !== "";
  const parentPost = is_reposted ? post.parent : null;
  const postDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const postTime = new Date(post.created_at).toLocaleTimeString('en-US', {
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
        {is_reposted && parentPost && (
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
          screen={screen}
          post={post}
        />
      )}
    </Card>
  )
}
