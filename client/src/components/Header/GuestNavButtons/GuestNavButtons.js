import { NavLink } from "react-router-dom";

function GuestNavButtons() {
    return (
        <>
            <NavLink to="/login" activeClassName="active"> Login </NavLink>
            <NavLink to="/register" activeClassName="active" > Register </NavLink>
        </>
    )
}
export default GuestNavButtons;