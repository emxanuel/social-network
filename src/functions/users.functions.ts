import { Axios, server } from "../backend";
import React, { SetStateAction } from "react";
import { UserData } from "../components/UserContext";

const register = async (
    user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        birthdate: string;
        gender: string;
        profilePictutre: string;
        country: string;
        interests: string[];
    },
    setMessage: React.Dispatch<React.SetStateAction<{ text: string }>>
) => {
    setMessage({ text: "registering..." });

    const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/;
    let text: string;
    try {
        if (emailRegex.test(user.email)) {
            const request = await Axios.post("/users", user);

            if (request.status === 200) {
                Axios.get(`/users/email/${user.email}`)
                    .then((r) => {
                        addInterests(r.data, user.interests);
                    })
                    .then(() => setMessage({ text: "register succesful, go to login" })
                    );
            }
        } else {
            setMessage({ text: "please insert a valid email" });
        }
    } catch (e: any) {
        if (e.response.data.code === "ER_DUP_ENTRY") {
            text = "there is already an account with that email";
            setMessage({ text: text });
        }
    }
};

const addInterests = async (id: number, interests: string[]) => {
    Axios.post(`/interests/${id}`, {
        interests: interests
    });
};

const getUserById = async (
    id: number,
    setUser: React.Dispatch<React.SetStateAction<object>>
) => {
    const request = await Axios.get(`/users/${id}`);
    if (request.status === 200) {
        setUser(request.data);
        localStorage.setItem("User", JSON.stringify(request.data));
    }
};

const login = async (
    user: { email: string; password: string },
    setId: React.Dispatch<React.SetStateAction<number>>,
    setUser: React.Dispatch<React.SetStateAction<object>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
    try {
        const request = await Axios.post("/login", user);
        setMessage("logging in...");
        if (request.status === 200) {
            console.log(request.data)
            if (request.data["count(*)"] === 1) {
                setId(request.data.id);
                await getUserById(request.data.id, setUser);
                return true;
            } else {
                setMessage("email or password incorrect");
                return false;
            }
        } else {
            return false;
        }
    } catch (e: any) {
        console.log(e);
    }
};

const getFriends = async (
    id: number,
    setFriends: React.Dispatch<React.SetStateAction<[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setLoading(true);
    await Axios.get(`/users/${id}/friends`)
        .then((res) => {
            setFriends(res.data);
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
            setLoading(false);
        });
};

const getFriend = async (
    id: number,
    setFriend: React.Dispatch<React.SetStateAction<UserData>>,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const request = await Axios.get(`/users/${id}`);
    if(setLoading) setLoading(false)
    if (request.status === 200) {
        setFriend(request.data);
    }
};

const searchUsers = async (
    name: string,
    id: number,
    setResults: React.Dispatch<React.SetStateAction<UserData[]>>
) => {
    if (name.trim().length <= 0) {
        name = "`";
    }
    const request = await Axios.get(`/users/search/${id}/${name}`);
    if (request.status === 200) {
        setResults(request.data);
    }
};

const verifyFriend = async (user1: number, user2: number) => {
    let verify = false;
    const request = await Axios.get(`/users/verify/${user1}/${user2}`);
    if (request.status === 200) {
        if (request.data === 1) {
            verify = true;
        }
    }
    return verify;
};

const sendFriendRequest = async (
    requester: number,
    requested: number,
    setRequestStatus: React.Dispatch<React.SetStateAction<number>>
) => {
    const request = await Axios.post("/users/request", {
        requester: requester,
        requested: requested,
        requestDate: new Date().toISOString().slice(0, 19).replace("T", " "),
    });

    if (request.status === 200) {
        setRequestStatus(0);
    }
};

const verifyRequest = async (user1: number, user2: number) => {
    let state = -1;
    const request = await Axios.get(`/users/request/${user1}/${user2}`);

    if (request.status === 200) {
        request.data.state !== null
            ? (state = request.data.state)
            : (state = -1);
    }

    return state;
};

const answerRequest = async (
    requester: number,
    requested: number,
    answer: string,
    setRequestStatus?: React.Dispatch<React.SetStateAction<number>>,
    setIsFriend?: React.Dispatch<React.SetStateAction<boolean>>,
    setRequests?: React.Dispatch<SetStateAction<UserData[]>>
) => {
    const request = await Axios.post(
        `/users/request/${requester}/${requester}`,
        {
            requester: requester,
            requested: requested,
            answer: answer,
        }
    );

    if (request.status === 200) {
        if (answer === "accepted") {
            if (setIsFriend) {
                setIsFriend(true);
            } else if (setRequests) {
                getRequests(requested, setRequests);
            }
        } else if (answer === "declined") {
            if (setRequestStatus) {
                setRequestStatus(-1);
            } else if (setRequests) {
                getRequests(requested, setRequests);
            }
        }
    }
};

const getRequests = async (
    id: number,
    setRequests: React.Dispatch<SetStateAction<UserData[]>>
) => {
    const request = await Axios.get(`/users/${id}/requests`);
    if (request.status === 200) {
        if (request.data.length == 0) {
            setRequests([
                {
                    id: 0,
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    birthdate: "",
                    gender: "",
                    profile_picture: "",
                    is_active: false,
                    country: "",
                    interests: [],
                },
            ]);
        } else {
            setRequests(request.data);
        }
    }
};

const getProfilePhoto = (
    path: string,
    setProfilePricture: React.Dispatch<React.SetStateAction<string>>
) => {
    console.log(path)
    if (path === null){
        setProfilePricture(`${server}/users/picture/no-picture`)
    }
    else {
        console.log('working')
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
    getRequests,
    getProfilePhoto
};

