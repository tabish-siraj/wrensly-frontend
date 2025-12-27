"use client";

import { Post } from "@/src/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

interface ParentPostCardProps {
    post: Post;
}

export function ParentPostCard({ post }: ParentPostCardProps) {
    const postDate = new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric'
    });

    return (
        <Link href={`/post/${post.id}`}>
            <div className="border border-gray-300 rounded-2xl p-3 mt-3 hover:bg-gray-50 transition-colors cursor-pointer">
                {/* User info */}
                <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-5 h-5">
                        {post.user.avatar && (
                            <AvatarImage
                                src={post.user.avatar}
                                alt={`${post.user.first_name || post.user.username}'s avatar`}
                            />
                        )}
                        <AvatarFallback className="text-xs">
                            {post.user.first_name?.[0] || post.user.username[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span className="font-medium">
                            {post.user.first_name && post.user.last_name
                                ? `${post.user.first_name} ${post.user.last_name}`
                                : post.user.username}
                        </span>
                        <span>@{post.user.username}</span>
                        <span>·</span>
                        <span>{postDate}</span>
                    </div>
                </div>

                {/* Post content */}
                <p className="text-gray-900 text-sm whitespace-pre-line leading-relaxed">
                    {post.content}
                </p>
            </div>
        </Link>
    );
}
