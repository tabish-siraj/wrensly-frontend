"use client"

import React from "react";
import { usePostByUserID } from "@/hooks/post/usePost";
import { ChirpCard } from "../card/ChirpCard";
import { Post } from "@/src/types";
import useUserStore from "@/src/stores/userStore";
import { Loader2 } from "lucide-react";

const TABS = [
    { key: "chirps", label: "Chirps" },
    { key: "spreads", label: "Spreads" },
    { key: "media", label: "Media" },
    { key: "feathers", label: "Feathered" },
];

export default function NestTabs() {
    const { user } = useUserStore()
    const [activeTab, setActiveTab] = React.useState("chirps");
    const { posts, loading, error } = usePostByUserID(user?.id || "");

    return (

        <div className="w-1/2 m-auto mt-2">
            <div className="w-full max-w-4xl mx-auto">
                {/* Tab Menu */}
                <div className="flex border-b border-t border-gray-200">
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
                <div className="py-6">
                    {activeTab === "chirps" && <div>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                            </div>
                        ) : error ? (
                            <div className="text-red-500 py-8">Error loading posts: {error}</div>
                        ) : posts && posts.data && posts.data.length > 0 ? (
                            posts.data.map((post: Post) => (
                                <ChirpCard
                                    key={post.id}
                                    content={post.content}
                                    username={post.id}
                                    isFeathered={true}
                                    featherCount={0}
                                    isEchoed={true}
                                    echoCount={0}
                                    isBookmarked={true}
                                    isSpread={true}
                                    spreadCount={0}
                                    onToggleFeather={() => { }}
                                    onToggleEcho={() => { }}
                                    onToggleSpread={() => { }}
                                    onToggleBookmark={() => { }}
                                />
                            ))
                        ) : (
                            <div className="py-8 text-gray-500">No posts available</div>
                        )}
                    </div>}
                    {activeTab === "spreads" && <div>Your Retweets go here.</div>}
                    {activeTab === "media" && <div>Your Media go here.</div>}
                    {activeTab === "feathers" && <div>Your Feathered chirps go here.</div>}
                </div>
            </div>
        </div>
    );
}