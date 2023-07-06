import { Axios } from '../backend'
import React, { SetStateAction } from 'react'
import { UserData } from "../components/UserContext"

const register = async (user: object, setMessage: React.Dispatch<React.SetStateAction<{text: string}>>) => {
    setMessage({text: 'registering...'})
        let text: string
        try{
            const request = await Axios.post('/users', user)

            if(request.status === 200){
                setMessage({text: 'register succesful'})
            }
        }
        catch (e: any){
            if(e.response.data.code === 'ER_DUP_ENTRY'){
                text = 'there is already an account with that email'
                setMessage({text: text});
            }
        }
}

const getUserById = async (id: number, setUser: React.Dispatch<React.SetStateAction<object>>) => {
    const request = await Axios.get(`/users/${id}`);
    if(request.status === 200){
        setUser(request.data[0])
        localStorage.setItem("User", JSON.stringify (request.data[0]))
    }
}

const login = async (user: {email: string, password: string}, 
    setId: React.Dispatch<React.SetStateAction<number>>, 
    setUser: React.Dispatch<React.SetStateAction<object>>) => {
    try {
        const request = await Axios.post('/login', user);
        if (request.status === 200){
            if (request.data[0]['count(*)'] === 1){
                setId(request.data[0].id);
                await getUserById(request.data[0].id, setUser)
                return true
            }
            else{
                return false;
            }
        }
        else{
            return false
        }
    }
    catch(e: any){
        console.log(e)
    }
}

const getFriends = async (id: number, setFriends: React.Dispatch<React.SetStateAction<[]>>) => {
    const request = await Axios.get(`/users/${id}/friends`);
    if(request.status === 200){
        setFriends(request.data[0][0])
    }
}

const getFriend = async (id: number, setFriend: React.Dispatch<React.SetStateAction<UserData>>) => {
    const request = await Axios.get(`/users/${id}`);
    if (request.status === 200){
        setFriend(request.data[0])
    }
}

const searchUsers = async (name: string, id: number, setResults: React.Dispatch<React.SetStateAction<UserData[]>>) => {
    if (name.trim().length <= 0){
        name = '`'
    }
    const request = await Axios.get(`/users/search/${id}/${name}`);
    if (request.status === 200){
        setResults(request.data)
    }
}

const verifyFriend = async (user1: number, user2: number) => {
    let verify = false;
    const request = await Axios.get(`/users/verify/${user1}/${user2}`);
    if (request.status === 200){
        if (request.data[0]['count(*)'] === 1){
            verify = true;
        }
    }
    return verify;
}

const sendFriendRequest = async (requester: number, requested: number, 
    setRequestStatus: React.Dispatch<React.SetStateAction<number>>) => {
    const request = await Axios.post('/users/request', {
        requester: requester,
        requested: requested,
        requestDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })

    if (request.status === 200){
        setRequestStatus(0)
    }
}

const verifyRequest = async (user1: number, user2: number) => {
    let state = -1;
    const request = await Axios.get(`/users/request/${user1}/${user2}`);

    if(request.status === 200){
        request.data[0][0][0].state !== null? state = request.data[0][0][0].state : state = -1
    }
    
    return state
}

const answerRequest = async (requester: number, requested: number, answer: string,
    setRequestStatus?: React.Dispatch<React.SetStateAction<number>>,
    setIsFriend?: React.Dispatch<React.SetStateAction<boolean>>,
    setRequests?: React.Dispatch<SetStateAction<UserData[]>>) => {
    const request = await Axios.post(`/users/request/${requester}/${requester}`, {
        requester: requester,
        requested: requested,
        answer: answer
    });

    if (request.status === 200){
        if (answer ===  'accepted'){
            if (setIsFriend){
                setIsFriend(true);
            }
            else if(setRequests){
                getRequests(requested, setRequests)
            }
        }
        else if(answer === 'declined'){
            if (setRequestStatus){
                setRequestStatus(-1)
            }
            else if(setRequests){
                getRequests(requested, setRequests)
            }
        }
    }
}

const getRequests = async (id: number, setRequests: React.Dispatch<SetStateAction<UserData[]>>) => {
    const request = await Axios.get(`/users/${id}/requests`);
    if (request.status === 200){
        if(request.data[0][0].length == 0){
            setRequests([{
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
        }
        else{
            setRequests(request.data[0][0])
        }
    }
}


export { 
    register,
    login,
    getFriends,
    getFriend,
    searchUsers,
    verifyFriend,
    sendFriendRequest,
    verifyRequest,
    answerRequest,
    getRequests
}