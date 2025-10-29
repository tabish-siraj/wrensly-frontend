import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (email: { email: string }) => {
            return await api.post("/auth/forgot-password", email);
        },
    });
};
