"use client"

import React from "react";
import { Header } from "@/components/navigation/Header";
import useUserStore from "@/src/stores/userStore";

function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useUserStore();
    if (!user) return null
    return (
        <>
            <Header username={user.username} avatar={user?.avatar} />
            {children}
        </>
    );
}

export default Layout;
