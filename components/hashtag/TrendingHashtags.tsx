"use client";

import { useTrendingHashtags } from "@/hooks/hashtag/useHashtags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Hash } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatHashtag } from "@/lib/hashtags";

interface TrendingHashtagsProps {
    limit?: number;
    className?: string;
}

export function TrendingHashtags({ limit = 10, className = "" }: TrendingHashtagsProps) {
    const { data: hashtags, isLoading, error } = useTrendingHashtags(limit);
    const router = useRouter();

    const handleHashtagClick = (hashtag: string) => {
        router.push(`/hashtag/${hashtag}`);
    };

    if (isLoading) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="w-5 h-5" />
                        Trending Hashtags
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error || !hashtags || hashtags.length === 0) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="w-5 h-5" />
                        Trending Hashtags
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-4 text-gray-500">
                        <Hash className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No trending hashtags right now</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5" />
                    Trending Hashtags
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {hashtags.map((hashtag: any, index: number) => (
                        <Button
                            key={hashtag.id}
                            variant="ghost"
                            className="w-full justify-between p-3 h-auto hover:bg-gray-50"
                            onClick={() => handleHashtagClick(hashtag.name)}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-sm">#{index + 1}</span>
                                <div className="text-left">
                                    <div className="font-medium text-blue-600">
                                        {formatHashtag(hashtag.name)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {hashtag.post_count} {hashtag.post_count === 1 ? 'post' : 'posts'}
                                    </div>
                                </div>
                            </div>
                            <Hash className="w-4 h-4 text-gray-400" />
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}