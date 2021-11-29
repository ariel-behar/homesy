import { NavLink } from 'react-router-dom';

function LoggedUserNavButtons({
    user
}) {
    let userName = user.firstName.toLowerCase();

    return (
        <>  
            <NavLink to="/home-services/create" > Create Listing </NavLink>
            <span>Hello, {user.firstName}</span>
            <NavLink to="/logout"> Logout </NavLink>
        </>
    )
}
export default LoggedUserNavButtons;