import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.js';

function LoggedUserNavButtons() {
    let { user } = useAuth()

    return (
        <>
            <NavLink to="/home-services/create"> Create Listing </NavLink>
            <span>Hello, {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()}</span>
            <NavLink to="/logout"> Logout </NavLink>
        </>
    );
}
export default LoggedUserNavButtons;