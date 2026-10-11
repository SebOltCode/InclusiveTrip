import axios from "axios";

export const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

// The auth token is an httpOnly cookie, so every request must send credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getErrorMessage = (error) => {
  const data = error?.response?.data;
  if (data?.errors) return data.errors.map((e) => e.message).join(", ");
  return data?.message || error?.message || "Unknown error";
};

export default api;
