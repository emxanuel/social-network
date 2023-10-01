import { useEffect, useState } from 'react'
import { answerRequest, getRequests } from '../functions/users.functions'
import { UserData, useUserContext } from '../components/UserContext'
import style from '../css/requests.module.css'
import { useThemeContext } from '../components/Theme'

const Requests = () => {
    const user = useUserContext();
    const theme = useThemeContext()
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
        <div className={`${style.container} ${theme.theme === 'dark'? style.dark : style.light}`}>
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
                <h2 className={style.text}>no requests</h2>
            )}
        </div>
    )
}

export default Requests