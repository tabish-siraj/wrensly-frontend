"use client";

import { usePostComments } from "@/hooks/comment/usePostComments";
import { CommentItem } from "@/components/comment/CommentItem";
import { Post } from "@/src/types";
import { Loader2 } from "lucide-react";

interface CommentListProps {
    post_id: string;
    root_post: Post;
}

export function CommentList({ post_id, root_post }: CommentListProps) {
    const { comments, loading, error } = usePostComments(post_id);

    if (loading) {
        return (
            <div className="flex justify-center py-6">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-6 text-red-500 text-sm">
                Error loading comments. Please try again.
            </div>
        );
    }

    if (!comments || comments.length === 0) {
        return (
            <div className="text-center py-6 text-gray-500 text-sm">
                No comments yet. Be the first to comment!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Comments ({comments.length})
            </h3>
            <div className="divide-y divide-gray-100">
                {comments.map((comment: Post) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        screen="post-detail"
                        root_post={root_post}
                    />
                ))}
            </div>
        </div>
    );
}
