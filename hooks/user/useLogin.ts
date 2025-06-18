import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import useUserStore from "@/src/stores/userStore";
import { redirect } from "next/dist/server/api-utils";

type AuthResponse = {
    success: boolean;
    message: string;
    data: {
        token: string;
        refreshToken: string;
    }
    status: number;
}

export const useLogin = () =>
    useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const response = await api.post<AuthResponse>("/auth/login", credentials);

            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("refreshToken", response.data.data.refreshToken);

            const user = await api.get("/user/me");
            useUserStore.setState({
                user: user.data,
                isAuthenticated: true
            })
            return response.data;
        }
    })
