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
            size="icon"
            onClick={onClick}
            className="flex items-center gap-1 text-gray-500 hover:text-blue-500 hover:bg-transparent transition-colors"
        >
            <MessageCircle className="text-gray-500" />
            <span className="text-sm text-gray-700">{post.stats.comments}</span>
        </Button>
    );
}
