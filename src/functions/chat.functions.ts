import axios from "axios"
import { message } from "../components/Message";

const getChats = async (sender: number, recipient: number,
    setChat: React.Dispatch<React.SetStateAction<message[]>>) => {
        const request = await axios.get(`http://localhost/api/chat/${sender}/${recipient}`);
        if (request.status === 200){
            setChat(request.data)
            console.log(request.data)
        }
}

export { getChats    }