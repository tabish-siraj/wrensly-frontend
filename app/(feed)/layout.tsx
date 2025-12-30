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

    return (
        <>
            {!user.is_email_verified && <TopBar />}

            <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
                <Header username={user.username} avatar={user?.avatar} />
            </header>

            <main className="container mx-auto px-2 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-4">
                <div className="flex justify-between gap-4 lg:gap-10">

                    <aside className="hidden lg:block lg:w-1/4 px-2 sticky top-16 h-[calc(100vh-4rem)]">
                        <Sidebar />
                    </aside>

                    <section
                        className={`${isProfilePage ? "w-full" : "w-full md:w-[600px]"
                            } mx-auto transition-all animate-fade-in-slow`}
                    >
                        {children}
                    </section>

                    {!isProfilePage && (
                        <aside className="hidden xl:block xl:w-1/4">
                            <TrendingHashtags className="sticky top-16" />
                        </aside>
                    )}
                </div>
            </main>
        </>
    );
}

export default Layout;