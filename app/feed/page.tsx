"use client";

import { useFeed } from "@/hooks/post/useFeed";
import { PostCard } from "@/components/card/PostCard";
import { PostComposer } from "@/components/input/PostComposer";
import { Loader2, RefreshCw } from "lucide-react";
import { Post } from "@/src/types";
import useUserStore from "@/src/stores/userStore";
import { SCREEN } from "@/src/constants";
import { useStoreHydration } from "@/hooks/useHydration";
import { Button } from "@/components/ui/button";

export default function FeedPage() {
    const { user, _hasHydrated } = useUserStore();
    const isHydrated = useStoreHydration(_hasHydrated);
    const { posts, loading, error, refetch } = useFeed();

    // Show loading until hydration is complete
    if (!isHydrated) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <Loader2 className="animate-spin w-8 h-8 text-blue-500 mx-auto mb-4" />
                        <p className="text-gray-500">Loading your feed...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="p-6 space-y-6">
                <PostComposer
                    user={{
                        username: user?.username || "anonymous",
                        avatar: user?.avatar || null
                    }}
                    screen={SCREEN.FEED}
                />
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="flex gap-3 p-4 border border-gray-200 rounded-lg">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 space-y-6">
                <PostComposer
                    user={{
                        username: user?.username || "anonymous",
                        avatar: user?.avatar || null
                    }}
                    screen={SCREEN.FEED}
                />
                <div className="text-center py-12">
                    <div className="text-red-500 mb-4">
                        <RefreshCw className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-medium">Failed to load posts</p>
                        <p className="text-sm text-gray-600 mt-1">
                            {error?.message || 'Something went wrong'}
                        </p>
                    </div>
                    <Button onClick={() => refetch?.()} variant="outline">
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="p-6 space-y-6">
                <PostComposer
                    user={{
                        username: user?.username || "anonymous",
                        avatar: user?.avatar || null
                    }}
                    screen={SCREEN.FEED}
                />
                <div className="text-center py-12">
                    <div className="text-gray-500 mb-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📝</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Your feed is empty</h3>
                        <p className="text-sm text-gray-600 max-w-md mx-auto">
                            Start following people or create your first post to see content in your feed.
                        </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                        <Button onClick={() => window.location.href = '/explore'} variant="outline">
                            Explore
                        </Button>
                        <Button onClick={() => (document.querySelector('[data-post-composer]') as HTMLElement)?.focus()}>
                            Create Post
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-200">
            {/* Post Composer */}
            <div className="p-6 bg-gray-50/50">
                <PostComposer
                    user={{
                        username: user?.username || "anonymous",
                        avatar: user?.avatar || null
                    }}
                    screen={SCREEN.FEED}
                />
            </div>

            {/* Feed Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Latest Posts</h2>
                    <Button
                        onClick={() => refetch?.()}
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Posts */}
            <div className="divide-y divide-gray-200">
                {posts
                    .filter((post: Post) => post && post.id) // Filter out invalid posts
                    .map((post: Post) => (
                        <div key={post.id} className="hover:bg-gray-50/50 transition-colors">
                            <PostCard screen={SCREEN.FEED} post={post} />
                        </div>
                    ))}
            </div>
        </div>
    );
}