import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFriend } from '../functions/users.functions'
import { UserData, useUserContext } from './UserContext'
import style from '../css/chat.module.css'
import { getChats, sendMessage, ws } from '../functions/chat.functions'
import Message, { message } from './Message'
import Contacts from './Contacts'
import { useThemeContext } from './Theme'

const Chat = () => {
    const regex = /^(\d{2}:\d{2})(:\d{2})? (AM|PM)$/;
    const theme = useThemeContext();
    const user = useUserContext();
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [canSend, setCanSend] = useState(false)
    const [chats, setChat] = useState<message[]>([{
        id: 0,
        sender: 0,
        recipient: 0,
        content: '',
        date_sent: ''
    }])
    const [friend, setFriend] = useState<UserData>({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birthdate: "",
        gender: "",
        profile_picture: "",
        is_active: false,
    })
    const params = useParams()
    useEffect(() => {
        if (params.friend){
            getFriend(parseInt(params.friend), setFriend)
        }
    }, [params.friend])

    useEffect(() => {
        if (friend){
            getChats(user.id, friend.id, setChat)
        }
    }, [friend, user.id])

    // ws.addEventListener('message', () => {
    //     console.log('1')
    //     getChats(user.id, friend.id, setChat)
    // })

    useEffect(() => {
        ws.onmessage = () => {
            getChats(user.id, friend.id, setChat)
        }
    })



    return (
        <div className={`${style.container} ${theme === 'dark'? style.dark : style.light}`}>
            <div className={style.contacts}>
                <Contacts />
            </div>
            <nav>
                <div id={style.chatHeader}>
                    <i className="fa-solid fa-arrow-left" onClick={() => navigate('/contacts')} />
                    <h1 className={style.friendName}>{friend.first_name} {friend.last_name}</h1>
                </div>
                <div className={style.chatContainer} id='chatContainer'>
                    {chats? (
                        chats.map(message => (
                            <Message 
                                key={message.id}
                                class={message.sender === user.id? style.sended : style.received}
                                content={message.content}
                                date_sent={`${new Date(message.date_sent).toLocaleTimeString('en-us').replace(regex, '$1 $3')}`}
                            />
                        ))
                    ) : (
                        <h1>no messages yet</h1>
                    )}
                </div>
                <div className={style.inputs}>
                    <textarea autoFocus id='inputMessages' className={style.input} placeholder='write a message' 
                    onChange={e => {
                        setMessage(e.currentTarget.value)
                        console.log(message)
                        if (e.currentTarget.value.trim().length === 0){
                            setCanSend(false);
                        }
                        else{
                            setCanSend(true)
                        }
                    }} />
                    <input id='sendButton' className={style.button} type="button" value="Send"
                    onClick={() => {
                        if (canSend == true){
                            if (params.friend){
                                sendMessage(message, user.id, parseInt(params.friend), setChat)
                                const inputMessages = document.getElementById('inputMessages') as HTMLInputElement;
                                inputMessages.value = '';
                                
                            }
                        }
                    }} />
                </div>
            </nav>
        </div>
    )
}

export default Chat