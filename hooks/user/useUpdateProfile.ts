import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useRouter } from "next/navigation"; // useRouter from next/navigation for app directory
import { User } from "@/src/schema";

type UpdateProfileArgs = {
    id: string;
    payload: User;
};

export const useUpdateProfile = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async ({ id, payload }: UpdateProfileArgs) => {
            console.log(payload)
            const response = await api.put(`/user/${id}`, payload);
            console.log(JSON.stringify(response))
        },
        onSuccess: () => {
            router.refresh();
        },
    });
};