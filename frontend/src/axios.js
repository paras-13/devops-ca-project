import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const makeRequest = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
