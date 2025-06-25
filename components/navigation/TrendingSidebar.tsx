import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingTopic } from "@/src/types";
import { MoreHorizontal } from "lucide-react";

interface TrendingSidebarProps {
    trends: TrendingTopic[];
    whoToFollow?: Array<{
        id: string;
        username: string;
        displayName: string;
        avatar: string;
        verified?: boolean;
    }>;
}

export function TrendingSidebar({ trends, whoToFollow }: TrendingSidebarProps) {
    return (
        <div className="space-y-4">
            {/* Trending */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-xl">What's happening</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="space-y-3">
                        {trends.map((trend, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">{trend.category}</p>
                                        <p className="font-bold text-gray-900 group-hover:underline">
                                            {trend.title}
                                        </p>
                                        <p className="text-sm text-gray-500">{trend.posts} posts</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-blue-500 mt-3"
                    >
                        Show more
                    </Button>
                </CardContent>
            </Card>

            {/* Who to follow */}
            {whoToFollow && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-xl">Who to follow</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="space-y-3">
                            {whoToFollow.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <p className="font-bold text-sm">{user.displayName}</p>
                                            <p className="text-gray-500 text-sm">@{user.username}</p>
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="bg-black text-white hover:bg-gray-800 rounded-full"
                                    >
                                        Follow
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-blue-500 mt-3"
                        >
                            Show more
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
