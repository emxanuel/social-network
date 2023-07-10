import { useState, useEffect } from 'react'
import { getFriends } from '../functions/users.functions';
import { UserData, useUserContext } from './UserContext';
import styles from '../css/contact.module.css'
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';
import { useThemeContext } from './Theme';
// import { message } from './Message';
// import { getLastMessage } from '../functions/chat.functions';

const Contacts = (props?: {outChat?: boolean}) => {
    const user = useUserContext();
    const theme = useThemeContext()
    const navigate = useNavigate()
    const [friends, setFriends] = useState<[]>([]);
    // const [lastMessage, setLastMessage] = useState<message>({
    //     id: 0,
    //     sender: 0,
    //     recipient: 0,
    //     content: '',
    //     date_sent: ''
    // });
    // let lastMessages:[{
    //     key: number,
    //     prop: string
    // }] = [{key: 0, prop: ''}]
    // const showLastMessage = (recipient: number) => {
    //     getLastMessage(user.id, recipient, setLastMessage);
    //     return lastMessage.content;
    // }

    useEffect(() => {
        getFriends(user.id, setFriends)
    }, [user.id])

    if (user.id === 0){
        navigate('/')
        return <h1></h1>
    }
    return(
        <div className={`${styles.container} ${theme === 'dark'? styles.dark : styles.light}`}>
            <div className={styles.contactsContainer}>
                <h1>Contacts</h1>
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
            {props?.outChat? (
                    props.outChat?(
                        <div className={styles.chatSpace}>
                            <i className="fa-regular fa-message" />
                            <p>start chatting with someone</p>
                        </div>
                ) : (
                    <div></div>
                )
            ) : (
                <div></div>
            )}
        </div>
        
    )
}

export default Contacts