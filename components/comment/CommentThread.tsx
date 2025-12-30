"use client";

import { useState } from "react";
import { Post } from "@/src/types";
import { CommentItem } from "./CommentItem";
import { CommentComposer } from "@/components/input/CommentComposer";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePostComments } from "@/hooks/comment/usePostComments";
import { Loader2 } from "lucide-react";
import useUserStore from "@/src/stores/userStore";

interface CommentThreadProps {
    post: Post;
    screen: string;
}

export function CommentThread({ post, screen }: CommentThreadProps) {
    const [showComments, setShowComments] = useState(false);
    const [showComposer, setShowComposer] = useState(false);
    const { user } = useUserStore();
    const { comments, loading, error } = usePostComments(post.id);

    const handleToggleComments = () => {
        setShowComments(!showComments);
    };

    const handleShowComposer = () => {
        setShowComposer(true);
        if (!showComments) {
            setShowComments(true);
        }
    };

    const commentCount = post.stats.comments;

    return (
        <div className="border-t border-gray-100">
            {/* Comment Actions */}
            <div className="flex items-center gap-4 px-4 py-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleComments}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">
                        {commentCount > 0 ? `${commentCount} comments` : "Comment"}
                    </span>
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShowComposer}
                    className="text-sm text-blue-600 hover:text-blue-700"
                >
                    Reply
                </Button>
            </div>

            {/* Comment Composer */}
            {showComposer && user && (
                <div className="px-4 pb-4">
                    <CommentComposer
                        user={{
                            username: user.username,
                            avatar: user.avatar,
                        }}
                        post={post}
                        screen={screen}
                        placeholder={`Reply to ${post.user.first_name || post.user.username}...`}
                        onSubmit={() => setShowComposer(false)}
                    />
                </div>
            )}

            {/* Comments List */}
            {showComments && (
                <div className="border-t border-gray-50">
                    {loading ? (
                        <div className="flex justify-center py-4">
                            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                        </div>
                    ) : error ? (
                        <div className="px-4 py-4 text-center text-red-500 text-sm">
                            Failed to load comments
                        </div>
                    ) : comments.length === 0 ? (
                        <div className="px-4 py-4 text-center text-gray-500 text-sm">
                            No comments yet. Be the first to comment!
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {comments.map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                    screen={screen}
                                    rootPost={post}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}