import { useState, useEffect } from 'react'
import { getFriends } from '../functions/users.functions';
import { UserData, useUserContext } from './UserContext';
import styles from '../css/contact.module.css'
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
    const user = useUserContext();
    const navigate = useNavigate()
    const [friends, setFriends] = useState<[]>([]);
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
                    friends.map((friend: UserData) => (
                        <div key={friend.id}>
                            <button className={styles.contact}
                            onClick={async () => {await navigate('/chat/' + friend.id)}}>
                                <p className={styles.contactName}>{friend.first_name} {friend.last_name}</p>
                                <p className={styles.lastMessage}></p>
                            </button>
                        </div>
                    ))
                ) : <h1>No friends</h1>}
            </div>
        </div>
        
    )
}

export default Contacts