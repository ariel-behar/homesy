import { NavLink } from "react-router-dom";

function LoggedUserNavButtons({
    username
}) {
    return (
        <>  
            <span>Hello, {username}</span>
            <NavLink to="/logout" activeClassName="active" > Logout </NavLink>
        </>
    )
}
export default LoggedUserNavButtons;