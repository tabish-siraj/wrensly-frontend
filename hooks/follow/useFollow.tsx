import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useRouter } from "next/navigation"; // useRouter from next/navigation for app directory


export const useFollowUnfollow = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (credentials: { following: string; operation: string; }) => {
            const response = await api.post("/follow", credentials);

            if (!response.data.success) {
                throw new Error(response.data.message || "Follow operation failed");
            }

            return response.data;
        },
        onSuccess: () => {
            router.refresh(); // Refresh the current route to reflect changes
        },
    });
};

// Hook to get followers by username
export const useGetFollowers = (username: string) => {
    const { data: followersResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["followers", username],
        queryFn: async () => {
            const response = await api.get(`/follow/followers/${username}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch followers");
            }

            return response.data;
        },
    });

    return {
        followers: followersResponse?.data || [],
        loading,
        error,
        meta: followersResponse?.meta
    };
};


export const useGetFollowings = (username: string) => {
    const { data: followingResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["following", username],
        queryFn: async () => {
            const response = await api.get(`/follow/following/${username}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch following");
            }

            return response.data;
        },
    });

    return {
        following: followingResponse?.data || [],
        loading,
        error,
        meta: followingResponse?.meta
    };
};
