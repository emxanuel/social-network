import { Axios, /*wsServer*/ } from "../backend";
import { message } from "../components/Message";
let websocket: WebSocket;

// const wsConnect = () => {
//     websocket = new WebSocket(wsServer);

//     websocket.onopen = function(){
//         console.log('websocket open')
//     }
//     websocket.onmessage = function(){
//         console.log('message received')
        
//     }
//     websocket.onclose = function(){
//         console.log('websocket close');
//         setTimeout(() => {
//             wsConnect();
//         }, 2000)
//     }
//     websocket.onerror = function(ev){
//         console.log('error: ' + ev)
//     }
// }

// function init(){
//     wsConnect()
// }

const getChats = async (sender: number, recipient: number,
    setChat: React.Dispatch<React.SetStateAction<message[]>>) => {
        const request = await Axios.get(`/chat/${sender}/${recipient}`);
        if (request.status === 200){
            setChat(request.data)
        }
        scrollDown();
}

const sendMessage = async (message: string, sender: number, recipient: number,
    setChat: React.Dispatch<React.SetStateAction<message[]>>) => {
        let date = new Date();
        const request = await Axios.post(`/chat/${sender}/${recipient}`, {
            content: message,
            dateSent: date.toISOString().slice(0, 19).replace('T', ' ')
        })
        if (request.status === 200){
            getChats(sender, recipient, setChat)
            websocket.send(JSON.stringify({
                content: message,
                dateSent: date.toISOString().slice(0, 19).replace('T', ' '),
                sender: sender,
                recipient: recipient
            }))
            scrollDown()
        }else{
            console.log(request.statusText)
        }
}

const scrollDown = () => {
    const div = document.getElementById('chatContainer') as HTMLElement;
    div.scrollTop = div.scrollHeight
}

export { getChats, sendMessage, scrollDown }