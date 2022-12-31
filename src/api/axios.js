import axios from "axios";

const BASE_URL = "http://localhost:8000";
export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { 'content-type': 'application/json' }
});