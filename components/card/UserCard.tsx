"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, UserCheck, MapPin, Calendar, ExternalLink } from "lucide-react";
import { useToggleFollow } from "@/hooks/follow/useToggleFollow";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface UserCardProps {
    user: {
        id: string;
        username: string;
        first_name: string;
        last_name: string;
        bio?: string;
        avatar?: string;
        is_verified?: boolean;
        followers_count: number;
        following_count: number;
        created_at: string;
        is_following?: boolean;
        is_current_user?: boolean;
        city?: string;
        website?: string;
    };
    showFollowButton?: boolean;
    className?: string;
}

export function UserCard({ user, showFollowButton = true, className = "" }: UserCardProps) {
    const [isFollowing, setIsFollowing] = useState(user.is_following || false);
    const { mutate: toggleFollow, isPending: isToggling } = useToggleFollow();

    const handleFollowClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        toggleFollow(
            {
                user_id: user.id,
                is_following: isFollowing,
                screen: "user-card",
            },
            {
                onSuccess: () => {
                    setIsFollowing(!isFollowing);
                    toast.success(isFollowing ? "Unfollowed successfully" : "Following successfully");
                },
                onError: (error: any) => {
                    toast.error(error.message || "Failed to update follow status");
                },
            }
        );
    };

    const displayName = user.first_name && user.last_name
        ? `${user.first_name} ${user.last_name}`
        : user.username;

    return (
        <Card className={`hover:shadow-md transition-shadow cursor-pointer ${className}`}>
            <Link href={`/profile/${user.username}`}>
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <Avatar className="w-12 h-12 flex-shrink-0">
                            <AvatarImage
                                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}`}
                                alt={displayName}
                            />
                            <AvatarFallback>
                                {displayName[0]?.toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-gray-900 truncate flex items-center gap-1">
                                        {displayName}
                                        {user.is_verified && (
                                            <span className="text-blue-500 text-sm">✓</span>
                                        )}
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate">
                                        @{user.username}
                                    </p>
                                </div>

                                {/* Follow Button */}
                                {showFollowButton && !user.is_current_user && (
                                    <Button
                                        variant={isFollowing ? "outline" : "default"}
                                        size="sm"
                                        onClick={handleFollowClick}
                                        disabled={isToggling}
                                        className="ml-2 flex-shrink-0"
                                    >
                                        {isToggling ? (
                                            "..."
                                        ) : isFollowing ? (
                                            <>
                                                <UserCheck className="w-4 h-4 mr-1" />
                                                Following
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus className="w-4 h-4 mr-1" />
                                                Follow
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>

                            {/* Bio */}
                            {user.bio && (
                                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                                    {user.bio}
                                </p>
                            )}

                            {/* User Details */}
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
                                {user.city && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        <span>{user.city}</span>
                                    </div>
                                )}

                                {user.website && (
                                    <div className="flex items-center gap-1">
                                        <ExternalLink className="w-3 h-3" />
                                        <a
                                            href={user.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline truncate max-w-32"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {user.website.replace(/^https?:\/\//, '')}
                                        </a>
                                    </div>
                                )}

                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>
                                        Joined {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                                    </span>
                                </div>
                            </div>

                            {/* Follow Stats */}
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                    <span className="font-medium text-gray-900">
                                        {user.following_count.toLocaleString()}
                                    </span>
                                    <span className="text-gray-500">Following</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="font-medium text-gray-900">
                                        {user.followers_count.toLocaleString()}
                                    </span>
                                    <span className="text-gray-500">
                                        {user.followers_count === 1 ? 'Follower' : 'Followers'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
}