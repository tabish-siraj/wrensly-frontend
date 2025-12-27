import axios from "axios";
import env from "@/env";
import { logApiRequest, logApiResponse, logError } from "@/lib/logger";

const API_BASE_URL = env['API_BASE_URL'];

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        // Log API requests
        logApiRequest(config.method?.toUpperCase() || 'UNKNOWN', config.url || '');

        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        logError('API Request Error', error, { component: 'API', action: 'request' });
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        // Log successful API responses
        logApiResponse(
            response.config.method?.toUpperCase() || 'UNKNOWN',
            response.config.url || '',
            response.status,
            true
        );
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Log API errors
        logApiResponse(
            originalRequest?.method?.toUpperCase() || 'UNKNOWN',
            originalRequest?.url || '',
            error.response?.status || 0,
            false
        );

        // Add null check to prevent crashes
        if (!error.response || !originalRequest) {
            logError('API Error: No response or config', error, { component: 'API' });
            return Promise.reject(error);
        }

        if ((error.response.status === 401 || error.response.status === 403) &&
            !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                if (typeof window === 'undefined') {
                    return Promise.reject(error);
                }

                const refresh_token = localStorage.getItem("refresh_token");
                if (!refresh_token) {
                    throw new Error("No refresh token available");
                }

                logApiRequest('POST', '/auth/token/refresh');
                const response = await axios.post(`${API_BASE_URL}/auth/token/refresh`, {
                    token: refresh_token,
                });

                if (response.status === 200 && response.data.success) {
                    const { token, refresh_token } = response.data.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("refresh_token", refresh_token);
                    originalRequest.headers.Authorization = `Bearer ${token}`;

                    logApiResponse('POST', '/auth/token/refresh', 200, true);
                    return api(originalRequest);
                } else {
                    throw new Error(response.data.message || "Token refresh failed");
                }
            } catch (refreshError) {
                logError('Token refresh failed', refreshError, { component: 'API', action: 'token_refresh' });

                if (typeof window !== 'undefined') {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/auth/login";
                }
                return Promise.reject(refreshError);
            }
        }

        logError('API Error', error, {
            component: 'API',
            metadata: {
                status: error.response?.status,
                url: originalRequest?.url,
                method: originalRequest?.method
            }
        });

        return Promise.reject(error);
    }
)

export default api;
