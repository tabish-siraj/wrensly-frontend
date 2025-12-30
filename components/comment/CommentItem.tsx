"use client";

import { useState } from "react";
import { Post } from "@/src/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { CommentComposer } from "@/components/input/CommentComposer";
import { useToggleLike } from "@/hooks/post/useToggleLike";
import { toast } from "sonner";
import useUserStore from "@/src/stores/userStore";
import { formatDistanceToNow } from "date-fns";

interface CommentItemProps {
    comment: Post;
    screen: string;
    rootPost: Post;
    isReply?: boolean;
}

export function CommentItem({ comment, screen, rootPost, isReply = false }: CommentItemProps) {
    const [showReplyComposer, setShowReplyComposer] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const { user } = useUserStore();
    const { mutate: toggleLike, isPending: isLiking } = useToggleLike();

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
        setShowReplyComposer(!showReplyComposer);
    };

    const handleToggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const replyCount = comment.replies?.length || 0;
    const hasReplies = replyCount > 0;

    return (
        <div className={`${isReply ? 'ml-12 border-l-2 border-gray-100 pl-4' : 'px-4'} py-3`}>
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
                    <div className="flex items-center gap-2 mb-1">
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

                    {/* Comment Content */}
                    <div className="text-gray-800 text-sm mb-2 whitespace-pre-line">
                        {comment.content}
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

                        {!isReply && (
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

                        {hasReplies && !isReply && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleToggleReplies}
                                className="text-xs h-7 px-2 text-blue-600 hover:text-blue-700"
                            >
                                {showReplies ? 'Hide' : 'Show'} {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
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
                    {showReplyComposer && user && (
                        <div className="mt-3">
                            <CommentComposer
                                user={{
                                    username: user.username,
                                    avatar: user.avatar,
                                }}
                                post={comment} // Reply to this comment
                                screen={screen}
                                placeholder={`Reply to ${comment.user.first_name || comment.user.username}...`}
                                onSubmit={() => setShowReplyComposer(false)}
                            />
                        </div>
                    )}

                    {/* Nested Replies */}
                    {showReplies && hasReplies && (
                        <div className="mt-3 space-y-2">
                            {comment.replies?.map((reply) => (
                                <CommentItem
                                    key={reply.id}
                                    comment={reply}
                                    screen={screen}
                                    rootPost={rootPost}
                                    isReply={true}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}