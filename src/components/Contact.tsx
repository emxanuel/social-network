import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/contact.module.css'
import { UserData, useUserContext } from './UserContext';
import { getLastMessage, ws } from '../functions/chat.functions';
import { message } from './Message';
import { sendNotification } from '../functions/notifications';
import { getProfilePhoto } from '../functions/users.functions';

const Contact = (props: { friend: UserData }) => {
    const navigate = useNavigate();
    const user = useUserContext();
    const [loading, setLoading] = useState(true)
    const [profilePicture, setProfilePicture] = useState('')
    const [lastMessage, setLastMessage] = useState<message>({
        id: 0,
        sender: 0,
        recipient: 0,
        content: '',
        date_sent: ''
    })
    useEffect(() => {
        getLastMessage(user.id, props.friend.id, setLastMessage, setLoading)
        getProfilePhoto(props.friend.profile_picture, setProfilePicture)
    }, [user.id, props.friend])

    ws.onmessage = () => {
        getLastMessage(user.id, props.friend.id, setLastMessage)
        sendNotification(`You have a new message from ${props.friend.first_name} ${props.friend.last_name}`)
    }

    const message = lastMessage.content.length <= 20 ? lastMessage.content : lastMessage.content.slice(0, 17).concat('...')

    return (
        <div key={props.friend.id}>
            <button className={`${styles.contact} py-2 items-center gap-2`}
                onClick={() => { navigate('/chat/' + props.friend.id) }}>
                <img className='w-10 rounded-full aspect-square object-cover' src={profilePicture} alt="profile picture" />
                <div className='w-full'>
                    <p className={styles.contactName}>{props.friend.first_name} {props.friend.last_name}</p>
                    {loading ? (
                        <div></div>
                    ) : (
                        <p className={styles.lastMessage}>{(lastMessage.sender === user.id ? `You: ${message}` : message)} <span>{lastMessage.content.length !== 0? (
                            new Date(lastMessage.date_sent).getDay() === new Date().getDay() ? (
                                new Date(lastMessage.date_sent).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                            ) : (
                                new Date(lastMessage.date_sent).toLocaleDateString()
                            ) 
                        ) : ''}</span></p>
                    )}
                </div>
            </button>
        </div>
    )
}

export default Contact
