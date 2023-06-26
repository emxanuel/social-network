import axios from "axios";
const base = 'https://my-api-rest.onrender.com'
export const wsServer = 'wss://my-api-rest.onrender.com'
export const server = `${base}/api`
export const Axios = axios.create({
    baseURL: server
})