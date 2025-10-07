import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// optional: response interceptor example
axiosClient.interceptors.response.use((res) => res, (err) => {
  // handle global errors
  return Promise.reject(err);
});
