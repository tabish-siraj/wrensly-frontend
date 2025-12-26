import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useRouter } from "next/navigation"; // useRouter from next/navigation for app directory


export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: { username: string; email: string; password: string }) => {
      const response = await api.post("/user", payload);

      if (!response.data.success) {
        throw new Error(response.data.message || "Signup failed");
      }

      return response.data;
    },
    onSuccess: () => {
      router.replace("/auth/login");
    },
  });
};