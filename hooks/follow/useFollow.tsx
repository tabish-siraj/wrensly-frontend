import { useMutation, useQuery } from "@tanstack/react-query";
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

// Hook to get followers by username
export const useGetFollowers = (username: string) => {
    const { data: followers, isLoading: loading, isError: error } = useQuery({
        queryKey: ["followers"],
        queryFn: async () => {
            const response = await api.get(`/follow/followers/${username}`);
            return response.data;
        },
    });
    return { followers, loading, error };
};


export const useGetFollowings = (username: string) => {
    const { data: following, isLoading: loading, isError: error } = useQuery({
        queryKey: ["following"],
        queryFn: async () => {
            const response = await api.get(`/follow/following/${username}`);
            return response.data;
        },
    });
    return { following, loading, error };
};
