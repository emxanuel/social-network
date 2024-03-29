import { useEffect, useState } from 'react'
import { UserData, useUserContext } from '../components/UserContext'
import { answerRequest, getFriend, getProfilePhoto, sendFriendRequest, verifyFriend, verifyRequest } from '../functions/users.functions';
import { useParams, Link } from 'react-router-dom';
import styles from '../css/profile.module.css'
import { useThemeContext } from '../components/Theme';

const Profile = () => {
    const params = useParams()
    const theme = useThemeContext()
    const user = useUserContext();
    const [loading, setLoading] = useState(true)
    const [requestStatus, setRequestStatus] = useState(-1)
    const [isFriend, setIsFriend] = useState(false);
    const [profilePicture, setProfilePicture] = useState('')
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
    });

    useEffect(() => {
        if (params.id && parseInt(params.id) !== user.id) {
            getFriend(parseInt(params.id), setFriend, setLoading)
            getProfilePhoto(friend.profile_picture, setProfilePicture)
        }
        else{
            getProfilePhoto(user.profile_picture, setProfilePicture)
        }
    }, [params.id, user.id])

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
        <div className={`${styles.container} ${theme.theme === 'dark' ? styles.dark : styles.light}`}>
            {
                params.id !== user.id.toString() ? (
                    <div >
                        {!loading ? (friend.id !== 0 ? (
                            <div>
                                <h1>{friend.first_name} {friend.last_name}</h1>
                                <div className={styles.header}>
                                    {isFriend ? (
                                        <Link to={`/chat/${friend.id}`}>Lets chat with {friend.first_name}</Link>
                                    ) : requestStatus == 0 ? (
                                        <button>
                                            request sended
                                        </button>
                                    ) : requestStatus == 1 ? (
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
                        )) : (
                            <div>
                                Loading...
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='md:px-40 py-10'>
                        <div className='flex items-center gap-2 md:gap-5'>
                            <img className='aspect-square object-cover rounded-full w-12 md:w-20' src={profilePicture} alt="" />
                            <h1 className='text-sm md:text-lg'>{user.first_name} {user.last_name}</h1>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default Profile