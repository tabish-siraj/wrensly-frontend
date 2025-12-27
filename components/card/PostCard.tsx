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

  // Safety checks
  if (!post) {
    console.error('PostCard: post is null or undefined');
    return null;
  }

  if (!post.user) {
    console.error('PostCard: post.user is null or undefined', post);
    return null;
  }

  // Additional safety checks for parent post
  const safeParent = post.parent && post.parent.user ? post.parent : null;

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
          console.error(error);
        },
      }
    );
  };

  try {
    // Handle repost display (Twitter-like behavior)
    const isRepostedPost = !!post.reposted_by;
    const isQuote = post.type === POST_TYPE.QUOTE;
    const hasParent = safeParent && isQuote; // Only quotes have parent content now

    // Safe repost user access
    const repostUser = post.reposted_by?.user;
    const repostUserName = repostUser ? (
      repostUser.first_name && repostUser.last_name
        ? `${repostUser.first_name} ${repostUser.last_name}`
        : repostUser.username
    ) : 'Someone';

    return (
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        {/* Show repost indicator for reposted posts */}
        {isRepostedPost && repostUser && (
          <div className="flex items-center gap-2 px-4 pt-3 text-sm text-gray-500">
            <RepeatIcon className="w-4 h-4" />
            <span>@{repostUserName} reposted</span>
          </div>
        )}

        <CardHeader>
          <PostHeader user={post.user} />
        </CardHeader>

        <CardContent>
          {/* Show quote content if it's a quote */}
          {isQuote && post.content && (
            <Link href={`/post/${post.id}`}>
              <p className="text-gray-800 mb-4 whitespace-pre-line">{post.content}</p>
            </Link>
          )}

          {/* Show parent post for quotes */}
          {hasParent && (
            <ParentPostCard post={safeParent} />
          )}

          {/* Show regular content for normal posts and reposted posts */}
          {!isQuote && (
            <Link href={`/post/${post.id}`}>
              <p className="text-gray-800 mb-4 whitespace-pre-line">{post.content}</p>
            </Link>
          )}

          <div className="text-sm text-gray-500">
            <span>
              {(() => {
                try {
                  return new Date(post.created_at).toLocaleString();
                } catch (error) {
                  console.error('Error formatting date:', error, post.created_at);
                  return post.created_at || 'Unknown date';
                }
              })()}
            </span>
          </div>
        </CardContent>

        <PostActions screen={screen} post={post} onCommentClick={handleCommentClick} />

        {/* Comment composer */}
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
  } catch (error) {
    console.error('Error rendering PostCard:', error, post);
    return (
      <Card className="shadow-md">
        <CardContent className="p-4">
          <div className="text-red-500">Error loading post</div>
          <pre className="text-xs mt-2">{JSON.stringify(error, null, 2)}</pre>
        </CardContent>
      </Card>
    );
  }
}
