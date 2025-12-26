import axios from "axios";
import env from "@/env";

const API_BASE_URL = env['API_BASE_URL'];

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    }
)

api.interceptors.response.use(
    res => res,
    async (error) => {
        const originalRequest = error.config;

        // Add null check to prevent crashes
        if (!error.response || !originalRequest) {
            return Promise.reject(error);
        }

        if ((error.response.status === 401 || error.response.status === 403) &&
            !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                if (typeof window === 'undefined') {
                    return Promise.reject(error);
                }

                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                const response = await axios.post(`${API_BASE_URL}/auth/token/refresh`, {
                    token: refreshToken,
                });

                if (response.status === 200 && response.data.success) {
                    const { token, refreshToken: newRefreshToken } = response.data.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("refreshToken", newRefreshToken);
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                } else {
                    throw new Error(response.data.message || "Token refresh failed");
                }
            } catch (refreshError) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/auth/login";
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default api;
