"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchSuggestions } from "@/hooks/search/useSearch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Hash, User, Clock, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { formatHashtag } from "@/lib/hashtags";

interface SearchInputProps {
    placeholder?: string;
    className?: string;
    onSearch?: (query: string) => void;
    autoFocus?: boolean;
}

export function SearchInput({
    placeholder = "Search posts, users, hashtags...",
    className = "",
    onSearch,
    autoFocus = false
}: SearchInputProps) {
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Debounce the query for suggestions
    const debouncedQuery = useDebounce(query, 300);

    const { data: suggestions, isLoading } = useSearchSuggestions(
        debouncedQuery,
        showSuggestions && debouncedQuery.length >= 2
    );

    // Handle search submission
    const handleSearch = (searchQuery: string = query) => {
        if (!searchQuery.trim()) return;

        setShowSuggestions(false);
        setSelectedIndex(-1);

        if (onSearch) {
            onSearch(searchQuery.trim());
        } else {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setShowSuggestions(value.length >= 2);
        setSelectedIndex(-1);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions || !suggestions) return;

        const totalItems = (suggestions.users?.length || 0) + (suggestions.hashtags?.length || 0);

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % totalItems);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    // Handle selection
                    const userCount = suggestions.users?.length || 0;
                    if (selectedIndex < userCount) {
                        const user = suggestions.users[selectedIndex];
                        router.push(`/profile/${user.username}`);
                    } else {
                        const hashtag = suggestions.hashtags[selectedIndex - userCount];
                        router.push(`/hashtag/${hashtag.name}`);
                    }
                } else {
                    handleSearch();
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                inputRef.current?.blur();
                break;
        }
    };

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node) &&
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle suggestion click
    const handleSuggestionClick = (type: 'user' | 'hashtag', item: any) => {
        setShowSuggestions(false);
        setSelectedIndex(-1);

        if (type === 'user') {
            router.push(`/profile/${item.username}`);
        } else {
            router.push(`/hashtag/${item.name}`);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.focus();
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                    className="pl-10 pr-20"
                    autoFocus={autoFocus}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    {query && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearSearch}
                            className="h-6 w-6 p-0 hover:bg-gray-100"
                        >
                            <X className="w-3 h-3" />
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSearch()}
                        disabled={!query.trim()}
                        className="h-6 px-2 text-xs"
                    >
                        Search
                    </Button>
                </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (suggestions?.users?.length || suggestions?.hashtags?.length) && (
                <Card
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto"
                >
                    <CardContent className="p-0">
                        {/* Users */}
                        {suggestions.users && suggestions.users.length > 0 && (
                            <div>
                                <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b">
                                    Users
                                </div>
                                {suggestions.users.map((user: any, index: number) => (
                                    <div
                                        key={user.id}
                                        className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer ${selectedIndex === index ? 'bg-blue-50' : ''
                                            }`}
                                        onClick={() => handleSuggestionClick('user', user)}
                                    >
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            {user.avatar ? (
                                                <img
                                                    src={user.avatar}
                                                    alt={user.username}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <User className="w-4 h-4 text-gray-500" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm truncate">
                                                {user.first_name && user.last_name
                                                    ? `${user.first_name} ${user.last_name}`
                                                    : user.username
                                                }
                                            </div>
                                            <div className="text-xs text-gray-500 truncate">
                                                @{user.username}
                                                {user.is_verified && (
                                                    <span className="ml-1 text-blue-500">✓</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Hashtags */}
                        {suggestions.hashtags && suggestions.hashtags.length > 0 && (
                            <div>
                                <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b">
                                    Hashtags
                                </div>
                                {suggestions.hashtags.map((hashtag: any, index: number) => {
                                    const adjustedIndex = (suggestions.users?.length || 0) + index;
                                    return (
                                        <div
                                            key={hashtag.id}
                                            className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer ${selectedIndex === adjustedIndex ? 'bg-blue-50' : ''
                                                }`}
                                            onClick={() => handleSuggestionClick('hashtag', hashtag)}
                                        >
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Hash className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-sm text-blue-600">
                                                    {formatHashtag(hashtag.name)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {hashtag.post_count} {hashtag.post_count === 1 ? 'post' : 'posts'}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Loading state */}
                        {isLoading && (
                            <div className="px-3 py-4 text-center text-sm text-gray-500">
                                Searching...
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}