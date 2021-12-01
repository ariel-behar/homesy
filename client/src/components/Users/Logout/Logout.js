import { Navigate } from "react-router-dom";
import {useContext, useEffect } from "react";

import * as authService from "../../../services/authService.js";
import AuthContext from "../../../contexts/authContext.js";

const Logout = () => {
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        authService.logout();
        logout();
    })

    return (
        <Navigate to="/login" replace={true} />
    )
}

export default Logout;