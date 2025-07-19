"use client";

import { Input } from "@/components/ui/input";
import { TrendingUp } from "lucide-react";
import LeftSidebar from "../../components/navbar/Sidebar";
import RightSidebar from "@/app/(chirps)/layout"; // Optional if you’ve created it

const mockTrends = [
  { title: "TechFeathers", chirps: "12.5K" },
  { title: "AI Revolution", chirps: "9.1K" },
  { title: "FlockFriday", chirps: "7.8K" },
  { title: "WrenslyLaunch", chirps: "5.4K" },
];

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* Left Sidebar */}
      <div className="w-[18%] border-r border-gray-200 min-h-screen p-4 hidden md:block">
        <LeftSidebar />
      </div>

      {/* Main Explore Content */}
      <main className="flex-1 max-w-2xl mx-auto p-4">
        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search Wrensly 🔍"
            className="rounded-full border-gray-300 shadow-sm px-4 py-2"
          />
        </div>

        {/* Trending Section */}
        <div className="bg-gray-100 rounded-xl p-4 shadow-md">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="text-blue-500 w-5 h-5" />
            Trending Feathers
          </h2>
          <ul className="space-y-4">
            {mockTrends.map((trend, index) => (
              <li key={index} className="hover:bg-gray-200 rounded-md p-2 transition">
                <p className="text-sm text-gray-500">Trending in Flock</p>
                <h3 className="font-semibold text-base">{trend.title}</h3>
                <p className="text-sm text-gray-500">{trend.chirps} Chirps</p>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Right Sidebar (Optional) */}
      <div className="w-[25%] border-l border-gray-200 p-4 hidden xl:block">
        {/* <RightSidebar /> */}
      </div>
    </div>
  );
}
