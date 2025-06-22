import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthRedirectProviderProps {
  children: React.ReactNode;
}

export function AuthRedirectProvider({ children }: AuthRedirectProviderProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If not logged in, redirect to /auth/login
    if (!token && window.location.pathname !== "/auth/login") {
      router.replace("/auth/login");
    }

    // If logged in and on /auth/login, redirect to /
    if (token && window.location.pathname === "/auth/login") {
      router.replace("/");
    }
  }, [router]);

  return <>{children}</>;
}
