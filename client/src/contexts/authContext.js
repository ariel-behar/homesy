import { useState, createContext, useContext } from 'react';

import * as localStorageUtil from '../utils/localStorageUtil.js';
import { useErrorContext } from './ErrorContext.js';

export const AuthContext = createContext();

const initialUserState = {
    userId: '',
    firstName: '',
    email: '',
    gender: '',
    AUTH_TOKEN: '',
};

export const AuthProvider = ({
    children
}) => {
    const [user, setUser] = useState(localStorageUtil.getLocalStorage(initialUserState));
    const { displayError } = useErrorContext()

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
        if(serviceCreatorId === user.userId) {
            return true;
        } 
        return false;
    }

    const isAuthenticated = Boolean(user.userId);

    return (
        <AuthContext.Provider value={{user, login, logout, isAuthenticated, isAuthorized}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
};