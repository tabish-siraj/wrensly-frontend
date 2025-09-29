import React from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { useToggleLike } from "@/hooks/post/useToggleLike";
import { Post } from "@/src/types";
import { toast } from "sonner";

interface LikeProps {
    post: Post;
    onSuccess?: () => void;
}

export function Like({ post, onSuccess }: LikeProps) {
    const toggleLike = useToggleLike();

    const handleLikeToggle = () => {
        toggleLike.mutate(
            {
                postId: post.id,
                isLiked: post.isLiked
            },
            {
                onSuccess: () => { onSuccess?.(); },
                onError: (error) => {
                    toast.error("Failed to update like status");
                    console.error(error);
                }
            }
        );
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleLikeToggle}
            disabled={toggleLike.isPending}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500 hover:bg-transparent transition-colors"
        >
            <HeartIcon
                className={`${post.isLiked ? "text-red-500 fill-red-500" : "text-gray-500"
                    } ${toggleLike.isPending ? "opacity-50" : ""}`}
            />
            <span className="text-sm text-gray-700">
                {toggleLike.isPending ? '...' : post.stats.likes}
            </span>
        </Button>
    );
}