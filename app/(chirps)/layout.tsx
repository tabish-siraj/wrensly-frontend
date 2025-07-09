"use client"

import React from "react";
import { Header } from "@/components/navigation/Header";
import useUserStore from "@/src/stores/userStore";
import { Toaster } from "sonner";


function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useUserStore();
    if (!user) return null
    return (
        <>
            <Header username={user.username} avatar={user?.avatar} />
            <div className="container mx-auto">
                {children}
                <Toaster position="bottom-center" richColors closeButton />
            </div>

        </>
    );
}

export default Layout;
