import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext.js';

const IsGuestRouteGuard = () => {
    const { isAuthenticated } = useAuthContext();

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default IsGuestRouteGuard;