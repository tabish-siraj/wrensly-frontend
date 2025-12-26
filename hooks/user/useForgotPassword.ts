import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (email: { email: string }) => {
            const response = await api.post("/auth/forgot-password", email);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to send password reset email");
            }

            return response.data;
        },
    });
};
