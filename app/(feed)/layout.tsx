"use client"

import React from "react";
import { Header } from "@/components/navigation/Header";
import { Toaster } from "sonner";
import Sidebar from "@/components/navbar/Sidebar";
import useUserStore from "@/src/stores/userStore";
import { usePathname } from "next/navigation";
import { TopBar } from '@/components/navigation/TopBar';

function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useUserStore();
    const pathname = usePathname();
    if (!user) return null;

    const isProfilePage = pathname.startsWith("/profile");

    return (
        <>
            <TopBar />
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
                            <div className="bg-[#f7f9f9] dark:bg-[#16181c] rounded-2xl shadow border border-gray-100 p-4 sticky top-16">
                                <h3 className="text-xl font-bold mb-4">What’s happening</h3>
                                <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                                    <li className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                                        <div className="text-xs text-gray-500">Trending in Pakistan</div>
                                        <div className="font-semibold text-md">#ReactJS</div>
                                        <div className="text-xs text-gray-500">15.7K Chirps</div>
                                    </li>
                                    <li className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                                        <div className="text-xs text-gray-500">Trending in Dev</div>
                                        <div className="font-semibold text-md">#NextJS</div>
                                        <div className="text-xs text-gray-500">10.2K Chirps</div>
                                    </li>
                                    <li className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                                        <div className="text-xs text-gray-500">Trending in Tech</div>
                                        <div className="font-semibold text-md">#OpenAI</div>
                                        <div className="text-xs text-gray-500">8.9K Chirps</div>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    )}
                </div>
            </main>

            <Toaster position="bottom-center" richColors closeButton />
        </>
    );
}

export default Layout;
