"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Post } from "@/src/types";

interface CommentProps {
    post: Post;
    onClick: () => void;
}

export function Comment({ post, onClick }: CommentProps) {
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-500 hover:bg-transparent transition-colors px-3 py-2"
        >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
                {post.stats.comments > 0 ? post.stats.comments : ""}
            </span>
        </Button>
    );
}
