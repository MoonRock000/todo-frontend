import axios from "axios";
import { getToken } from "../storage/sessionStorage";
import { config } from "../config/apiConfig";

export const apiClient = axios.create(config);

apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = getToken();
      if (token) {
        console.log("token foundd");
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token", error);
      // Optionally, handle the error if needed
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
