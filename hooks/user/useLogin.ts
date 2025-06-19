import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import useUserStore from "@/src/stores/userStore";
import { useRouter } from "next/navigation"; // useRouter from next/navigation for app directory

export const useLogin = () => {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const response = await api.post("/auth/login", credentials);

            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("refreshToken", response.data.data.refreshToken);

            const user = await api.get("/user/me");
            setUser(user.data); // use the store's setUser action
        },
        onSuccess: () => {
            router.push("/");
        },
    });
};