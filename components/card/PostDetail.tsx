"use client";

import { Post } from "@/src/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Like } from "@/components/like/Like";
import { Repost } from "@/components/repost/Repost";
import { Share } from "@/components/share/Share";
import { Bookmark } from "@/components/bookmark/Bookmark";

interface PostDetailProps {
    post: Post;
}

export function PostDetail({ post }: PostDetailProps) {
    const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const postTime = new Date(post.createdAt).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit'
    });

    return (
        <div className="p-4 border-b">
            <div className="flex items-center mb-4">
                <Link href={`/nest/${post.user.username}`}>
                    <Avatar className="h-12 w-12">
                        <AvatarImage alt={post.user.username} src={post.user.avatar || '/placeholder.svg'} />
                        <AvatarFallback>{post.user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="ml-3">
                    <span className="font-bold text-lg">
                        <Link href={`/nest/${post.user.username}`}>{post.user.username}</Link>
                    </span>
                    <p className="text-sm text-gray-500">@{post.user.username}</p>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-xl text-gray-800 whitespace-pre-wrap">{post.content}</p>
            </div>

            <div className="text-sm text-gray-500 mb-4">
                <span>{postTime} &middot; {postDate}</span>
            </div>

            <div className="flex items-center justify-around py-2 border-t border-b">
                <div className="flex items-center gap-1">
                    <span className="font-bold">0</span>
                    <span className="text-gray-500">Reposts</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-bold">0</span>
                    <span className="text-gray-500">Likes</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-bold">0</span>
                    <span className="text-gray-500">Bookmarks</span>
                </div>
            </div>

            <div className="px-4 flex justify-around mt-2">
                <Like screen="post" post={post} />
                <Repost screen="post" post={post} />
                <Share post={post} />
                <Bookmark screen="post" post={post} />
            </div>
        </div>
    );
}
