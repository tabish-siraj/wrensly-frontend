import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useRouter } from "next/navigation"; // useRouter from next/navigation for app directory


export const useFollowUnfollow = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (credentials: { following: string; operation: string; }) => {
            const response = await api.post("/follow", credentials);
            return response.data;
        },
        onSuccess: () => {
            router.refresh(); // Refresh the current route to reflect changes
        },
    });
};