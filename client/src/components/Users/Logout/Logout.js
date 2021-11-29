import { Navigate } from "react-router-dom";
import {useEffect } from "react";

import * as authService from "../../../services/authService.js";

const Logout = ({
    onLogOut
}) => {
    useEffect(() => {
        authService.logout();
        onLogOut();
    }, [])

    return (
        <Navigate to="/login" replace={true} />
    )
}

export default Logout;