"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import useUserStore from "@/src/stores/userStore";
interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { user } = useUserStore();
  console.log("Line 13: ", user)
  const { username } = React.use(params);
  // if (username !== user?.username) return;
  return (
    <div className="w-1/2 m-auto">
      <div className="w-full max-w-4xl mx-auto">
        {/* Cover Image */}
        <div className="relative w-full h-[200px] bg-gray-200">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp8_W4z4PTHC0ogzdUY3UO9t35bbtSzvxFiA&s" // Replace with your cover image
            alt="Cover"
            fill
            className="object-cover"
          />
        </div>

        {/* Profile + Name Section */}
        <div className="relative px-4">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-4">
            <Avatar className="w-32 h-32 border-4 border-white">
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHPCQDGxzqlFNGeeP1WPx_5tLK03EMXLwpA&s" alt={username} />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>

          {/* Name & Username */}
          <div className="pt-20">
            <h1 className="text-xl font-bold">{user?.Profile.firstName} {user?.Profile.lastName} </h1>
            <p className="text-gray-500">@{username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
