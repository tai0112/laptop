import axios from "axios";
import { getJWTLocalStorage } from "../utils/localStorageUtils";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const request = axios.create({
  baseURL: API_BASE_URL,
});

request.interceptors.request.use((config) => {
  const token = getJWTLocalStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login"; // or use React Router navigation
    }
    return Promise.reject(error); // Don't crash
  }
);

export const get = async (url, params = {}) => {
  const response = await request.get(url, { params });
  return response.data;
};

export const post = async (url, data = {}) => {
  const response = await request.post(url, data);
  return response.data;
};

export const put = async (url, data = {}) => {
  const response = await request.put(url, data);
  return response.data;
};

export const del = async (url, params = {}) => {
  const response = await request.delete(url, { params });
  return response.data;
};

export default request;
