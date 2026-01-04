"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Loader2, CheckCircle2 } from "lucide-react";
import { useSuggestedUsers } from "@/hooks/user/useSuggestedUsers";
import { useFollowUnfollow } from "@/hooks/follow/useFollow";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

interface SuggestedUsersProps {
    limit?: number;
    showHeader?: boolean;
    className?: string;
}

export const SuggestedUsers = ({
    limit = 5,
    showHeader = true,
    className = ""
}: SuggestedUsersProps) => {
    const router = useRouter();
    const { data: response, isLoading, error } = useSuggestedUsers({ limit });
    const { mutate: followUnfollow, isPending: isFollowPending } = useFollowUnfollow();
    const [followingStates, setFollowingStates] = useState<Record<string, boolean>>({});

    const suggestedUsers = response?.data || [];

    const handleUserClick = (username: string) => {
        router.push(`/profile/${username}`);
    };

    const handleFollowUnfollow = (userId: string, username: string, isCurrentlyFollowing: boolean) => {
        const operation = isCurrentlyFollowing ? "unfollow" : "follow";

        followUnfollow({
            following: userId,
            operation: operation,
        }, {
            onSuccess: () => {
                // Update local state
                setFollowingStates(prev => ({
                    ...prev,
                    [userId]: !isCurrentlyFollowing
                }));

                toast.success(`${isCurrentlyFollowing ? "Unfollowed" : "Followed"} ${username}`);
            },
            onError: (error) => {
                toast.error(`Failed to ${operation} user`);
                console.error("Follow/unfollow error:", error);
            }
        });
    };

    const getFollowStatus = (userId: string, originalStatus: boolean) => {
        return followingStates[userId] !== undefined ? followingStates[userId] : originalStatus;
    };

    if (isLoading) {
        return (
            <Card className={className}>
                {showHeader && (
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-500" />
                            Who to Follow
                        </CardTitle>
                    </CardHeader>
                )}
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error || !suggestedUsers || suggestedUsers.length === 0) {
        return (
            <Card className={className}>
                {showHeader && (
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-500" />
                            Who to Follow
                        </CardTitle>
                    </CardHeader>
                )}
                <CardContent>
                    <div className="text-center py-8">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">
                            {error ? "Failed to load suggestions" : "No suggestions available"}
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={className}>
            {showHeader && (
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-500" />
                        Who to Follow
                    </CardTitle>
                </CardHeader>
            )}
            <CardContent className="space-y-4">
                {suggestedUsers.map((user) => {
                    const isFollowing = getFollowStatus(user.id, user.isFollowing);

                    return (
                        <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div
                                className="cursor-pointer"
                                onClick={() => handleUserClick(user.username)}
                            >
                                <Avatar className="w-10 h-10">
                                    <AvatarImage
                                        src={
                                            user.avatar ||
                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`
                                        }
                                        alt={user.username}
                                    />
                                    <AvatarFallback>
                                        {user.username?.[0]?.toUpperCase() || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <div
                                className="flex-1 min-w-0 cursor-pointer"
                                onClick={() => handleUserClick(user.username)}
                            >
                                <div className="flex items-center gap-1">
                                    <p className="font-medium text-sm text-gray-900 truncate">
                                        {user.first_name || user.last_name
                                            ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                                            : user.username
                                        }
                                    </p>
                                    {user.followsYou && (
                                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                                <p className="text-xs text-gray-400">
                                    {user.followers_count?.toLocaleString() || 0} followers
                                </p>
                            </div>

                            <Button
                                size="sm"
                                className="rounded-full px-4 text-xs flex-shrink-0"
                                variant={isFollowing ? "outline" : "default"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleFollowUnfollow(user.id, user.username, isFollowing);
                                }}
                                disabled={isFollowPending}
                            >
                                {isFollowPending ? "..." : isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};