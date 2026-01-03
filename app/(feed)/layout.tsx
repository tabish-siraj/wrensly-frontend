"use client"

import React from "react";
import { Header } from "@/components/navigation/Header";
import Sidebar from "@/components/navbar/Sidebar";
import useUserStore from "@/src/stores/userStore";
import { usePathname } from "next/navigation";
import { TopBar } from '@/components/navigation/TopBar';
import { TrendingHashtags } from "@/components/hashtag/TrendingHashtags";

function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useUserStore();
    const pathname = usePathname();
    if (!user) return null;

    const isProfilePage = pathname.startsWith("/profile");
    const isExplorePage = pathname === "/explore";
    const isNotificationsPage = pathname === "/notifications";
    const isSearchPage = pathname.startsWith("/search");

    // Pages that should have full width content but still show sidebar
    const isFullWidthPage = isExplorePage || isNotificationsPage || isSearchPage;

    return (
        <>
            {!user.is_email_verified && <TopBar />}

            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <Header username={user.username} avatar={user?.avatar} />
            </header>

            <main className="min-h-screen bg-gray-50/30">
                <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-6">
                    <div className="flex gap-6 lg:gap-8">
                        {/* Left Sidebar - Always visible on desktop */}
                        <aside className="hidden lg:block lg:w-64 xl:w-72 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
                            <Sidebar />
                        </aside>

                        {/* Main Content */}
                        <section
                            className={`
                                flex-1 min-w-0 transition-all duration-200
                                ${isFullWidthPage
                                    ? "max-w-4xl" // Full width pages get more space but not unlimited
                                    : isProfilePage
                                        ? "max-w-4xl"
                                        : "max-w-2xl"
                                }
                                ${!isFullWidthPage ? "mx-auto" : ""}
                            `}
                        >
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px] overflow-hidden">
                                {children}
                            </div>
                        </section>

                        {/* Right Sidebar - Only show on feed and profile pages */}
                        {!isFullWidthPage && (
                            <aside className="hidden xl:block xl:w-80 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
                                <div className="space-y-4">
                                    <TrendingHashtags className="bg-white rounded-lg shadow-sm border border-gray-200" />

                                    {/* Additional widgets */}
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                        <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                                        <div className="space-y-2 text-sm">
                                            <a href="/explore" className="block text-gray-600 hover:text-gray-900 transition-colors">
                                                Explore Trending
                                            </a>
                                            <a href="/notifications" className="block text-gray-600 hover:text-gray-900 transition-colors">
                                                View Notifications
                                            </a>
                                            <a href="/search" className="block text-gray-600 hover:text-gray-900 transition-colors">
                                                Advanced Search
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Layout;