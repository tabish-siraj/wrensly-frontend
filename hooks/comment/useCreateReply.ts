import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export function useCreateReply({
    screen,
    root_post_id,
    onSuccess
}: {
    screen: string;
    root_post_id: string;
    onSuccess?: () => void;
}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content, parent_comment_id }: { content: string; parent_comment_id: string }) => {
            const response = await api.post(`/post/${parent_comment_id}/comment`, { content });

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to create reply");
            }

            return response.data;
        },
        onSuccess: () => {
            // Invalidate the comments query to refresh the list
            queryClient.invalidateQueries({ queryKey: ["comments", root_post_id] });

            // Invalidate general queries
            queryClient.invalidateQueries({ queryKey: [screen] });
            queryClient.invalidateQueries({ queryKey: ["infinite-feed"] });

            toast.success("Reply posted!");

            // Call the custom onSuccess callback
            if (onSuccess) {
                onSuccess();
            }
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to post reply");
        },
    });
}