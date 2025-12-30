import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

interface ToggleFollowVariables {
    user_id: string;
    is_following: boolean;
    screen: string;
}

export function useToggleFollow() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ user_id, is_following }: ToggleFollowVariables) => {
            if (is_following) {
                // Unfollow
                const response = await api.delete(`/follow/${user_id}`);

                if (!response.data.success) {
                    throw new Error(response.data.message || "Failed to unfollow user");
                }

                return response.data;
            } else {
                // Follow
                const response = await api.post(`/follow/${user_id}`);

                if (!response.data.success) {
                    throw new Error(response.data.message || "Failed to follow user");
                }

                return response.data;
            }
        },
        onSuccess: (data, variables) => {
            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            queryClient.invalidateQueries({ queryKey: ["followers"] });
            queryClient.invalidateQueries({ queryKey: ["following"] });
            queryClient.invalidateQueries({ queryKey: ["search-users"] });
            queryClient.invalidateQueries({ queryKey: [variables.screen] });
        },
        onError: (error) => {
            console.error('Error toggling follow:', error);
        },
    });
}