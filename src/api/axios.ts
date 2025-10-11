import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});