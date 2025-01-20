import axios from "axios";

const API_URL =
  import.meta.env.REACT_APP_API_URL ?? "http://localhost:3000/api";

export const userFetchClient = axios.create({
  baseURL: API_URL,
});

userFetchClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

userFetchClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  },
);
