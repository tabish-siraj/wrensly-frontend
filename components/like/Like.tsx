"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { useToggleLike } from "@/hooks/post/useToggleLike";
import { Post } from "@/src/types";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface LikeProps {
    screen: string;
    post: Post;
}

export function Like({ screen, post }: LikeProps) {
    const toggleLike = useToggleLike();

    const handleLikeToggle = () => {
        const wasLiked = post.is_liked;

        toggleLike.mutate({
            screen: screen,
            post_id: post.id,
            is_liked: post.is_liked,
        }, {
            onSuccess: () => {
                // Optional: Add subtle success feedback
                // toast.success(wasLiked ? "Unliked" : "Liked");
            }
        });
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleLikeToggle}
            disabled={toggleLike.isPending}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500 hover:bg-transparent transition-colors"
        >
            <motion.div
                animate={{ scale: post.is_liked ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
            >
                <HeartIcon
                    className={`${post.is_liked ? "text-red-500 fill-red-500" : "text-gray-500"
                        } ${toggleLike.isPending ? "opacity-50" : ""}`}
                />
            </motion.div>

            <span className="relative inline-block overflow-hidden h-5 w-6 text-sm text-gray-700 text-center">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={post.stats.likes}
                        initial={{ y: post.is_liked ? -20 : 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: post.is_liked ? 20 : -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                    >
                        {post.stats.likes}
                    </motion.span>
                </AnimatePresence>
            </span>
        </Button>
    );
}
