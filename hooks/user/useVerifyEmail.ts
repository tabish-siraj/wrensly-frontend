import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: async (payload: { token: string }) => {
            const response = await api.post("/user/verify-email", payload);

            if (!response.data.success) {
                throw new Error(response.data.message || "Email verification failed");
            }

            return response.data;
        }
    });
};
