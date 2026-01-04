"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Search, Hash, Sparkles, ArrowLeft } from "lucide-react";
import { SearchInput } from "@/components/search/SearchInput";
import { SuggestedUsers } from "@/components/user/SuggestedUsers";
import { useRouter } from "next/navigation";

const mockTrends = [
  { title: "TechFeathers", posts: "12.5K", category: "Technology" },
  { title: "AI Revolution", posts: "9.1K", category: "Technology" },
  { title: "FlockFriday", posts: "7.8K", category: "Community" },
  { title: "WrenslyLaunch", posts: "5.4K", category: "Platform" },
  { title: "CodeLife", posts: "4.2K", category: "Programming" },
  { title: "DesignTrends", posts: "3.8K", category: "Design" },
];

export default function ExplorePage() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleTrendClick = (trend: string) => {
    router.push(`/search?q=${encodeURIComponent(trend)}`);
  };

  return (
    <div className="h-full">
      {/* Header - Fixed at top */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-gray-700" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Explore</h1>
              <p className="text-sm text-gray-600">Discover trending topics, hashtags, and people</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <SearchInput
          placeholder="Search Wrensly 🔍"
          onSearch={handleSearch}
          className="w-full max-w-2xl"
        />
      </div>

      {/* Content Area */}
      <div className="px-6 py-4">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trending Topics */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockTrends.map((trend, index) => (
                  <div
                    key={index}
                    onClick={() => handleTrendClick(trend.title)}
                    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">
                          Trending in {trend.category}
                        </p>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          #{trend.title}
                        </h3>
                        <p className="text-sm text-gray-500">{trend.posts} posts</p>
                      </div>
                      <Hash className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Popular Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Technology", "Design", "Programming", "Startup", "AI/ML", "Web Dev"].map((category) => (
                    <button
                      key={category}
                      onClick={() => handleSearch(category)}
                      className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggested Users */}
          <div className="space-y-6">
            <SuggestedUsers limit={6} />
          </div>
        </div>
      </div>
    </div>
  );
}