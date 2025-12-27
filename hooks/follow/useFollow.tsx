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
    console.log("useGetFollowers called with username:", username);
    console.log("Username is truthy:", !!username);

    const { data: followersResponse, isLoading: loading, isError: isErrorState, error: queryError } = useQuery({
        queryKey: ["followers", username],
        queryFn: async () => {
            console.log("Fetching followers for username:", username);
            const response = await api.get(`/follow/followers/${username}`);
            console.log("Followers API response:", response);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch followers");
            }

            return response.data;
        },
        enabled: !!username,
        retry: 1, // Only retry once to avoid spam
    });

    console.log("useGetFollowers result:", {
        followersResponse,
        loading,
        isErrorState,
        queryError: queryError?.message || queryError?.toString() || queryError
    });

    return {
        followers: followersResponse || { data: [] },
        loading,
        error: isErrorState,
        meta: followersResponse?.meta
    };
};

export const useGetFollowings = (username: string) => {
    console.log("useGetFollowings called with username:", username);
    console.log("Username is truthy:", !!username);

    const { data: followingResponse, isLoading: loading, isError: isErrorState, error: queryError } = useQuery({
        queryKey: ["following", username],
        queryFn: async () => {
            console.log("Fetching following for username:", username);
            const response = await api.get(`/follow/following/${username}`);
            console.log("Following API response:", response);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch following");
            }

            return response.data;
        },
        enabled: !!username,
        retry: 1, // Only retry once to avoid spam
    });

    console.log("useGetFollowings result:", {
        followingResponse,
        loading,
        isErrorState,
        queryError: queryError?.message || queryError?.toString() || queryError
    });

    return {
        following: followingResponse || { data: [] },
        loading,
        error: isErrorState,
        meta: followingResponse?.meta
    };
};
