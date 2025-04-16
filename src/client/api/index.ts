import axios from "axios";
const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8082",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
    },
});
axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) {
        config.headers = {}; // Initialize headers if undefined
    }
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    return config;
});
