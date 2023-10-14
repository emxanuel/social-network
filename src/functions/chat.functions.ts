import React from "react";
import { Axios, wsServer } from "../backend";
import { message } from "../components/Message";
export let ws: WebSocket;

const init = () => {
    ws = new WebSocket(wsServer);
    ws.onopen = () => {
        console.log("connected");
    };
    ws.onclose = () => {
        setTimeout(() => {
            ws = new WebSocket(wsServer);
        }, 2000);
    };
};

const getChats = async (
    sender: number,
    recipient: number,
    setChat: React.Dispatch<React.SetStateAction<message[]>>,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (setLoading) {
        await Axios.get(`/chat/${sender}/${recipient}`)
            .then(async (res) => {
                await setChat(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => setLoading(false));
    } else {
        await Axios.get(`/chat/${sender}/${recipient}`)
            .then(async (res) => {
                await setChat(res.data);
            })
            .catch((e) => console.log(e));
    }
    scrollDown();
};

const sendMessage = async (
    message: string,
    sender: number,
    recipient: number,
    setChat: React.Dispatch<React.SetStateAction<message[]>>
) => {
    const date = new Date().toLocaleString("en-US", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    console.log(new Date(date));
    const request = await Axios.post(`/chat/${sender}/${recipient}`, {
        content: message.trim(),
        dateSent: date,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    if (request.status === 200) {
        ws.send("message sent");
        await getChats(sender, recipient, setChat);
        scrollDown();
    } else {
        console.log(request.statusText);
    }
};

const getLastMessage = async (
    sender: number,
    recipient: number,
    setLastMessage: React.Dispatch<React.SetStateAction<message>>,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (setLoading) {
        setLoading(true);
        await Axios.get(`/chat/${sender}/${recipient}/lastmessage`)
            .then((res) => {
                if(res.data.length === 0){
                    setLastMessage({
                        content: "send first message",
                        date_sent: new Date().toString(),
                        sender: recipient,
                        recipient: sender,
                        id: 0,
                    });
                }
                else{
                    setLastMessage(res.data);
                }
            })
            .catch(() => {
                setLastMessage({
                    content: "send first message",
                    date_sent: new Date().toString(),
                    sender: recipient,
                    recipient: sender,
                    id: 0,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    } else {
        await Axios.get(`/chat/${sender}/${recipient}/lastmessage`)
            .then((res) => {
                setLastMessage(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }
};

const scrollDown = () => {
    const div = document.getElementById("chatContainer") as HTMLElement;
    setTimeout(() => {
        div.scrollTop = div.scrollHeight;
    }, 300);
};

window.addEventListener("load", init, false);

export { getChats, sendMessage, scrollDown, getLastMessage };
