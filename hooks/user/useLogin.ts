import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

type AuthResponse = {
    success: boolean;
    message: string;
    data: {
        token: string;
        refeshToken: string;
    }
    status: number;
}

export const useLogin = () =>
    useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const response = await api.post<AuthResponse>("/auth/login", credentials);

            console.log("Login response:", response);

            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("refreshToken", response.data.data.refeshToken);
            return response.data;
        }
    })
