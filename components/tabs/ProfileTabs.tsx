"use client"

import React from "react";
import { usePostByUsername } from "@/hooks/post/usePost";
import { PostCard } from "../card/PostCard";
import { Post } from "@/src/types";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { SCREEN } from "@/src/constants";

const TABS = [
    { key: "posts", label: "Posts" },
    // { key: "reposts", label: "Reposts" }, // Reposts appear in feeds with reposted_by field, not in user posts
    { key: "media", label: "Media" },
    { key: "likes", label: "Likes" },
];

export default function ProfileTabs() {
    const params = useParams();
    const [activeTab, setActiveTab] = React.useState("posts");

    // Safely handle username parameter
    const username = Array.isArray(params.username) ? params.username[0] : params.username;
    const { posts, loading, error } = usePostByUsername(username || "");

    if (!username) {
        return (
            <div className="text-center p-8">
                <p className="text-gray-500">Invalid username</p>
            </div>
        );
    }

    // Filter posts based on active tab
    const getFilteredPosts = () => {
        if (!posts?.data) return [];

        switch (activeTab) {
            case "posts":
                return posts.data.filter((post: Post) => post.type === "POST");
            case "media":
                // Filter posts that have actual media attachments or image URLs
                return posts.data.filter((post: Post) => {
                    // Check for image URLs in content
                    const hasImageUrl = post.content && (
                        post.content.includes('.jpg') ||
                        post.content.includes('.jpeg') ||
                        post.content.includes('.png') ||
                        post.content.includes('.gif') ||
                        post.content.includes('.webp') ||
                        post.content.includes('imgur.com') ||
                        post.content.includes('image')
                    );

                    // TODO: Add check for actual media attachments when implemented
                    // const hasAttachments = post.attachments && post.attachments.length > 0;

                    return hasImageUrl;
                });
            case "likes":
                return posts.data.filter((post: Post) => post.is_liked);
            default:
                return posts.data;
        }
    };

    const filteredPosts = getFilteredPosts();

    const renderTabContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-8">
                    <p className="text-gray-500">Error loading content</p>
                </div>
            );
        }

        if (filteredPosts.length === 0) {
            const emptyMessages = {
                posts: "No posts yet",
                media: "No media posts yet",
                likes: "No liked posts yet"
            };

            return (
                <div className="text-center py-8">
                    <p className="text-gray-500">{emptyMessages[activeTab as keyof typeof emptyMessages]}</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {filteredPosts.map((post: Post) => (
                    <PostCard screen={SCREEN.PROFILE} key={post.id} post={post} />
                ))}
            </div>
        );
    };

    return (
        <div className="w-full mt-4">
            <div className="w-full">
                {/* Tab Menu */}
                <div className="flex border-b border-gray-200">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            className={`flex-1 py-3 text-center font-semibold transition-colors
                                ${activeTab === tab.key
                                    ? "border-b-2 border-blue-500 text-blue-600"
                                    : "text-gray-500 hover:bg-gray-100"}
            `}
                            onClick={() => setActiveTab(tab.key)}
                            aria-current={activeTab === tab.key ? "page" : undefined}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}