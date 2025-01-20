import axios from "axios";

const API_URL =
  import.meta.env.REACT_APP_API_URL ?? "http://localhost:3000/api";

export const authFetchClient = axios.create({
  baseURL: API_URL,
});
