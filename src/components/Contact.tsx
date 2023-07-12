import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/contact.module.css'
import { UserData, useUserContext } from './UserContext';
import { getLastMessage } from '../functions/chat.functions';
import { message } from './Message';

const Contact = (props: { friend: UserData }) => {
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

    return (
        <div key={props.friend.id}>
            <button className={styles.contact}
                onClick={async () => { await navigate('/chat/' + props.friend.id) }}>
                <p className={styles.contactName}>{props.friend.first_name} {props.friend.last_name}</p>
                <p className={styles.lastMessage}>{lastMessage.content} <span>{
                    new Date(lastMessage.date_sent.slice(0, 19).replace('T', ' ')).getDay() === new Date().getDay() ? (
                        lastMessage.date_sent.slice(11, 16)
                    ) : (
                        new Date(lastMessage.date_sent.slice(0, 19).replace('T', ' ')).toLocaleDateString()
                    )
                }</span></p>
            </button>
        </div>
    )
}

export default Contact