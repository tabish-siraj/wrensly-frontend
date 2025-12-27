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

      // Handle snake_case response from API
      const { token, refresh_token, user } = response.data.data;

      // Store tokens
      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refresh_token);

      // Use user data from login response (API returns snake_case, which matches frontend types)
      if (user) {
        setUser(user);
        return response.data.data;
      }

      // Fallback: fetch user data if not included in login response
      const userResponse = await api.get("/user/me");
      if (!userResponse.data.success) {
        throw new Error(userResponse.data.message || "Failed to fetch user data");
      }

      setUser(userResponse.data.data);
      return response.data.data;
    },
    onSuccess: () => {
      router.replace("/");
    },
  });
};