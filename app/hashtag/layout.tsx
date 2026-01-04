"use client"

import React from "react";
import { Header } from "@/components/navigation/Header";
import Sidebar from "@/components/navbar/Sidebar";
import useUserStore from "@/src/stores/userStore";
import { TopBar } from '@/components/navigation/TopBar';

function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useUserStore();
    if (!user) return null;

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
                        <section className="flex-1 min-w-0 transition-all duration-200 max-w-2xl mx-auto">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px] overflow-hidden">
                                {children}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Layout;