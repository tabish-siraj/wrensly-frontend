"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Search, Hash, Users, Sparkles, ArrowLeft } from "lucide-react";
import { SearchInput } from "@/components/search/SearchInput";
import { useRouter } from "next/navigation";

const mockTrends = [
  { title: "TechFeathers", posts: "12.5K", category: "Technology" },
  { title: "AI Revolution", posts: "9.1K", category: "Technology" },
  { title: "FlockFriday", posts: "7.8K", category: "Community" },
  { title: "WrenslyLaunch", posts: "5.4K", category: "Platform" },
  { title: "CodeLife", posts: "4.2K", category: "Programming" },
  { title: "DesignTrends", posts: "3.8K", category: "Design" },
];

const suggestedUsers = [
  { username: "techguru", name: "Tech Guru", followers: "15.2K", verified: true },
  { username: "designpro", name: "Design Pro", followers: "8.7K", verified: false },
  { username: "codewiz", name: "Code Wizard", followers: "12.1K", verified: true },
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  Who to Follow
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedUsers.map((user, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="font-medium text-sm text-gray-900 truncate">
                          {user.name}
                        </p>
                        {user.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">@{user.username}</p>
                      <p className="text-xs text-gray-400">{user.followers} followers</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}