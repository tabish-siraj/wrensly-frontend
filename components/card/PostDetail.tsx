import { useState } from "react";
import { Post } from "@/src/types";
import { PostHeader } from "./PostHeader";
import { ParentPostCard } from "./ParentPostCard";
import { PostActions } from "./PostActions";
import { CommentList } from "./CommentList";
import { CommentComposer } from "@/components/input/CommentComposer";
import useUserStore from "@/src/stores/userStore";
import { useCreateComment } from "@/hooks/comment/useCreateComment";
import { toast } from "sonner";

interface PostDetailProps {
    post: Post;
    screen: string;
}

export function PostDetail({ screen, post }: PostDetailProps) {
    const [isCommenting, setIsCommenting] = useState(false);
    const { user } = useUserStore();
    const postMutation = useCreateComment({ screen });

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
                    if (process.env.NODE_ENV === 'development') {
                        console.error(error);
                    }
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
            <PostHeader user={post.user} />

            <div className="mb-4">
                <p className="text-xl text-gray-800 whitespace-pre-wrap">{post.content}</p>
            </div>

            {post?.parent && (
                <ParentPostCard post={post.parent} />
            )}

            <div className="text-sm text-gray-500 mb-4">
                <span>{postTime} &middot; {postDate}</span>
            </div>

            <PostActions screen={screen} post={post} onCommentClick={handleCommentClick} />

            {isCommenting && user && (
                <CommentComposer
                    user={user}
                    placeholder={`Replying to @${post.user.username}`}
                    onSubmit={handleSubmitComment}
                    screen={screen}
                    post={post}
                />
            )}

            <CommentList postId={post.id} />
        </div>
    );
}