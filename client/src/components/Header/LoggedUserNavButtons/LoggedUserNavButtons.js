import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext.js';

function LoggedUserNavButtons({
    navItemCreateListing,
    navItemsProfileLogout,
    email
}) {
    let { user } = useAuthContext()

    return (
        <>
            {navItemCreateListing ? <NavLink to="/home-services/create"> Create Service</NavLink> : ''}

            {email
                ? <span>Hello, {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()}</span>
                : ""
            }

            {navItemsProfileLogout
                ? <>
                    <NavLink to="/my-profile"> My Profile </NavLink>
                    <NavLink to="/logout"> Logout </NavLink>
                  </>
                : ""
            }
        </>
    );
}
export default LoggedUserNavButtons;