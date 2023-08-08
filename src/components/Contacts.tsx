import { useState, useEffect } from 'react'
import { getFriends } from '../functions/users.functions';
import { UserData, useUserContext } from './UserContext';
import styles from '../css/contact.module.css'
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from './Theme';
import Contact from './Contact';
import ContactSkeleton from './ContactSkeleton';


const Contacts = (props?: { outChat?: boolean }) => {
    const user = useUserContext();
    const theme = useThemeContext()
    const navigate = useNavigate()
    const [friends, setFriends] = useState<[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    getFriends(user.id, setFriends, setLoading)
    }, [user.id])
    
    if (user.id === 0) {
        navigate('/')
        return <h1></h1>
    }
    return (
        <div className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
            {loading ? (
                <div className={styles.contactsContainer}>
                    <h1>Contacts</h1>
                    <div className={styles.loadingContainer}>
                        <ContactSkeleton />
                        <ContactSkeleton />
                        <ContactSkeleton />
                        <ContactSkeleton />
                        <ContactSkeleton />
                        <ContactSkeleton />
                        <ContactSkeleton />
                    </div>
                </div>
            ) : (
                <div className={styles.contactsContainer}>
                    <h1>Contacts</h1>
                    {friends !== null ? (
                        friends.map((friend: UserData) => {
                            return (
                                <Contact
                                    key={friend.id}
                                    friend={friend}
                                />
                            )
                        })
                    ) : <h1>No friends</h1>}
                </div>
            )}
            {props?.outChat ? (
                props.outChat ? (
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