import axios from "axios"
import React from 'react'
import { UserData } from "../components/UserContext"

const register = async (user: object, setMessage: React.Dispatch<React.SetStateAction<{text: string}>>) => {
    setMessage({text: 'registering...'})
        try{
            const request = await axios.post('http://localhost/api/users', user)

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
    const request = await axios.get(`http://localhost/api/users/${id}`);
    if(request.status === 200){
        setUser(request.data[0])
        localStorage.setItem("User", JSON.stringify (request.data[0]))
    }
}

const login = async (user: {email: string, password: string}, 
    setId: React.Dispatch<React.SetStateAction<number>>, 
    setUser: React.Dispatch<React.SetStateAction<{}>>) => {
    try {
        const request = await axios.post('http://localhost/api/login', user);
        if (request.status === 200){
            if (request.data[0]['count(*)'] === 1){
                setId(request.data[0].id);
                getUserById(request.data[0].id, setUser)
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
    const request = await axios.get("http://localhost/api/users/" + id + "/friends");
    if(request.status === 200){
        setFriends(request.data)
    }
}

const getFriend = async (id: number, setFriend: React.Dispatch<React.SetStateAction<UserData>>) => {
    const request = await axios.get("http://localhost/api/users/" + id);
    if (request.status === 200){
        setFriend(request.data[0])
    }
}


export { register, login, getFriends, getFriend }