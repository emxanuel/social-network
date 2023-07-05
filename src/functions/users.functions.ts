import { Axios } from '../backend'
import React from 'react'
import { UserData } from "../components/UserContext"

const register = async (user: object, setMessage: React.Dispatch<React.SetStateAction<{text: string}>>) => {
    setMessage({text: 'registering...'})
        try{
            const request = await Axios.post('/users', user)

            if(request.status === 200){
                setMessage({text: 'register succesful'})
            }
        }
        catch (e: any){
            if(e.response.data.code === 'ER_DUP_ENTRY'){
                var text: string = 'there is already an account with that email'
                setMessage({text: text});
            }
        }
}

const getUserById = async (id: number, setUser: React.Dispatch<React.SetStateAction<{}>>) => {
    const request = await Axios.get(`/users/${id}`);
    if(request.status === 200){
        setUser(request.data[0])
        localStorage.setItem("User", JSON.stringify (request.data[0]))
    }
}

const login = async (user: {email: string, password: string}, 
    setId: React.Dispatch<React.SetStateAction<number>>, 
    setUser: React.Dispatch<React.SetStateAction<{}>>) => {
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
    setMessage: React.Dispatch<React.SetStateAction<string>>) => {
    const request = await Axios.post('/users/request', {
        requester: requester,
        requested: requested,
        requestDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })

    if (request.status === 200){
        setMessage('request sended')
    }
}

const verifyRequest = async (user1: number, user2: number) => {
    let state = -1;
    const request = await Axios.get(`/users/request/${user1}/${user2}`);

    if(request.status === 200){
        request.data[0][0][0].state !== null? state = request.data[0][0][0].state : state = state
    }
    
    return state
}


export { 
    register,
    login,
    getFriends,
    getFriend,
    searchUsers,
    verifyFriend,
    sendFriendRequest,
    verifyRequest
}