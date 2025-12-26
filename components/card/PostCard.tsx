import { useState } from "react";
import Link from 'next/link';

import { Post } from '@/src/types';
import { POST_TYPE } from '@/src/constants';

import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { PostHeader } from "./PostHeader";
import { ParentPostCard } from "./ParentPostCard";
import { PostActions } from "./PostActions";
import { CommentComposer } from "@/components/input/CommentComposer";
import useUserStore from "@/src/stores/userStore";
import { useCreateComment } from "@/hooks/comment/useCreateComment";
import { toast } from "sonner";
import { RepeatIcon } from "lucide-react";

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
      },
      {
        onSuccess: () => {
          toast.success("Your comment has been posted.");
          setIsCommenting(false);
        },
        onError: (error) => {
          toast.error("Failed to post your comment.");
          // Log error for debugging
          console.error(error);
        },
      }
    );
  };

  // Determine post type and structure
  const isRepost = post.type === POST_TYPE.REPOST;
  const isQuote = post.type === POST_TYPE.QUOTE;
  const hasParent = post.parent_id && post.parent;

  const postDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const postTime = new Date(post.created_at).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });

  // For pure reposts (no additional content)
  if (isRepost && (!post.content || post.content.trim() === "") && hasParent) {
    return (
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        {/* Repost indicator */}
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <RepeatIcon className="w-4 h-4" />
            <Link href={`/profile/${post.user.username}`} className="font-medium hover:underline">
              @{post.user.username}
            </Link>
            <span>reposted</span>
          </div>
        </div>

        {/* Original post content */}
        <CardHeader>
          <PostHeader user={post.parent!.user} />
        </CardHeader>
        <CardContent>
          <Link href={`/post/${post.parent!.id}`}>
            <p className="text-gray-800 mb-4 whitespace-pre-line">{post.parent!.content}</p>
          </Link>
          <div className="text-sm text-gray-500">
            <span>{new Date(post.parent!.created_at).toLocaleTimeString('en-US', {
              hour: '2-digit', minute: '2-digit'
            })} &middot; {new Date(post.parent!.created_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}</span>
          </div>
        </CardContent>
        <PostActions screen={screen} post={post.parent!} onCommentClick={handleCommentClick} />
        {isCommenting && user && (
          <CommentComposer
            user={user}
            placeholder={`Replying to @${post.parent!.user.username}`}
            onSubmit={handleSubmitComment}
            screen={screen}
            post={post.parent!}
          />
        )}
      </Card>
    );
  }

  // For quotes or regular posts with content
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      {/* Quote repost indicator (if it's a quote with content) */}
      {isQuote && hasParent && (
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <RepeatIcon className="w-4 h-4" />
            <Link href={`/profile/${post.user.username}`} className="font-medium hover:underline">
              @{post.user.username}
            </Link>
            <span>quoted</span>
          </div>
        </div>
      )}

      <CardHeader>
        <PostHeader user={post.user} />
      </CardHeader>
      <CardContent>
        {/* Post content (for quotes and regular posts) */}
        {post.content && post.content.trim() !== "" && (
          <Link href={`/post/${post.id}`}>
            <p className="text-gray-800 mb-4 whitespace-pre-line">{post.content}</p>
          </Link>
        )}

        {/* Quoted post (embedded) */}
        {(isQuote || hasParent) && post.parent && (
          <ParentPostCard post={post.parent} />
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
  );
}
