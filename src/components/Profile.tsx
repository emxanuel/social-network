import { useEffect, useState } from 'react'
import { UserData, useUserContext } from './UserContext'
import { answerRequest, getFriend, sendFriendRequest, verifyFriend, verifyRequest } from '../functions/users.functions';
import { useParams, Link } from 'react-router-dom';
import styles from '../css/profile.module.css'
import { useThemeContext } from './Theme';

const Profile = () => {
    const params = useParams()
    const theme = useThemeContext()
    const user = useUserContext();
    const [requestStatus, setRequestStatus] = useState(-1)
    const [isFriend, setIsFriend] = useState(false);
    const [friend, setFriend] = useState<UserData>({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birthdate: "",
        gender: "",
        profile_picture: "",
        is_active: false
    });

    useEffect(() => {
        if (params.id){
            getFriend(parseInt(params.id), setFriend)
        }
    }, [params.id])

    useEffect(() => {
        (async () => {
            const result = await verifyFriend(user.id, friend.id)
            setIsFriend(result)
        })()
    }, [user.id, friend.id])

    useEffect(() => {
        (async () => {
            const result = await verifyRequest(user.id, friend.id)
            setRequestStatus(result)
        })()
    }, [user.id, friend.id])

    return (
        <div className={`${styles.container} ${theme === 'dark'? styles.dark : styles.light}`}>
            {friend.id !== 0? (
                <div>
                    <h1>{friend.first_name} {friend.last_name}</h1>
                    <div className={styles.header}>
                        {isFriend? (
                            <Link to={`/chat/${friend.id}`}>Lets chat with {friend.first_name}</Link>
                        ) : requestStatus == 0? (
                            <button>
                                request sended
                            </button>
                        ) : requestStatus == 1? (
                            <div className={styles.answerContainer}>
                                <p className={styles.answerText}>answer request</p>
                                <div className={styles.divIcons}>
                                    <button className={styles.iconButton} onClick={() => {
                                        answerRequest(friend.id, user.id, 'accepted', setRequestStatus, setIsFriend)
                                    }}><i className='fa-solid fa-check' /></button> 
                                    <button className={styles.iconButton} onClick={() => {
                                        answerRequest(friend.id, user.id, 'declined', setRequestStatus, setIsFriend)
                                    }} ><i className='fa-solid fa-x' /></button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={async () => {
                                await sendFriendRequest(user.id, friend.id, setRequestStatus)
                            }}>send friend request</button>
                        )}
                    </div>
                </div>
            ) : (
                <h1>User not found</h1>
            )}
        </div>
    )
}

export default Profile