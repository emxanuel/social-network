import axios from "axios";
const base = 'http://192.168.8.147'
const wsBase = 'ws://192.168.8.147'
export const server = `${base}/api`
export const wsServer = `${wsBase}:81`
export const Axios = axios.create({
    baseURL: server
})