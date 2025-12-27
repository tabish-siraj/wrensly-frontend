import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import useUserStore from "@/src/stores/userStore";
import { useRouter } from "next/navigation";

export const useLogout = () => {
    const router = useRouter();
    const clearUser = useUserStore((state) => state.clearUser);

    return useMutation({
        mutationFn: async () => {
            try {
                // Call logout endpoint (optional since JWT is stateless)
                await api.post("/auth/logout");
            } catch (error) {
                // Continue with logout even if API call fails
                console.warn("Logout API call failed, continuing with client-side logout");
            }
        },
        onSuccess: () => {
            // Clear user state and redirect
            clearUser(() => router.replace("/auth/login"));
        },
        onError: () => {
            // Even on error, clear user state and redirect
            clearUser(() => router.replace("/auth/login"));
        },
    });
};