import { useEffect, useState } from 'react'
import { answerRequest, getRequests } from '../functions/users.functions'
import { UserData, useUserContext } from './UserContext'
import style from '../css/requests.module.css'

const Requests = () => {
    const user = useUserContext();
    const [requests, setRequests] = useState<UserData[]>([{
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birthdate: "",
        gender: "",
        profile_picture: "",
        is_active: false,
    }])
    useEffect(() => {
        getRequests(user.id, setRequests)
    }, [user.id])
    return (
        <div className={style.container}>
            <h1 className={style.title}>friends requests</h1>
            {requests[0].id !== 0? (
                requests.map((request => (
                    <div key={request.id} className={style.request}>
                        <p>{request.first_name} {request.last_name}</p>
                        <div className={style.buttons}>
                            <button onClick={() => {
                                answerRequest(request.id, user.id, 'accepted', undefined, undefined, setRequests)
                            }} ><i className='fa-solid fa-check' /></button>
                            <button onClick={() => {
                                answerRequest(request.id, user.id, 'declined', undefined, undefined, setRequests)
                            }}><i className='fa-solid fa-x' /></button>
                        </div>
                    </div>
                )))
            ) : (
                <h1>no requests</h1>
            )}
        </div>
    )
}

export default Requests