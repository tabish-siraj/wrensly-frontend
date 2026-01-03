import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Post } from '@/src/types';
import { POST_TYPE } from '@/src/constants';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { PostHeader } from "./PostHeader";
import { ParentPostCard } from "./ParentPostCard";
import { PostActions } from "./PostActions";
import { CommentComposer } from "@/components/input/CommentComposer";
import { CommentThread } from "@/components/comment/CommentThread";
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import { HashtagText } from "@/components/hashtag/HashtagText";
import useUserStore from "@/src/stores/userStore";
import { useCreateComment } from "@/hooks/comment/useCreateComment";
import { useDeletePost } from "@/hooks/post/useCreatePost";
import { toast } from "sonner";
import { RepeatIcon, Trash2, MoreHorizontal, Flag, Copy, Share, Bookmark } from "lucide-react";

interface PostCardProps {
  post: Post;
  screen: string;
}

export function PostCard({ screen, post }: PostCardProps) {
  const { user } = useUserStore();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost({ screen });

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

  // Check if current user owns this post
  const isOwner = user && post.user.id === user.id;

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleReportClick = () => {
    toast.info("Report functionality coming soon");
    // TODO: Implement report functionality
  };

  const handleCopyLinkClick = () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      toast.success("Link copied to clipboard");
    }).catch(() => {
      toast.error("Failed to copy link");
    });
  };

  const handleShareClick = () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    if (navigator.share) {
      navigator.share({
        title: `Post by @${post.user.username}`,
        text: post.content,
        url: postUrl,
      }).catch(() => {
        // Fallback to copy link if share fails
        handleCopyLinkClick();
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyLinkClick();
    }
  };

  const handleBookmarkClick = () => {
    toast.info("Bookmark functionality coming soon");
    // TODO: Implement bookmark functionality
  };

  const handleDeleteConfirm = () => {
    deletePost(
      { post_id: post.id },
      {
        onSuccess: () => {
          toast.success("Post deleted successfully");
          setShowDeleteModal(false);
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to delete post");
          setShowDeleteModal(false);
        },
      }
    );
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
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
          <div className="flex items-center justify-between">
            <PostHeader user={post.user} />

            {/* Three-dot menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0 rounded-full"
                  title="More options"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                {/* Copy Link - Available to everyone */}
                <DropdownMenuItem onClick={handleCopyLinkClick} className="cursor-pointer">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy link
                </DropdownMenuItem>

                {/* Share - Available to everyone */}
                <DropdownMenuItem onClick={handleShareClick} className="cursor-pointer">
                  <Share className="w-4 h-4 mr-2" />
                  Share post
                </DropdownMenuItem>

                {/* Bookmark - Available to everyone */}
                <DropdownMenuItem onClick={handleBookmarkClick} className="cursor-pointer">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Bookmark
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Owner-only actions */}
                {isOwner ? (
                  <DropdownMenuItem
                    onClick={handleDeleteClick}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete post
                  </DropdownMenuItem>
                ) : (
                  /* Report - Available to non-owners */
                  <DropdownMenuItem
                    onClick={handleReportClick}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <Flag className="w-4 h-4 mr-2" />
                    Report post
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          {/* Show quote content if it's a quote */}
          {isQuote && post.content && (
            <div
              className="cursor-pointer"
              onClick={() => router.push(`/post/${post.id}`)}
            >
              <HashtagText content={post.content} className="text-gray-800 mb-4" />
            </div>
          )}

          {/* Show parent post for quotes */}
          {hasParent && (
            <ParentPostCard post={safeParent} />
          )}

          {/* Show regular content for normal posts and reposted posts */}
          {!isQuote && (
            <div
              className="cursor-pointer"
              onClick={() => router.push(`/post/${post.id}`)}
            >
              <HashtagText content={post.content} className="text-gray-800 mb-4" />
            </div>
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

        {/* Comment Thread - only show when comments are toggled */}
        {showComments && (
          <CommentThread post={post} screen={screen} />
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
          itemType="post"
          itemContent={post.content}
        />
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
