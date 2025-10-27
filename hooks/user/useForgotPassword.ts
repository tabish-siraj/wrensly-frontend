import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (email: { email: string }) => {
            return await api.post("/auth/forgot-password", email);
        },
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async (payload: { token: string; password: string }) => {
            return await api.post("/auth/reset-password", payload);
        },
        onSuccess: () => {
            window.location.href = "/auth/login";
        },
    });
};
