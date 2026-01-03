"use client";

import {
  Home,
  Search,
  Bell,
  Mail,
  Users,
  User,
  MoreHorizontal,
  Pencil,
  Bookmark,
  Settings,
  Hash,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useUserStore from "@/src/stores/userStore";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = () => {
  const { user } = useUserStore();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Explore", icon: Search, href: "/explore" },
    { name: "Notifications", icon: Bell, href: "/notifications" },
    { name: "Messages", icon: Mail, href: "/messages" },
    { name: "Bookmarks", icon: Bookmark, href: "/bookmarks" },
    { name: "Communities", icon: Users, href: "/communities" },
    { name: "Profile", icon: User, href: `/profile/${user?.username || ''}` },
    { name: "More", icon: MoreHorizontal, href: "/more" },
  ];

  if (!user) {
    return null;
  }

  return (
    <aside className="w-full max-w-[280px] h-full flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 px-2 pt-4" role="navigation" aria-label="Main navigation">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-full transition-all duration-200
                  hover:bg-gray-100 group relative
                  ${isActive
                    ? 'bg-gray-100 font-semibold text-black'
                    : 'text-gray-700 hover:text-black'
                  }
                `}
                aria-label={`Navigate to ${item.name}`}
              >
                <IconComponent
                  className={`w-6 h-6 transition-colors ${isActive ? 'text-black' : 'text-gray-600 group-hover:text-black'
                    }`}
                  aria-hidden="true"
                />
                <span className="text-xl font-medium">{item.name}</span>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-black rounded-r-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Post Button */}
        <div className="mt-8 px-2">
          <Button
            className="w-full bg-black text-white py-3 rounded-full font-semibold flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
            aria-label="Create new post"
          >
            <Pencil className="w-5 h-5" aria-hidden="true" />
            <span className="text-lg">Post</span>
          </Button>
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="mt-auto p-2">
        <Link
          href={`/profile/${user.username}`}
          className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-full transition-all duration-200 group"
        >
          <Avatar className="w-10 h-10 ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all">
            <AvatarImage
              src={user.avatar || "/globe.svg"}
              alt={`${user.first_name || user.username}'s profile picture`}
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
              {user.first_name?.[0] || user.username[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">
              {user.first_name && user.last_name
                ? `${user.first_name} ${user.last_name}`
                : user.username}
            </p>
            <p className="text-xs text-gray-500 truncate">@{user.username}</p>
          </div>

          <MoreHorizontal className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
