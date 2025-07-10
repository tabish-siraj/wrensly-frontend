"use client"

import React from "react";
import { Header } from "@/components/navigation/Header";
import { Toaster } from "sonner";
import Sidebar from "@/components/navbar/Sidebar";
import useUserStore from "@/src/stores/userStore";
import { usePathname } from "next/navigation";



function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useUserStore();
    const pathname = usePathname();
    if (!user) return null
    const isNestPage = pathname.startsWith("/nest");

    return (
        <>
            <Header username={user.username} avatar={user?.avatar} />
            <div className="flex flex-col md:flex-row gap-4 p-4 pt-0">
                <div className="w-full md:w-1/4 border-r">
                    <Sidebar />
                </div>
                <div className={isNestPage ? "w-full" : "w-full md:w-1/2"}>
                    {children}
                </div>
                {!isNestPage && (
                    <div className="w-full md:w-1/4">
                        trending
                    </div>
                )}
            </div>
            <Toaster position="bottom-center" richColors closeButton />
        </>
    );
}

export default Layout;
