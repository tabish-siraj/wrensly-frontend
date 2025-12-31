"use client";

import { Post } from "@/src/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HashtagText } from "@/components/hashtag/HashtagText";
import { useRouter } from "next/navigation";

interface ParentPostCardProps {
    post: Post;
}

export function ParentPostCard({ post }: ParentPostCardProps) {
    const router = useRouter();
    const postDate = new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric'
    });

    const handleClick = () => {
        router.push(`/post/${post.id}`);
    };

    return (
        <div
            className="border border-gray-300 rounded-2xl p-3 mt-3 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={handleClick}
        >
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
            <div className="text-gray-900 text-sm leading-relaxed">
                <HashtagText content={post.content} />
            </div>
        </div>
    );
}
