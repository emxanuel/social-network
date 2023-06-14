import axios from "axios";
const base = 'http://localhost'
const wsBase = 'ws://localhost'
export const server = `${base}/api`
export const wsServer = `${wsBase}:81`
export const Axios = axios.create({
    baseURL: server
})