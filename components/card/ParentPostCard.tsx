"use client";

import { Post } from "@/src/types";
import { CardContent, CardHeader } from "@/components/ui/card";
import { PostHeader } from "./PostHeader";

interface ParentPostCardProps {
    post: Post;
}

export function ParentPostCard({ post }: ParentPostCardProps) {
    return (
        <div className="border border-gray-200 rounded-lg p-2 bg-gray-50">
            <CardHeader>
                <PostHeader user={post.user} />
            </CardHeader>
            <CardContent className="p-4 rounded-lg">
                <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
            </CardContent>
        </div>
    );
}
