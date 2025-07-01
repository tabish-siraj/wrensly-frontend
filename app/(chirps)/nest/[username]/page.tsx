"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import useUserStore from "@/src/stores/userStore";
import ProfileCard from "@/components/card/NestCard";
interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return <ProfileCard />
}