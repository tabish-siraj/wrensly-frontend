"use client";

import api from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useUserByUsername(username: string) {
    const { data: user, isLoading: loading, isError: error } = useQuery({
        queryKey: ["userByUsername"],
        queryFn: async () => {
            const response = await api.get(`/user/username/${username}`);
            return response.data;
        },
    });

    return { user, loading, error };
}

export function useUserByEmail(email: string) {
    const { data: user, isLoading: loading, isError: error } = useQuery({
        queryKey: ["userByEmail"],
        queryFn: async () => {
            const response = await api.get(`/user/email/${email}`);
            return response.data;
        },
    });

    return { user, loading, error };
}

export function useUserByid(id: string) {
    const { data: user, isLoading: loading, isError: error } = useQuery({
        queryKey: ["userById"],
        queryFn: async () => {
            const response = await api.get(`/user/${id}`);
            return response.data;
        },
    });

    return { user, loading, error };
}