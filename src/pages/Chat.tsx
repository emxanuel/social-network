import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFriend } from '../functions/users.functions'
import { UserData, useUserContext } from '../components/UserContext'
import style from '../css/chat.module.css'
import { getChats, scrollDown, sendMessage, ws } from '../functions/chat.functions'
import Message, { message } from '../components/Message'
import Contacts from './Contacts'
import { useThemeContext } from '../components/Theme'
import ChatSkeleton from '../components/ChatSkeleton'

const Chat = () => {
    const theme = useThemeContext();
    const user = useUserContext();
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [canSend, setCanSend] = useState(false)
    const [loading, setLoading] = useState(true)
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
        country: '',
        interests: []
    })
    const params = useParams()
    useEffect(() => {
        if (params.friend) {
            getFriend(parseInt(params.friend), setFriend)
        }
    }, [params.friend])

    useEffect(() => {
        if (friend) {
            getChats(user.id, friend.id, setChat, setLoading)
        }
    }, [friend, user.id])

    ws.onmessage = () => {
        getChats(user.id, friend.id, setChat)
    }

    return (
        <div className={`${style.container} ${theme.theme === 'dark' ? style.dark : style.light}`}>
            <div className={`${style.contacts} overflow-y-scroll h-full`}>
                <Contacts />
            </div>
            <div className={style.secondDiv}>
                <div id={style.chatHeader}>
                    <i className="fa-solid fa-arrow-left" onClick={() => navigate('/contacts')} />
                    <h1 className={style.friendName}>{friend.first_name} {friend.last_name}</h1>
                </div>
                {loading ? (
                    <ChatSkeleton />
                ) : (
                    <div className={style.chatContainer} id='chatContainer'>
                        {chats ? (
                            chats.map(message => (
                                <Message
                                    key={message.id}
                                    className={message.sender === user.id ? style.sended : style.received}
                                    info={message}
                                />
                            ))
                        ) : (
                            <h1>no messages yet</h1>
                        )}
                    </div>
                )}
                <div className={style.inputs}>
                    <textarea id='inputMessages' className={style.input} placeholder='write a message'
                        onChange={e => {
                            setMessage(e.currentTarget.value)
                            if (e.currentTarget.value.trim().length === 0) {
                                setCanSend(false);
                            }
                            else {
                                setCanSend(true)
                            }
                        }} />
                    <input id='sendButton' className={style.button} type="button" value="Send"
                        onClick={async () => {
                            if (canSend == true) {
                                if (params.friend) {
                                    sendMessage(message, user.id, parseInt(params.friend), setChat)
                                    const inputMessages = document.getElementById('inputMessages') as HTMLInputElement;
                                    inputMessages.value = '';
                                }
                                scrollDown()
                            }
                        }} />
                </div>
            </div>
        </div>
    )
}

export default Chat