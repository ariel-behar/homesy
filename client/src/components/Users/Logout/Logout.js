import { Navigate } from "react-router-dom";
import {useEffect } from "react";

import * as authService from "../../../services/authService.js";
import {useAuthContext} from "../../../contexts/AuthContext.js";
import * as localStorageUtil from "../../../utils/localStorageUtil.js";
import { useErrorContext } from "../../../contexts/ErrorContext.js";

const Logout = () => {
    const { user, logout } = useAuthContext();
    const { displayError } = useErrorContext();

    useEffect(() => {
        try {
            localStorageUtil.clearLocalStorage();
            authService.logout(user.AUTH_TOKEN);
            logout();
        } catch (error) {
            displayError(error)
        }
    })

    return (
        <Navigate to="/login" replace={true} />
    )
}

export default Logout;