import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useRouter } from "next/navigation"; // useRouter from next/navigation for app directory
import { User } from "@/src/schema";
import useUserStore from "@/src/stores/userStore";

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
        onSuccess: async () => {
            // onSuccess, run an api call to the user/me endpoint
            const user = await api.get("/user/me");
            useUserStore.getState().setUser(user.data.data); // use the store's setUser action
            router.refresh();
        },
    });
};