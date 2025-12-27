import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export const useFollowUnfollow = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: { following: string; operation: string; }) => {
            const response = await api.post("/follow", credentials);

            if (!response.data.success) {
                throw new Error(response.data.message || "Follow operation failed");
            }

            return response.data;
        },
        onSuccess: (data) => {
            // Invalidate relevant queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ["userByUsername"] });
            queryClient.invalidateQueries({ queryKey: ["followers"] });
            queryClient.invalidateQueries({ queryKey: ["following"] });
        },
        onError: (error) => {
            console.error("Follow operation failed:", error);
        }
    });
};

// Hook to get followers by username
export const useGetFollowers = (username: string) => {
    const { data: followersResponse, isLoading: loading, isError: isErrorState } = useQuery({
        queryKey: ["followers", username],
        queryFn: async () => {
            const response = await api.get(`/follow/followers/${username}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch followers");
            }

            return response.data;
        },
        enabled: !!username,
        retry: 1,
    });

    return {
        followersResponse: followersResponse,
        loading,
        error: isErrorState,
        meta: followersResponse?.meta
    };
};

export const useGetFollowings = (username: string) => {
    const { data: followingResponse, isLoading: loading, isError: isErrorState } = useQuery({
        queryKey: ["following", username],
        queryFn: async () => {
            const response = await api.get(`/follow/following/${username}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch following");
            }

            return response.data;
        },
        enabled: !!username,
        retry: 1,
    });

    return {
        followingResponse: followingResponse,
        loading,
        error: isErrorState,
        meta: followingResponse?.meta
    };
};
