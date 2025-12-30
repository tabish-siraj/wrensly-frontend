"use client";

import { useParams } from "next/navigation";
import { useHashtagDetails, useHashtagPosts } from "@/hooks/hashtag/useHashtags";
import { PostCard } from "@/components/card/PostCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hash, ArrowLeft, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatHashtag } from "@/lib/hashtags";
import { formatDistanceToNow } from "date-fns";

export default function HashtagPage() {
    const params = useParams();
    const router = useRouter();
    const hashtag = params.hashtag as string;

    const { data: hashtagDetails, isLoading: detailsLoading } = useHashtagDetails(hashtag);
    const { data: posts, isLoading: postsLoading, error } = useHashtagPosts(hashtag);

    if (detailsLoading) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2 mb-6"></div>
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-32 bg-gray-100 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!hashtagDetails) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="text-center py-12">
                    <Hash className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Hashtag not found
                    </h1>
                    <p className="text-gray-600 mb-6">
                        The hashtag #{hashtag} doesn't exist or has no posts yet.
                    </p>
                    <Button onClick={() => router.back()}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
            </div>

            {/* Hashtag Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Hash className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-blue-600">
                                {formatHashtag(hashtagDetails.name)}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                <span className="flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    {hashtagDetails.post_count} {hashtagDetails.post_count === 1 ? 'post' : 'posts'}
                                </span>
                                <span>
                                    Created {formatDistanceToNow(new Date(hashtagDetails.created_at), { addSuffix: true })}
                                </span>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
            </Card>

            {/* Posts */}
            <div className="space-y-4">
                {postsLoading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardContent className="p-6">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : error ? (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <p className="text-red-500">Failed to load posts</p>
                        </CardContent>
                    </Card>
                ) : !posts || posts.length === 0 ? (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Hash className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-gray-500">No posts found for this hashtag</p>
                        </CardContent>
                    </Card>
                ) : (
                    posts.map((post: any) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            screen={`hashtag-${hashtag}`}
                        />
                    ))
                )}
            </div>
        </div>
    );
}