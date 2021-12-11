import { useState, useEffect } from "react";

import { createContext, useContext } from 'react';

export const AuthContext = createContext();

const initialUserState = {
    userId: '',
    firstName: '',
    email: '',
    AUTH_TOKEN: '',
};

export const AuthProvider = ({
    children
}) => {
    const [user, setUser] = useState(initialUserState);

    useEffect(() => {
        let userId = localStorage.getItem('userId');
        let firstName = localStorage.getItem('firstName');
        let email = localStorage.getItem('email');
        let AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');

        let userObj = {
            userId,
            firstName,
            email,
            AUTH_TOKEN,
        };

        if (userId && firstName && email && AUTH_TOKEN) {
            setUser(userObj);
        }
    }, []);

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(initialUserState);
    }

    return (
        <AuthContext.Provider value={{user, login, logout, isAuthenticated: Boolean(user.userId)}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authState = useContext(AuthContext);

    return authState;
};