import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../contexts/authContext.js';

function LoggedUserNavButtons() {
    let { user } = useContext(AuthContext)

    return (
        <>  
            <NavLink to="/home-services/create" > Create Listing </NavLink>
            <span>Hello, {user.firstName}</span>
            <NavLink to="/logout"> Logout </NavLink>
        </>
    )
}
export default LoggedUserNavButtons;