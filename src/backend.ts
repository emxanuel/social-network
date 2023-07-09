import axios from "axios";

const base = import.meta.env.VITE_SERVER
export const wsServer = import.meta.env.VITE_WSSERVER
export const server = `${base}/api`
export const Axios = axios.create({
    baseURL: server
})