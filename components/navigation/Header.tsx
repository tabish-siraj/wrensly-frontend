import { Search, Bell, MessageCircle, Bookmark, Settings, LogOut, User, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/search/SearchInput";
import Link from "next/link";
import UserDropdown from "@/components/dropdown/UserDropdown";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  username: string
  avatar: string | null
}

export function Header({ username, avatar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl">W</span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchInput
              placeholder="Search posts, users, hashtags..."
              className="w-full"
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1">
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 h-10 w-10 hover:bg-gray-100 rounded-full"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 h-10 w-10 hover:bg-gray-100 rounded-full transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {/* Notification Badge */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>

            {/* Messages */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex p-2 h-10 w-10 hover:bg-gray-100 rounded-full transition-colors"
              title="Messages"
            >
              <MessageCircle className="w-5 h-5 text-gray-600" />
            </Button>

            {/* User Dropdown */}
            <div className="ml-1">
              <UserDropdown username={username} avatar={avatar} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
