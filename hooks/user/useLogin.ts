import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import useUserStore from "@/src/stores/userStore";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await api.post("/auth/login", credentials);

      if (!response.data.success) {
        throw new Error(response.data.message || "Login failed");
      }

      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      const user = await api.get("/user/me");
      if (!user.data.success) {
        throw new Error(user.data.message || "Failed to fetch user data");
      }

      setUser(user.data.data);
    },
    onSuccess: () => {
      router.replace("/");
    },
  });
};