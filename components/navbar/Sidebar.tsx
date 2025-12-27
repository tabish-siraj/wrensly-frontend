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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useUserStore from "@/src/stores/userStore";

const Sidebar = () => {
  const { user } = useUserStore();

  const navItems = [
    { name: "Home", icon: <Home />, href: "/" },
    { name: "Explore", icon: <Search />, href: "/explore" },
    { name: "Notifications", icon: <Bell />, href: "/notifications" },
    { name: "Messages", icon: <Mail />, href: "/messages" },
    { name: "Grok", icon: <Users />, href: "/grok" },
    { name: "Profile", icon: <User />, href: `/profile/${user?.username || ''}` },
    { name: "More", icon: <MoreHorizontal />, href: "/more" },
  ];

  if (!user) {
    return null;
  }

  return (
    <aside className="w-[250px] p-4 border-r min-h-screen flex flex-col justify-between">
      <div>
        <Link href="/" className="mb-6 block px-2">
          <span className="text-4xl font-extrabold text-black tracking-wide">W</span>
        </Link>

        <nav className="space-y-3" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 px-3 py-2 rounded-full hover:bg-gray-100 transition"
              aria-label={`Navigate to ${item.name}`}
            >
              <span className="text-xl" aria-hidden="true">{item.icon}</span>
              <span className="text-lg font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <button
          className="mt-6 w-full bg-black text-white py-3 rounded-full font-semibold flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors"
          aria-label="Create new post"
        >
          <Pencil size={18} aria-hidden="true" />
          Post
        </button>
      </div>

      <div className="flex items-center gap-3 mt-6 px-3 py-2 hover:bg-gray-100 rounded-full transition">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={`${user.first_name || user.username}'s profile picture`}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-semibold">
              {user.first_name?.[0] || user.username[0]}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-sm">
            {user.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : user.username}
          </p>
          <p className="text-xs text-gray-500">@{user.username}</p>
        </div>
        <MoreHorizontal className="ml-auto" aria-hidden="true" />
      </div>
    </aside>
  );
};

export default Sidebar;
