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
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)

api.interceptors.response.use(
    res => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 &&
            !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    token: localStorage.getItem("refreshToken"),
                });

                if (response.status === 200) {
                    const { token, refreshToken } = response.data.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("refreshToken", refreshToken);
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }
            } catch (error) {
                console.error("Refresh token failed:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login"; // Redirect to login page
            }
        }
        return Promise.reject(error);
    }
)

export default api;
