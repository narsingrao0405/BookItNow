import axios from "axios";
const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
    //baseURL: "http://localhost:8082",
    headers: {
        "Content-Type": "application/json",
        //"Authorization": token ? `Bearer ${token}` : "",
    },
});
axiosInstance.interceptors.request.use(function (config:any) {
    
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error:any) {
        return Promise.reject(error);
    }
);
