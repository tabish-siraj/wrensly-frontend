import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { User } from "@/src/schema";
import useUserStore from "@/src/stores/userStore";

type UpdateProfileArgs = {
    id: string;
    payload: User;
};

export const useUpdateProfile = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, payload }: UpdateProfileArgs) => {
            const response = await api.put(`/user/${id}`, payload);
            return response.data;
        },
        onSuccess: async (data) => {
            try {
                // Refresh user data from server
                const userResponse = await api.get("/user/me");
                useUserStore.getState().setUser(userResponse.data.data);

                // Invalidate relevant queries
                queryClient.invalidateQueries({ queryKey: ["user"] });
                queryClient.invalidateQueries({ queryKey: ["profile"] });

                // Refresh the page data
                router.refresh();
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error('Error refreshing user data:', error);
                }
            }
        },
        onError: (error) => {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error updating profile:', error);
            }
        }
    });
};