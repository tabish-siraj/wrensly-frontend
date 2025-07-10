"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Link as LuicideLink, Calendar, Cake } from "lucide-react"
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import useUserStore from "@/src/stores/userStore";
import { useParams } from "next/navigation";
import { useFollowUnfollow } from "@/hooks/follow/useFollow";

export default function NestCard() {
    const { user } = useUserStore();
    const params = useParams();
    const { mutate: followUnfollow } = useFollowUnfollow();
    const isCurrentUser = params.username === user?.username || null;

    const handleFollowUnfollow = () => {
        if (isCurrentUser) return; // Prevent action if it's the current user
        followUnfollow({
            following: user?.id || "",
            operation: isCurrentUser ? "unfollow" : "follow"
        });
    };

    return (
        <div className="w-full">
            <div className="w-full">
                {/* div for cover and pfp */}
                <div>
                    <div className="relative w-full h-[200px] bg-gray-200">
                        <Image
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp8_W4z4PTHC0ogzdUY3UO9t35bbtSzvxFiA&s" // Replace with your cover image
                            alt="Cover"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="px-4 flex justify-between">
                        <div className="relative">
                            <div className="absolute -top-16 left-4">
                                <Avatar className="w-32 h-32 border-4 border-white">
                                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHPCQDGxzqlFNGeeP1WPx_5tLK03EMXLwpA&s" alt={user?.username} />
                                    <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                        <Button className="mt-4 px-6 py-2 text-white rounded-full font-semibold shadow transition" onClick={handleFollowUnfollow}>
                            {isCurrentUser ? "Edit Profile" : "Follow"}
                        </Button>

                    </div>
                </div>
                {/* div for profile info */}
                <div className="px-4">
                    <div>
                        <div className="pt-5">
                            <h1 className="text-xl font-bold">{user?.firstName} {user?.lastName} </h1>
                            <p className="text-gray-500">@{user?.username}</p>
                        </div>
                        <div className="pt-10">
                            <p className="text-white">@{user?.bio}</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span className="flex flex-row items-center"><MapPin className="size-4 mr-1" /> {user?.country}</span>
                        <span className="flex flex-row items-center"><LuicideLink className="size-4 mr-1" /><Link className="text-blue-500 hover:underline" href={user?.website || ""}> {user?.website}</Link></span>
                        <span className="flex flex-row items-center"><Cake className="size-4 mr-1" /> {user?.dateOfBirth ? new Date(user.createdAt).toLocaleDateString(undefined, {
                            month: "long",
                            day: "numeric"
                        }) : ""}</span>
                        <span className="flex flex-row items-center"><Calendar className="size-4 mr-1" /> Joined on {" "}
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            }) : ""}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
