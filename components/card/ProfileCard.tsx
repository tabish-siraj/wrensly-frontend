"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Link as LuicideLink, Calendar, Cake } from "lucide-react";
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
  const { followers, loading: followersLoading, error: followersError } = useGetFollowers(params.username as string)
  const { following, loading: followingLoading, error: followingError } = useGetFollowings(params.username as string)

  const { mutate: followUnfollow } = useFollowUnfollow();
  const { user: userData } = useUserByUsername(params.username as string);
  const isCurrentUser = params.username === user?.username || null;
  const user_data = userData?.data;

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [modalType, setModalType] = useState<"followers" | "following">("followers");

  const handleFollowUnfollow = () => {
    if (isCurrentUser || !user_data) return;

    const wasFollowing = user_data.isFollowing;
    followUnfollow({
      following: user_data.id,
      operation: wasFollowing ? "unfollow" : "follow",
    }, {
      onSuccess: () => {
        toast.success(`${wasFollowing ? "Unfollowed" : "Followed"} ${user_data.username}`);
        // Optimistically update the UI
        user_data.isFollowing = !wasFollowing;
        user_data.followers_count += wasFollowing ? -1 : 1;
      },
      onError: (error) => {
        toast.error(`Failed to ${wasFollowing ? "unfollow" : "follow"} user`);
        console.error(error);
      }
    });
  };

  return (
    <div className="w-full">
      <div className="w-full">
        {/* Cover and Avatar */}
        <div>
          <div className="relative w-full h-[200px] bg-gray-200">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp8_W4z4PTHC0ogzdUY3UO9t35bbtSzvxFiA&s"
              alt={`${user_data?.username || 'User'}'s cover photo`}
              fill
              className="object-cover"
            />
          </div>
          <div className="px-4 flex justify-between">
            <div className="relative">
              <div className="absolute -top-16 left-4">
                <Avatar className="w-32 h-32 border-4 border-white">
                  <AvatarImage
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHPCQDGxzqlFNGeeP1WPx_5tLK03EMXLwpA&s"
                    alt={`${user_data?.username || 'User'}'s profile picture`}
                  />
                  <AvatarFallback>{user_data?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
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
              {isCurrentUser ? "Edit Profile" : user_data?.isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-4">
          <div className="pt-5">
            <h1 className="text-xl font-bold">{user_data?.first_name} {user_data?.last_name}</h1>
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
            <p className="text-gray-500">Bio: {user_data?.bio}</p>
          </div>

          <div className="flex justify-between flex-wrap gap-2 text-sm text-gray-600">
            <span className="flex items-center"><MapPin className="size-4 mr-1" /> {user_data?.country}</span>
            <span className="flex items-center">
              <LuicideLink className="size-4 mr-1" />
              <Link className="text-blue-500 hover:underline" href={user_data?.website || ""}>
                {user_data?.website}
              </Link>
            </span>
            <span className="flex items-center">
              <Cake className="size-4 mr-1" />{" "}
              {user_data?.date_of_birth &&
                new Date(user_data.date_of_birth).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                })}
            </span>
            <span className="flex items-center">
              <Calendar className="size-4 mr-1" /> Joined{" "}
              {user_data?.created_at &&
                new Date(user_data.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </span>
          </div>
        </div>
      </div>

      {showFollowersModal && (
        <FollowListModal
          isOpen={showFollowersModal}
          onClose={() => setShowFollowersModal(false)}
          users={
            modalType === "followers"
              ? followers.data ?? []
              : following.data ?? []
          }
          _type={modalType}
          loading={modalType === "followers" ? followersLoading : followingLoading}
          error={modalType === "followers" ? followersError : followingError}
        />
      )}
    </div>
  );
}
