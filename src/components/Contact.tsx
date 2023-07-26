import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/contact.module.css'
import { UserData, useUserContext } from './UserContext';
import { getLastMessage, ws } from '../functions/chat.functions';
import { message } from './Message';

const Contact = (props: { friend: UserData }) => {
    const regex = /^(\d{2}:\d{2})(:\d{2})? (AM|PM)$/;
    const navigate = useNavigate();
    const user = useUserContext();
    const [lastMessage, setLastMessage] = useState<message>({
        id: 0,
        sender: 0,
        recipient: 0,
        content: '',
        date_sent: ''
    })

    useEffect(() => {
        getLastMessage(user.id, props.friend.id, setLastMessage)
    }, [user.id, props.friend])

    useEffect(() => {
        ws.onmessage = () => {
            getLastMessage(user.id, props.friend.id, setLastMessage)
        }
    })

    return (
        <div key={props.friend.id}>
            <button className={styles.contact}
                onClick={async () => { await navigate('/chat/' + props.friend.id) }}>
                <p className={styles.contactName}>{props.friend.first_name} {props.friend.last_name}</p>
                <p className={styles.lastMessage}>{lastMessage.content} <span>{
                    new Date(lastMessage.date_sent).getDay() === new Date().getDay() ? (
                        new Date(lastMessage.date_sent).toLocaleTimeString('en-us').replace(regex, '$1 $3')
                    ) : (
                        new Date(lastMessage.date_sent).toLocaleDateString()
                    )
                }</span></p>
            </button>
        </div>
    )
}

export default Contact