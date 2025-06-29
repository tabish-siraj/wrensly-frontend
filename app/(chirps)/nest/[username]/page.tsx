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
  const { username } = React.use(params);
  return (
    <div className="w-1/2 m-auto">
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative w-full h-[200px] bg-gray-200">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp8_W4z4PTHC0ogzdUY3UO9t35bbtSzvxFiA&s" // Replace with your cover image
            alt="Cover"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative px-4">
          <div className="absolute -top-16 left-4">
            <Avatar className="w-32 h-32 border-4 border-white">
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHPCQDGxzqlFNGeeP1WPx_5tLK03EMXLwpA&s" alt={username} />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>

          <div className="pt-20">
            <h1 className="text-xl font-bold">{user?.firstName} {user?.lastName} </h1>
            <p className="text-gray-500">@{username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
