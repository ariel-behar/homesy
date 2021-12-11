import { useState, useEffect, createContext, useContext } from 'react';

import * as localStorageUtil from '../utils/localStorageUtil.js';
import ErrorContext from './ErrorContext.js';

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
    const [user, setUser] = useState(localStorageUtil.getLocalStorage(initialUserState));
    const { displayError } = useContext(ErrorContext)

    const login = (userData) => {
        try {
            localStorageUtil.setLocalStorage(userData);    
            setUser(userData);
        } catch (error) {
            displayError(error);
        }
    };

    const logout = () => {
        setUser(initialUserState);
    }

    const isAuthorized = (serviceCreatorId) => {
        console.log(serviceCreatorId);
        console.log(user.userId);
        if(serviceCreatorId === user.userId) {
            console.log('true');
            return true;
        } else {
            console.log('He is not the creator');
        }

    }

    return (
        <AuthContext.Provider value={{user, login, logout, isAuthenticated: Boolean(user.userId), isAuthorized}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
};