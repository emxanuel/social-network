import React, { useEffect, useState } from 'react'
import { UserData, useUserContext } from './UserContext'
import { getFriend, sendFriendRequest, verifyFriend } from '../functions/users.functions';
import { useParams, Link } from 'react-router-dom';
import styles from '../css/profile.module.css'

const Profile = () => {
    const params = useParams()
    const user = useUserContext();
    const [message, setMessage] = useState('Send friend request');
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

    return (
        <div className={styles.container}>
            {friend.id !== 0? (
                <div>
                    <h1>{friend.first_name} {friend.last_name}</h1>
                    {isFriend? (
                        <Link to={`/chat/${friend.id}`}>Lets chat with {friend.first_name}</Link>
                    ) : (
                        <button onClick={async () => {
                            await sendFriendRequest(user.id, friend.id, setMessage)
                        }}>{message}</button>
                    )}
                </div>
            ) : (
                <h1>User not found</h1>
            )}
        </div>
    )
}

export default Profile