import { Navigate } from "react-router-dom";
import {useContext, useEffect } from "react";

import * as authService from "../../../services/authService.js";
import {AuthContext} from "../../../contexts/AuthContext.js";
import * as localStorageUtil from "../../../utils/localStorageUtil.js";
import ErrorContext from "../../../contexts/ErrorContext.js";

const Logout = () => {
    const { user, logout } = useContext(AuthContext);
    const { displayError } = useContext(ErrorContext);

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