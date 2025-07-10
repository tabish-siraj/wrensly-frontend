import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useRouter } from "next/navigation"; // useRouter from next/navigation for app directory


export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: { username: string; email: string; password: string }) => {
      await api.post("/user", payload);
    },
    onSuccess: () => {
      router.replace("/auth/login");
    },
  });
};