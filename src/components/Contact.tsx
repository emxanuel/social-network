import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/contact.module.css'
import { UserData, useUserContext } from './UserContext';
import { getLastMessage, ws } from '../functions/chat.functions';
import { message } from './Message';

const Contact = (props: { friend: UserData }) => {
    const navigate = useNavigate();
    const user = useUserContext();
    const [loading, setLoading] = useState(true)
    const [lastMessage, setLastMessage] = useState<message>({
        id: 0,
        sender: 0,
        recipient: 0,
        content: '',
        date_sent: ''
    })
    useEffect(() => {
        getLastMessage(user.id, props.friend.id, setLastMessage, setLoading)
    }, [user.id, props.friend])

    ws.onmessage = () => {
        getLastMessage(user.id, props.friend.id, setLastMessage)
    }

    const message = lastMessage.content.length <= 20? lastMessage.content : lastMessage.content.slice(0, 17).concat('...')

    return (
        <div key={props.friend.id}>
            <button className={styles.contact}
                onClick={() => { navigate('/chat/' + props.friend.id) }}>
                <p className={styles.contactName}>{props.friend.first_name} {props.friend.last_name}</p>
                {loading ? (
                    <div></div>
                ) : (
                    <p className={styles.lastMessage}>{lastMessage.sender === user.id ? `You: ${message}` : message} <span>{
                        new Date(lastMessage.date_sent).getDay() === new Date().getDay() ? (
                            new Date(lastMessage.date_sent).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                        ) : (
                            new Date(lastMessage.date_sent).toLocaleDateString()
                        )
                    }</span></p>
                )}
            </button>
        </div>
    )
}

export default Contact