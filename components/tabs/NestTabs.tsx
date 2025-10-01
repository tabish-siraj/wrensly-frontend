"use client"

import React from "react";
import { usePostByUsername } from "@/hooks/post/usePost";
import { PostCard } from "../card/PostCard";
import { Post } from "@/src/types";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { SCREEN } from "@/src/constants";

const TABS = [
    { key: "chirps", label: "Chirps" },
    { key: "spreads", label: "Spreads" },
    { key: "media", label: "Media" },
    { key: "feathers", label: "Feathered" },
];

export default function NestTabs() {
    const params = useParams();
    // const { user } = useUserStore()
    const [activeTab, setActiveTab] = React.useState("chirps");
    const { posts, loading, error } = usePostByUsername(params.username as string);

    return (
        <div className="w-full mt-4">
            <div className="w-full">
                {/* Tab Menu */}
                <div className="flex border-gray-200">
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
                    {activeTab === "chirps" && <div>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                            </div>
                        ) : error ? (
                            <div className="text-gray-500 py-8">No posts available.</div>
                        ) : posts && posts.data && posts.data.length > 0 ? (
                            posts.data.map((post: Post) => (
                                <PostCard screen={SCREEN.PROFILE} key={post.id} post={post} />
                            ))
                        ) : (
                            <div className="py-8 text-gray-500">No posts available</div>
                        )}
                    </div>}
                    {activeTab === "spreads" && <div>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                            </div>
                        ) : error ? (
                            <div className="text-red-500 py-8">Error loading posts: {error}</div>
                        ) : posts && posts.data && posts.data.length > 0 ? (
                            posts.data.map((post: Post) => (
                                <PostCard screen={SCREEN.PROFILE} key={post.id} post={post} />
                            ))
                        ) : (
                            <div className="py-8 text-gray-500">No posts available</div>
                        )}
                    </div>}
                    {activeTab === "media" && <div>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                            </div>
                        ) : error ? (
                            <div className="text-red-500 py-8">Error loading posts: {error}</div>
                        ) : posts && posts.data && posts.data.length > 0 ? (
                            posts.data.map((post: Post) => (
                                <PostCard screen={SCREEN.PROFILE} key={post.id} post={post} />
                            ))
                        ) : (
                            <div className="py-8 text-gray-500">No posts available</div>
                        )}
                    </div>}
                    {activeTab === "feathers" && <div>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                            </div>
                        ) : error ? (
                            <div className="text-red-500 py-8">Error loading posts: {error}</div>
                        ) : posts && posts.data && posts.data.length > 0 ? (
                            posts.data.map((post: Post) => (
                                <PostCard screen={SCREEN.PROFILE} key={post.id} post={post} />
                            ))
                        ) : (
                            <div className="py-8 text-gray-500">No posts available</div>
                        )}
                    </div>}
                </div>
            </div>
        </div>
    );
}