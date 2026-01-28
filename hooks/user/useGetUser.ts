"use client";

import api from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useUserByUsername(username: string) {
    const { data: userResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["userByUsername", username],
        queryFn: async () => {
            const response = await api.get(`/user/username/${username}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch user");
            }

            return response.data;
        },
        enabled: !!username,
    });

    return {
        user: userResponse?.data,
        loading,
        error,
        meta: userResponse?.meta
    };
}

export function useUserByEmail(email: string) {
    const { data: userResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["userByEmail", email],
        queryFn: async () => {
            const response = await api.get(`/user/email/${email}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch user");
            }

            return response.data;
        },
        enabled: !!email,
    });

    return {
        user: userResponse?.data,
        loading,
        error,
        meta: userResponse?.meta
    };
}

export function useUserById(id: string) {
    const { data: userResponse, isLoading: loading, isError: error } = useQuery({
        queryKey: ["userById", id],
        queryFn: async () => {
            const response = await api.get(`/user/${id}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch user");
            }

            return response.data;
        },
        enabled: !!id,
    });

    return {
        user: userResponse?.data,
        loading,
        error,
        meta: userResponse?.meta
    };
}