import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export const useVerifyEmail = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (token: string) => {
            const response = await api.post("/user/verify-email", { token });

            if (!response.data.success) {
                throw new Error(response.data.message || "Email verification failed");
            }

            return response.data;
        },
        onSuccess: () => {
            router.replace("/auth/login?verified=true");
        },
    });
};

export const useResendVerificationEmail = () => {
    return useMutation({
        mutationFn: async (payload: { username?: string; email: string }) => {
            const response = await api.post("/user/resend-verify-email", payload);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to resend verification email");
            }

            return response.data;
        },
    });
};