import { useState, useEffect } from 'react'
import { getFriends } from '../functions/users.functions';
import { UserData, useUserContext } from './UserContext';
import styles from '../css/contact.module.css'
import { useNavigate } from 'react-router-dom';
import { message } from './Message';
import { getLastMessage } from '../functions/chat.functions';

const Contacts = () => {
    const user = useUserContext();
    const navigate = useNavigate()
    const [friends, setFriends] = useState<[]>([]);
    const [lastMessage, setLastMessage] = useState<message>({
        id: 0,
        sender: 0,
        recipient: 0,
        content: '',
        date_sent: ''
    });
    let lastMessages:[{
        key: number,
        prop: string
    }] = [{key: 0, prop: ''}]
    const showLastMessage = (recipient: number) => {
        getLastMessage(user.id, recipient, setLastMessage);
        return lastMessage.content;
    }

    useEffect(() => {
        getFriends(user.id, setFriends)
    }, [])

    if (user.id === 0){
        navigate('/')
        return <h1></h1>
    }
    return(
        <div className={styles.container}>
            <h1>Contacts</h1>
            <div className={styles.contactsContainer}>
                {friends !== null? (
                    friends.map((friend: UserData) => {
                        return (
                            <div key={friend.id}>
                                <button className={styles.contact}
                                onClick={async () => {await navigate('/chat/' + friend.id)}}>
                                    <p className={styles.contactName}>{friend.first_name} {friend.last_name}</p>
                                    <p className={styles.lastMessage}>Last message</p>
                                </button>
                            </div>
                        )
                    })
                ) : <h1>No friends</h1>}
            </div>
        </div>
        
    )
}

export default Contacts