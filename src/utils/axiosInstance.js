import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8010/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);




