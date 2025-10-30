"use client";

import { usePostComments } from "@/hooks/comment/usePostComments";
import { PostCard } from "./PostCard";
import { Post } from "@/src/types";

interface CommentListProps {
    postId: string;
}

export function CommentList({ postId }: CommentListProps) {
    const { comments, loading, error } = usePostComments(postId);

    if (loading) {
        return <div>Loading comments...</div>;
    }

    if (error) {
        return <div>Error loading comments.</div>;
    }

    return (
        <div>
            {comments && comments.map((comment: Post) => (
                <PostCard key={comment.id} post={comment} screen="post" />
            ))}
        </div>
    );
}
