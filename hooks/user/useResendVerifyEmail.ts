import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useResendVerifyEmail = () => {
    return useMutation({
        mutationFn: async (payload: { username: string, email: string }) => {
            return await api.post("/user/resend-verify-email", payload);
        }
    });
};
