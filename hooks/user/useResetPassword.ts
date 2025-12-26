import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async (payload: { token: string; password: string }) => {
            const response = await api.post("/auth/reset-password", payload);

            if (!response.data.success) {
                throw new Error(response.data.message || "Password reset failed");
            }

            return response.data;
        },
    });
};
