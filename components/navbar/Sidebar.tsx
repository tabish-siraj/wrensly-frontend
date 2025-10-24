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

const Sidebar = () => {
  const user = {
    name: "Farah Shabir",
    username: "farah_shab26124",
    avatar: "/avatar-placeholder.png", // Replace or use default
  };

  const navItems = [
    { name: "Home", icon: <Home />, href: "/" },
    { name: "Explore", icon: <Search />, href: "/explore" },
    { name: "Notifications", icon: <Bell />, href: "/notifications" },
    { name: "Messages", icon: <Mail />, href: "/messages" },
    { name: "Grok", icon: <Users />, href: "/grok" },
    { name: "Profile", icon: <User />, href: "/profile/farah_shab26124" },
    { name: "More", icon: <MoreHorizontal />, href: "/more" },
  ];

  return (
    <aside className="w-[250px] p-4 border-r min-h-screen flex flex-col justify-between">
      <div>
        {/* <div className="mb-6 text-3xl font-bold px-2">🕊️</div> */}
        <Link href="/" className="mb-6 block px-2">
          <span className="text-4xl font-extrabold text-black tracking-wide">W</span>
        </Link>

        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 px-3 py-2 rounded-full hover:bg-gray-100 transition"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-lg font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <button className="mt-6 w-full bg-black text-white py-3 rounded-full font-semibold flex justify-center items-center gap-2">
          <Pencil size={18} />
          Post
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 mt-6 px-3 py-2 hover:bg-gray-100 rounded-full transition">
        <Image
          src={user.avatar}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold text-sm">{user.name}</p>
          <p className="text-xs text-gray-500">@{user.username}</p>
        </div>
        <MoreHorizontal className="ml-auto" />
      </div>
    </aside>
  );
};

export default Sidebar;
