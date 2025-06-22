"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import useUserStore from "@/src/stores/userStore";

interface UserDropdownProps {
  user: {
    avatar: string;
    displayName: string;
  };
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const { clearUser } = useUserStore();
  const handleLogout = () => {
    clearUser();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="flex items-center gap-1">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={user.avatar || "/placeholder.svg"}
              alt={user.displayName}
            />
            <AvatarFallback>{user.displayName[0]}</AvatarFallback>
          </Avatar>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
