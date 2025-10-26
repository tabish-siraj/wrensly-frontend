import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useResetPassword = () => {

    return useMutation({
        mutationFn: async (payload: { token: string; password: string }) => {
            return await api.post("/auth/reset-password", payload);
        },
    });
};
