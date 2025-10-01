"use client";

import { Bell, Heart, Repeat2, MessageCircle, UserPlus } from "lucide-react";
import LeftSidebar from "@/components/navbar/Sidebar"; // Update path as needed

export default function NotificationsPage() {
  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* Left Sidebar */}
      <div className="hidden md:block">
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <main className="flex flex-col w-full px-4 pt-4 md:pl-0 md:pr-72">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
          <Bell className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-bold">Flock Alerts</h1>
        </div>

        {/* Notifications Feed */}
        <div className="mt-6 space-y-6">
          {/* Like Notification */}
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
              <Heart className="text-pink-500" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold text-black">@sky_feather</span> Feathered your Chirp!
              </p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
          </div>

          {/* Repost Notification */}
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Repeat2 className="text-green-500" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold text-black">@chirpy_chick</span> Reposted your Chirp.
              </p>
              <span className="text-xs text-gray-500">Yesterday</span>
            </div>
          </div>

          {/* Follow Notification */}
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <UserPlus className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold text-black">@windy_wren</span> joined your Flock.
              </p>
              <span className="text-xs text-gray-500">4 hours ago</span>
            </div>
          </div>

          {/* Comment Notification */}
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <MessageCircle className="text-yellow-500" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold text-black">@stormy_stork</span> Peeped on your Chirp.
              </p>
              <span className="text-xs text-gray-500">30 minutes ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
