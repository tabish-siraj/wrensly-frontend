import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useRouter } from "next/navigation"; // useRouter from next/navigation for app directory


export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: { username: string; email: string; password: string }) => {
      const response = await api.post("/user", credentials);
      console.log(JSON.stringify(response))
    },
    onSuccess: () => {
      router.replace("/auth/login");
    },
  });
};