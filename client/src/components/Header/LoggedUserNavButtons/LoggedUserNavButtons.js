import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext.js';

function LoggedUserNavButtons() {
    let { user } = useAuthContext()

    return (
        <>
            <NavLink to="/home-services/create"> Create Service</NavLink>
            <span>Hello, {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()}</span>
            <NavLink to="/my-profile"> My Profile </NavLink>
            <NavLink to="/logout"> Logout </NavLink>
        </>
    );
}
export default LoggedUserNavButtons;