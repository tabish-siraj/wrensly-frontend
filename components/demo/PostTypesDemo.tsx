"use client";

import { PostCard } from "@/components/card/PostCard";
import { Post } from "@/src/types";
import { POST_TYPE } from "@/src/constants";

// Demo data to show different post types
const demoUser = {
    id: "1",
    username: "johndoe",
    first_name: "John",
    last_name: "Doe",
    avatar: "/default-avatar.png"
};

const originalPost: Post = {
    id: "original-1",
    content: "This is an original post about something interesting! 🚀",
    type: POST_TYPE.POST,
    user: demoUser,
    parent_id: null,
    parent: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    is_liked: false,
    is_reposted: false,
    is_bookmarked: false,
    stats: {
        likes: 42,
        comments: 8,
        reposts: 15
    }
};

const pureRepost: Post = {
    id: "repost-1",
    content: "", // Empty content for pure repost
    type: POST_TYPE.REPOST,
    user: {
        id: "2",
        username: "janedoe",
        first_name: "Jane",
        last_name: "Doe",
        avatar: "/default-avatar.png"
    },
    parent_id: "original-1",
    parent: originalPost,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    is_liked: false,
    is_reposted: false,
    is_bookmarked: false,
    stats: {
        likes: 0,
        comments: 0,
        reposts: 0
    }
};

const quotePost: Post = {
    id: "quote-1",
    content: "This is so true! Adding my thoughts here 💭",
    type: POST_TYPE.QUOTE,
    user: {
        id: "3",
        username: "bobsmith",
        first_name: "Bob",
        last_name: "Smith",
        avatar: "/default-avatar.png"
    },
    parent_id: "original-1",
    parent: originalPost,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    is_liked: false,
    is_reposted: false,
    is_bookmarked: false,
    stats: {
        likes: 12,
        comments: 3,
        reposts: 5
    }
};

export function PostTypesDemo() {
    return (
        <div className="max-w-2xl mx-auto space-y-4 p-4">
            <h2 className="text-2xl font-bold mb-6">Post Types Demo</h2>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">1. Original Post</h3>
                    <PostCard post={originalPost} screen="demo" />
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">2. Pure Repost (like Twitter retweet)</h3>
                    <PostCard post={pureRepost} screen="demo" />
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">3. Quote Post (retweet with comment)</h3>
                    <PostCard post={quotePost} screen="demo" />
                </div>
            </div>
        </div>
    );
}