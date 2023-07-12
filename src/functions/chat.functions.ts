import React from "react";
import { Axios, wsServer } from "../backend";
import { message } from "../components/Message";
export let ws: WebSocket;

const init = () => {
    ws = new WebSocket(wsServer)
    ws.onopen = () => {
        console.log('connected')
    }
    ws.onclose = () => {
        setTimeout(() => {
            ws = new WebSocket(wsServer)
        }, 2000);
    }
}

const getChats = async (sender: number, recipient: number,
    setChat: React.Dispatch<React.SetStateAction<message[]>>) => {
        const request = await Axios.get(`/chat/${sender}/${recipient}`);
        if (request.status === 200){
            await setChat(request.data)
        }
        scrollDown();
}

const sendMessage = async (message: string, sender: number, recipient: number,
    setChat: React.Dispatch<React.SetStateAction<message[]>>) => {
        const date = new Date();
        console.log(date)
        const request = await Axios.post(`/chat/${sender}/${recipient}`, {
            content: message,
            dateSent: date.toISOString().slice(0, 19).replace('T', ' ')
        })
        if (request.status === 200){
            ws.send('message sent')
            await getChats(sender, recipient, setChat)
            scrollDown()
        }else{
            console.log(request.statusText)
        }
}

const getLastMessage = async (sender: number, recipient: number, setLastMessage: 
    React.Dispatch<React.SetStateAction<message>>) => {
        
        const request = await Axios.get(`/chat/${sender}/${recipient}/lastmessage`)
        if (request.status === 200){
            setLastMessage(request.data)
        }else{
            console.log(request.statusText);
        }
}

const scrollDown = () => {
    const div = document.getElementById('chatContainer') as HTMLElement;
    div.scrollTop = div.scrollHeight
}

window.addEventListener('load', init, false)

export { getChats, sendMessage, scrollDown, getLastMessage }