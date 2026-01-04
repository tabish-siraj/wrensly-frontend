"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/src/stores/userStore";
import { Loader2 } from "lucide-react";

export default function RootPage() {
    const router = useRouter();
    const { user, isAuthenticated, _hasHydrated } = useUserStore();

    useEffect(() => {
        // Wait for store to hydrate
        if (!_hasHydrated) return;

        // Check if user is authenticated
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

        if (!token || !isAuthenticated) {
            // Not authenticated, redirect to login
            router.replace("/auth/login");
        } else {
            // Authenticated, redirect to feed
            router.replace("/feed");
        }
    }, [router, user, isAuthenticated, _hasHydrated]);

    // Show loading while determining where to redirect
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <Loader2 className="animate-spin w-8 h-8 text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600">Loading Wrensly...</p>
            </div>
        </div>
    );
}