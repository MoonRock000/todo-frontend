import axios from "axios";
import { getToken } from "../storage/sessionStorage";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);