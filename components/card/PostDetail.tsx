"use client";

import { Post } from "@/src/types";
import { PostHeader } from "./PostHeader";
import { ParentPostCard } from "./ParentPostCard";
import { PostActions } from "./PostActions";

interface PostDetailProps {
    post: Post;
    screen: string;
}

export function PostDetail({ screen, post }: PostDetailProps) {
    const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const postTime = new Date(post.createdAt).toLocaleTimeString('en-US', {
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

            <PostActions screen={screen} post={post} />
        </div>
    );
}