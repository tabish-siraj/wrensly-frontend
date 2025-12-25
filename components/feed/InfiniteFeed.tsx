"use client";

import React from 'react';
import { PostCard } from '@/components/card/PostCard';
import { InfiniteScroll } from '@/components/ui/infinite-scroll';
import { useInfiniteFeed } from '@/hooks/post/useInfiniteFeed';
import { PostSkeleton } from '@/components/PostSkeleton';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const InfiniteFeed: React.FC = () => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteFeed();

    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <PostSkeleton key={i} />
                ))}
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Failed to load feed
                </h3>
                <p className="text-gray-600 mb-4">
                    Something went wrong while loading your feed.
                </p>
                <Button onClick={() => refetch()} variant="outline">
                    Try Again
                </Button>
            </div>
        );
    }

    // Get all posts from all pages
    const allPosts = data?.pages.flatMap(page => page.data) ?? [];

    // Empty state
    if (allPosts.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No posts yet
                </h3>
                <p className="text-gray-600">
                    Follow some users or create your first post to get started!
                </p>
            </div>
        );
    }

    return (
        <InfiniteScroll
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            className="space-y-4"
        >
            {allPosts.map((post, index) => (
                <PostCard
                    key={`${post.id}-${index}`}
                    post={post}
                    screen="feed"
                />
            ))}
        </InfiniteScroll>
    );
};