"use client";

import { Post } from "@/src/types";
import { CommentItem } from "./CommentItem";
import { CommentComposer } from "@/components/input/CommentComposer";
import { usePostComments } from "@/hooks/comment/usePostComments";
import { Loader2 } from "lucide-react";
import useUserStore from "@/src/stores/userStore";

interface Comment_Thread_Props {
    post: Post;
    screen: string;
}

export function CommentThread({ post, screen }: Comment_Thread_Props) {
    const { user } = useUserStore();
    const { comments, loading, error } = usePostComments(post.id);

    return (
        <div className="border-t border-gray-100">
            {/* Comment Composer - Always show when thread is visible */}
            {user && (
                <div className="p-4 bg-gray-50/50 border-b border-gray-100">
                    <CommentComposer
                        user={{
                            username: user.username,
                            avatar: user.avatar,
                        }}
                        post={post}
                        screen={screen}
                        root_post_id={post.id}
                        placeholder={`Reply to ${post.user.first_name || post.user.username}...`}
                        onSubmit={() => { }}
                    />
                </div>
            )}

            {/* Comments List */}
            <div className="bg-white">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                ) : error ? (
                    <div className="px-6 py-8 text-center text-red-500">
                        Failed to load comments. Please try again.
                    </div>
                ) : comments.length === 0 ? (
                    <div className="px-6 py-8 text-center text-gray-500">
                        No comments yet. Be the first to comment!
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {comments.map((comment) => (
                            <div key={comment.id} className="px-4">
                                <CommentItem
                                    comment={comment}
                                    screen={screen}
                                    root_post={post}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}