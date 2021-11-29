import { NavLink } from 'react-router-dom';

function LoggedUserNavButtons({
    user
}) {
    return (
        <>  
            <NavLink to="/services/create" > Create </NavLink>
            <span>Hello, {user.firstName}</span>
            <NavLink to="/logout"> Logout </NavLink>
        </>
    )
}
export default LoggedUserNavButtons;