"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useUserStore from "@/src/stores/userStore";

export function AuthRedirectProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, _hasHydrated } = useUserStore();

  useEffect(() => {
    // Wait for store to hydrate before making routing decisions
    if (!_hasHydrated) return;

    // Ensure we're on the client side before accessing localStorage
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem("token");

    // If not logged in, redirect to /auth/login
    const allowedPaths = [
      "/auth/login",
      "/auth/reset-password",
      "/auth/forgot-password",
      "/auth/signup",
      "/auth/verify-email"
    ];

    if (!token && !allowedPaths.includes(pathname)) {
      router.replace("/auth/login");
      return;
    }

    // If logged in and on /auth/login, redirect to /
    if (token && pathname === "/auth/login") {
      router.replace("/");
      return;
    }

    // If user is authenticated but email not verified, allow access to feed
    // The TopBar component will show the verification banner
    // Only redirect to verification page if they're trying to access restricted features
    if (isAuthenticated && user && !user.is_email_verified &&
      !pathname.startsWith("/auth/verify-email") &&
      !pathname.startsWith("/auth/resend-verification") &&
      (pathname.startsWith("/profile/") && pathname.includes("/edit"))) {
      // Only redirect to verification for profile editing or other restricted actions
      router.replace("/auth/verify-email");
      return;
    }
  }, [router, pathname, user, isAuthenticated, _hasHydrated]);

  return <>{children}</>;
}
