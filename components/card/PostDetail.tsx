import { useState } from "react";
import { Post } from "@/src/types";
import { PostHeader } from "./PostHeader";
import { ParentPostCard } from "./ParentPostCard";
import { PostActions } from "./PostActions";
import { CommentList } from "./CommentList";
import { CommentComposer } from "@/components/input/CommentComposer";
import { HashtagText } from "@/components/hashtag/HashtagText";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import useUserStore from "@/src/stores/userStore";
import { useCreateComment } from "@/hooks/comment/useCreateComment";
import { useDeletePost } from "@/hooks/post/useCreatePost";
import { toast } from "sonner";
import { MoreHorizontal, Trash2, Flag, Copy, Share, Bookmark } from "lucide-react";

interface PostDetailProps {
    post: Post;
    screen: string;
}

export function PostDetail({ screen, post }: PostDetailProps) {
    const [showCommentComposer, setShowCommentComposer] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { user } = useUserStore();
    const postMutation = useCreateComment({ screen });
    const { mutate: deletePost, isPending: isDeleting } = useDeletePost({ screen });

    // Check if current user owns this post
    const isOwner = user && post.user.id === user.id;

    const handleCommentClick = () => {
        setShowCommentComposer(!showCommentComposer);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        deletePost(
            { post_id: post.id },
            {
                onSuccess: () => {
                    toast.success("Post deleted successfully");
                    setShowDeleteModal(false);
                    // Redirect to home after deletion
                    window.location.href = '/';
                },
                onError: (error: any) => {
                    toast.error(error.message || "Failed to delete post");
                    setShowDeleteModal(false);
                },
            }
        );
    };

    const handleReportClick = () => {
        toast.info("Report functionality coming soon");
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
                handleCopyLinkClick();
            });
        } else {
            handleCopyLinkClick();
        }
    };

    const handleBookmarkClick = () => {
        toast.info("Bookmark functionality coming soon");
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
                    setShowCommentComposer(false);
                },
                onError: (error) => {
                    toast.error("Failed to post your comment.");
                    console.error(error);
                },
            }
        );
    };

    const postDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const postTime = new Date(post.created_at).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit'
    });

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
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
                        <DropdownMenuItem onClick={handleCopyLinkClick} className="cursor-pointer">
                            <Copy className="w-4 h-4 mr-2" />
                            Copy link
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={handleShareClick} className="cursor-pointer">
                            <Share className="w-4 h-4 mr-2" />
                            Share post
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={handleBookmarkClick} className="cursor-pointer">
                            <Bookmark className="w-4 h-4 mr-2" />
                            Bookmark
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {isOwner ? (
                            <DropdownMenuItem
                                onClick={handleDeleteClick}
                                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete post
                            </DropdownMenuItem>
                        ) : (
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

            <div className="mb-4">
                <HashtagText content={post.content} className="text-xl text-gray-800" />
            </div>

            {post?.parent && (
                <ParentPostCard post={post.parent} />
            )}

            <div className="text-sm text-gray-500 mb-4">
                <span>{postTime} &middot; {postDate}</span>
            </div>

            <PostActions screen={screen} post={post} onCommentClick={handleCommentClick} />

            {/* Comment Composer - Always show if user is logged in */}
            {user && (
                <div className="mt-4 mb-6">
                    <CommentComposer
                        user={user}
                        placeholder={`Reply to ${post.user.first_name || post.user.username}...`}
                        onSubmit={handleSubmitComment}
                        screen={screen}
                        post={post}
                    />
                </div>
            )}

            {/* Comments List - Always show */}
            <div className="mt-6">
                <CommentList post_id={post.id} root_post={post} />
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                isDeleting={isDeleting}
                itemType="post"
                itemContent={post.content}
            />
        </div>
    );
}