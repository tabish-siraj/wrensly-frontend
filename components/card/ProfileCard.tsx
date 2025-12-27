"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Link as LuicideLink, Calendar, Cake, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import useUserStore from "@/src/stores/userStore";
import { useParams, useRouter } from "next/navigation";
import { useFollowUnfollow, useGetFollowers, useGetFollowings } from "@/hooks/follow/useFollow";
import { useUserByUsername } from "@/hooks/user/useGetUser";
import { toast } from "sonner";
import FollowListModal from "@/components/modals/FollowersModal";

export default function ProfileCard() {
  const { user } = useUserStore();
  const params = useParams();
  const router = useRouter();

  console.log("ProfileCard render - Current user:", user);
  console.log("ProfileCard render - Params username:", params.username);

  const { followersResponse, loading: followersLoading, error: followersError } = useGetFollowers(params.username as string)
  const { followingResponse, loading: followingLoading, error: followingError } = useGetFollowings(params.username as string)

  const { mutate: followUnfollow } = useFollowUnfollow();
  const { user: userData, loading: userLoading, error: userError } = useUserByUsername(params.username as string);
  const isCurrentUser = params.username === user?.username;
  const user_data = userData;

  console.log("ProfileCard render - userData from hook:", userData);
  console.log("ProfileCard render - userLoading:", userLoading);
  console.log("ProfileCard render - userError:", userError);
  console.log("ProfileCard render - params.username:", params.username);
  console.log("ProfileCard render - user_data (final):", user_data);
  console.log("ProfileCard render - isCurrentUser:", isCurrentUser);

  // Log followers/following errors but don't let them block functionality
  if (followersError) {
    console.warn("Followers API error (non-blocking):", followersError);
  }
  if (followingError) {
    console.warn("Following API error (non-blocking):", followingError);
  }

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [modalType, setModalType] = useState<"followers" | "following">("followers");

  const handleFollowUnfollow = () => {
    if (userLoading) {
      toast.error("Please wait, loading user data...");
      return;
    }

    if (userError) {
      toast.error("Error loading user data");
      return;
    }

    if (isCurrentUser) {
      return;
    }

    if (!user_data) {
      toast.error("User data not available");
      return;
    }

    const wasFollowing = user_data.is_following;

    followUnfollow({
      following: user_data.id,
      operation: wasFollowing ? "unfollow" : "follow",
    }, {
      onSuccess: () => {
        toast.success(`${wasFollowing ? "Unfollowed" : "Followed"} ${user_data.username}`);
        // Optimistically update the UI
        user_data.is_following = !wasFollowing;
        user_data.followers_count += wasFollowing ? -1 : 1;
      },
      onError: (error) => {
        toast.error(`Failed to ${wasFollowing ? "unfollow" : "follow"} user`);
        console.error("Follow/unfollow error:", error);
      }
    });
  };

  return (
    <div className="w-full">
      <div className="w-full">
        {/* Cover and Avatar */}
        <div>
          <div className="relative w-full h-[200px] bg-gray-200">
            {user_data?.cover ? (
              <Image
                src={user_data.cover}
                alt={`${user_data?.username || 'User'}'s cover photo`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500" />
            )}
          </div>
          <div className="px-4 flex justify-between">
            <div className="relative">
              <div className="absolute -top-16 left-4">
                <Avatar className="w-32 h-32 border-4 border-white">
                  <AvatarImage
                    src={user_data?.avatar || ""}
                    alt={`${user_data?.username || 'User'}'s profile picture`}
                  />
                  <AvatarFallback className="text-2xl font-bold">
                    {user_data?.first_name?.[0]?.toUpperCase() || user_data?.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <Button
              className="mt-4 px-6 py-2 text-white rounded-full font-semibold shadow transition"
              onClick={
                isCurrentUser
                  ? () => router.push(`/profile/${params.username}/edit`)
                  : handleFollowUnfollow
              }
            >
              {isCurrentUser ? "Edit Profile" : user_data?.is_following ? "Following" : "Follow"}
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-4">
          <div className="pt-5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{user_data?.first_name} {user_data?.last_name}</h1>
              {user_data?.is_verified && (
                <CheckCircle className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <p className="text-gray-500">@{user_data?.username}</p>

            {/* Followers / Following buttons */}
            <div className="flex gap-4 mt-2">
              <Button
                variant="outline"
                className="rounded-full px-4 text-sm font-medium"
                onClick={() => {
                  setModalType("followers");
                  setShowFollowersModal(true);
                }}
              >
                {user_data?.followers_count || 0} Followers
              </Button>

              <Button
                variant="outline"
                className="rounded-full px-4 text-sm font-medium"
                onClick={() => {
                  setModalType("following");
                  setShowFollowersModal(true);
                }}
              >
                {user_data?.following_count || 0} Following
              </Button>
            </div>
          </div>

          <div className="pt-5 pb-2">
            {user_data?.bio && (
              <p className="text-gray-700 leading-relaxed">{user_data.bio}</p>
            )}
          </div>

          <div className="flex justify-between flex-wrap gap-2 text-sm text-gray-600">
            {/* Location */}
            {(user_data?.city || user_data?.state || user_data?.country) && (
              <span className="flex items-center">
                <MapPin className="size-4 mr-1" />
                {[user_data?.city, user_data?.state, user_data?.country]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            )}

            {/* Website */}
            {user_data?.website && (
              <span className="flex items-center">
                <LuicideLink className="size-4 mr-1" />
                <Link
                  className="text-blue-500 hover:underline truncate max-w-[200px]"
                  href={user_data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user_data.website.replace(/^https?:\/\//, '')}
                </Link>
              </span>
            )}

            {/* Date of Birth */}
            {user_data?.date_of_birth && (
              <span className="flex items-center">
                <Cake className="size-4 mr-1" />
                Born {new Date(user_data.date_of_birth).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}

            {/* Join Date */}
            {user_data?.created_at && (
              <span className="flex items-center">
                <Calendar className="size-4 mr-1" />
                Joined {new Date(user_data.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            )}
          </div>
        </div>
      </div>

      {showFollowersModal && (
        <FollowListModal
          isOpen={showFollowersModal}
          onClose={() => setShowFollowersModal(false)}
          users={
            modalType === "followers"
              ? followersResponse?.data ?? []
              : followingResponse?.data ?? []
          }
          _type={modalType}
          loading={modalType === "followers" ? followersLoading : followingLoading}
          error={modalType === "followers" ? followersError : followingError}
        />
      )}
    </div>
  );
}
