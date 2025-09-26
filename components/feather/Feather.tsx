import React from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import usePostStore from "@/src/stores/postStore";

interface FeatherProps {
    postId: string;
}

export function Feather({ postId }: FeatherProps) {
    const post = usePostStore((state) => state.posts.find((p) => p.id === postId));
    const toggleFeather = usePostStore((state) => state.toggleFeather);
    if (!post) return null;
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFeather(postId)}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500 hover:bg-transparent transition-colors"
        >
            <HeartIcon
                className={`${post.isFeathered ? "text-red-500 fill-red-500" : "text-gray-500"}`}
            />
            {(
                <span className="text-sm text-gray-700">{post.featherCount}</span>
            )}
        </Button>
    );
}