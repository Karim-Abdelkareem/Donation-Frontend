import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_HOST,
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
});
