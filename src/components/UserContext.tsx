import React, { createContext, useState, useContext } from "react";

interface Props {
    children: JSX.Element
}

export type UserData = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    birthdate: string,
    gender: string,
    profile_picture: string,
    is_active: boolean,
};

let userContext = createContext<UserData>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birthdate: "",
    gender: "",
    profile_picture: "",
    is_active: false,
});

const UserProvider: React.FC<Props> = ({ children }) => {
    const storedUser = localStorage.getItem("User");
    let [user, setUser] = storedUser !== null ? useState(JSON.parse(storedUser)) : useState({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birthdate: "",
        gender: "",
        profile_picture: "",
        is_active: false,
    })

    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    );
};

const useUserContext = () => {
    return useContext(userContext);
};

export { userContext, UserProvider, useUserContext };
