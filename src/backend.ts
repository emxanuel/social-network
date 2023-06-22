import axios from "axios";
const base = 'https://my-api-rest.azurewebsites.net'
const wsBase = 'wss://my-api-rest.azurewebsites.net'
export const server = `${base}/api`
export const wsServer = `${wsBase}:81`
export const Axios = axios.create({
    baseURL: server
})