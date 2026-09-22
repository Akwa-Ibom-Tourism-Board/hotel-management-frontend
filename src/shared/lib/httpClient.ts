import axios, { AxiosError } from "axios";
import { config } from "./config";
import { tokenStorage } from "./storage";
import { ApiError } from "./apiError";

// The backend can reply with a few different failure shapes depending on
// what rejected the request (validation layer, rate limiter, auth guard);
// this normalizes all of them into a single readable string.
const extractErrorMessage = (error: AxiosError): string => {
  const data = error.response?.data as unknown;
  if (typeof data === "string" && data.trim().length > 0) return data;
  if (data && typeof data === "object" && typeof (data as { message?: unknown }).message === "string") {
    return (data as { message: string }).message;
  }
  return error.message || "Something went wrong, please try again.";
};

export const authEvents = new EventTarget();

export const httpClient = axios.create({
  baseURL: config.apiUrl,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((request) => {
  const token = tokenStorage.get();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      tokenStorage.clear();
      authEvents.dispatchEvent(new Event("unauthorized"));
    }
    return Promise.reject(new ApiError(extractErrorMessage(error), error.response?.status));
  },
);
