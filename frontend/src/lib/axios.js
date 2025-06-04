import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE==="development" ? "http://localhost:5001/api" : "/api",
    withCredentials: true, // in order to send cookies with every request
})