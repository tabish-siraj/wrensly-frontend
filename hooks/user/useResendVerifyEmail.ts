import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useResendVerifyEmail = () => {
    return useMutation({
        mutationFn: async (payload: { username: string, email: string }) => {
            const response = await api.post("/user/resend-verify-email", payload);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to resend verification email");
            }

            return response.data;
        }
    });
};
