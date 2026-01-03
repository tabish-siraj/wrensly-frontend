"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Edit3,
  Bookmark,
  Moon,
  HelpCircle,
  Shield
} from "lucide-react";
import useUserStore from "@/src/stores/userStore";
import Link from "next/link";

interface UserDropdownProps {
  username: string
  avatar: string | null
}

export default function UserDropdown({ username, avatar }: UserDropdownProps) {
  const { clearUser, user } = useUserStore();

  const handleLogout = () => {
    clearUser();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-2 py-1.5 h-auto hover:bg-gray-100 rounded-full transition-all duration-200 hover:shadow-sm"
        >
          <Avatar className="w-7 h-7 ring-1 ring-gray-200">
            <AvatarImage
              src={avatar || "/globe.svg"}
              alt={username}
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold text-xs">
              {username?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-sm font-medium text-gray-700 max-w-20 truncate">@{username}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border-gray-200">
        {/* User Info Header */}
        <DropdownMenuLabel className="p-3 pb-2 bg-gray-50 rounded-lg mb-2">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 ring-1 ring-white shadow-sm">
              <AvatarImage
                src={avatar || "/globe.svg"}
                alt={username}
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold text-sm">
                {username?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {user?.first_name && user?.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : username
                }
              </p>
              <p className="text-sm text-gray-500 truncate">@{username}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Profile Actions */}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/profile/${username}`} className="flex items-center gap-3 px-3 py-2 rounded-md">
            <User className="w-4 h-4 text-gray-600" />
            <span className="font-medium">View Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/profile/${username}/edit`} className="flex items-center gap-3 px-3 py-2 rounded-md">
            <Edit3 className="w-4 h-4 text-gray-600" />
            <span className="font-medium">Edit Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md">
          <Bookmark className="w-4 h-4 text-gray-600" />
          <span className="font-medium">Bookmarks</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Settings & Preferences */}
        <DropdownMenuItem className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md">
          <Settings className="w-4 h-4 text-gray-600" />
          <span className="font-medium">Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md">
          <Moon className="w-4 h-4 text-gray-600" />
          <span className="font-medium">Dark Mode</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md">
          <Shield className="w-4 h-4 text-gray-600" />
          <span className="font-medium">Privacy</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Help & Support */}
        <DropdownMenuItem className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md">
          <HelpCircle className="w-4 h-4 text-gray-600" />
          <span className="font-medium">Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
