import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const excludedUrls = [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/refresh-token",
      "/api/auth/check-email",
    ];

    // if token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !excludedUrls.some((url) => originalRequest.url.includes(url))
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axiosInstance.post("/api/auth/refresh-token");
        // Belajar tentant axios interceptor dan refresh token
        console.log(refreshRes.data);
        const newToken = refreshRes.data.access_token;

        useAuthStore.getState().storeToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); // ulang request
      } catch (err) {
        useAuthStore.getState().clearToken();
        window.location.href = "/check-email";
      }
    }

    return Promise.reject(error);
  }
);
