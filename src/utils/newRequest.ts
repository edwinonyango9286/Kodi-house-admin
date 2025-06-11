import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

const base_url: string = import.meta.env.VITE_BASE_URL ?? '';

interface CustomAxiosConfig extends AxiosRequestConfig {
  withCredentials: true;
  timeout: number;
  headers: {
    'Accept': 'application/json';
    'Content-Type': 'application/json';
    [key: string]: string;
  };
}

export const newRequest: AxiosInstance = axios.create({
  baseURL: base_url,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
} as CustomAxiosConfig); 