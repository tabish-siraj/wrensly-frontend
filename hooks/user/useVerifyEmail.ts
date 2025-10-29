import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: async (payload: { token: string }) => {
            return await api.post("/user/verify-email", payload);
        }
    });
};
