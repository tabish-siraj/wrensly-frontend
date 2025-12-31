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
                <div className="px-4 py-4 border-b border-gray-50">
                    <CommentComposer
                        user={{
                            username: user.username,
                            avatar: user.avatar,
                        }}
                        post={post}
                        screen={screen}
                        placeholder={`Reply to ${post.user.first_name || post.user.username}...`}
                        onSubmit={() => { }}
                    />
                </div>
            )}

            {/* Comments List */}
            <div>
                {loading ? (
                    <div className="flex justify-center py-6">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    </div>
                ) : error ? (
                    <div className="px-4 py-6 text-center text-red-500 text-sm">
                        Failed to load comments
                    </div>
                ) : comments.length === 0 ? (
                    <div className="px-4 py-6 text-center text-gray-500 text-sm">
                        No comments yet. Be the first to comment!
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                screen={screen}
                                root_post={post}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}