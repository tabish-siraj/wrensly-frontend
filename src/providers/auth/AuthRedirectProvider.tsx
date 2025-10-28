import { useEffect } from "react";
import { useRouter } from "next/navigation";


export function AuthRedirectProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If not logged in, redirect to /auth/login
        const allowedPaths = ["/auth/login", "/auth/reset-password", "/auth/forgot-password", "/auth/signup"];

    if (!token && !allowedPaths.includes(window.location.pathname)) {
      router.replace("/auth/login");
    }

    // If logged in and on /auth/login, redirect to /
    if (token && window.location.pathname === "/auth/login") {
      router.replace("/");
    }
  }, [router]);

  return <>{children}</>;
}
