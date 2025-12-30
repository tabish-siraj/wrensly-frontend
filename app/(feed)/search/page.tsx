"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch, useSearchPosts, useSearchUsers, SearchFilters } from "@/hooks/search/useSearch";
import { SearchInput } from "@/components/search/SearchInput";
import { PostCard } from "@/components/card/PostCard";
import { UserCard } from "@/components/card/UserCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, Hash, FileText, Calendar, TrendingUp, Clock } from "lucide-react";
import { formatHashtag } from "@/lib/hashtags";
import { useRouter } from "next/navigation";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get('q') || '';
    const initialTab = searchParams.get('tab') || 'all';

    const [query, setQuery] = useState(initialQuery);
    const [activeTab, setActiveTab] = useState(initialTab);
    const [filters, setFilters] = useState<SearchFilters>({
        type: 'all',
        dateRange: 'all',
        sortBy: 'relevance',
    });

    // Update filters when tab changes
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            type: activeTab as SearchFilters['type'],
        }));
    }, [activeTab]);

    // Search hooks
    const { data: allResults, isLoading: allLoading, error: allError } = useSearch(
        query,
        { ...filters, type: 'all' },
        activeTab === 'all'
    );

    const {
        data: postsData,
        fetchNextPage: fetchNextPosts,
        hasNextPage: hasNextPosts,
        isLoading: postsLoading,
        isFetchingNextPage: fetchingNextPosts
    } = useSearchPosts(
        query,
        { dateRange: filters.dateRange, sortBy: filters.sortBy }
    );

    const {
        data: usersData,
        fetchNextPage: fetchNextUsers,
        hasNextPage: hasNextUsers,
        isLoading: usersLoading,
        isFetchingNextPage: fetchingNextUsers
    } = useSearchUsers(query);

    // Handle search
    const handleSearch = (newQuery: string) => {
        setQuery(newQuery);
        const params = new URLSearchParams();
        params.set('q', newQuery);
        if (activeTab !== 'all') {
            params.set('tab', activeTab);
        }
        router.push(`/search?${params.toString()}`);
    };

    // Handle tab change
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (tab !== 'all') params.set('tab', tab);
        router.push(`/search?${params.toString()}`);
    };

    // Handle hashtag click
    const handleHashtagClick = (hashtag: string) => {
        router.push(`/hashtag/${hashtag}`);
    };

    // Flatten posts data for infinite scroll
    const posts = postsData?.pages.flatMap(page => page.data) || [];
    const users = usersData?.pages.flatMap(page => page.data) || [];

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Search Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Search className="w-6 h-6 text-gray-600" />
                    <h1 className="text-2xl font-bold">Search</h1>
                </div>

                <SearchInput
                    placeholder="Search posts, users, hashtags..."
                    onSearch={handleSearch}
                    className="w-full"
                />
            </div>

            {/* Search Results */}
            {query && (
                <div className="space-y-6">
                    {/* Search Filters */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <Select
                                value={filters.dateRange}
                                onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value as any }))}
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All time</SelectItem>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="week">This week</SelectItem>
                                    <SelectItem value="month">This month</SelectItem>
                                    <SelectItem value="year">This year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-gray-500" />
                            <Select
                                value={filters.sortBy}
                                onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as any }))}
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="relevance">Relevance</SelectItem>
                                    <SelectItem value="recent">Most recent</SelectItem>
                                    <SelectItem value="popular">Most popular</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Search Tabs */}
                    <Tabs value={activeTab} onValueChange={handleTabChange}>
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="all" className="flex items-center gap-2">
                                <Search className="w-4 h-4" />
                                All
                            </TabsTrigger>
                            <TabsTrigger value="posts" className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Posts
                            </TabsTrigger>
                            <TabsTrigger value="users" className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Users
                            </TabsTrigger>
                            <TabsTrigger value="hashtags" className="flex items-center gap-2">
                                <Hash className="w-4 h-4" />
                                Hashtags
                            </TabsTrigger>
                        </TabsList>

                        {/* All Results Tab */}
                        <TabsContent value="all" className="space-y-6">
                            {allLoading ? (
                                <div className="space-y-4">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <Card key={i} className="animate-pulse">
                                            <CardContent className="p-6">
                                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : allError ? (
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <p className="text-red-500">Search failed. Please try again.</p>
                                    </CardContent>
                                </Card>
                            ) : allResults && allResults.total > 0 ? (
                                <div className="space-y-6">
                                    {/* Posts Section */}
                                    {allResults.posts.length > 0 && (
                                        <div>
                                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                <FileText className="w-5 h-5" />
                                                Posts
                                            </h2>
                                            <div className="space-y-4">
                                                {allResults.posts.map((post: any) => (
                                                    <PostCard
                                                        key={post.id}
                                                        post={post}
                                                        screen="search"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Users Section */}
                                    {allResults.users.length > 0 && (
                                        <div>
                                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                <Users className="w-5 h-5" />
                                                Users
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {allResults.users.map((user: any) => (
                                                    <UserCard
                                                        key={user.id}
                                                        user={user}
                                                        showFollowButton={true}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Hashtags Section */}
                                    {allResults.hashtags.length > 0 && (
                                        <div>
                                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                <Hash className="w-5 h-5" />
                                                Hashtags
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {allResults.hashtags.map((hashtag: any) => (
                                                    <Card key={hashtag.id} className="cursor-pointer hover:shadow-md transition-shadow">
                                                        <CardContent
                                                            className="p-4"
                                                            onClick={() => handleHashtagClick(hashtag.name)}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                                    <Hash className="w-5 h-5 text-blue-600" />
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium text-blue-600">
                                                                        {formatHashtag(hashtag.name)}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {hashtag.post_count} {hashtag.post_count === 1 ? 'post' : 'posts'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p className="text-gray-500">No results found for "{query}"</p>
                                        <p className="text-sm text-gray-400 mt-2">Try different keywords or check your spelling</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* Posts Tab */}
                        <TabsContent value="posts" className="space-y-4">
                            {postsLoading ? (
                                <div className="space-y-4">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <Card key={i} className="animate-pulse">
                                            <CardContent className="p-6">
                                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : posts.length > 0 ? (
                                <>
                                    {posts.map((post: any) => (
                                        <PostCard
                                            key={post.id}
                                            post={post}
                                            screen="search-posts"
                                        />
                                    ))}
                                    {hasNextPosts && (
                                        <div className="text-center">
                                            <Button
                                                onClick={() => fetchNextPosts()}
                                                disabled={fetchingNextPosts}
                                                variant="outline"
                                            >
                                                {fetchingNextPosts ? 'Loading...' : 'Load more posts'}
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p className="text-gray-500">No posts found for "{query}"</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* Users Tab */}
                        <TabsContent value="users" className="space-y-4">
                            {usersLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <Card key={i} className="animate-pulse">
                                            <CardContent className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                                    <div className="flex-1">
                                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : users.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {users.map((user: any) => (
                                            <UserCard
                                                key={user.id}
                                                user={user}
                                                showFollowButton={true}
                                            />
                                        ))}
                                    </div>
                                    {hasNextUsers && (
                                        <div className="text-center">
                                            <Button
                                                onClick={() => fetchNextUsers()}
                                                disabled={fetchingNextUsers}
                                                variant="outline"
                                            >
                                                {fetchingNextUsers ? 'Loading...' : 'Load more users'}
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p className="text-gray-500">No users found for "{query}"</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* Hashtags Tab */}
                        <TabsContent value="hashtags">
                            <div className="text-center py-8">
                                <Hash className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p className="text-gray-500">Hashtag search coming soon!</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    For now, you can search hashtags from the main search
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            )}

            {/* Empty State */}
            {!query && (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            Search Wrensly
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Find posts, users, and hashtags across the platform
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
                            <span>Try searching for:</span>
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={() => handleSearch('javascript')}
                            >
                                javascript
                            </button>
                            <span>•</span>
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={() => handleSearch('#coding')}
                            >
                                #coding
                            </button>
                            <span>•</span>
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={() => handleSearch('react')}
                            >
                                react
                            </button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}