import axios from "axios";

const url = {
    http: {
        api: 'http://localhost',
        websocket: 'ws://localhost'
    },
    https: {
        api: 'https://my-api-rest.onrender.com',
        websocket: 'wss://my-api-rest.onrender.com'
    }
}

const base = url.http.api
export const wsServer = url.http.websocket
export const server = `${base}/api`
export const Axios = axios.create({
    baseURL: server
})