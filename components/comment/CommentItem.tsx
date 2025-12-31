"use client";

import { useState } from "react";
import { Post } from "@/src/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, MoreHorizontal, Trash2 } from "lucide-react";
import { CommentComposer } from "@/components/input/CommentComposer";
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import { HashtagText } from "@/components/hashtag/HashtagText";
import { useToggleLike } from "@/hooks/post/useToggleLike";
import { useDeletePost } from "@/hooks/post/useCreatePost";
import { useCreateReply } from "@/hooks/comment/useCreateReply";
import { toast } from "sonner";
import useUserStore from "@/src/stores/userStore";
import { formatDistanceToNow } from "date-fns";

interface CommentItemProps {
    comment: Post;
    screen: string;
    root_post: Post;
    is_reply?: boolean;
}

export function CommentItem({ comment, screen, root_post, is_reply = false }: CommentItemProps) {
    const [show_reply_composer, setShowReplyComposer] = useState(false);
    const [show_replies, setShowReplies] = useState(false);
    const [show_delete_modal, setShowDeleteModal] = useState(false);
    const { user } = useUserStore();
    const { mutate: toggleLike, isPending: isLiking } = useToggleLike();
    const { mutate: deletePost, isPending: isDeleting } = useDeletePost({ screen });
    const { mutate: createReply, isPending: isCreatingReply } = useCreateReply({
        screen,
        root_post_id: root_post.id,
        onSuccess: () => setShowReplyComposer(false)
    });

    // Check if current user owns this comment
    const is_owner = user && comment.user.id === user.id;

    const handleLike = () => {
        if (!user) {
            toast.error("Please log in to like comments");
            return;
        }

        toggleLike({
            post_id: comment.id,
            is_liked: comment.is_liked,
            screen: screen,
        });
    };

    const handleReply = () => {
        if (!user) {
            toast.error("Please log in to reply");
            return;
        }
        setShowReplyComposer(!show_reply_composer);
    };

    const handleToggleReplies = () => {
        setShowReplies(!show_replies);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        deletePost(
            { post_id: comment.id },
            {
                onSuccess: () => {
                    toast.success(`${is_reply ? 'Reply' : 'Comment'} deleted successfully`);
                    setShowDeleteModal(false);
                },
                onError: (error: any) => {
                    toast.error(error.message || `Failed to delete ${is_reply ? 'reply' : 'comment'}`);
                    setShowDeleteModal(false);
                },
            }
        );
    };

    const reply_count = comment.replies?.length || 0;
    const has_replies = reply_count > 0;

    return (
        <div className={`${is_reply ? 'ml-12 border-l-2 border-gray-100 pl-4' : 'px-4'} py-3`}>
            <div className="flex gap-3">
                {/* Avatar */}
                <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage
                        src={comment.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.username)}`}
                        alt={comment.user.username}
                    />
                    <AvatarFallback>
                        {comment.user.username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                    {/* Comment Header */}
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-gray-900">
                                {comment.user.first_name && comment.user.last_name
                                    ? `${comment.user.first_name} ${comment.user.last_name}`
                                    : comment.user.username}
                            </span>
                            <span className="text-gray-500 text-sm">@{comment.user.username}</span>
                            <span className="text-gray-400 text-xs">·</span>
                            <span className="text-gray-400 text-xs">
                                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                            </span>
                        </div>
                        {is_owner && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleDeleteClick}
                                className="text-gray-400 hover:text-red-500 h-6 w-6 p-0"
                                title={`Delete ${is_reply ? 'reply' : 'comment'}`}
                            >
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        )}
                    </div>

                    {/* Comment Content */}
                    <div className="text-gray-800 text-sm mb-2">
                        <HashtagText content={comment.content} />
                    </div>

                    {/* Comment Actions */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            disabled={isLiking}
                            className={`flex items-center gap-1 text-xs h-7 px-2 ${comment.is_liked
                                ? 'text-red-500 hover:text-red-600'
                                : 'text-gray-500 hover:text-red-500'
                                }`}
                        >
                            <Heart
                                className={`w-3 h-3 ${comment.is_liked ? 'fill-current' : ''}`}
                            />
                            {comment.stats.likes > 0 && (
                                <span>{comment.stats.likes}</span>
                            )}
                        </Button>

                        {!is_reply && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleReply}
                                className="flex items-center gap-1 text-xs h-7 px-2 text-gray-500 hover:text-blue-500"
                            >
                                <MessageCircle className="w-3 h-3" />
                                Reply
                            </Button>
                        )}

                        {has_replies && !is_reply && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleToggleReplies}
                                className="text-xs h-7 px-2 text-blue-600 hover:text-blue-700"
                            >
                                {show_replies ? 'Hide' : 'Show'} {reply_count} {reply_count === 1 ? 'reply' : 'replies'}
                            </Button>
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-gray-600 h-7 w-7 p-0"
                        >
                            <MoreHorizontal className="w-3 h-3" />
                        </Button>
                    </div>

                    {/* Reply Composer */}
                    {show_reply_composer && user && (
                        <div className="mt-3">
                            <CommentComposer
                                user={{
                                    username: user.username,
                                    avatar: user.avatar,
                                }}
                                post={comment} // Reply to this comment
                                screen={screen}
                                root_post_id={root_post.id} // Pass the root post ID for cache invalidation
                                placeholder={`Reply to ${comment.user.first_name || comment.user.username}...`}
                                onSubmit={(content) => {
                                    createReply({
                                        content,
                                        parent_comment_id: comment.id
                                    });
                                }}
                            />
                        </div>
                    )}

                    {/* Nested Replies */}
                    {show_replies && has_replies && (
                        <div className="mt-3 space-y-2">
                            {comment.replies?.map((reply) => (
                                <CommentItem
                                    key={reply.id}
                                    comment={reply}
                                    screen={screen}
                                    root_post={root_post}
                                    is_reply={true}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={show_delete_modal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                isDeleting={isDeleting}
                itemType={is_reply ? "reply" : "comment"}
                itemContent={comment.content}
            />
        </div>
    );
}