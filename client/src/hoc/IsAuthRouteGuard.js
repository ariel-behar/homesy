import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext.js';

const IsAuthRouteGuard = () => {
    const { isAuthenticated } = useAuthContext();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default IsAuthRouteGuard;