"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/src/stores/userStore";
import Link from "next/link";

interface UserDropdownProps {
  username: string
  avatar: string | null
}

export default function UserDropdown({ username, avatar }: UserDropdownProps) {
  const { clearUser } = useUserStore();
  const handleLogout = () => {
    clearUser();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          @{username}
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={avatar || "/globe.svg"}
              alt={username}
            />
            <AvatarFallback>{username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem><Link href={`/profile/${username}`}>Profile</Link></DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
