"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";


export function AuthRedirectProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Ensure we're on the client side before accessing localStorage
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem("token");

    // If not logged in, redirect to /auth/login
    const allowedPaths = ["/auth/login", "/auth/reset-password", "/auth/forgot-password", "/auth/signup", "/auth/verify-email"];

    if (!token && !allowedPaths.includes(pathname)) {
      router.replace("/auth/login");
    }

    // If logged in and on /auth/login, redirect to /
    if (token && pathname === "/auth/login") {
      router.replace("/");
    }
  }, [router, pathname]);

  return <>{children}</>;
}
