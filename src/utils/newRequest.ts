import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

const base_url: string = import.meta.env.VITE_BASE_URL ?? "";
const finalUrl: string = `${base_url}/api/v1`;

interface CustomAxiosConfig extends AxiosRequestConfig {
  withCredentials: true;
  headers: {
    Accept: "application/json";
    "Content-Type": "application/json";
    [key: string]: string;
  };
}

export const newRequest: AxiosInstance = axios.create({
  baseURL: finalUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
} as CustomAxiosConfig);
